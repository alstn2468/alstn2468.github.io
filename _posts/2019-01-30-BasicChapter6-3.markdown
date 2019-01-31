---
title:  "TensorFlow로 Logistic Classification 구현하기(new)"
date:   2019-01-30 00:00:01
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Logistic Regression
\begin{align}
H(X) = \frac{1}{1 + e^{-W^{T}X}} \\
\end{align}

\begin{align}
cost(W) = -\frac{1}{m}\sum ylog(H(x)) + (1 - y)log(1 - H(x)) \\
\end{align}

\begin{align}
W := W - \alpha \frac{\sigma}{\sigma W}cost(W) \\
\end{align}


```python
import tensorflow as tf
```

    /anaconda3/lib/python3.6/site-packages/h5py/__init__.py:36: FutureWarning: Conversion of the second argument of issubdtype from `float` to `np.floating` is deprecated. In future, it will be treated as `np.float64 == np.dtype(float).type`.
      from ._conv import register_converters as _register_converters


<br/>

### Training Data
`y`의 값은 **0 또는 1**의 Binary 값


```python
x_data = [
    [1, 2], [2, 3], [3, 1],
    [4, 3], [5, 3], [6, 2],
]
y_data = [
    [0], [0], [0],
    [1], [1], [1],
]

# placeholders for a tensor that will be always fed.
X = tf.placeholder(tf.float32, shape=[None, 2])
Y = tf.placeholder(tf.float32, shape=[None, 1])
```

<br/>

### Hypothesis
\begin{align}
H(X) = \frac{1}{1 + e^{-W^{T}X}} \\
\end{align}

`W`의 `shape`은 **[들어오는 데이터 개수, 나가는 데이터 개수]**<br/>
`b`의 `shape`은 **나가는 데이터 개수**


```python
W = tf.Variable(tf.random_normal([2, 1]), name="weight")
b = tf.Variable(tf.random_normal([1]), name="bias")

# Hypothesis using sigmoid : tf.div(1., 1. + tf.exp(tf.matmul(X, W) + b))
hypothesis = tf.sigmoid(tf.matmul(X, W) + b)
```

<br/>

### Cost Function
\begin{align}
cost(W) = -\frac{1}{m}\sum ylog(H(x)) + (1 - y)log(1 - H(x)) \\
\end{align}


```python
# Cost/Loss function
cost = -tf.reduce_mean(Y * tf.log(hypothesis)
                       + (1 - Y) * tf.log(1 - hypothesis))
```

<br/>

### Optimizing with Gradient Descent
\begin{align}
W := W - \alpha \frac{\sigma}{\sigma W}cost(W) \\
\end{align}


```python
train = tf.train.GradientDescentOptimizer(learning_rate=0.01).minimize(cost)
```

<br/>

### Accuuracy computtation


```python
# True if hypothesis > 0.5 else False
predicted = tf.cast(hypothesis > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype=tf.float32))
```

<br/>

### Train the model


```python
# Launch graph
with tf.Session() as sess:
    # Initialize Tenserflow variables
    sess.run(tf.global_variables_initializer())

    for step in range(10001):
        cost_val, _ = sess.run([cost, train],
                              feed_dict={X: x_data, Y: y_data})

        if step % 1000 == 0:
            print(step, cost_val)

    # Accuracy report
    h, c, a = sess.run([hypothesis, predicted, accuracy],
                      feed_dict={X: x_data, Y: y_data})
    print("\nHypothesis : ", h,
         "\nCorrect (Y) : ", c,
         "\nAccuracy : ", a)
```

    0 0.8831861
    1000 0.30194607
    2000 0.2640162
    3000 0.2339095
    4000 0.20963901
    5000 0.18977194
    6000 0.17327213
    7000 0.15938494
    8000 0.14755455
    9000 0.13736634
    10000 0.12850672

    Hypothesis :  [[0.02243203]
     [0.14577791]
     [0.26223317]
     [0.80160093]
     [0.95159554]
     [0.98427284]]
    Correct (Y) :  [[0.]
     [0.]
     [0.]
     [1.]
     [1.]
     [1.]]
    Accuracy :  1.0


<br/>

### Classifying diabetes


```python
import numpy as np

xy = np.loadtxt('data-03-diabetes.csv',
               delimiter=',',
               dtype=np.float32)
x_data = xy[:, 0:-1]
y_data = xy[:, [-1]]
```


```python
# placeholders for a tensor that will be always fed.
X = tf.placeholder(tf.float32, shape=[None, 8])
Y = tf.placeholder(tf.float32, shape=[None, 1])

W = tf.Variable(tf.random_normal([8, 1]), name="weight")
b = tf.Variable(tf.random_normal([1]), name="bias")

# Hypothesis using sigmoid : tf.div(1., 1. + tf.exp(tf.matmul(X, W)))
hypothesis = tf.sigmoid(tf.matmul(X, W) + b)

# Cost/Loss function
cost = -tf.reduce_mean(Y * tf.log(hypothesis)
                      + (1 - Y) * tf.log(1 - hypothesis))

# Optimizing with Gradient Descent
train = tf.train.GradientDescentOptimizer(learning_rate=0.01).minimize(cost)

# Accuracy computation, True if hypothesis > 0.5 else False
predicted = tf.cast(hypothesis > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y), dtype=tf.float32))

# Launch Graph
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())

    feed = {X: x_data, Y: y_data}

    for step in range(10001):
        sess.run(train, feed_dict=feed)

        if step % 1000 == 0:
            print(step, sess.run(cost, feed_dict=feed))

    # Accuracy report
    h, c, a = sess.run([hypothesis, predicted, accuracy], feed_dict=feed)
    print("\nHypothesis : ", h,
         "\nCorrect (Y) : ", c,
         "\nAccuracy : ", a)
```

    0 0.899115
    1000 0.5735633
    2000 0.5399573
    3000 0.5193476
    4000 0.5059997
    5000 0.49698162
    6000 0.49068317
    7000 0.48616815
    8000 0.48286337
    9000 0.48040378
    10000 0.4785474

    Hypothesis :  [[0.38358444]
     [0.92869014]
     [0.22825797]
     [0.93518037]
     [0.10852826]
     ...
     [0.68586665]
     [0.7215009 ]
     [0.84273595]
     [0.6738128 ]
     [0.90443367]]
    Correct (Y) :  [[0.]
     [1.]
     [0.]
     [1.]
     [0.]
     ...
     [1.]
     [1.]
     [1.]
     [1.]
     [1.]]
    Accuracy :  0.77470356
