---
title:  "lab:multi-variable linear regression을 TensorFlow에서 구현하기"
date:   2019-01-05 01:41:23
categories: [Machine Learning]
tags: [Machine Learning, Deep Learning, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Hypothesis using matrix

\begin{align}
H(x_1, x_2, x_3) = x_1w_1 + x_2w_2 + x_3w_3 \\
\end{align}

| x1 | x2 | x3  | Y   |
| -- | -- | --- | --- |
| 73 | 80 | 75  | 152 |
| 93 | 88 | 93  | 185 |
| 89 | 91 | 90  | 180 |
| 96 | 98 | 100 | 196 |
| 73 | 66 | 70  | 142 |

변수 3개(x1, x2, x3)을 이용하여 `Y`(결과)를 예측


```python
import tensorflow as tf

x1_data = [73., 93., 89., 96., 73.]
x2_data = [80., 88., 91., 98., 66.]
x3_data = [75., 93., 90., 100., 70.]
y_data = [152., 185., 180., 196., 142.]

# placeholder for a tensor that will be always fed.
x1 = tf.placeholder(tf.float32)
x2 = tf.placeholder(tf.float32)
x3 = tf.placeholder(tf.float32)

Y = tf.placeholder(tf.float32)

w1 = tf.Variable(tf.random_normal([1]), name='weight1')
w2 = tf.Variable(tf.random_normal([1]), name='weight2')
w3 = tf.Variable(tf.random_normal([1]), name='weight3')
b = tf.Variable(tf.random_normal([1]), name='bias')

hypothesis = x1 * w1 + x2 *w2 + x3 * w3 + b

# cost/Loss function
cost = tf.reduce_mean(tf.square(hypothesis - Y))
# Minimize. Need a very small learning rate for this data set
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

# Launch the graph in a session.
sess = tf.Session()
# Initializes global variables in the graph.
sess.run(tf.global_variables_initializer())

for step in range(2001):
    cost_val, hy_val, _ = sess.run([cost, hypothesis, train],
                                  feed_dict={x1: x1_data,
                                             x2: x2_data,
                                             x3: x3_data,
                                             Y : y_data})
    if step % 10 == 0:
        print(step, "Cost:", cost_val, "\nPrediction:\n", hy_val)
```


    0 Cost: 7444.396
    Prediction:
     [73.21022  93.897156 89.57611  96.45675  73.962616]
    10 Cost: 2.2866924
    Prediction:
     [149.52972 185.61728 179.95482 194.87642 143.91982]
    20 Cost: 2.2078712
    Prediction:
     [149.76602 185.8911  180.2299  195.17554 144.12651]
    30 Cost: 2.1972535
    Prediction:
     [149.77211 185.88824 180.23238 195.17775 144.1222 ]
    40 Cost: 2.186692
    Prediction:
     [149.77747 185.88455 180.234   195.17906 144.11723]
     ...
    1960 Cost: 0.9266957
    Prediction:
     [150.57715 185.33379 180.47571 195.37918 143.37326]
    1970 Cost: 0.922966
    Prediction:
     [150.5803  185.33162 180.47667 195.38    143.3703 ]
    1980 Cost: 0.9192538
    Prediction:
     [150.58345 185.32944 180.47762 195.38081 143.36734]
    1990 Cost: 0.915562
    Prediction:
     [150.5866  185.32727 180.47856 195.38162 143.3644 ]
    2000 Cost: 0.9118868
    Prediction:
     [150.5897  185.3251  180.47948 195.38242 143.36143]


 <br/>

 ### Matrix
\begin{align}
(x_1 x_2 x_3) \cdot \begin{pmatrix}w_1\\\w_2\\\w_3\end{pmatrix} = (x_1w_1 + x_2w_2 + x_3w_3) \\
\end{align}

\begin{align}
H(X) = XW \\
\end{align}


```python
x_data = [
    [73., 80., 75.],
    [93., 88., 93.],
    [89., 91., 90.],
    [96., 98., 100.],
    [73., 66., 70.],
]
y_data = [
    [152.],
    [185.],
    [180.],
    [196.],
    [142.],
]

# placeholders for a tensor that will be always fed.
X = tf.placeholder(tf.float32, shape=[None, 3])
Y = tf.placeholder(tf.float32, shape=[None, 1])

W = tf.Variable(tf.random_normal([3, 1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

# Hypothesis
hypothesis = tf.matmul(X, W) + b
# Simplified cost/Loss function
cost = tf.reduce_mean(tf.square(hypothesis - Y))
# Minimize
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

# Launch the graph in a session.
sess = tf.Session()
# Initalizes global variables in the graph.
sess.run(tf.global_variables_initializer())

for step in range(2001):
    cost_val, hy_val, _ = sess.run([cost, hypothesis, train],
                                   feed_dict={X: x_data, Y: y_data})
    if step % 10 == 0:
        print(step, "Cost:", cost_val, "\nPrediction:\n", hy_val)
```

    0 Cost: 84.2611
    Prediction:
     [[147.19199]
     [172.82959]
     [172.4113 ]
     [187.48358]
     [131.04774]]
    10 Cost: 7.225972
    Prediction:
     [[154.9442 ]
     [182.16638]
     [181.601  ]
     [197.4919 ]
     [138.17336]]
    20 Cost: 7.187818
    Prediction:
     [[154.95755]
     [182.20158]
     [181.62575]
     [197.51979]
     [138.20421]]
    30 Cost: 7.150592
    Prediction:
     [[154.94751]
     [182.20862]
     [181.62276]
     [197.51749]
     [138.21355]]
    40 Cost: 7.1135874
    Prediction:
     [[154.93742]
     [182.21553]
     [181.61969]
     [197.51506]
     [138.22278]]
    50 Cost: 7.07672
    Prediction:
     [[154.92738]
     [182.22246]
     [181.61665]
     [197.51268]
     [138.23204]]
    ...
    1960 Cost: 2.700992
    Prediction:
     [[153.4333 ]
     [183.25021]
     [181.16324]
     [197.15027]
     [139.6099 ]]
    1970 Cost: 2.6879435
    Prediction:
     [[153.42735]
     [183.2543 ]
     [181.16145]
     [197.14879]
     [139.61542]]
    1980 Cost: 2.6749604
    Prediction:
     [[153.42142]
     [183.25839]
     [181.15965]
     [197.14731]
     [139.62091]]
    1990 Cost: 2.6620722
    Prediction:
     [[153.41551]
     [183.26245]
     [181.15785]
     [197.14584]
     [139.62639]]
    2000 Cost: 2.6492188
    Prediction:
     [[153.4096 ]
     [183.26651]
     [181.15607]
     [197.14436]
     [139.63187]]
