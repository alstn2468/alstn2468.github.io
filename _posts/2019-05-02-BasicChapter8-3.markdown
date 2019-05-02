---
title:  "lab 07-1: training/test dataset, learning rate, normalization (new)"
date:   2019-05-02 00:00:01
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Training and Test data sets
**Data Set**을 **Training Set**과 **Test Set**으로 나누어 진행<br/>


```python
# Training Set
x_data = [
    [1, 2, 1],
    [1, 3, 2],
    [1, 3, 4],
    [1, 5, 5],
    [1, 7, 5],
    [1, 2, 5],
    [1, 6, 6],
    [1, 7, 7],
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

# Test Set
x_test = [
    [2, 1, 1],
    [3, 1, 2],
    [3, 3, 4],
]
y_test = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
]
```

이러한 상황에서 `placeholder`가 유용하다.<br/>
`placeholder`를 이용해서 어떠한 값이 들어올 때<br/>
**Traiining Set**을 `placeholder`에 넣어서 학습시키고<br/>
**Test Set**을 `placeholder`에 넣어서 테스트를 진행하면 된다.


```python
import tensorflow as tf

X = tf.placeholder("float", [None, 3])
Y = tf.placeholder("float", [None, 3])
W = tf.Variable(tf.random_normal([3, 3]))
b = tf.Variable(tf.random_normal([3]))

hypothesis = tf.nn.softmax(tf.matmul(X, W) + b)
cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), axis=1))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

# Correct prediction Test model
prediction = tf.argmax(hypothesis, 1)
is_correct = tf.equal(prediction, tf.argmax(Y, 1))
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

# Launch graph
with tf.Session() as sess:
    # Initialize Tenserflow variables
    sess.run(tf.global_variables_initializer())

    for step in range(201):
        cost_val, W_val, _ = sess.run([cost, W, optimizer],
                                      feed_dict={X: x_data, Y: y_data})

        if step % 20 == 0:
            print(step, cost_val, W_val)

    # Predict
    print("Prediction :", sess.run(prediction, feed_dict={X: x_test}))
    # Calculate the accuracy
    print("Accuracy :", sess.run(accuracy, feed_dict={X: x_test, Y: y_test}))
```


    0 4.1074553 [[-1.4293944  -0.7224384   2.848082  ]
     [ 1.1112422  -0.3999512  -0.71154207]
     [-0.15248409  0.17528887  0.5048751 ]]
    20 0.7546797 [[-1.5631142  -0.5818348   2.841198  ]
     [ 0.72321707 -0.0059972  -0.71747077]
     [-0.10348553  0.66835874 -0.03719316]]
    40 0.6795351 [[-1.6549793  -0.5410513   2.8922794 ]
     [ 0.56363654 -0.01940873 -0.54447865]
     [ 0.08512951  0.65142184 -0.20887122]]
    60 0.63409156 [[-1.7386525  -0.5033351   2.9382365 ]
     [ 0.4421414  -0.01824449 -0.42414775]
     [ 0.2345651   0.6264432  -0.33332816]]
    80 0.6051625 [[-1.8194332  -0.4668002   2.9824824 ]
     [ 0.35451818 -0.01411752 -0.34065136]
     [ 0.34999305  0.60314    -0.42545283]]
    100 0.58531666 [[-1.8991535  -0.43095058  3.0263534 ]
     [ 0.29415295 -0.01108143 -0.28332224]
     [ 0.43837747  0.58400047 -0.49469772]]
    120 0.57030904 [[-1.9780612  -0.39590144  3.0702124 ]
     [ 0.25370523 -0.00954942 -0.24440636]
     [ 0.50700086  0.5684458  -0.54776627]]
    140 0.55791247 [[-2.0558922  -0.3618978   3.1140394 ]
     [ 0.22686873 -0.00888192 -0.2182373 ]
     [ 0.5619558   0.5552294  -0.58950466]]
    160 0.54703254 [[-2.13234    -0.32911745  3.1577072 ]
     [ 0.20899145 -0.00845987 -0.20078206]
     [ 0.6076821   0.5433617  -0.6233629 ]]
    180 0.5371375 [[-2.2071946  -0.29763928  3.2010844 ]
     [ 0.19691719 -0.00792996 -0.18923767]
     [ 0.64718145  0.53225446 -0.65175486]]
    200 0.5279585 [[-2.2803524  -0.26746872  3.2440712 ]
     [ 0.18859148 -0.0071582  -0.18168372]
     [ 0.6824146   0.5216165  -0.6763497 ]]
    Prediction : [2 2 2]
    Accuracy : 1.0


여기에서 **Accuracy**와 **Predection**의 값은<br/>
**Training Set**을 가지고 학습시킨 모델을 가지고<br/>
**Test Set**을 예측한 값으로 모델 입장에서 한 번도<br/>
**학습하지 않은 데이터**로 예측을한 의미가 있는 결과 값이다.

<br/>

### Large Learning Rate
Learning Rate가 너무 클경우
- **Overshooting**


```python
import tensorflow as tf

X = tf.placeholder("float", [None, 3])
Y = tf.placeholder("float", [None, 3])
W = tf.Variable(tf.random_normal([3, 3]))
b = tf.Variable(tf.random_normal([3]))

hypothesis = tf.nn.softmax(tf.matmul(X, W) + b)
cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), axis=1))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1.5).minimize(cost)

# Correct prediction Test model
prediction = tf.argmax(hypothesis, 1)
is_correct = tf.equal(prediction, tf.argmax(Y, 1))
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

# Launch graph
with tf.Session() as sess:
    # Initialize Tenserflow variables
    sess.run(tf.global_variables_initializer())

    for step in range(201):
        cost_val, W_val, _ = sess.run([cost, W, optimizer],
                                      feed_dict={X: x_data, Y: y_data})

        if step % 20 == 0:
            print(step, cost_val, W_val)

    # Predict
    print("Prediction :", sess.run(prediction, feed_dict={X: x_test}))
    # Calculate the accuracy
    print("Accuracy :", sess.run(accuracy, feed_dict={X: x_test, Y: y_test}))
```

    0 5.1369658 [[-0.16136795 -0.052203    1.2202002 ]
     [ 1.7465985  -3.63817     1.3205297 ]
     [ 0.01285887 -4.4370604   0.21666038]]
    20 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    40 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    60 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    80 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    100 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    120 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    140 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    160 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    180 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    200 nan [[nan nan nan]
     [nan nan nan]
     [nan nan nan]]
    Prediction : [0 0 0]
    Accuracy : 0.0


Learning rate를 1.5로 올린 결과 **Overshooting**이<br/>
발생해 학습이 잘 되지않은 모델이 생성되어 예측이 잘 되지않았다.

<br/>

### Learning Rate가 너무 작을 경우
- Many iterations
- Local minima에 빠질 수 있다.


```python
import tensorflow as tf

X = tf.placeholder("float", [None, 3])
Y = tf.placeholder("float", [None, 3])
W = tf.Variable(tf.random_normal([3, 3]))
b = tf.Variable(tf.random_normal([3]))

hypothesis = tf.nn.softmax(tf.matmul(X, W) + b)
cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), axis=1))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-10).minimize(cost)

# Correct prediction Test model
prediction = tf.argmax(hypothesis, 1)
is_correct = tf.equal(prediction, tf.argmax(Y, 1))
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

# Launch graph
with tf.Session() as sess:
    # Initialize Tenserflow variables
    sess.run(tf.global_variables_initializer())

    for step in range(201):
        cost_val, W_val, _ = sess.run([cost, W, optimizer],
                                      feed_dict={X: x_data, Y: y_data})

        if step % 20 == 0:
            print(step, cost_val, W_val)

    # Predict
    print("Prediction :", sess.run(prediction, feed_dict={X: x_test}))
    # Calculate the accuracy
    print("Accuracy :", sess.run(accuracy, feed_dict={X: x_test, Y: y_test}))
```

    0 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    20 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    40 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    60 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    80 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    100 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    120 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    140 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    160 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    180 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    200 4.4417534 [[ 1.6614894  -2.5569797   1.3669713 ]
     [-0.43707097  1.3632766   1.4774112 ]
     [-0.6081834   0.77286756  0.4197207 ]]
    Prediction : [0 0 2]
    Accuracy : 0.33333334


Learning rate를 1e-10으로 낮추었더니,<br>
cost가 줄어들지 않고 학습이 이루어지지 않은 결과가 생겼다.

<br/>

### Non-normalized inputs
아래와 같이 데이터들 간의 차이가 큰 Data Set을 사용하면<br/>
한쪽 방향으로 치우쳐진 **왜곡된 그래프**가 그려지게 된다.

| x_data (xy[:, 0:-1])                         | y_data (xy[:, [-1]) |
| -------------------------------------------- | ------------------- |
| [828.659973, 833.450012, 908100, 828.349976] | [831.659973]        |
| [823.02002, 828.070007, 1828100, 821.655029] | [828.070007]        |
| [816, 820.958984, 1008100, 815.48999]        | [819.23999]         |
| [819.359985, 823, 1188100, 818.469971]       | [818.97998]         |
| [819, 823, 1198100, 816]                     | [820.450012]        |
| [811.700012, 815.25, 1098100, 809.780029]    | [813.669983]        |
| [809.51001, 816.659973, 1398100, 804.539978] | [809.559998]        |



```python
import numpy as np

xy = np.array([
    [828.659973, 833.450012, 908100, 828.349976, 831.659973],
    [823.02002, 828.070007, 1828100, 821.655029, 828.070007],
    [819.929993, 824.400024, 1438100, 818.97998, 824.159973],
    [816, 820.958984, 1008100, 815.48999, 819.23999],
    [819.359985, 823, 1188100, 818.469971, 818.97998],
    [819, 823, 1198100, 816, 820.450012],
    [811.700012, 815.25, 1098100, 809.780029, 813.669983],
    [809.51001, 816.659973, 1398100, 804.539978, 809.559998]
])
x_data = xy[:, 0:-1]
y_data = xy[:, [-1]]

# Placeholder for a tensor that will be always frd.
X = tf.placeholder(tf.float32, shape=[None, 4])
Y = tf.placeholder(tf.float32, shape=[None, 1])
W = tf.Variable(tf.random_normal([4, 1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

hypothesis = tf.matmul(X, W) + b
cost = tf.reduce_mean(tf.square(hypothesis - Y))

# Minimize
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())

for step in range(201):
    cost_val, hy_val, _ = sess.run(
        [cost, hypothesis, train], feed_dict={X: x_data, Y: y_data}
    )

    if step % 40 == 0:
        print(step, "Cost :", cost_val,
             "\nPrediction\n", hy_val)
```

    0 Cost : 272062040000.0
    Prediction
     [[-367724.94]
     [-739115.9 ]
     [-581670.8 ]
     [-408077.16]
     [-480746.12]
     [-484782.1 ]
     [-444402.88]
     [-565508.5 ]]
    40 Cost : nan
    Prediction
     [[nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]]
    80 Cost : nan
    Prediction
     [[nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]]
    120 Cost : nan
    Prediction
     [[nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]]
    160 Cost : nan
    Prediction
     [[nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]]
    200 Cost : nan
    Prediction
     [[nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]
     [nan]]


예측이 잘 되지않은 이유는 데이터가 **Normalized**되지 않았기 때문이다.

### Normalized inputs (min-max scale)


```python
def min_max_scaler(data):
    numerator = data - np.min(data, 0)
    denominator = np.max(data, 0) - np.min(data, 0)
    # noise term prevents the zero division
    return numerator / (denominator + 1e-7)

xy = min_max_scaler(xy)
print(xy)
```

    [[0.99999999 0.99999999 0.         1.         1.        ]
     [0.70548491 0.70439552 1.         0.71881782 0.83755791]
     [0.54412549 0.50274824 0.57608696 0.606468   0.6606331 ]
     [0.33890353 0.31368023 0.10869565 0.45989134 0.43800918]
     [0.51436    0.42582389 0.30434783 0.58504805 0.42624401]
     [0.49556179 0.42582389 0.31521739 0.48131134 0.49276137]
     [0.11436064 0.         0.20652174 0.22007776 0.18597238]
     [0.         0.07747099 0.5326087  0.         0.        ]]



```python
x_data = xy[:, 0:-1]
y_data = xy[:, [-1]]

# Placeholder for a tensor that will be always frd.
X = tf.placeholder(tf.float32, shape=[None, 4])
Y = tf.placeholder(tf.float32, shape=[None, 1])
W = tf.Variable(tf.random_normal([4, 1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

hypothesis = tf.matmul(X, W) + b
cost = tf.reduce_mean(tf.square(hypothesis - Y))

# Minimize
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())

for step in range(201):
    cost_val, hy_val, _ = sess.run(
        [cost, hypothesis, train], feed_dict={X: x_data, Y: y_data}
    )

    if step % 40 == 0:
        print(step, "Cost :", cost_val,
             "\nPrediction\n", hy_val)
```

    0 Cost : 2.1135879
    Prediction
     [[-0.8375394 ]
     [-1.6286453 ]
     [-1.1022344 ]
     [-0.44793546]
     [-0.832747  ]
     [-0.7305834 ]
     [-0.39647448]
     [-0.3694872 ]]
    40 Cost : 2.1074905
    Prediction
     [[-0.83465135]
     [-1.6258268 ]
     [-1.099904  ]
     [-0.44615546]
     [-0.83062065]
     [-0.72853124]
     [-0.39512596]
     [-0.36815533]]
    80 Cost : 2.101407
    Prediction
     [[-0.83176506]
     [-1.6230099 ]
     [-1.0975752 ]
     [-0.44437712]
     [-0.8284959 ]
     [-0.7264808 ]
     [-0.39377916]
     [-0.36682522]]
    120 Cost : 2.0953507
    Prediction
     [[-0.82888675]
     [-1.620203  ]
     [-1.0952536 ]
     [-0.4426031 ]
     [-0.82637715]
     [-0.72443604]
     [-0.39243543]
     [-0.36549872]]
    160 Cost : 2.0893104
    Prediction
     [[-0.8260109 ]
     [-1.6173992 ]
     [-1.0929348 ]
     [-0.44083124]
     [-0.8242608 ]
     [-0.72239375]
     [-0.39109373]
     [-0.3641746 ]]
    200 Cost : 2.0832868
    Prediction
     [[-0.8231386 ]
     [-1.6145985 ]
     [-1.0906188 ]
     [-0.4390618 ]
     [-0.82214713]
     [-0.7203541 ]
     [-0.3897541 ]
     [-0.3628522 ]]


같은 데이터를 **MinMax Scaler**에 넣어 **정규화(Normalized)**한 후<br/>
사용하니 값이 예측되는 것을 확인할 수 있다.
