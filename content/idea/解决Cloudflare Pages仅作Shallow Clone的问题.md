---
title: 解决Cloudflare Pages仅作Shallow Clone的问题
date: 2025-05-28
tags: 
- hack
---

在 Build Command 前加上 `git fetch --unshallow &&`

Credits：[Git Last Modified front matter attribute not respected with 11ty](https://community.cloudflare.com/t/git-last-modified-front-matter-attribute-not-respected-with-11ty/408853)