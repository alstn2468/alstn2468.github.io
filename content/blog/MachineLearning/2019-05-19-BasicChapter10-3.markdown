---
title: '딥넷트웍 학습 시키기 (backpropagation)'
date: 2019-05-19 00:00:03
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Neural Network (NN)

두개의 유닛의 **Weight**과 **Bias**를 학습시키는 방법<br/>
**Gradient descent**알고리즘을 사용<br/>
정의된 **Cost**함수의 그래프에서 하나의 점에서<br/>
값을 **미분해 기울기**를 구하며 그래프의 **최저점**까지 내려가면서 값을 구한다.

## Back propagation

예측값과 실제값을 비교해 **Cost**값을 뒤에서 부터 앞으로<br/>
이동하면서 **미분값**과 **어떤 값**을 **조정**해야하는지 계산하는 알고리즘

### Back Propagation 예제

$$
f = wx + b, g = wx, f = g + b
$$

위의 식을 그래프(**NN**) 형태의 그림으로 표현하면 아래와 같다.<br/>

<img src="/assets/2019-05-19/6.png" width="500" height="auto" alt="아직 안만듬"><br/>

위의 그림으로 $w$, $x$, $b$가 $f$에 미치는 영향을<br/>
구하기위해 미분값을 계산해 사용해야한다.

- forward ($$w = -2, x = 5, b = 3$$)
  - 실제 존재하는 학습값으로 계산
  - $$ w * x = g = -10 $$
  - $$ g + b = -7 $$

<img src="/assets/2019-05-19/7.png" width="500" height="auto" alt="아직 안만듬">

$$
g = wx \rightarrow \dfrac{\partial g}{\partial w} = x,
\dfrac{\partial g}{\partial x} = w
$$

$$
f = g + b \rightarrow \dfrac{\partial f}{\partial g} = 1,
\dfrac{\partial f}{\partial b} = 1
$$

$$g$$가 $$f$$에 미치는 영향은 $$ \dfrac{\partial f}{\partial g} $$로 **1**이다.<br/>
$$b$$가 $$f$$에 미치는 영향은 $$ \dfrac{\partial f}{\partial b} $$로 **1**이다.<br/>

$$
\dfrac{\partial f}{\partial x} =
\dfrac{\partial f}{\partial g} _
\dfrac{\partial g}{\partial x} =
1 _ w = -2
$$

$$
\dfrac{\partial f}{\partial w} =
\dfrac{\partial f}{\partial g} _
\dfrac{\partial g}{\partial x} =
1 _ x = 5
$$

$$w$$가 $$f$$에 미치는 영향은 $ \dfrac{\partial f}{\partial w} $로 **-2**다.<br/>
$$x$$가 $$f$$에 미치는 영향은 $ \dfrac{\partial f}{\partial x} $로 **5**다.

여기에서 **미분값의 의미**는 $b$의 값은 **1**인데 이것은 $b$의 영향이<br/>
**1:1**과 같다는 뜻이고 $w$d의 값은 **5**인데 이것은 $w$의 영향이<br/>
**5:1**과 같다는 뜻이다. $w$의 값이 **1만큼 변하면** $f$의 값 **5배 바뀐다**는 의미다.

<img src="/assets/2019-05-19/8.png" width="700" height="auto" alt="아직 안만듬">

여러개의 Layer가 겹쳐있어도 위와 같은 그림의 방법을 사용하면 된다.

### Sigmoid의 그래프 표현

$$
g(z) = \dfrac{1}{1+{e}^{-z}}
$$

위의 **Sigmoid Function**을 아래와 같은 그래프로 표현되어<br/>
**Backpropagation**을 계산할 수 있다.

<img src="/assets/2019-05-19/9.png" width="700" height="auto" alt="아직 안만듬">

### Tensorflow 코드로 구현

**TensorFlow**또한 모든 것을 **그래프**로 가지고 계산한다.

```python
hypothesis = tf.sigmoid(tf.matmul(L2, W2) + b2)
cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))
```
