---
title:  "Linear Regression의 Hypothesis 와 cost"
date:   2018-12-30 01:41:23
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### 예시) 시험 점수의 예측 : Regression

| x(hours) | y(score) |
| -------- | -------- |
| 10       | 90       |
| 9        | 80       |
| 3        | 50       |
| 2        | 30       |

다음과 같은 **트레이닝 데이터**를 가지고 학습<br/>
시간 값을 넣어 **0점 ~ 100점** 사이의 점수 예측

<br/>

### Regression (data)
- x : 예측을 하기위한 데이터, **feature**
- y : 예측을 해야하는 값

| x   | y   |
| --- | --- |
| 1   | 1   |
| 2   | 2   |
| 3   | 3   |

아래와 같은 그래프로 데이터를 표현 가능<br/>

<img src="/assets/2018-12-30-3_1/1.png" width="400" height="auto">

x축이 `x`의 값을 표현하고 y축이 `y`의 값을 표현<br/>
**Regression**모델을 학습할 때는 하나의 **가설**을 세운다.<br/>
데이터가 있을 경우 **데이터에 잘 맞는** Linear한 **선**을 찾는 것<br/>
위의 데이터는 `H(x) = Wx + b`와 같은 **일차방정식**으로 표현 가능<br/>
`w`와 `b`의 값에 따라 **선**이 결정된다.<br/>
여러가지 선 중에서 어떠한 선이 **가장 알맞은지** 결정해야한다.

<br/>

### 무엇이 더 좋은가?

<img src="/assets/2018-12-30-3_1/1.png" width="400" height="auto">

실제 데이터와 가설이 나타내는 **데이터의 차이**를<br/>
계산해 그 값이 **더 작은 것**이 좋은 가설이다.<br/>
이 것을 **Cost Function** 또는 **Loss**라고 한다.<br/>
`H(x) - y`는 음수가 나올 수 있어 좋지 않다.<br/>
일반적으로 차이를 **제곱**하여 사용한다.<br/>
`cost = 차이의 제곱의 합 / 데이터 갯수`로 일반화 가능<br/>
목표는 `cost`를 **최소화**하는 것 이다.
