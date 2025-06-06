---
title: 在latex中使用minted进行代码高亮
date: 2022-03-25
tags: 
---

# 在 Latex 中使用minted进行代码高亮
[[LaTeX]] 代码高亮的环境。

看下面的示例就懂了：

    \begin{minted}{python}
    import numpy as np
        
    def incmatrix(genl1,genl2):
        m = len(genl1)
        n = len(genl2)
        M = None #to become the incidence matrix
        VT = np.zeros((n*m,1), int)  #dummy variable
        
        #compute the bitwise xor matrix
        M1 = bitxormatrix(genl1)
        M2 = np.triu(bitxormatrix(genl2),1) 
    
        for i in range(m-1):
            for j in range(i+1, m):
                [r,c] = np.where(M2 == M1[i,j])
                for k in range(len(r)):
                    VT[(i)*n + r[k]] = 1;
                    VT[(i)*n + c[k]] = 1;
                    VT[(j)*n + r[k]] = 1;
                    VT[(j)*n + c[k]] = 1;
                    
                    if M is None:
                        M = np.copy(VT)
                    else:
                        M = np.concatenate((M, VT), 1)
                    
                    VT = np.zeros((n*m,1), int)
        
        return M
    \end{minted}

~~注意把左花括号{用`\{`代替，否则解析有问题（主要是C系语言）~~不需要

如果不需要高亮，只是需要minted提供一个环境进行逐字的代码展示，只需指定为 `text` 语言。