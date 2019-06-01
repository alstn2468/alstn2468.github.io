---
title:  "Lab 9-1:XOR을 위한 텐스플로우 딥넷트웍"
date:   2019-05-20 00:00:03
categories: [Machine Learning]
tags: [Machine Learning, Deep Learning, Data Science]
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

<img src="/assets/2019-05-20/10.png" width="400" height="auto" alt="아직 안만듬">

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

    0 0.99409974 [[-1.081909 ]
     [ 2.3671274]]
    1000 0.75658506 [[-0.85761964]
     [ 1.1723609 ]]
    2000 0.7131047 [[-0.46316972]
     [ 0.65583754]]
    3000 0.699124 [[-0.23715353]
     [ 0.36725613]]
    4000 0.6949206 [[-0.11818436]
     [ 0.20615283]]
    5000 0.69367814 [[-0.05713516]
     [ 0.11657296]]
    6000 0.69330937 [[-0.02641575]
     [ 0.06656651]]
    7000 0.6931982 [[-0.01132161]
     [ 0.03844175]]
    8000 0.6931639 [[-0.00415682]
     [ 0.02247488]]
    9000 0.69315296 [[-0.00093976]
     [ 0.01331245]]
    10000 0.6931492 [[0.00036489]
     [0.00799207]]

    Hypothesis:
    [[0.4987609 ]
     [0.50075895]
     [0.49885216]
     [0.5008502 ]]
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

    h, p, a = sess.run(
        [hypothesis, predicted, accuracy], feed_dict={X: x_data, Y: y_data}
    )

    print(f"\nHypothesis:\n{h} \nPredicted:\n{p} \nAccuracy:\n{a}")
```

    0 0.82048273
    1000 0.67851186
    2000 0.606001
    3000 0.4774453
    4000 0.1442676
    5000 0.06338048
    6000 0.039486427
    7000 0.028429154
    8000 0.022119436
    9000 0.01806068
    10000 0.015238974

    Hypothesis:
    [[0.01475588]
     [0.9810414 ]
     [0.985857  ]
     [0.01261569]]
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

<br/>

### Deep Neural Network로 XOR 해결하기


```python
X = tf.placeholder(tf.float32, [None, 2])
Y = tf.placeholder(tf.float32, [None, 1])

W1 = tf.Variable(tf.random_normal([2, 10]), name='weight1')
b1 = tf.Variable(tf.random_normal([10]), name='bias1')
layer1 = tf.sigmoid(tf.matmul(X, W1) + b1)

W2 = tf.Variable(tf.random_normal([10, 10]), name='weight2')
b2 = tf.Variable(tf.random_normal([10]), name='bias2')
layer2 = tf.sigmoid(tf.matmul(layer1, W2) + b2)

W3 = tf.Variable(tf.random_normal([10, 10]), name='weight3')
b3 = tf.Variable(tf.random_normal([10]), name='bias3')
layer3 = tf.sigmoid(tf.matmul(layer2, W3) + b3)

W4 = tf.Variable(tf.random_normal([10, 1]), name='weight4')
b4 = tf.Variable(tf.random_normal([1]), name='bias4')
hypothesis = tf.sigmoid(tf.matmul(layer3, W4) + b4)

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

    print("\nHypothesis: ", h, "\nPredicted: ", p, "\nAccuracy: ", a)
```

    0 0.786564
    1000 0.21167177
    2000 0.030031722
    3000 0.013181003
    4000 0.008059783
    5000 0.005704046
    6000 0.0043751714
    7000 0.0035298648
    8000 0.0029479803
    9000 0.0025245028
    10000 0.0022032897

    Hypothesis:  [[0.00249692]
     [0.99716216]
     [0.998467  ]
     [0.00193409]]
    Predicted:  [[0.]
     [1.]
     [1.]
     [0.]]
    Accuracy:  1.0


**Hypothesis**의 값을 보면 0이 되어야하는 값은<br/>
0에 더 가까워졌고 1이 되어야하는 값은 1에 더 가까워졌다.<br/>
여러개의 Layer를 사용해 **Deep**하게 학습한 결과<br/>
**정확도**가 더 **높아**지게 되었다.
