---
title: WebDAV API
date: 2025-02-04
tags: []
---

## 上传

通过Basic Authentication鉴权，PUT上传

```curl
curl -X PUT \
  -u username:password \  # 用户名和密码
  -T /path/to/local/file.txt \  # 本地文件路径
  http://example.com/webdav/path/to/remote/file.txt  # 远程服务器路径
```