---
date: 2024-12-09
tags:
  - idea
see also:
  - "[[索引]]"
  - "[[2024-12-09]]"
---


1. 下载[[博德之门1]] 增强版 & 2 增强版（通过Steam或GOG，当前版本为2.6.6.0）游戏。运行一次，保证能成功打开
	1. 这里注意gog版的博德之门可能需要比较老的共享链接库，可以从Steam的库文件中复制到游戏目录，然后修改start.sh: `LD_LIBRARY_PATH=$(pwd):$LD_LIBRARY_PATH`
2. 下载[WeiDU](https://github.com/WeiDUorg/weidu/releases) Linux版，将二进制文件放入PATH
3. 参考 [Infinity Engine mods on Linux](https://moebiusproject.gitlab.io/mods_on_linux)，将游戏目录挂载在大小写不敏感文件夹（比如 ext4）
4. 安装 [Argent77/A7-DlcMerger](https://github.com/Argent77/A7-DlcMerger/releases)，将 BG1 的 DLC 龙矛堡围攻并入游戏本体
5. 之后参考 [EET Mods Install Order Guide](https://docs.google.com/spreadsheets/d/1tt4f-rKqkbk8ds694eJ1YcOjraZ2pISkkobqZ5yRcvI/edit?gid=676921267#gid=676921267) 进行 Mod 的安装
	1. 首先安装需要在 EET 之前安装在 BG1 上的Mod
	2. 安装 EET
	3. 安装其余Mod