---
title: "Learning from the Best"
date: "2026-04-24"
source: "https://blog.17lands.com/posts/learning-from-the-best/"
author:
  - "[[Robert Conroy ]]"
  - "[[ Carl Chase]]"
description: "How do the best play? There have been thousands of articles in Magic across the decades talking about this in some form or fashion, but through the magic of 17Lands we get the pleasure of looking at some aspects of this through a pure factual lens."
tags:
  - "clipped"
aliases:
---
How do the best play? There have been thousands of articles in Magic across the decades talking about this in some form or fashion, but through the magic of 17Lands we get the pleasure of looking at some aspects of this through a pure factual lens.

We constantly hear people talking about “well that card has a higher win rate, but I see XYZ streamer doesn’t like that card” or “that card has a terrible win rate yet XYZ streamer plays it all the time”. For a while, we’ve wanted to provide a segmented view into the data to help dig into some of this, and today we’re announcing the release of a new cut of data to do just that!

At a high level, we’ve broken down some users into different groupings based on their performance over the last few sets and computed many of our common statistics for each of those groups. You’ll be able to see these cuts of the data as dropdowns on pages you’re familiar with, like the [Card Performance](https://www.17lands.com/card_data) and [Color Performance](https://www.17lands.com/deck_color_data) pages, and you can get more detail on the methodology on the [Metrics Definitions](https://www.17lands.com/metrics_definitions) page.

As an example, we can segment data by just top players and compare it to our overall user base. With this, we can see how aggregated data might be hiding the true top-end of a card, as it removes players who are more likely to play the card in situations where they aren’t maximizing its full potential.

Below are some of our key takeaways from this cut of the data.

## Top players play checks notes the best cards more often

Shock! Awe! These are the top ten commons and uncommons that top players played more frequently than the average player. “Play Rate” means the # of copies of this per deck, on average, for that group. You can sort of think of it like the fraction of decks that include that card, though it’s also bumped up by decks playing multiple copies.

| Card | Play Rate (All) | Play Rate (Top) | Δ Play Rate (Top-All) |
| --- | --- | --- | --- |
| [Run Out of Town](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555259) | 0.279 | 0.438 | 0.158 |
| [Make Disappear](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555250) | 0.233 | 0.357 | 0.124 |
| [Raffine's Informant](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555227) | 0.459 | 0.579 | 0.120 |
| [Majestic Metamorphosis](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555249) | 0.301 | 0.411 | 0.109 |
| [Girder Goons](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555281) | 0.371 | 0.474 | 0.102 |
| [Inspiring Overseer](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=591477) | 0.446 | 0.520 | 0.073 |
| [Expendable Lackey](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555244) | 0.302 | 0.374 | 0.072 |
| [Brokers Hideout](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555449) | 0.397 | 0.464 | 0.067 |
| [Backup Agent](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555203) | 0.370 | 0.437 | 0.067 |
| [Gathering Throng](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555214) | 0.279 | 0.345 | 0.065 |

Conversely, here are the top ten cards that top players put in their decks less often than the average player. Not exactly a “greatest hits” album:

| Card | Play Rate (All) | Play Rate (Top) | Δ Play Rate (Top-All) |
| --- | --- | --- | --- |
| [Kill Shot](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=416851) | 0.159 | 0.099 | \-0.059 |
| [Midnight Assassin](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555288) | 0.115 | 0.058 | \-0.057 |
| [Obscura Initiate](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555251) | 0.187 | 0.130 | \-0.056 |
| [Riveteers Initiate](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555321) | 0.144 | 0.091 | \-0.053 |
| [Celebrity Fencer](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555208) | 0.118 | 0.066 | \-0.051 |
| [Witness Protection](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555267) | 0.112 | 0.065 | \-0.047 |
| [Prizefight](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555355) | 0.190 | 0.145 | \-0.044 |
| [High-Rise Sawjack](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555351) | 0.124 | 0.081 | \-0.042 |
| [Deal Gone Bad](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=651845) | 0.196 | 0.155 | \-0.041 |
| [Glittermonger](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555350) | 0.099 | 0.058 | \-0.041 |

If you do a pure card quality analysis and say “how much win rate benefit did the top players gain purely from playing with higher card quality”, you come up with about +0.4% benefit to win rate. That’s not deck building, that’s not being better at playing the game, that’s literally just from putting better cards in their decks. Huge? No. But just another way the best players are creating an uneven playing field for themselves before the match even starts

## Top players play situational cards… situationally

These are all cards that top players played at least 2 percentage points less often, but when they did, they got much better (relative) performance out of them than the average player.

| Card | Play Rate (All) | Play Rate (Top) | Δ Play Rate (Top-All) | Δ GIH WR (Top-All) |
| --- | --- | --- | --- | --- |
| [Goldhound](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=590122) | 0.128 | 0.092 | \-0.036 | 8.5 percentage points |
| [High-Rise Sawjack](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555351) | 0.124 | 0.081 | \-0.042 | 7.1 pp |
| [Celebrity Fencer](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555208) | 0.118 | 0.066 | \-0.051 | 6.5 pp |
| [Witty Roastmaster](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555332) | 0.159 | 0.123 | \-0.035 | 6.2 pp |
| [Midnight Assassin](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555288) | 0.115 | 0.058 | \-0.057 | 6.2 pp |
| [Shattered Seraph](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555422) | 0.149 | 0.124 | \-0.025 | 6.1 pp |
| [Wrecking Crew](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555333) | 0.104 | 0.079 | \-0.024 | 5.8 pp |
| [Kill Shot](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=416851) | 0.159 | 0.099 | \-0.059 | 5.8 pp |
| [Prizefight](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555355) | 0.190 | 0.145 | \-0.044 | 5.7 pp |
| [Witness Protection](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555267) | 0.112 | 0.065 | \-0.047 | 5.7 pp |

Here are some thoughts on why they’re able to overperform with some of these situational cards:

- [Goldhound](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=590122)
	is an inherently weak card, but it does a lot of small things in synergy with treasures-matter, sacrifice-matters, pump spells to 2-1 with first strike/menace, and also fixes and ramps. None of those things individually makes it worth playing a 1/1, but the best players are finding the right spots where the payoff is “good enough”.
- [Celebrity Fencer](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555208)
	doesn’t do as much as other white 4 drops, but can be a fine finisher in a deck that stabilizes and has tons of token producers. The best players know to cut it from all but the most synergistic decks.
- [High-Rise Sawjack](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555351)
	and
	[Wrecking Crew](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555333)
	are other examples of cards that more controlling decks with top end are probably fine playing, but you want to avoid most of the time.
- [Prizefight](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555355)
	can be extremely weak in decks without high toughness spells or treasure synergies.

Overall, every single card on this list is a card that works with some types of decks but needs to be cut from many others, and the best players are making the call to correctly cut the card more often.

## Top players get the most out of cards that generate lots of decision points or are challenging to maximize<

Here is a list of the cards where top players got their biggest win rate advantage.

| Card | Play Rate (All) | Play Rate (Top) | Δ Play Rate (Top-All) | Δ GIH WR (Top-All) |
| --- | --- | --- | --- | --- |
| [Goldhound](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=590122) | 0.128 | 0.092 | \-0.036 | 8.5 pp |
| [Tavern Swindler](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=446130) | 0.016 | 0.013 | \-0.003 | 8.3 pp |
| [Torch Breath](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555328) | 0.080 | 0.062 | \-0.017 | 8.2 pp |
| [Angelic Observer](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555202) | 0.048 | 0.031 | \-0.016 | 7.9 pp |
| [Scuttling Butler](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555445) | 0.021 | 0.016 | \-0.005 | 7.4 pp |
| [High-Rise Sawjack](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555351) | 0.124 | 0.081 | \-0.042 | 7.1 pp |
| [Tainted Indulgence](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555428) | 0.059 | 0.063 | +0.004 | 7.1 pp |
| [Chrome Cat](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555437) | 0.039 | 0.039 | +0.000 | 7.0 pp |
| [Refuse to Yield](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555228) | 0.023 | 0.019 | \-0.003 | 6.6 pp |
| [Psionic Snoop](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555254) | 0.076 | 0.079 | +0.003 | 6.5 pp |

What’s my theory on why top players get more out of some of these cards?

- Talking about
	[Goldhound](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=590122)
	again! Ok instead of talking about when to play it, let’s talk about how to play it. It’s a sneakily difficult card to play. In particular, there are likely going to come a few critical turns when it may (or may not) be correct to sac it to ramp into a spell. Best players are making better decisions on these key turns.
- [Tavern Swindler](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=446130)
	is a big LOL for me (Carl), in that Garrett Gardner and I just released \[an entire podcast about this card\](https://mysticaldispute.com/episode/045-mystical-dispute-tavern-swindler-snc/). In it, we believe that players are likely just activating the ability too often, and probably are not just relying on it as a 2/2 body often enough.
- [Angelic Observer](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555202)
	needs a TON of support before the card is playable. My guess is most of this win rate differential is deck building.
- [Chrome Cat](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555437)
	? It’s a metal cat. Very dense. I don’t know. Scrying is hard?
- [Refuse to Yield](https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=555228)
	always has the obvious play of untapping your creature and blocking to kill something, but it can be tricky to set up at times, and the best players probably have a better sense of when it’s worth the risk of getting blown out by instant speed removal.

## Top players play decks when it’s right to play them

The best players learn what’s best quickly. The plots below show what fraction of games were played with a given deck color, with each plot showing data from a different group. Only a subset of decks are shown for ease of reading. As we can see, the best players were quickest to adapt to how good Brokers and Azorious are and how infrequently you should be in Riveteers in SNC.

[![](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/SNC-bottom-daily.png)](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/SNC-bottom-daily.png) [![](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/SNC-middle-daily.png)](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/SNC-middle-daily.png) [![](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/SNC-top-daily.png)](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/SNC-top-daily.png) *Fig. 1: Daily deck popularity in SNC by group*

Better players are also earlier to recognize new opportunities due to a shifting metagame. In NEO, for example, the top players found mono-red as an opportunity much earlier than other players.

[![](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/NEO-bottom-daily.png)](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/NEO-bottom-daily.png) [![](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/NEO-middle-daily.png)](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/NEO-middle-daily.png) [![](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/NEO-top-daily.png)](https://blog.17lands.com/assets/img/posts/2022-05-20-learning-from-the-best/NEO-top-daily.png) *Fig. 2: Deck popularity in NEO by group*

Overall, a lot of these point to one larger conclusion: many of the top players are likely more in-tune with much of the data you can find here on 17Lands. Not only do they use our tools to track their own data, but they also actively analyze which colors to play and which cards to draft based on the generally available data. Accessing our data gives them big insights early on that they can use to gain an advantage over the rest of their competition.

These are just a few of the interesting tidbits unlocked with this new data segmentation. We hope the community will find and share many more insights too!

---

Do you want to help contribute data for analyses like these in the future? Check out our [Getting Started](https://www.17lands.com/getting_started) page to install the lightweight Arena tracker and get access to all of our deck, draft, and gameplay tracking!