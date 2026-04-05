---
title: Set up Obsidian URI handling on Linux
date: 2026-04-01
source: https://amirrachum.com/obsidian-uri-linux/
authors:
  - "[[Amir Rachum]]"
description: A practical tutorial on setting up Obsidian URI handling on Linux
tags:
  - clipped
aliases:
---
[Obsidian](https://obsidian.md/) has a cool API where you can construct [Obsidian URIs](https://help.obsidian.md/Advanced+topics/Using+obsidian+URI) to issue various commands. The way it works is that you have a URI like this:

```text
obsidian://open?vault=my%20vault&file=my%20note
```

When opened with Obsidian, this opens a note called “my note” in a vault called “my vault” (if it exists). This works if you enter the above URL into any web browser.

Each operating system has a different way to support such URIs. In Linux, this mechanism is called [XDG](https://www.freedesktop.org/wiki/Software/xdg-utils/).

Note: you *must* have a desktop / GUI environment for this to work - no headless servers.

There are two options on how to set up Obsidian UI handling on Linux: you can set it up for a particular user (especially useful if you’re using a Linux machine that’s managed by someone else, for example at work) or for everyone. Choosing the second option requires root access.

> **Note**: The single-user guide currently doesn’t work for Chrome for some reason. Waiting for answers on my Unix & Linux Stack Exchange question: [Custom URI handling: xdg-open and Firefox work, but Chrome doesn’t](https://unix.stackexchange.com/questions/669681/custom-uri-handling-xdg-open-and-firefox-work-but-chrome-doesnt)  
> If anyone has any leads into how to solve this, I’d appreciate it if you could share your findings in the comment section below.

### Setting Up URI Handling for a Single User

**1.** Install dependencies if needed:

```text
$ sudo apt install xdg-utils desktop-file-utils
```

**2.** Download the latest Obsidian \[\[AppImage\]\] file from the [Obsidian homepage](https://obsidian.md/) and put it somewhere where you can reference later1. We’ll use `~/obsidian/`, but this can be anywhere you’d like:

```text
$ mkdir -p ~/obsidian
$ wget https://github.com/obsidianmd/obsidian-releases/releases/download/v0.12.15/Obsidian-0.12.15.AppImage -O ~/obsidian/Obsidian.AppImage
```

**3.** Optional: download an image file to serve as an icon (thanks Craig from the Obsidian Discourse!):

```text
wget https://forum.obsidian.md/uploads/default/optimized/2X/6/6df43bc4ee96f0a1b67ff3600caf6879b758a743_2_500x500.png -O ~/obsidian/icon.png
```

**4.** Give the `AppImage` execute permission:

```text
$ chmod +x ~/obsidian/Obsidian.AppImage
```

**5.** Run the `AppImage` file:

```text
$ ~/obsidian/Obsidian.AppImage
```

The Obsidian GUI should open up. Make sure you either already have a vault or create a new one. I’m assuming below that the vault name is `notes`, change to whatever vault name you used accordingly. You can close Obsidian now.

**6.** Let’s make sure that nothing is currently trying to open `obsidian://` URIs:

```text
$ xdg-open "obsidian://new?vault=notes&name=note&content=content"
gio: obsidian://new?vault=notes&name=note&content=content: The specified location is not supported
```

Cool. That’s how we’ll check that everything works when we’re done (the quotes are there so the shell doesn’t parse the `&` character).

**7.** Now we’ll create a `.desktop` file for our `AppImage` file. We’ll put it under `~/.local/share/applications/`. First, make sure the directory exists:

```text
$ mkdir -p ~/.local/share/applications/
```

**8.** Now let’s write our file. Create a new file called `obsidian.desktop` in the above directory with the following content:

```ini
[Desktop Entry]
Name=Obsidian
Exec=/home/rachum/obsidian/Obsidian.AppImage %u
Terminal=false
Type=Application
Icon=/home/rachum/obsidian/icon.png
StartupWMClass=obsidian
X-AppImage-Version=0.8.15
Comment=Obsidian
Categories=Office;
MimeType=text/html;x-scheme-handler/obsidian;
```

Some notes on the `.desktop` file:

- Don’t omit the `%u` in the `Exec` line! It makes sure the URI is passed to the `AppImage` file when invoking it.
- Use full paths without the tilde (`~`) sign. My username is `rachum` so I used `/home/rachum`. Use your username instead.
- If you haven’t downloaded the Obsidian icon, remove the `Icon=` line from the file - it will make the desktop file invalid.
- The `MimeType=` line is where most of the magic happens. It registers Obsidian to handle `obsidian://` URIs.
- There should be no trailing whitespaces on any line. In particular, trailing whitespaces in the `Icon=` line results in the icon not being displayed.

**9.** Run the following2 to read our newly created `obsidian.desktop` file (if things break for some reason and you’re trying to debug this process, you can add the `-v` flag to have more detailed output):

```text
update-desktop-database ~/.local/share/applications/
```

**10.** Make sure everything works by running `xdg-open` again:

```text
$ xdg-open "obsidian://new?vault=notes&name=note&content=content"
```

This should open the Obsidian UI focused on the newly-created note:

[![](https://amirrachum.com/images/posts/obsidian-uri/new-note.jpg)](https://amirrachum.com/images/posts/obsidian-uri/new-note.jpg)

### Setting Up URI Handling for All Users

The above instructions are for setting up Obsidian URI handling for your own user. If you want to set it up for all users, make the following changes:

- Run everything with a user that has administrative (sudo / root) privileges
- Put the `AppImage` file in a non-user directory (e.g., `/opt/obsidian/`)
- Create the `obsidian.desktop` file in `/usr/local/share/applications/`
- Run `update-desktop-database` with `sudo`

### References

- [Obsidian URI set up for Linux / obsidian.desktop (Obsidian Discourse)](https://forum.obsidian.md/t/obsidian-uri-set-up-for-linux-obsidian-desktop/7494)
- [Desktop entries](https://wiki.archlinux.org/title/desktop_entries)
- [Create a custom URL Protocol Handler (Unix & Linux Stack Exchange)](https://unix.stackexchange.com/questions/497146/create-a-custom-url-protocol-handler)
- [Desktop Entry Specification: The `Exec` key](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html#exec-variables)
- [(GitHub) clearlinux/distribution: `update-desktop-database` not working as expected #670](https://github.com/clearlinux/distribution/issues/670)
- [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)
- [Custom protocol handlers Linux, Centos 7 for chrome](https://stackoverflow.com/questions/32064229/custom-protocol-handlers-linux-centos-7-for-chrome)
**Discuss** this post at the comment section below.  
**Follow** me on [Twitter](https://twitter.com/AmirRachum) and [Facebook](https://www.facebook.com/amir.rachum.blog)

#### Similar Posts

[^1]: Obsidian AppImage binaries check for updates on each run, so it’s generally safe to omit the version from the file name.

[^2]: The [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) claims that “ `$XDG_DATA_HOME` defines the base directory relative to which user-specific data files should be stored. If `$XDG_DATA_HOME` is either not set or empty, a default equal to `$HOME/.local/share` should be used.” However, I found through experimentation that this isn’t the case. Because of this, we’ll manually specify the directory when calling `update-desktop-database`