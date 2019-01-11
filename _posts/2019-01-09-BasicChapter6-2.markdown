---
title:  "Logistic Regression의 cost 함수 설명"
date:   2019-01-09 00:00:01
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Cost function
목표는 **global minimum**을 찾는 것<br/>
하나의 **local**에서 기울기가 변하지 않는 구간을 최솟값으로 **잘못 인지 가능**<br/>
기존의 **Linear Regression**의 Cost function 사용 불가<br/>

<br/>

### New cost function for logistic

\begin{align}
cost(W) = \frac{1}{m}\sum c(H(x),y) \\
\end{align}

$$
C(H(x),y) =
\begin{cases}
-log(H(x))     &{: y = 1} \\
-log(1 - H(x)) &{: y = 0}
\end{cases}
$$

<br/>

### log함수를 사용하는 이유
예시) `y`가 1일 경우<br>
\begin{align}
H(x) = 1 \to cost(1) = 0 \\
\end{align}

\begin{align}
H(x) = 0 \to cost(1) = \infty \\
\end{align}

예시) `y`가 0일 경우
\begin{align}
H(x) = 0 \to cost(0) = 0 \\
\end{align}

\begin{align}
H(x) = 1 \to cost(1) = \infty \\
\end{align}

위의 결과로 원하는 결과 값과 멀어질수록 **무한대**로 수렴<br/>
원하는 결과 값과 가까워질수록 **0**으로 수렴하도록 하기위해 **log함수** 사용

<br/>

### Cost function
\begin{align}
C(H(x), y) = -ylog(H(x)) - (1 - y)log(1 - H(x)) \\
\end{align}

<br/>

### Minimize cost - Gradient decent algorithm
\begin{align}
cost(W) = -\frac{1}{m}\sum ylog(H(x)) + (1 - y)log(1 - H(x)) \\
\end{align}

\begin{align}
W := W - \alpha \frac{\sigma}{\sigma W}cost(W) \\
\end{align}

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
