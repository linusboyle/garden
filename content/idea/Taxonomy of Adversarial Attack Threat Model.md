---
title: Taxonomy of Adversarial Attack Threat Model
date: 2023-06-29
tags: 
aliases:
---

# Taxonomy of Adversarial Attack Threat Model

By **Adversarial Falsification**:
-  _False positive_ attacks generate a negative sample which is misclassified as a positive one (Type I Error). In an image classification task, a false positive can be an adversarial image unrecognizable to human, while DNNs predict it to a class with a high confidence score.
- _False negative_ attacks generate a positive sample which is misclassified as a negative one (Type II Error). Also called **ML evasion**. This error is shown in most adversarial images, where a human can recognize the image, but the neural networks cannot identify it.

By **Knowledge**:
- White-box
- Black-box
	- [[decision-based adversarial attack]]

> Most adversarial example attacks are _white-box attacks_. However, they can be transferred to attack _black-box_ services due to the transferability of adversarial examples proposed by Papernot _et al._

![[Pasted image 20230720123705.png]]

However, it was found adversarial examples are transferrable (cf. [[Transferability of Adversarial Examples]]), hence  given the same training data as the original network, an attacker can  train their own mirror network of the black box original network and  then attack the mirror network with white-box techniques. If attack  on mirror network succeeds, it will likely succeed on the original

---

By **Specificity**: (For binary classification, _targeted_ attacks are equivalent to _nontargeted_ attacks.)
 - Targeted attack: misguide DNNs to a specific class.
 - Non-targeted attack: do not assign a specific class to the neural network output. The adversarial class of output can be arbitrary except the original one.
 
By **Frequency**:

- _One-time attacks_ take only one time to optimize the adversarial examples.
- _Iterative attacks_ take multiple times to update the adversarial examples.
