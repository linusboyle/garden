---
title: XSS vulnerable js programs
date: 2021-01-17
tags: 
aliases:
---

```javascript
// XSS vulnerable
function instantiate() {
    var template = "<h1> User <span onMouseOver=\"popupText('{{bio}}')\">{{userName}}</span> </h1>"
    var result = template.replace("{{bio}}", info.bio);
    result = template.replace("{{userName}}", info.username);
    return result;
}