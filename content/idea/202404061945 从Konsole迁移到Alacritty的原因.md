---
date: 2024-04-06
tags:
  - idea
  - vim
  - tty
  - linux
see also: []
---

opensuse分发的 [[Vim]] 自带的vimrc里，定义了很多ESC开头的按键映射。根据我的理解，这应该是为一些xterm特性准备的。

很不幸，Konsole的term环境变量是xterm-256colors，所以换到了Alacritty。这样至少解决了vim里模式切换的延迟，而且其速度确实更快。

---

created on [[2024-04-06]]

返回[[索引]]