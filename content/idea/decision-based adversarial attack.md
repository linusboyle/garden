---
title: decision-based adversarial attack
date: 2023-07-20
tags: 
aliases:
---

# decision-based adversarial attack

![[Pasted image 20230720123705.png]]

A decision-based threat model assumes access to the predicted label alone.

## Transfer-based attack

A widely studied type of the decision-based attack is transfer-based attack. (adversarial examples generated on an ensemble of deep neural networks from a white-box attack can be transferred to an unseen neural network.) -> [[Transferability of Adversarial Examples]]

>(1) Papernot, N.; McDaniel, P.; Goodfellow, I.; Jha, S.; Celik, Z. B.; Swami, A. Practical Black-Box Attacks against Machine Learning. arXiv March 19, 2017. https://doi.org/10.48550/arXiv.1602.02697.  

如何提高迁移性?
- 采用迁移性更强的对抗攻击算法
- 采用更为相似的替代模型: [[model extraction]]、迁移学习

### 梯度优化攻击

#### Momentum Iterative Fast Gradient Sign Method (MI-FGSM)

![[Pasted image 20230720125358.png]]

>  Yinpeng Dong, Fangzhou Liao, Tianyu Pang, Hang Su, Jun Zhu, Xiaolin Hu, Jianguo Li. Boosting Adversarial Attacks with
Momentum. CVPR 2018.

#### Nesterov Iterative Fast Gradient Sign Method (NI-FGSM)

![[Pasted image 20230720125559.png]]

> Jiadong Lin, Chuanbiao Song, Kun He*, Liwei Wang, John Hopcroft. Nesterov Accelerated Gradient and Scale Invariance for
Adversarial Attacks, ICLR 2020.

MI-FGSM and NI-FGSM are similar

![[Pasted image 20230720125718.png]]

#### Variance tuning Method (VMI-FGSM)

![[Pasted image 20230720125920.png]]

>  Enhancing the transferability of adversarial attacks through variance tuning. In IEEE Conference on Computer Vision and Pattern
Recognition, CVPR, pages 1924–1933. Computer Vision Foundation / IEEE, 2021

### Cons

However, transfer-based attack often requires a carefully-designed substitute model, or even access to part of the training data. Moreover, they can be defended against via training on a data set augmented by adversarial examples from multiple static pre-trained models.
