---
title: 编译 Infer
date: 2025-10-23
tags: 
aliases:
---

```
fatal error: error in backend: IO failure on output stream: Disk quota exceeded
````

编译LLVM时默认在tmpfs下进行，但是`/tmp`大小不够。传入环境变量CLANG_TMP_DIR进行替代即可。

---

LLVM 20.1.1 的编译问题

在编译运行时存在问题，具体是在`llvm-project/compiler-rt/lib/sanitizer_common/sanitizer_platform_limits_posix.cpp` 的489行少了一个`s`，应将改行改为：

```cpp
  unsigned struct_termio_sz = sizeof(struct termios);
```

然而Infer的默认预处理步骤会覆盖所有修改，故还需要将`build-infer.sh` 317行注释掉

上述问题在glibc 2.42下存在（因为termio结构体已废弃）