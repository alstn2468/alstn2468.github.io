---
title: 'XSigmoid 보다 ReLU가 더 좋아'
date: 2019-05-23 00:00:03
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## 활성화 함수

각 Unit 끝의 함수를 **Activation function**이라고 한다.<br/>
**활성화 함수**는 출력값이 어떤 값보다 크면 작동하고<br/>
어떤 값보다 작으면 작동하지 않는 함수를 의미한다.

## Neural Network for XOR

입력값은 공통적으로 $$X_1$$, $$X_2$$ 2개이므로<br/>
첫번째 Layer의 크기는 `[2, n]`이 되어야하고 출력값은<br/>
$$\bar{Y}$$ 하나이므로 마지막 Layer의 크기는 `[m, 1]`이 되어야한다.

2개의 Layer를 갖는 NN의 기본적인 구성<br/>
2개의 **Weight**, **Bias**, **Sigmoid Function**으로 구성

```python
W1 = tf.Variable(tf.random_uniform([2, 2], -1.0, 1.0))
W2 = tf.Variable(tf.random_uniform([2, 1], -1.0, 1.0))

b1 = tf.Variable(tf.zeros([2]), name="Bias1")
b2 = tf.Variable(tf.zeros([1]), name="Bias2")

L2 = tf.sigmoid(tf.matmul(X, W1) + b)
hypothesis = tf.sigmoid(tf.matmul(L2, W2) + b2)
```

3개의 Layer를 갖는 NN의 기본적인 구성<br/>
3개의 **Weight**, **Bias**, **Sigmoid Function**으로 구성

```python
W1 = tf.Variable(tf.random_uniform([2, 5], -1.0, 1.0))
W2 = tf.Variable(tf.random_uniform([5, 4], -1.0, 1.0))
W3 = tf.Variable(tf.random_uniform([4, 1], -1.0, 1.0))

b1 = tf.Variable(tf.zeros([5]), name="Bias1")
b2 = tf.Variable(tf.zeros([4]), name="Bias2")
b3 = tf.Variable(tf.zeros([1]), name="Bias3")

L2 = tf.sigmoid(tf.matmul(X, W1) + b1)
L3 = tf.sigmoid(tf.matmul(L2, W2) + b2)
hypothesis = tf.sigmoid(tf.matmul(L3, W3) + b3)
```

안쪽에 보이지 않은 Layer를 **Hidden Layer**라고 한다.

### 9개의 Hidden Layer

**Input Layer** : `W1`<br/>
**Hidden Layer** : `W2` ~ `W10`<br/>
**Output Layer** : `W11`

```python
W1 = tf.Variable(tf.random_uniform([2, 5], -1.0, 1.0) name="Weight1")

W2 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight2")
W3 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight3")
W4 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight4")
W5 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight5")
W6 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight6")
W7 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight7")
W8 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight8")
W9 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight9")
W10 = tf.Variable(tf.random_uniform([5, 5], -1.0, 1.0) name="Weight10")

W11 = tf.Variable(tf.random_uniform([5, 1], -1.0, 1.0) name="Weight11")

b1 = tf.Variable(tf.zeross([5]), name="Bias1")
b2 = tf.Variable(tf.zeross([5]), name="Bias2")
b3 = tf.Variable(tf.zeross([5]), name="Bias3")
b4 = tf.Variable(tf.zeross([5]), name="Bias4")
b5 = tf.Variable(tf.zeross([5]), name="Bias5")
b6 = tf.Variable(tf.zeross([5]), name="Bias6")
b7 = tf.Variable(tf.zeross([5]), name="Bias7")
b8 = tf.Variable(tf.zeross([5]), name="Bias8")
b9 = tf.Variable(tf.zeross([5]), name="Bias9")
b10 = tf.Variable(tf.zeross([5]), name="Bias10")

b11 = tf.Variable(tf.zeross([1]), name="Bias11")

L1 = tf.sigmoid(tf.matmul(X, W1) + b1)
L2 = tf.sigmoid(tf.matmul(L1, W1) + b2)
L3 = tf.sigmoid(tf.matmul(L2, W1) + b3)
L4 = tf.sigmoid(tf.matmul(L3, W1) + b4)
L5 = tf.sigmoid(tf.matmul(L4, W1) + b5)
L6 = tf.sigmoid(tf.matmul(L5, W1) + b6)
L7 = tf.sigmoid(tf.matmul(L6, W1) + b7)
L8 = tf.sigmoid(tf.matmul(L7, W1) + b8)
L9 = tf.sigmoid(tf.matmul(L8, W1) + b9)
L10 = tf.sigmoid(tf.matmul(L9, W1) + b10)

hypothesis = tf.sigmoid(tf.matmul(L10, W1) + b11)
```

위와 예시는 11개의 Layer를 연결하였는데 위의 코드로<br/>
XOR 문제를 학습시키고 예측을해도 좋은 결과를 얻기 힘들다.<br/>
**Backpropagation의 단점**으로 많은 Layer를 사용하면<br/>
학습결과가 좋지 않아 예측이 잘 되지않는다.<br/>

왜냐하면 **Sigmoid**를 통과하는 위의 Layer 특성상<br/>
**Chain Rule**을 적용하게 되면 1보다 작은 값이 계속 곱해져<br/>
NN의 맨 뒤에까지 가게 되면 **0과 매우 가까운 값**이 되는데<br/>
이것은 Layer의 값들이 서로 **미치는 영향**이 거의 **없다**는 뜻이다.

이것을 **Vanishing Gradient**라고 한다.<br/>
Layer의 깊이가 깊어질수록 최종 Layer근처의 경사는 나타나지만<br/>
뒤쪽 Layer근처의 경사는 사라지게 되는 문제다.<br/>

## Vanishing Gradient의 해결

**Sigmoid Function**이 **Vanishing Gradient**문제가 발생<br/>
**ReLU**라는 **Activation Function** 사용으로 문제를 해결<br/>
**0보다 작을 경우 비활성화** 하고 **0보다 클 경우 값을 크게** 한다.<br/>

아래의 그래프와 같이 동작한다.<br/>
<img src="./images/2019-05-23/1.png" width="500" height="auto" alt="아직 안만듬">

**ReLU** (**Re**ctified **L**inear **U**nit)<br/>
`tf.sigmoid`을 `tf.nn.relu`를 사용하면 된다.

```python
L1 = tf.nn.relu(tf.matmul(X, W1) + b1)
```

이전의 11단의 Layer로 XOR문제를 해결하려던 코드를<br/>
`L1` ~ `L10`은 **ReLu**를 사용하고 마지막 레이어인<br/>
`L11`만 **Sigmoid**를 사용해서 값을 학습시키면 잘 예측된다.<br/>

`L11`만 **Sigmoid**를 사용하는 이유는<br/>
**마지막 단**의 출력은 **0 ~ 1의 출력**을 얻어야하기 때문이다.

## 활성화 함수의 종류

- Sigmoid
- tanh
- ReLU
- Leaky ReLU
- Maxout
- ELU
- etc
