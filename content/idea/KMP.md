---
title: KMP
date: 2025-08-29
tags:
  - dsa
---

# KMP 算法

KMP同样是用双指针i和j在模板串T和匹配串P上查找是否匹配。和蛮力算法相比，当匹配失败时，i不会回退，只是j回退到之前的某个位置，然后继续匹配。**注意**，在字母表较小的情况下，KMP 可能不如 BF 算法

对于P上的每一个位置，匹配失败时回退的目标位置都是确定的，因此可以先通过预处理算出每个位置的回退点。用数组next来表示这一信息，next\[j\]表示P在j处匹配失败时，j应该回退到的位置。

next的含义
-------

next\[j\]的实际意义如下：

设P在位置j匹配失败，则P\[0, j)是和T\[i-j,i)匹配的。此时如果能找到P在j前的一个位置t，满足P\[0, t)和P\[j-t, j)匹配，从而和T\[i-t,i)匹配，则将j移动到t，i和j前的子串也是匹配的。

为了保证匹配到最左的串，需要选择满足条件的t中最大的那个。这也就是next\[j\]。

$$ next[j] = max_t \{0 \le t \lt j \mid P[0, t) = P[j-t, j)\} $$

匹配算法
----

如果已知next，实际执行匹配的算法很简洁：

```cpp
    int match(char* P, char* T) {
        int n = (int)strlen(T), i = 0;
        int m = (int)strlen(P), j = 0;
    
        while (i < n && j < m) {
            if (j < 0 || P[j] == T[i]) {
                i++; j++; // i 永不回退
            } else {
                j = next[j];
            }
        }
    
        return i - j; // 如果有匹配，i-j就等于T中匹配开始的位置
                      // 如果没匹配，这个值是无效的，即>n-m
    }
```

构建next表
-------

假设next\[0\]是-1。减而治之，如果已知next\[0, j\], 要求next\[j+1\]，则检查P\[j\]和P\[next\[j\]\]是否相等。

*   因为next\[j+1\]的最大值就是next\[j\]+1，所以如果相等，那么next\[j+1\]就是next\[j\]+1
*   如果不相等，就继续比较P\[j\]和P\[next\[next\[j\]\]\]等等，直到相等或者到达-1

实际实现：

```cpp
    int* buildNext(char* P) {
        size_t m = strlen(P), j = 0; // j+1是要计算next的位置
        int* N = new int[m];
        int t = N[0] = -1; // t是当前迭代到的和P[j]比较的位置，
        
        while (j < m - 1) {
            if (t < 0 || P[j] = P[t]) {
                N[++j] = ++t;
            } else {
                t = N[t];
            }
        }
        
        return N;
    }
```

上述构建next 表的过程也可以不用于 KMP，在计算字符串前后缀相关性质时可能有用。