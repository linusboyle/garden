---
title: Ultimate 配环境2025
date: 2025-06-20
tags:
---

总所周知，Ultimate的环境很难配。这主要是官方[构建指南](https://github.com/ultimate-pa/ultimate/wiki/Installation)缺失了一些步骤：

1. 在安装好Eclipse并导入配置后，先去Eclipse Marketplace安装Eclipse CDT
2. Refresh所有的Project，这个时候应该会开始下载一大堆包。如果没有开始下载，那应该是网络的原因。这一步需要挂VPN，最好是德国IP的，不过即使是这样，下载的速度也基本只有几十K/s，需要耐心等待。全局代理无效，因为Eclipse不会遵守全局代理，按照以前的经验，手动设置代理服务器协议&端口也不行，建议还是用VPN。
3. Clean所有Project然后Build，如果没有报错就配好了，否则，从Problem栏里找具体是什么问题。如果报错显示某一个Class找不到，那大概率是Eclipse解析出问题了。找到这个Class所在的Project，然后Refresh，然后重新Build。如此反复，直到所有报错都被处理。

另见 [[Ultimate 配环境2021]] 