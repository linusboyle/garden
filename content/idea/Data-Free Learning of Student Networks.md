---
title: Data-Free Learning of Student Networks
date: 2023-07-27
tags: 
aliases:
---

# 注释  
(2023/7/27 上午10:28:03)

“Although the above mentioned algorithms obtained promising results on most of benchmark datasets and deep models, they cannot be effectively launched without the original training dataset.” ([Chen 等, 2019, p. 3515](zotero://select/library/items/6FYXMK87)) ([pdf](zotero://open-pdf/library/items/7BQSPZ5W?page=2&annotation=5T5XYX54))

“GANs consist of a generator G and a discriminator D. G is expected to generate desired data while D is trained to identify the differences between real images and those produced by the generator.” ([Chen 等, 2019, p. 3516](zotero://select/library/items/6FYXMK87)) ([pdf](zotero://open-pdf/library/items/7BQSPZ5W?page=3&annotation=NXKVFDIA))

“we propose to regard this given deep neural network (e.g. ResNet-50 [7]) as a fixed discriminator. Therefore, G can be optimized directly without training D together, i.e. the parameters of original network D are fixed during training G.” ([Chen 等, 2019, p. 3516](zotero://select/library/items/6FYXMK87)) ([pdf](zotero://open-pdf/library/items/7BQSPZ5W?page=3&annotation=ACCAZ7XW))

“given the teacher deep neural network as the discriminator, the output is to classify images to different concept sets, instead of indicating the reality of images.” ([Chen 等, 2019, p. 3516](zotero://select/library/items/6FYXMK87)) ([pdf](zotero://open-pdf/library/items/7BQSPZ5W?page=3&annotation=LDYEGGBW))

“introduce the one-hot loss, which encourages the outputs of generated images by the teacher network to be close to one-hot like vectors.” ([Chen 等, 2019, p. 3517](zotero://select/library/items/6FYXMK87)) ([pdf](zotero://open-pdf/library/items/7BQSPZ5W?page=4&annotation=PR5B6ANL))

“Since filters in the teacher DNNs have been trained to extract intrinsic patterns in training data, feature maps tend to receive higher activation value if input images are real rather than some random vectors.” ([Chen 等, 2019, p. 3517](zotero://select/library/items/6FYXMK87)) ([pdf](zotero://open-pdf/library/items/7BQSPZ5W?page=4&annotation=LMS7G582))

“We employ the information entropy” ([Chen 等, 2019, p. 3517](zotero://select/library/items/6FYXMK87)) ([pdf](zotero://open-pdf/library/items/7BQSPZ5W?page=4&annotation=5GKGMKJQ))

“We use stochastic gradient descent (SGD) method to optimize the image generator G and the student network NS.” ([Chen 等, 2019, p. 3518](zotero://select/library/items/6FYXMK87)) ([pdf](zotero://open-pdf/library/items/7BQSPZ5W?page=5&annotation=4JXXKYN6))