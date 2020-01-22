---
title: 'Linear Regression의 cost 최소화 알고리즘의 원리'
date: 2019-01-02 01:41:23
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Hypothesis and Cost

$$
H(x) = Wx + b
$$

$$
cost(W,b) = \dfrac{1}{m}\sum\_{i=1}^m(H(x^{(i)}) - y^{(i)})^2
$$

## Simplified hypothesis

$$
H(x) = Wx
$$

$$
cost(W) = \dfrac{1}{m}\sum\_{i=1}^m(Wx^{(i)} - y^{(i)})^2
$$

## What cost(W) looks like?

| X   | Y   |
| --- | --- |
| 1   | 1   |
| 2   | 2   |
| 3   | 3   |

W = 1, cost(W) = ?<br/>

$$
Cost(W) = (1 _ 1 - 1)^2 + (1 _ 2 - 2)^2 + (1 * 3 - 3) = 0
$$

W = 0, cost(W) = 4.67

$$
Cost(W) = \dfrac{1}{3}((0 _ 1 - 1)^2 + (0 _ 2 - 2)^2 + (0 * 3 - 3)^2) = 4.67
$$

W = 2, cost(W) = 4.67

$$
Cost(W) = \dfrac{1}{3}((2 _ 1 - 1)^2 + (2 _ 2 - 2)^2 + (2 * 3 - 3)^2) = 4.67
$$

**`W`값의 변화에 따라 달라지는 `cost(W)`의 값 그래프**

<img src="/assets/2019-01-02-4_1/1.png" width="400" height="auto">

우리의 목표 : `cost(W)`가 **최소화** 되는 점을 찾는 것

## Gradient descent algorithm

- **경사하강법**
- `cost(W)`의 **최솟값**을 찾는데 사용
- 아무 지점에서나 시작 가능
- `W`의 값을 조금씩 줄이며 `cost(W)`의 값을 계산
- 반복적인 작업
- 경사도를 구하는 법 : **미분**

## Formal definition

$$
cost(W,b) = \dfrac{1}{2m}\sum\_{i=1}^m(H(x^{(i)}) - y^{(i)})^2
$$

$$
W := W - a\dfrac{a}{aW}cost(W) \\
$$

## 미분 과정

1.

$$
W := W - a\dfrac{a}{aW}\dfrac{1}{2m}\sum\_{i=1}^m(Wx^{(i)} - y^{(i)})^2
$$

2.

$$
W := W - a\dfrac{1}{2m}\sum\_{i=1}^m2(Wx^{(i)} - y^{(i)})x^{(i)}
$$

3.

$$
W := W - a\dfrac{1}{m}\sum\_{i=1}^m(Wx^{(i)} - y^{(i)})x^{(i)}
$$

## Convex function

- **경사하강법**을 사용할 때 그래프가 아래와 같은 모양인지 **확인 필수**

<img src="/assets/2019-01-02-4_1/2.png" width="400" height="auto">
