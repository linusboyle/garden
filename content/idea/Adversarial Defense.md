---
title: Adversarial Defense
date: 2023-06-29
tags: 
aliases:
---

# Adversarial Defense

Many works have tried to defend againsst [[Adversarial Attack]], but follow-up works showed that all **failed**.

## Adversarial Training

The main successful defense is to incorporate [[adversarial example]]s during training. However, even on larger networks, defenses can negatively affect accuracy.

*Adversarial accuracy* refers to a metric on the test set where for each data point we check if the network classifies the point correctly and the network is robust in a region around that point. Usually [[Projected Gradient Descent (PGD)]] is used for this purpose.

*Problem of FGSM training* 使用FGSM对抗样本进行对抗训练得到的模型,在经过一定轮数的训练后, 在PGD上的准确率会突然降低,这是其他对抗训练过程中不会出现的问题。这说明,模型在训练的过程中过拟合于FGSM对抗攻击生成的样本。

**PGD defense in practice**

![[Pasted image 20230706100642.png]]

## Certified Defense

[[Certification of Neural Networks]]
