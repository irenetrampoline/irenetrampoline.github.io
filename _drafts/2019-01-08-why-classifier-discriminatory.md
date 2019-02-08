---
layout: post
title: Why is My Classifier Discriminatory?
comments: true
length: 6 min read
tagline: On sources of unfairness in supervised learning
categories:
- blog
---

When I first started my PhD, I was shocked by how easy it is to create a discriminatory model. Even accidentally. 

Over the past five years, researchers have become concerned with the ethics of artificial intelligence. Machine learning folks have focused on how to improve fairness with countless classes, workshops, and conferences aimed to define, measure, and mitigrate discrimination in our models. 


My first projects in graduate school was to predict hospital mortality from clinical notes from the intensive care unit [MIMIC-III](LINKHERE) dataset. Better predictions could help doctors treat patients more effectively.

Imagine my surprise when my simple L1-regularized lgoistic regression showed differences in accuracy by race -- with especially high errors for Asians. Having no ill intent and being of my Asian descent myself, I was flummoxed. Why? Why might a classifier -- and especially my classifier -- be discriminatory?

In [our research](https://arxiv.org/abs/1805.12002), we aim to answer that question. What are potential sources of unfairness and how can we solve them?

## Related work interlude



## Bias, variance, and noise

Pedro Domingos has unified bias, variance, and noise. We 

## Sources of unfairness

https://docs.google.com/document/d/19ZyvdUByx7uvKVK1T9BMwVjcOVMltFa9Cp-87wJPf2Y/edit




*This blog post is based on my NeurIPS talk about our recent [practical fairness paper](https://arxiv.org/abs/1805.12002).*