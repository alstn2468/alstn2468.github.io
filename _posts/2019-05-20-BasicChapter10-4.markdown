---
title:  "Lab 9-1 : XOR을 위한 텐스플로우 딥넷트웍"
date:   2019-05-20 00:00:03
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

```python
import tensorflow as tf
import numpy as np
```

### XOR data set

| A | B | X |
| - | - | - |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

#### Boolean Expression
$$
X = A \oplus B
$$

#### Logic Diagram Symbol

<img src="./10.png" width="400" height="auto" alt="아직 안만듬">

[[이미지 출처]](https://mathphysics.tistory.com/579)

간단한 데이터셋이므로 따로 입력받지않고 **numpy array** 사용


```python
x_data = np.array(
    [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
    ],
    dtype=np.float32
)
y_data = np.array(
    [
        [0],
        [1],
        [1],
        [0],
    ],
    dtype=np.float32
)
```

<br/>

### Logistic Regression으로 해결하기
**0**인지 **1**인지 예측하는 **Logistic Regression**사용<br/>
$$X$$, $$Y$$에 맞게 **Weight**과 **Bias**를 결정해야한다.<br/>
**Weigth**을 정할때에는 **크기**가 **중요**하다.<br/>
입력값이 $$X_1$$, $$X_2$$로 2개고 출력값이 $$Y$$하나이기 때문에<br/>
**Weight**의 크기는 **[2, 1]**의 크기다.<br/>
**Bias**는 항상 **출력값의 갯수**와 같으므로 **[1]**이다.


```python
X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)
W = tf.Variable(tf.random_normal([2, 1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name="bias")
```

<br/>

### Hypothesis
**Sigmoid** 함수 사용<br/>
\begin{align} Sigmoid = \frac{1}{1+e^{-x}} \end{align}

**행렬 곱셉** 후 **Sigmoid Function**에 넣는다.


```python
hypothesis = tf.sigmoid(tf.matmul(X, W) + b)
```

<br/>

### Cost Function
**Logistic Regression**의 **Cost Function**은 아래와 같다.<br/>
$$
C(H(x), y) =
-Y * log(H(x)
-(1 - Y) * log(1 - H(X))
$$

구해진 Cost를 가지고 **경사하강법**을 사용해 학습을 진행한다.


```python
cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))
train = tf.train.GradientDescentOptimizer(learning_rate=0.01).minimize(cost)
```

<br/>

### Training
위에 작성한 **Hypothesis**와 **Cost Function**을 사용해 학습을 진행<br/>
`cast`함수를 사용해 **Hypothesis**의 값이 **0.5**보다 클경우 **True**로<br/>
**0.5**보다 작을경우 **False**로 값을 바꾸어준다.<br/>
또한 예측값과 결과값을 비교해 `cast`함수를 사용한 **결과의 평균**을 구해 **정확도**를 계산한다.


```python
predicted = tf.cast(hypothesis > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype=tf.float32))

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())

    for step in range(10001):
        _, cost_val, w_val = sess.run(
            [train, cost, W], feed_dict={X: x_data, Y: y_data}
        )

        if step % 1000 == 0:
            print(step, cost_val, w_val)

    h, p, a = sess.run(
        [hypothesis, predicted, accuracy], feed_dict={X: x_data, Y: y_data}
    )

    print(f"\nHypothesis:\n{h} \nPredicted:\n{p} \nAccuracy:\n{a}")
```

    0 0.88025 [[-1.083335 ]
     [ 2.2019713]]
    1000 0.7614425 [[-0.50063527]
     [ 1.3991983 ]]
    2000 0.71648085 [[-0.21180181]
     [ 0.83265454]]
    3000 0.7010773 [[-0.07087812]
     [ 0.49279353]]
    4000 0.6959399 [[-0.0084115]
     [ 0.2940039]]
    5000 0.69418055 [[0.015548 ]
     [0.1775102]]
    6000 0.6935492 [[0.02187311]
     [0.1085681 ]]
    7000 0.69331074 [[0.0208589 ]
     [0.06725767]]
    8000 0.6932161 [[0.01734459]
     [0.04217583]]
    9000 0.693177 [[0.0134572 ]
     [0.02674591]]
    10000 0.6931603 [[0.01002164]
     [0.01713319]]

    Hypothesis:
    [[0.4959739 ]
     [0.5002571 ]
     [0.49847925]
     [0.5027625 ]]
    Predicted:
    [[0.]
     [1.]
     [0.]
     [1.]]
    Accuracy:
    0.5


모델이 정확하고 문제가 없음에도 불구하고 정확도가 높지않다.<br/>
정확도를 올리기 위해서 **Neural Network**를 사용하면 된다.

<br/>

### Using Neural Network
여러개의 Layer를 사용하는 **NN**을 사용<br/>
layer1의 결과물을 hypothesis에 넣어 한번더 학습시킨다.


```python
W1 = tf.Variable(tf.random_normal([2, 2]), name='weight1')
b1 = tf.Variable(tf.random_normal([2]), name='bias1')
layer1 = tf.sigmoid(tf.matmul(X, W1) + b1)

W2 = tf.Variable(tf.random_normal([2, 1]), name='weight2')
b2 = tf.Variable(tf.random_normal([1]), name='bias2')
hypothesis = tf.sigmoid(tf.matmul(layer1, W2) + b2)
```

이때 **weight의 크기**를 잘 정해주어야 한다.<br/>

layer1의 입력값은 $$X_1$$, $$X_2$$로 **2개**이고 출력값의 갯수는<br/>
임의로 결정하면 되므로 $$W_1$$의 크기는 **[2, 2]**로 정했다.<br/>
출력값의 갯수를 2개로 결정했으니 **bias**의 크기는 **[2]**가 된다.<br/>

layer1을 입력으로 받는 다른 layer의 입력값의 개수는<br/>
**layer1의 입력값**인 **2개**로 같고 출력값은<br/>
$$ \bar{Y} $$이므로 **1개**이기 때문에 **weight**의 크기는 **[2. 1]**이다.<br/>
**bias**의 크기는 출력값이 **1개**이기 때문에 **[1]**이다.<br/>

따라서 결정된 Layer들의 **Weigth**과 **Bias**의 크기는 아래와 같다.<br/>

|        | Weight | Bias |
| ------ | ------ | ---- |
| Layer1 | [2, 2] | [2]  |
| Layer2 | [2, 1] | [1]  |



<br/>

### Training
2개의 Layer를 겹친 **Neural Network**를 이용해 한번 더 학습


```python
cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))
train = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

predicted = tf.cast(hypothesis > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype=tf.float32))

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())

    for step in range(10001):
        _, cost_val = sess.run(
            [train, cost], feed_dict={X: x_data, Y: y_data}
        )

        if step % 1000 == 0:
            print(step, cost_val)

    # Accuracy report
    h, p, a = sess.run(
        [hypothesis, predicted, accuracy], feed_dict={X: x_data, Y: y_data}
    )

    print(f"\nHypothesis:\n{h} \nPredicted:\n{p} \nAccuracy:\n{a}")
```

    0 0.7279828
    1000 0.6738095
    2000 0.5043707
    3000 0.18984827
    4000 0.081655145
    5000 0.048282392
    6000 0.0335411
    7000 0.025466135
    8000 0.020430896
    9000 0.017012684
    10000 0.014549621

    Hypothesis:
    [[0.01193648]
     [0.9842308 ]
     [0.9842269 ]
     [0.01428502]]
    Predicted:
    [[0.]
     [1.]
     [1.]
     [0.]]
    Accuracy:
    1.0


같은 **Hypothesis**와 **Cost Function**을 사용하였으나,<br/>
2개의 Layer를 사용한 것만으로 **모든 값을 예측**하는데 성공하였다.

<br/>

### 전체적인 코드


```python
X = tf.placeholder(tf.float32, [None, 2])
Y = tf.placeholder(tf.float32, [None, 1])

W1 = tf.Variable(tf.random_normal([2, 2]), name='weight1')
b1 = tf.Variable(tf.random_normal([2]), name='bias1')
layer1 = tf.sigmoid(tf.matmul(X, W1) + b1)

W2 = tf.Variable(tf.random_normal([2, 1]), name='weight2')
b2 = tf.Variable(tf.random_normal([1]), name='bias2')
hypothesis = tf.sigmoid(tf.matmul(layer1, W2) + b2)

cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))
train = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

predicted = tf.cast(hypothesis > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype=tf.float32))

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())

    for step in range(10001):
        _, cost_val = sess.run(
            [train, cost], feed_dict={X: x_data, Y: y_data}
        )

        if step % 1000 == 0:
            print(step, cost_val)

    h, p, a = sess.run(
        [hypothesis, predicted, accuracy], feed_dict={X: x_data, Y: y_data}
    )

    print(f"\nHypothesis:\n{h} \nPredicted:\n{p} \nAccuracy:\n{a}")
```
