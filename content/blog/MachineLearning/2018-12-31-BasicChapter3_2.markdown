---
title: 'Tensorflow로 간단한 linear regression을 구현'
date: 2018-12-31 01:41:23
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Hypothesis and Cost function

**Hypothesis**

- 주어진 `x`값에 대하여 어떻게 값을 **예측**할 것인가

$$
H(x) = Wx + b
$$

**Cost function**

- 값을 얼마나 잘 **예측**했는지 나타나는 것
- `Cost function`을 **가장 작게** 만드는 것이 **학습**

$$
cost(W,b) = \dfrac{1}{m}\sum\_{i=1}^m(H(x^{(i)}) - y^{(i)})^2
$$

## 1. Build graph using TF operations

$$
H(x) = Wx + b
$$

```python
import tensorflow as tf

# X and Y data
x_train = [1, 2, 3]
y_train = [1, 2, 3]

W = tf.Variable(tf.random_normal([1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

# Our hypothesis XW + b
hypothesis = x_train * W + b
```

    /anaconda3/lib/python3.6/site-packages/h5py/__init__.py:36: FutureWarning: Conversion of the second argument of issubdtype from `float` to `np.floating` is deprecated. In future, it will be treated as `np.float64 == np.dtype(float).type`.
      from ._conv import register_converters as _register_converters

$$
cost(W,b) = \dfrac{1}{m}\sum\_{i=1}^m(H(x^{(i)}) - y^{(i)})^2
$$

```python
# Cost / Loss function
cost = tf.reduce_mean(tf.square(hypothesis - y_train))
```

**tf.reduce_mean()**

- 주어진 값의 **평균**을 반환

**GradientDescent**

```python
# Minimize
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.01)
train = optimizer.minimize(cost)
```

## Run / Update graph and get results

`tensorflow`의 `variable`을 사용하기 전에는 **무조건**<br/>
`tf.global_variables_initializer()`함수를 사용해 **초기화**

```python
# Launch the graph in a session.
sess = tf.Session()
# Init global var in the graph.
sess.run(tf.global_variables_initializer())

# Fit the line
for step in range(2001):
    sess.run(train)

    if step % 20 == 0:
        print(step, sess.run(cost), sess.run(W), sess.run(b))
```

    0 0.34209618 [0.997927] [-0.58074147]
    20 0.033545386 [1.1831212] [-0.47202426]
    40 0.027953567 [1.19214] [-0.44208765]
    60 0.025365116 [1.1847885] [-0.420573]
    80 0.023036808 [1.1762639] [-0.40073743]
    100 0.020922398 [1.1679953] [-0.38189754]
    ...
    1880 3.9767715e-06 [1.0023161] [-0.00526487]
    1900 3.611425e-06 [1.0022072] [-0.0050175]
    1920 3.2802097e-06 [1.0021034] [-0.00478174]
    1940 2.9790438e-06 [1.0020046] [-0.00455706]
    1960 2.7056e-06 [1.0019104] [-0.00434294]
    1980 2.4575631e-06 [1.0018208] [-0.00413892]
    2000 2.2321947e-06 [1.0017353] [-0.00394444]

## Placeholders

사전에 `train data`를 설정하지 않고 `Session`을 실행시킬 때<br/>
`feed_dict`를 사용해 `train data` 지정이 가능하다.

```python
W = tf.Variable(tf.random_normal([1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

# Now we can use X and Y in place of x_data and y_data
# placeholders for a tensor tha will be always fed using feed_dict
X = tf.placeholder(tf.float32, shape=[None])
Y = tf.placeholder(tf.float32, shape=[None])

hypothesis = X * W + b
cost = tf.reduce_mean(tf.square(hypothesis - Y))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.01)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())

# Fit the line
for step in range(2001):
    cost_val, W_val, b_val, _ = \
        sess.run([cost, W, b, train],
                feed_dict={X: [1, 2, 3, 4, 5],
                           Y: [2.1, 3.1, 4.1, 5.1, 6.1]})

    if step % 20 == 0:
        print(step, cost_val, W_val, b_val)
```

    0 11.289088 [0.35358387] [0.6417344]
    20 0.010992345 [1.0638802] [0.85676134]
    40 0.009398816 [1.0627136] [0.8735269]
    60 0.008208036 [1.0586201] [0.88836247]
    80 0.007168132 [1.0547811] [0.9022229]
    100 0.0062599713 [1.0511932] [0.91517556]
    ...
    1920 2.794269e-08 [1.0001082] [1.0996096]
    1940 2.4392374e-08 [1.0001011] [1.099635]
    1960 2.1316282e-08 [1.0000944] [1.0996588]
    1980 1.8629601e-08 [1.0000883] [1.099681]
    2000 1.624063e-08 [1.0000825] [1.0997021]

## Testing our model

```python
# Testing our model
print(sess.run(hypothesis, feed_dict={X: [5]}))
print(sess.run(hypothesis, feed_dict={X: [2.5]}))
print(sess.run(hypothesis, feed_dict={X: [1.5, 3.5]}))
```

    [6.100115]
    [3.5999084]
    [2.5998259 4.599991 ]
