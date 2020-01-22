---
title: 'lab:TensorFlow로 Softmax Classification의 구현하기'
date: 2019-02-27 00:00:01
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Softmax function

`n`개의 값을 예측할 때 사용<br/>
점수 -> Softmax function(점수) -> 확률<br/>
`y_data`를 **One Hot Encoding**형식으로 사용

```python
import tensorflow as tf

x_data = [
    [1, 2, 1, 1],
    [2, 1, 3, 2],
    [3, 1, 3, 4],
    [4, 1, 5, 5],
    [1, 7, 5, 5],
    [1, 2, 5, 6],
    [1, 6, 6, 6],
    [1, 7, 7, 7],
]
y_data = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 0],
    [1, 0, 0],
]

X = tf.placeholder("float", [None, 4])
Y = tf.placeholder("float", [None, 3])
nb_classes = 3

W = tf.Variable(tf.random_normal([4, nb_classes]), name="weight")
b = tf.Variable(tf.random_normal([nb_classes]), name="bias")

# tf.nn.softmax computes softmax activations
# softmax = exp(Logits) / reduce_sum(exp(Logits), dim)
hypothesis = tf.nn.softmax(tf.matmul(X, W) + b)

# Cross entropy cost / Loss
cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), axis=1))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

# Launch Graph
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())

    for step in range(2001):
        sess.run(optimizer, feed_dict={X: x_data, Y: y_data})

        if step % 200 == 0:
            print(step, sess.run(cost, feed_dict={X: x_data, Y: y_data}))

    print('--------------')
    # Testing & One-hot encoding
    a = sess.run(hypothesis, feed_dict={X: [[1, 11, 7, 9]]})
    print(a, sess.run(tf.argmax(a, 1)))

    print('--------------')
    b = sess.run(hypothesis, feed_dict={X: [[1, 3, 4, 3]]})
    print(b, sess.run(tf.argmax(b, 1)))

    print('--------------')
    c = sess.run(hypothesis, feed_dict={X: [[1, 1, 0, 1]]})
    print(c, sess.run(tf.argmax(c, 1)))

    print('--------------')
    all = sess.run(hypothesis, feed_dict={X: [[1, 11, 7, 9], [1, 3, 4, 3], [1, 1, 0, 1]]})
    print(all, sess.run(tf.argmax(all, 1)))
```

    /anaconda3/lib/python3.6/site-packages/h5py/__init__.py:36: FutureWarning: Conversion of the second argument of issubdtype from `float` to `np.floating` is deprecated. In future, it will be treated as `np.float64 == np.dtype(float).type`.
      from ._conv import register_converters as _register_converters


    0 10.825441
    200 0.5142497
    400 0.40053576
    600 0.31531286
    800 0.25503108
    1000 0.22799751
    1200 0.20637025
    1400 0.18853818
    1600 0.17353529
    1800 0.16071984
    2000 0.14964
    --------------
    [[1.8087681e-03 9.9818391e-01 7.2578459e-06]] [1]
    --------------
    [[0.91814363 0.07711903 0.00473736]] [0]
    --------------
    [[7.9262508e-09 3.0513588e-04 9.9969482e-01]] [2]
    --------------
    [[1.8087698e-03 9.9818391e-01 7.2578596e-06]
     [9.1814363e-01 7.7118985e-02 4.7373576e-03]
     [7.9262508e-09 3.0513588e-04 9.9969482e-01]] [1 0 2]
