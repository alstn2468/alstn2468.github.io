---
title:  "lab:TensorFlow로 Fancy Softmax Classification의 구현하기"
date:   2019-02-28 00:00:01
categories: [Machine Learning]
tags: [Machine Learning, Deep Learning, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Animal classification
동물의 특징에 따라 동물이 어떤 종인지 예측


```python
import tensorflow as tf
import numpy as np
```

    /anaconda3/lib/python3.6/site-packages/h5py/__init__.py:36: FutureWarning: Conversion of the second argument of issubdtype from `float` to `np.floating` is deprecated. In future, it will be treated as `np.float64 == np.dtype(float).type`.
      from ._conv import register_converters as _register_converters


<br/>

### Load data file


```python
# 다양한 특징들을 기반으로 동물의 종을 예측
xy = np.loadtxt('data-04-zoo.csv', delimiter=',', dtype=np.float32)
x_data = xy[:, 0:-1]
y_data = xy[:, [-1]]

print(x_data.shape, y_data.shape)
```

    (101, 16) (101, 1)


<br/>

### tf.one_hot and reshape
`[[0]. [3]]`의 데이터가 **one hot**과정을 거치게 되면 한 차원들<br/>
더해 `[[[1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0]]]`의 데이터가 된다.<br/>
기존의 데이터가 2차원일 경우 3차원의 데이터가 된다.<br/>
따라서 `reshape`함수를 사용해 차원을 맞춰준다.<br/>
`reshape`후의 데이터는 `[[1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0]]`이다.<br/>

**(?, 1) -> (?, 1, 7) -> (?, 7)**로 `shape`이 변경된다.


```python
nb_classes = 7 # 0 ~ 6

# 동물의 특징 데이터 16가지
X = tf.placeholder(tf.float32, [None, 16])
# 동물의 종 7가지
Y = tf.placeholder(tf.int32, [None, 1])  # 0 ~ 6, shape=(?, 1)

Y_one_hot = tf.one_hot(Y, nb_classes)  # one hot shape=(?, 1, 7)
print("one_hot", Y_one_hot)

Y_one_hot = tf.reshape(Y_one_hot, [-1, nb_classes]) # shape=(?, 7)
print("reshape", Y_one_hot)
```

    one_hot Tensor("one_hot:0", shape=(?, 1, 7), dtype=float32)
    reshape Tensor("Reshape:0", shape=(?, 7), dtype=float32)


<br/>

### Logits & Hypothesis


```python
W = tf.Variable(tf.random_normal([16, nb_classes]), name='weight')
b = tf.Variable(tf.random_normal([nb_classes]), name='bias')

# tf.nn.softmax함수가 softmax 연산 진행, 아래 식과 동일
# softmax = exp(logits) / reduce_sum(exp(logits), dim)
logits = tf.matmul(X, W) + b
hypothesis = tf.nn.softmax(logits)
```

<br/>

### Cross entropy cost / Loss Function


```python
cost_i = tf.nn.softmax_cross_entropy_with_logits(logits=logits,
                                                labels=Y_one_hot)
cost = tf.reduce_mean(cost_i)
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)
```

    WARNING:tensorflow:From <ipython-input-5-bc56557890b4>:2: softmax_cross_entropy_with_logits (from tensorflow.python.ops.nn_ops) is deprecated and will be removed in a future version.
    Instructions for updating:

    Future major versions of TensorFlow will allow gradients to flow
    into the labels input on backprop by default.

    See `tf.nn.softmax_cross_entropy_with_logits_v2`.



<br/>

### Training


```python
prediction = tf.argmax(hypothesis, 1)
correct_prediction = tf.equal(prediction, tf.argmax(Y_one_hot, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

# 학습 시작
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())

    for step in range(2000):
        sess.run(optimizer, feed_dict={X: x_data, Y: y_data})

        if step % 100 == 0:
            loss, acc = sess.run([cost, accuracy], feed_dict={
                X: x_data,
                Y: y_data,
            })

            print("Step : {:5}\tLoss : {:.3f}\tAcc : {:.2%}"\
                 .format(step, loss, acc))

    # 예츨 결과 확인
    pred = sess.run(prediction, feed_dict={X: x_data})
```

    Step :     0	Loss : 7.064	Acc : 1.98%
    Step :   100	Loss : 0.940	Acc : 83.17%
    Step :   200	Loss : 0.515	Acc : 85.15%
    Step :   300	Loss : 0.362	Acc : 88.12%
    Step :   400	Loss : 0.284	Acc : 92.08%
    Step :   500	Loss : 0.233	Acc : 93.07%
    Step :   600	Loss : 0.197	Acc : 94.06%
    Step :   700	Loss : 0.171	Acc : 95.05%
    Step :   800	Loss : 0.150	Acc : 95.05%
    Step :   900	Loss : 0.133	Acc : 97.03%
    Step :  1000	Loss : 0.120	Acc : 98.02%
    Step :  1100	Loss : 0.109	Acc : 98.02%
    Step :  1200	Loss : 0.100	Acc : 99.01%
    Step :  1300	Loss : 0.092	Acc : 100.00%
    Step :  1400	Loss : 0.085	Acc : 100.00%
    Step :  1500	Loss : 0.079	Acc : 100.00%
    Step :  1600	Loss : 0.074	Acc : 100.00%
    Step :  1700	Loss : 0.070	Acc : 100.00%
    Step :  1800	Loss : 0.066	Acc : 100.00%
    Step :  1900	Loss : 0.062	Acc : 100.00%


<br/>

### Check Predictive Results


```python
# y_data: (N,1) = flatten => (N, ) matches pred.shape
for p, y in zip(pred, y_data.flatten()):
        print("[{}] Prediction : {} True Y : {}".format(p == int(y), p, int(y)))
```

    [True] Prediction : 0 True Y : 0
    [True] Prediction : 0 True Y : 0
    ...
    [True] Prediction : 0 True Y : 0
    [True] Prediction : 6 True Y : 6
    [True] Prediction : 1 True Y : 1
