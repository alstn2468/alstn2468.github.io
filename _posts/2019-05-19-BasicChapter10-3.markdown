---
title:  "딥넷트웍 학습 시키기 (backpropagation)"
date:   2019-05-19 00:00:03
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

###  Neural Network (NN)
두개의 유닛의 **Weight**과 **Bias**를 학습시키는 방법<br/>
**Gradient descent**알고리즘을 사용<br/>
정의된 **Cost**함수의 그래프에서 하나의 점에서<br/>
값을 **미분해 기울기**를 구하며 그래프의 **최저점**까지 내려가면서 값을 구한다.

<br/>

### Back propagation
예측값과 실제값을 비교해 **Cost**값을 뒤에서 부터<br/>
앞으로 이동하면서 **미분값**과 **어떤 값**을 **조정**해야하는지 계산하는 알고리즘

#### Back Propagation (Chain rule)
\begin{align} f = wx + b, g = wx, f = g + b \end{align}
위의 식을 그림으로 표현하면 아래와 같다.<br/>

<img src="/assets/2019-05-19/6.png" width="500" height="auto" alt="아직 안만듬">
<br/>

- forward ($$w = -2, x = 5, b = 3$$)

<img src="/assets/2019-05-19/7.png" width="500" height="auto" alt="아직 안만듬">

$$
g = wx \rightarrow \frac{\partial g}{\partial w} = x,
\frac{\partial g}{\partial x} = w
$$

$$
f = g + b \rightarrow \frac{\partial f}{\partial g} = 1,
\frac{\partial f}{\partial b} = 1
$$

\begin{align}
    \frac{\partial f}{\partial x} =
    \frac{\partial f}{\partial g} *
    \frac{\partial g}{\partial x} =
    1 * w = -2
\end{align}

\begin{align}
    \frac{\partial f}{\partial w} =
    \frac{\partial f}{\partial g} *
    \frac{\partial g}{\partial x} =
    1 * x = 5
\end{align}

#### Tensorflow 코드로 구현
```python
hypothesis = tf.sigmoid(tf.matmul(L2, W2) + b2)
cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))
```

- backward
