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

<img src="assets/2019-05-20/10.png" width="400" height="auto" alt="아직 안만듬">

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
- Y * log(H(x)
- (1 - Y) * log(1 - H(X))
$$

구해진 Cost를 가지고 **경사하강법**을 사용해 학습을 진행한다.


```python
cost = -tf.reduce_mean(Y * tf.log(hypothesis)
                      + (1 - Y) * tf.log(1 - hypothesis))
train = tf.train.GradientDescentOptimizer(learning_rate=0.01).minimize(cost)
```

<br/>

### Training
위에 작성한 **Hypothesis**와 **Cost Function**을 사용해 학습을 진행


```python
predicted = tf.cast(hypothesis > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype=tf.float32))

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())

    for step in range(10001):
        sess.run(train, feed_dict={X: x_data, Y: y_data})

        if step % 1000 == 0:
            print(step,
                  sess.run(cost, feed_dict={X: x_data, Y: y_data}),
                  sess.run(W))

    h, c, a = sess.run(
        [hypothesis, predicted, accuracy], feed_dict={X: x_data, Y: y_data}
    )
    print("\nHypothesis: ", h, "\nCorrect: ", c, "\nAccuracy: ", a)
```

    0 1.2234817 [[0.39820135]
     [0.6167415 ]]
    1000 0.7463542 [[0.81462926]
     [0.9441738 ]]
    2000 0.71863586 [[0.58613837]
     [0.6557569 ]]
    3000 0.70510155 [[0.4054208 ]
     [0.44273508]]
    4000 0.69867206 [[0.2778502 ]
     [0.29783332]]
    5000 0.6956826 [[0.18950936]
     [0.20020682]]
    6000 0.69430697 [[0.12888761]
     [0.13461326]]
    7000 0.69367695 [[0.08749887]
     [0.09056317]]
    8000 0.693389 [[0.05932756]
     [0.06096753]]
    9000 0.6932575 [[0.04019087]
     [0.04106851]]
    10000 0.6931975 [[0.02720905]
     [0.02767869]]

    Hypothesis:  [[0.49186257]
     [0.49878156]
     [0.49866414]
     [0.5055836 ]]
    Correct:  [[0.]
     [0.]
     [0.]
     [1.]]
    Accuracy:  0.25
