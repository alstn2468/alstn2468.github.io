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
$$ Sigmoid = \frac{1}{1+e^{-x}}$$

**행렬 곱셉**을 사용한다.


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
cost = -tf.reduce_mean(Y * tf.log(hypothesis)
                      + (1 - Y) * tf.log(1 - hypothesis))
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

    h, c, a = sess.run(
        [hypothesis, predicted, accuracy], feed_dict={X: x_data, Y: y_data}
    )

    print("\nHypothesis: ", h, "\nCorrect: ", c, "\nAccuracy: ", a)
```

    0 0.9182138 [[-0.62333226]
     [-1.721802  ]]
    1000 0.7150526 [[-0.20138076]
     [-0.80708164]]
    2000 0.7022653 [[-0.17236823]
     [-0.49763605]]
    3000 0.69705784 [[-0.13972938]
     [-0.31400913]]
    4000 0.69485706 [[-0.10680828]
     [-0.20011428]]
    5000 0.6939054 [[-0.07875179]
     [-0.1286929 ]]
    6000 0.6934868 [[-0.05671478]
     [-0.08344253]]
    7000 0.69330025 [[-0.04018797]
     [-0.05449189]]
    8000 0.69321644 [[-0.02814952]
     [-0.03580439]]
    9000 0.69317865 [[-0.01955061]
     [-0.02364719]]
    10000 0.6931615 [[-0.01349265]
     [-0.01568495]]

    Hypothesis:  [[0.504326  ]
     [0.50040483]
     [0.5009529 ]
     [0.49703178]]
    Correct:  [[1.]
     [1.]
     [1.]
     [0.]]
    Accuracy:  0.75


<br/>

### 전체적인 코드


```python
import tensorflow as tf
import numpy as np

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

X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)
W = tf.Variable(tf.random_normal([2, 1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name="bias")

hypothesis = tf.sigmoid(tf.matmul(X, W) + b)
cost = -tf.reduce_mean(Y * tf.log(hypothesis)
                      + (1 - Y) * tf.log(1 - hypothesis))
train = tf.train.GradientDescentOptimizer(learning_rate=0.01).minimize(cost)

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

    h, c, a = sess.run(
        [hypothesis, predicted, accuracy], feed_dict={X: x_data, Y: y_data}
    )

    print("\nHypothesis: ", h, "\nCorrect: ", c, "\nAccuracy: ", a)
```

    0 0.79332465 [[-1.5087284 ]
     [-0.87561625]]
    1000 0.7269697 [[-0.8733893]
     [-0.5328631]]
    2000 0.70880514 [[-0.56933945]
     [-0.38662037]]
    3000 0.70032305 [[-0.37374794]
     [-0.27585343]]
    4000 0.69642156 [[-0.24622394]
     [-0.19381025]]
    5000 0.6946392 [[-0.16283266]
     [-0.13477722]]
    6000 0.6938269 [[-0.10807667]
     [-0.09306139]]
    7000 0.6934569 [[-0.07196444]
     [-0.06392865]]
    8000 0.6932883 [[-0.04804941]
     [-0.04374896]]
    9000 0.69321156 [[-0.03215438]
     [-0.02985292]]
    10000 0.6931765 [[-0.02155725]
     [-0.0203256 ]]

    Hypothesis:  [[0.50620955]
     [0.5011285 ]
     [0.5008206 ]
     [0.49573925]]
    Correct:  [[1.]
     [1.]
     [1.]
     [0.]]
    Accuracy:  0.75
