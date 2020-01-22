---
title: 'Logistic Regression의 cost 함수 설명'
date: 2019-01-09 00:00:01
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Cost function

목표는 **global minimum**을 찾는 것<br/>
하나의 **local**에서 기울기가 변하지 않는 구간을 최솟값으로 **잘못 인지 가능**<br/>
기존의 **Linear Regression**의 Cost function 사용 불가<br/>

## New cost function for logistic

$$
cost(W) = \dfrac{1}{m}\sum c(H(x),y)
$$

$$
C(H(x),y) =
\begin{cases}
-log(H(x))     &{: y = 1} \\
-log(1 - H(x)) &{: y = 0}
\end{cases}
$$

## log함수를 사용하는 이유

예시) `y`가 1일 경우<br>

$$
H(x) = 1 \to cost(1) = 0
$$

$$
H(x) = 0 \to cost(1) = \infty
$$

예시) `y`가 0일 경우

$$
H(x) = 0 \to cost(0) = 0
$$

$$
H(x) = 1 \to cost(1) = \infty
$$

위의 결과로 원하는 결과 값과 멀어질수록 **무한대**로 수렴<br/>
원하는 결과 값과 가까워질수록 **0**으로 수렴하도록 하기위해 **log함수** 사용

## Cost function

$$
C(H(x), y) = -ylog(H(x)) - (1 - y)log(1 - H(x))
$$

## Minimize cost - Gradient decent algorithm

$$
cost(W) = -\dfrac{1}{m}\sum ylog(H(x)) + (1 - y)log(1 - H(x))
$$

$$
W := W - \alpha \dfrac{\sigma}{\sigma W}cost(W)
$$

파이썬 코드 예시

```python
# cost function
cost = tf.reduce_mean(
    -tf.reduce_sum(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))
)

# Minimize
a = tf.Variable(0.1) # Learning rate, alpha
optimizer = tf.train.GradientDescentOptimizer(a)
train = optimizer.minimize(cost)
```
