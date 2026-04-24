---
title: "Everything We Know About the MTG Arena Log File in 2026"
date: "2026-04-20"
source: "https://blog.manasight.gg/arena-log-format-guide/"
author:
  - "[[Tim Cahill]]"
description: "A developer's guide to MTG Arena's Player.log file in 2026, verified against real log output. Covers GRE messages, game state, draft events, match lifecycle, and the gotchas that break every parser."
tags:
  - "clipped"
aliases:
---
When I started building [Manasight](https://manasight.gg/?ref=blog.manasight.gg) and needed to [parse the Arena log file](https://github.com/manasight/manasight-parser?ref=blog.manasight.gg), I based my initial design on existing community documentation. About half of my assumptions turned out to be wrong.

API method names I pulled from older parsers didn't exist in real logs. Game result detection worked differently than documented. A field I expected to be nested inside another was actually its sibling. An entire parser module I wrote had to be deleted because the log event it targeted doesn't appear in real Player.log files. Parser projects from 2019–2022 documented a format that has changed substantially since, and community gists reference API endpoints that were removed years ago.

This post is what I wish existed when I started. Everything here has been verified against current Arena logs as of early 2026.

## Log File Location

Arena writes a single log file per session. When you close and reopen the game, the previous session's log is preserved as a backup.

| Platform | Log Path |
| --- | --- |
| Windows | `%LOCALAPPDATA%Low\Wizards Of The Coast\MTGA\Player.log` |
| macOS | `~/Library/Logs/Wizards Of The Coast/MTGA/Player.log` |
| Previous session | Same directory, `Player-prev.log` |

Prerequisite: You must enable "Detailed Logs (Plugin Support)" in Options > Account. Without this, the log contains only basic diagnostic output and none of the JSON game data that parsers need. This is the most common reason new users can't get companion tools working.

The log file used to be called `output_log.txt` and lived in a different location (renamed in May 2020). If you're reading older parser code and the paths don't match, that's why.

## Log Structure

The log isn't a clean structured format. It's a mix of plain text diagnostic lines and embedded JSON objects. Game-relevant entries are marked by the `[UnityCrossThreadLogger]` header prefix. Other bracketed headers appear in the log (`[PhysX]`, `[Manifest]`, `[TaskLogger]`, etc.) but contain engine diagnostics, not game data.

A typical sequence looks like this:

```
[UnityCrossThreadLogger]3/11/2026 12:34:56 PM
==> EventJoin {"EventName":"QuickDraft_MKM_20260307","Id":"abc123"}

[UnityCrossThreadLogger]3/11/2026 12:35:01 PM
{"greToClientEvent":{"greToClientMessages":[{"type":"GREMessageType_GameStateMessage",...}]}}
```

JSON payloads can span multiple lines. Parsing requires accumulating lines between header boundaries and extracting JSON using brace-depth counting (tracking open/close braces while respecting string literals). A new `[UnityCrossThreadLogger]` header signals the end of the previous entry.

Lines before the first `[UnityCrossThreadLogger]` header in a file are Unity engine boot diagnostics (Mono initialization, GPU info, assembly loading) and should be skipped.

Arena writes timestamps in the user's locale format. This creates a parsing challenge: the log uses multiple date/time formats depending on the player's system settings, plus several machine-oriented formats inside JSON payloads.

Formats observed in real logs:

| Format | Example | Where |
| --- | --- | --- |
| US 12-hour | `3/11/2026 6:08:07 PM` | `[UnityCrossThreadLogger]` header lines |
| ISO 8601 + Z | `2026-03-11T22:48:34.663Z` | JSON datetime fields (`progressedDateTimeUTC`, `_dailyRewardResetTimestamp`) |
| ISO 8601 + offset | `2026-03-11T18:25:33.906174-07:00` | JSON `ServerTime`, `lastRemotePing` fields |
| .NET ticks | `639088754738962389` | ClientToGRE `timestamp` fields |
| Epoch milliseconds | `1773278674334` | GRE `timestamp` fields |

On European-locale systems, header timestamps likely use a day-first format (e.g., `11/03/2026 12:34:56`), but I haven't been able to verify this directly since all my test data comes from a US-locale system.

This ambiguity is problematic: when the day is 12 or less, `3/7/2026` could be March 7 (US) or July 3 (European). There is no reliable way to resolve this from the log alone. My parser uses a US-first convention and accepts the loss for ambiguous dates. When I have EU-based logs to validate with, I am considering updating the parser to take a locale hint to break the tie.

Timestamps appear after the header prefix on the same line. If a header line has no parseable timestamp, store the event without one. Synthetic timestamps break deduplication and chronological ordering.

## Client API Messages

Outside of gameplay, the log records REST-style API calls between the Arena client and Wizards' servers. These handle collection data, events, matchmaking, rank, and inventory.

This is the section most existing documentation gets wrong. Older parsers describe a `Namespace.MethodName` convention with endpoints like `PlayerInventory.GetPlayerInventory` and `PlayerInventory.GetPlayerCardsV3`. Most of those endpoints were removed in the August 2021 breaking change and never restored.

Current logs use an arrow-delimited format:

```
[UnityCrossThreadLogger]==> EventJoin {"id":"abc123","request":"{\"EventName\":\"QuickDraft_MKM_20260307\"}"}

<== RankGetCombinedRankInfo(e1f2a3b4-5678-90cd-ef12-34567890abcd)
{"constructedClass":"Gold","constructedLevel":2,...}
```

`==>` marks a client request. `<==` marks a server response, followed by a UUID in parentheses (matching the request's `id` field) and a JSON payload. Note that `==>` lines carry the `[UnityCrossThreadLogger]` prefix, but `<==` lines appear bare with no header prefix. Request payloads often contain string-escaped JSON nested inside a `request` field.

### What's Available in 2026

| Direction | Method | What It Contains |
| --- | --- | --- |
| `==>` | `EventJoin` | Player joins an event |
| `==>` | `EventClaimPrize` | Prize claim after an event |
| `==>` | `EventEnterPairing` | Player enters matchmaking |
| `<==` | `RankGetCombinedRankInfo` | Constructed and Limited rank, tier, level |
| `<==` | `StartHook` | Startup data: inventory (gold, gems, wildcards), deck summaries, card metadata, server time |
| `==>` / `<==` | `DraftCompleteDraft` | Human draft completion (request and response) |
| `==>` / `<==` | `BotDraftDraftPick` | Bot draft pack presentation and pick selection |

`StartHook` is the primary startup data delivery mechanism. It arrives as a single large response containing `InventoryInfo` (gold, gems, wildcards, vault progress), `DeckSummariesV2`, `CardMetadataInfo`, and a dozen other fields. Notably, the player's card collection (owned cards) does not appear in any `==>` / `<==` API call in current logs. The old `GetPlayerCardsV3` endpoint was removed in August 2021 and was not replaced with an equivalent in this API layer.

A complete catalog of every API method that can appear in the log doesn't exist. You discover new ones by watching the log during different game activities.

## GRE Messages

GRE (Game Rules Engine) messages contain the actual game data: every card, zone, phase transition, and player action. This is what makes deck tracking, action logs, and replay viewers possible.

GRE messages are wrapped in a `greToClientEvent` envelope:

```json
{
  "greToClientEvent": {
    "greToClientMessages": [
      {
        "type": "GREMessageType_GameStateMessage",
        "gameStateMessage": { ... }
      }
    ]
  }
}
```

### GRE Message Types

| Type | Description |
| --- | --- |
| `GREMessageType_ConnectResp` | Initial connection response with starting game state |
| `GREMessageType_GameStateMessage` | Full or partial game state update |
| `GREMessageType_QueuedGameStateMessage` | Queued state update (same structure as above) |
| `GREMessageType_TimerStateMessage` | Rope timers and timeout info |
| `GREMessageType_IntermissionReq` | Between-game transition in Bo3 (contains game result) |
| `GREMessageType_SubmitDeckReq` | Sideboarding prompt between Bo3 games |
| `GREMessageType_UIMessage` | UI-related noise |
| `GREMessageType_SetSettingsResp` | Settings acknowledgment |

### Client-to-GRE Messages

Player actions also appear in the log:

| Type | Description |
| --- | --- |
| `ClientMessageType_MulliganResp` | Keep or mulligan decision |
| `ClientMessageType_SelectNResp` | Card selection (e.g., discard, scry ordering) |
| `ClientToGREUIMessage` | UI interactions (hover, chat). Noise. |

Some client-to-GRE payloads contain string-escaped JSON nested inside JSON. Your parser needs to handle both already-parsed objects and string-encoded payloads that need a second deserialization pass.

## GameStateMessage

This is the core data structure. Each `GameStateMessage` contains some or all of these fields:

```json
{
  "gameStateMessage": {
    "gameObjects": [ ... ],
    "zones": [ ... ],
    "gameInfo": {
      "stage": "GameStage_Play",
      "matchState": "MatchState_GameInProgress"
    },
    "turnInfo": {
      "turnNumber": 3,
      "phase": "Phase_Main1",
      "activePlayer": 1,
      "decisionPlayer": 1
    },
    "annotations": [ ... ],
    "timers": [ ... ],
    "diffDeletedInstanceIds": [ 101, 202 ]
  }
}
```

Note that `turnInfo` is a sibling of `gameInfo`, not nested inside it. I initially had it as `gameStateMessage.gameInfo.turnInfo`, which returned null every time. This is the kind of structural assumption that only breaks when you test against real data.

### Key Fields

`**gameObjects**`: Every card and permanent in the game. Each object has an `instanceId`, `grpId` (the card's global ID), `zoneId`, `ownerSeatId`, `controllerSeatId`, `visibility`, `cardTypes`, `subtypes`, `power`, `toughness`, and more. The `name` field is a numeric ID, not a human-readable string; card names require a separate database lookup. Tracking zone transitions of game objects is how you build a deck tracker.

`**zones**`: Library, hand, battlefield, graveyard, exile, stack, and others. Each zone has a `zoneId`, `type` (e.g., `ZoneType_Hand`), `ownerSeatId`, and `objectInstanceIds` listing what's in it.

**`annotations`**: Records of game actions: zone transfers, damage, counters, life total changes. The format is less intuitive than you'd expect (see next section).

**`timers`**: Rope timer state, timeout counts, priority timing.

**`diffDeletedInstanceIds`**: Instance IDs that should be purged from your local game state. When Arena sends incremental updates (not full state snapshots), this field tells you what no longer exists. If you don't process this, your tracker will show phantom cards.

### Full State vs. Incremental Updates

A `GameStateMessage` can be a full state snapshot or a partial delta containing only what changed. There's no explicit flag that distinguishes them. In practice, early messages in a game (especially from `ConnectResp`) tend to be full snapshots, and subsequent messages tend to be deltas. Your parser needs to merge incoming fields into a running game state and remove anything listed in `diffDeletedInstanceIds`.

## Annotations

Annotations record game actions within a `GameStateMessage`. Their format is worth calling out because it's less intuitive than the rest of the GRE schema.

You might expect named wrapper objects with camelCase fields. What Arena actually writes:

```json
{
  "id": 47,
  "affectorId": 312,
  "affectedIds": [455],
  "type": ["AnnotationType_ZoneTransfer"],
  "details": [
    { "key": "zone_src", "type": "KeyValuePairValueType_int32", "valueInt32": [29] },
    { "key": "zone_dest", "type": "KeyValuePairValueType_int32", "valueInt32": [31] },
    { "key": "category", "type": "KeyValuePairValueType_string", "valueString": ["PlayLand"] }
  ]
}
```

Two surprises here. First, `type` is an **array of strings**, not a plain string. In every annotation I've seen in current logs, it's a single-element array, but the array wrapper is always present.

Second, the data lives in a uniform `details` array of key-value pairs, each with a typed value field (`valueInt32`, `valueString`, etc.). The key names use `snake_case` (`zone_src`, `orig_id`, `new_id`), not camelCase. You need helper functions to search the details array by key name.

Annotation types include `AnnotationType_ZoneTransfer`, `AnnotationType_ObjectIdChanged`, `AnnotationType_ResolutionComplete`, `AnnotationType_DamageDealt`, `AnnotationType_ModifiedLife`, `AnnotationType_CounterAdded`, `AnnotationType_PhaseOrStepModified`, `AnnotationType_TappedUntappedPermanent`, and others.

## Message Batching

This is the implementation detail I most wish someone had told me upfront.

Arena frequently batches multiple `GameStateMessage` values into a single `greToClientMessages` array. In my testing across multiple play sessions, over half of all GRE events that contain game state data have two or more `GameStateMessage` entries bundled together. A single log entry might contain three or four game state updates.

```json
{
  "greToClientEvent": {
    "greToClientMessages": [
      { "type": "GREMessageType_GameStateMessage", "gameStateMessage": { ... } },
      { "type": "GREMessageType_GameStateMessage", "gameStateMessage": { ... } },
      { "type": "GREMessageType_QueuedGameStateMessage", "gameStateMessage": { ... } }
    ]
  }
}
```

If you use a find-first approach to extract the `GameStateMessage` from this array, you silently discard the rest. In my case, the parser was missing turn changes, creature deaths, and annotation data until I refactored it to iterate every message in the batch. This was the source of most of my "why is the tracker missing data" bugs.

## Match Lifecycle

### Match Start

Match boundaries come from `matchGameRoomStateChangedEvent` JSON entries:

```json
{
  "matchGameRoomStateChangedEvent": {
    "gameRoomInfo": {
      "stateType": "MatchGameRoomStateType_Playing",
      "gameRoomConfig": {
        "matchId": "abc123",
        "eventId": "Constructed_BestOf1",
        "reservedPlayers": [
          { "systemSeatId": 1, "userId": "...", "playerName": "..." },
          { "systemSeatId": 2, "userId": "...", "playerName": "..." }
        ]
      }
    }
  }
}
```

This gives you the match ID, event type, and both players' seat assignments.

### Game Result

Game results are embedded in GRE `GameStateMessage` payloads, not in a separate event type. When a game ends, the `gameInfo` field inside a `GameStateMessage` transitions to:

```json
{
  "stage": "GameStage_GameOver",
  "matchState": "MatchState_GameComplete",
  "results": [
    { "scope": "MatchScope_Game", "result": "ResultType_WinLoss", "winningTeamId": 1, "reason": "ResultReason_Game" }
  ]
}
```

There's a catch: Arena sends **two** `GameStage_GameOver` messages per game end. The first has `matchState: "MatchState_GameComplete"` (game-scope result). The second has `matchState: "MatchState_MatchComplete"` (match-scope result, which also includes both `MatchScope_Game` and `MatchScope_Match` entries). If you emit a game result event for both, you get duplicates. Filter on `MatchState_GameComplete` and skip `MatchState_MatchComplete`.

I initially built a separate game result parser around `LogBusinessEvents` entries with a `WinningType` field, based on documentation from older parsers. That event never appeared in any real log I tested. The entire module had to be deleted.

### Match Complete

Match completion uses the same `matchGameRoomStateChangedEvent` structure:

```json
{
  "matchGameRoomStateChangedEvent": {
    "gameRoomInfo": {
      "stateType": "MatchGameRoomStateType_MatchCompleted",
      "finalMatchResult": {
        "matchId": "abc123",
        "matchCompletedReason": "MatchCompletedReasonType_Success",
        "resultList": [
          { "scope": "MatchScope_Game", "result": "ResultType_WinLoss", "winningTeamId": 1 },
          { "scope": "MatchScope_Match", "result": "ResultType_WinLoss", "winningTeamId": 1 }
        ]
      }
    }
  }
}
```

For Bo3 matches, `resultList` contains one `MatchScope_Game` entry per game played, plus a final `MatchScope_Match` entry for the overall result. In a 2-0 match, for example, the list contains three entries: two game-scope results and one match-scope result. Between games, the GRE sends `GREMessageType_IntermissionReq` (containing the game result) followed by `GREMessageType_SubmitDeckReq` for sideboarding.

## Draft Events

Draft parsing requires handling two completely different log formats depending on the draft type.

### Bot Drafts (Quick Draft)

Bot draft messages use a `CurrentModule` / `Payload` envelope, where the payload is string-escaped JSON. Pack presentation arrives as a `BotDraftDraftPick` response:

```json
{
  "CurrentModule": "BotDraft",
  "Payload": "{\"Result\":\"Success\",\"EventName\":\"QuickDraft_ECL_20260223\",\"DraftStatus\":\"PickNext\",\"PackNumber\":0,\"PickNumber\":0,\"NumCardsToPick\":1,\"DraftPack\":[\"98361\",\"98498\",\"98358\",...],\"PickedCards\":[...]}"
}
```

Note that `DraftPack` is an array of **strings**, not integers. Same for `PickedCards`.

Pick selection is sent as a `==> BotDraftDraftPick` request (no underscore) with `PickInfo` containing the chosen `CardIds` (plural, an array), `PackNumber`, and `PickNumber`:

```
==> BotDraftDraftPick {"id":"...","request":"{\"EventName\":\"QuickDraft_ECL_20260223\",\"PickInfo\":{\"EventName\":\"QuickDraft_ECL_20260223\",\"CardIds\":[\"98546\"],\"PackNumber\":0,\"PickNumber\":0}}"}
```

Draft completion for bot drafts does **not** use `DraftCompleteDraft`. Instead, the final `BotDraftDraftPick` response returns `"DraftStatus":"Completed"` with a full `PickedCards` array and an empty `DraftPack`. The response also includes `DTO_InventoryInfo` with card grant details.

### Human Drafts (Premier/Traditional)

Pack presentation uses a `Draft.Notify` entry with `draftId`, `SelfPack`, `SelfPick`, and `PackCards` (a comma-separated string of card IDs, not an array). One caveat: the very first pick of pack 1 does not generate a `Draft.Notify`. The first one appears at `SelfPick:2`. New packs (pack 2 and pack 3) do generate `Draft.Notify` for their first pick.

Pick selection arrives as `EventPlayerDraftMakePick` with `DraftId`, `GrpIds` (an array of selected card IDs), `Pack`, and `Pick` numbers. In formats that allow picking multiple cards (like Pick Two Draft), `GrpIds` contains more than one entry.

### Draft Completion

Human drafts emit a `DraftCompleteDraft` entry when the draft finishes. Note the exact name: no underscore between "Draft" and "Complete." The request contains `EventName` and `IsBotDraft: false` in string-escaped JSON. The response includes `CourseId`, `InternalEventName`, and `CardPool` (an array of integer card IDs — the complete pool of drafted cards).

Bot drafts (QuickDraft) do **not** emit `DraftCompleteDraft`. Completion is signaled by the final `BotDraftDraftPick` response with `DraftStatus: "Completed"` (see above).

## Session Events

A few log events track the player session:

| Signature | What It Contains |
| --- | --- |
| `authenticateResponse` | Login confirmation with `clientId`, `sessionId`, and `screenName` |
| `FrontDoorConnection.Close` | Logout or disconnect (includes reason, e.g., `"OnDestroy"`) |

`authenticateResponse` is the primary source of player identity. It appears at session start and again on each match server reconnection. Identity data also appears in `matchGameRoomStateChangedEvent`, where the `reservedPlayers` array includes `userId` and `playerName` for both players in a match.

If you're building a tool that processes this data, strip or hash identity fields before anything leaves the user's machine. WotC has been moving in this direction themselves: screen names were removed from most log entries in July 2021, and opponent display name tags were removed in July 2024 (see the breaking changes timeline below). Treat the remaining identity fields as data you have access to, not data you're entitled to store or transmit.

## Gap Between Log and UI

This is what got me interested in the project. Arena has all this data. The log proves it. But the game client surfaces almost none of it:

- **Win rates:** Every match result is logged. Arena never shows your win rate.
- **Match history:** Every game is recorded. Arena shows nothing after you close the results screen.
- **Action sequences:** The GRE logs every trigger, every scry result, every combat step. Arena's in-game log auto-scrolls and clears within seconds.
- **Revealed cards:** When your opponent plays or reveals a card, the GRE logs the full card data. Arena doesn't surface a history of what's been revealed during the current game.

Arena is a game client designed to keep you playing, not to surface analytics. That's a reasonable design choice, but it means there's a permanent structural gap between what the game records and what it shows you. That's what I'm building [Manasight](https://manasight.gg/?ref=blog.manasight.gg) to address.

## Manasight

The parser described in this post is [open source](https://github.com/manasight/manasight-parser?ref=blog.manasight.gg), and it's the foundation for everything below.

The first thing I'm building is a desktop overlay with a scrollable action log, a deck tracker, and a connection health indicator. The action log will be comprehensive: every spell, trigger, scry result, and combat assignment captured in real time, persistent and searchable instead of flashing on screen and disappearing. After that, turn-by-turn game replays.

Manasight will run on both Windows and Mac, track all formats, and the core features will be free. It's a lightweight standalone app built with [Tauri](https://v2.tauri.app/?ref=blog.manasight.gg), not a browser extension.

On data: the same care I described in the session events section will apply to Manasight. You'll know what's collected, you'll be able to turn it off, and delete means delete. The parser is open source so you can verify exactly what it reads.

I'll be writing more about the technical challenges as I build. If you're interested in Arena tooling or building on game data, follow along on [the blog](https://blog.manasight.gg/) or on [Twitter/X](https://x.com/manasightgg?ref=blog.manasight.gg).

## Appendix

---

### Breaking Changes

Fair warning: the log format is unstable and has broken without notice before.

In the 2021.8.0.3855 update, Wizards removed several log endpoints without warning:

- `PlayerInventory.GetPlayerInventory`: removed
- `PlayerInventory.GetPlayerCardsV3`: removed
- `Inventory.Updated`: removed
- Several draft-related endpoints: removed

Collection tracking, inventory updates, and draft pick logging all broke overnight. A [community feedback thread](https://web.archive.org/web/20251109061807/https://feedback.wizards.com/forums/918667-mtg-arena-bugs-product-suggestions/suggestions/44050746-broken-logs-in-2021-8-0-3855) collected over 700 votes. Some data eventually reappeared through different endpoints (inventory now comes through `StartHook`), but the format changed and old parsers needed rewrites. Card collection data (`GetPlayerCardsV3`) was not replaced with an equivalent in the current API layer.

That wasn't an isolated incident. A timeline of data removals:

| Date | What Changed |
| --- | --- |
| Sept 2019 | Vault progress info removed |
| May 2020 | Log file renamed from `output_log.txt` to `Player.log`, path changed |
| July 2021 | Screen name removed from most log entries |
| Aug 2021 | Collection, inventory, and draft endpoints removed (partially restored later in new format) |
| Aug 2022 | MMR/rating data removed |
| July 2024 | Opponent display name tag removed |

The trend is clear: Wizards has been reducing the data available in the log over time, not expanding it. If you're building a tool that depends on the log, design for resilience. Assume any field can disappear in the next patch. Anything your parser extracts today might not be there tomorrow.

### Open-Source Parsers

If you're building something, start by reading existing implementations.

Status as of early 2026:

[**manasight-parser**](https://github.com/manasight/manasight-parser?ref=blog.manasight.gg) **Rust · Active** My project. Verified against current logs. Full GRE, client API, draft, and match lifecycle parsing. MIT/Apache-2.0.

[**rconroy293/mtga-log-client**](https://github.com/rconroy293/mtga-log-client?ref=blog.manasight.gg) **Python · Active** 17Lands' official client. Clean, focused on draft and game event upload.

[**gathering-gg/parser**](https://github.com/gathering-gg/parser?ref=blog.manasight.gg) **Go · Unmaintained (2019)** Comprehensively typed. Good for understanding message structures, but the format has changed.

[**mtgatool/mtgatool-desktop**](https://github.com/mtgatool/mtgatool-desktop?ref=blog.manasight.gg) **TypeScript · Low activity (last release Oct 2024)** Full Electron app with log watcher and message dispatcher.

[**mtgatracker/mtgatracker**](https://github.com/mtgatracker/mtgatracker?ref=blog.manasight.gg) **Python · Unmaintained (2020)** Websocket-based overlay. Historical reference.

[**Razviar/mtgap**](https://github.com/Razviar/mtgap?ref=blog.manasight.gg) **TypeScript · Archived (April 2025)** MTGA Pro Tracker. Rewrote its parser multiple times as the format evolved.

[**riQQ/MtgaProto**](https://github.com/riQQ/MtgaProto?ref=blog.manasight.gg) **Protobuf · Updated periodically** Extracted `.proto` definitions from Arena's installation files. Reference, not a parser.

---

*Manasight is not affiliated with, endorsed by, or sponsored by Wizards of the Coast or Hasbro.*

*Have corrections or additions? I'd love to hear from other developers working in this space.*