---
title: Transferability of Adversarial Examples
date: '2023-07-03'
tags:
- idea
aliases:
---

# Transferability of Adversarial Examples


Transferability is a common property for [[adversarial example]]s. Szegedy et al. first found that adversarial examples generated against a neural network can fool the same neural networks trained by different data sets. Papernot et al. found that adversarial examples generated against a neural network can fool other neural networks with different architectures, even other classifiers trained by different ML algorithms. Transferability is critical for black-box attacks where the victim DL model and the training data set are not accessible. Attackers can train a substitute neural network model and then generate adversarial examples against a substitute model. Then, the victim model will be vulnerable to these adversarial examples due to transferability.
