---
title: '깊고 넓은 NN으로 MNIST 학습하기'
date: 2019-06-03 00:00:05
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## 사용할 모듈 추가

```python
import tensorflow as tf
import matplotlib.pyplot as plt
import random
```

## MNIST 데이터 불러오기

```python
from tensorflow.examples.tutorials.mnist import input_data

mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)
```

## 상수 정의

```python
learning_rate = 0.001
training_epochs = 15
batch_size = 100
```

## 입력값 placeholder 선언

```python
X = tf.placeholder(tf.float32, [None, 784])
Y = tf.placeholder(tf.float32, [None, 10])
```

## 깊고 넓은 Neural Network 구성하기

**Xavier Initialization**사용<br/>
5개의 Layer를 사용하는 Neural Network구성

```python
W1 = tf.get_variable("W1", shape=[784, 512],
                     initializer=tf.contrib.layers.xavier_initializer())
b1 = tf.Variable(tf.random_normal([512]))
L1 = tf.nn.relu(tf.matmul(X, W1) + b1)

W2 = tf.get_variable("W2", shape=[512, 512],
                     initializer=tf.contrib.layers.xavier_initializer())
b2 = tf.Variable(tf.random_normal([512]))
L2 = tf.nn.relu(tf.matmul(L1, W2) + b2)

W3 = tf.get_variable("W3", shape=[512, 512],
                     initializer=tf.contrib.layers.xavier_initializer())
b3 = tf.Variable(tf.random_normal([512]))
L3 = tf.nn.relu(tf.matmul(L2, W3) + b3)

W4 = tf.get_variable("W4", shape=[512, 512],
                     initializer=tf.contrib.layers.xavier_initializer())
b4 = tf.Variable(tf.random_normal([512]))
L4 = tf.nn.relu(tf.matmul(L3, W4) + b4)

W5 = tf.get_variable("W5", shape=[512, 10],
                     initializer=tf.contrib.layers.xavier_initializer())
b5 = tf.Variable(tf.random_normal([10]))
hypothesis = tf.matmul(L4, W5) + b5
```

## 손실함수와 최적화 방법 정의

```python
cost = tf.reduce_mean(
    tf.nn.softmax_cross_entropy_with_logits_v2(logits=hypothesis, labels=Y)
)
optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate).minimize(cost)
```

## Session 초기화

```python
sess = tf.Session()
sess.run(tf.global_variables_initializer())
```

## 모델 학습 진행

```python
for epoch in range(training_epochs):
    avg_cost = 0
    total_batch = int(mnist.train.num_examples / batch_size)

    for i in range(total_batch):
        batch_xs, batch_ys = mnist.train.next_batch(batch_size)
        feed_dict = {X: batch_xs, Y: batch_ys}
        c, _ = sess.run([cost, optimizer], feed_dict=feed_dict)
        avg_cost += c / total_batch

    print('Epoch:', '%04d' % (epoch + 1), 'cost =', '{:.9f}'.format(avg_cost))

print('Learning Finished!')
```

    Epoch: 0001 cost = 0.291983139
    Epoch: 0002 cost = 0.104170327
    Epoch: 0003 cost = 0.070643487
    Epoch: 0004 cost = 0.050214080
    Epoch: 0005 cost = 0.040219263
    Epoch: 0006 cost = 0.034975592
    Epoch: 0007 cost = 0.030978311
    Epoch: 0008 cost = 0.025430245
    Epoch: 0009 cost = 0.026338585
    Epoch: 0010 cost = 0.020523844
    Epoch: 0011 cost = 0.017850943
    Epoch: 0012 cost = 0.016786734
    Epoch: 0013 cost = 0.016248527
    Epoch: 0014 cost = 0.017074123
    Epoch: 0015 cost = 0.011885058
    Learning Finished!

## 모델 테스트 및 정확도 확인

```python
correct_prediction = tf.equal(tf.argmax(hypothesis, 1), tf.argmax(Y, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
print(
    'Accuracy:',
    sess.run(
        accuracy, feed_dict={X: mnist.test.images, Y: mnist.test.labels}
    )
)
```

    Accuracy: 0.9731

**Xavier Initialization**를 사용해 더 **Deep**하게<br/>
**Neural Network**를 구성하였음에도 불구하고 정확도는<br/>
이전 게시글에서 작성한 것보다 낮게 나왔다.<br/>
이는 아마도 **Overfitting**이 발생한 상황으로 추측이 된다.<br/>
**Overfitting**을 방지하기 위해 **Drop out**이라는 방법을 사용할 수 있다.<br/>

## 임의의 정수 예측하기

```python
r = random.randint(0, mnist.test.num_examples - 1)
print("Label: ", sess.run(tf.argmax(mnist.test.labels[r:r+1], 1)))
print(
    "Prediction: ",
    sess.run(
        tf.argmax(hypothesis, 1), feed_dict={X: mnist.test.images[r:r+1]}
    )
)
```

    Label:  [3]
    Prediction:  [3]

## 예측한 정수 그리기

```python
plt.imshow(
    mnist.test.images[r:r + 1].reshape(28, 28),
    cmap='Greys', interpolation='nearest'
)
plt.show()
```

<img src="/assets/2019-06-03/3.png" width="300" height="auto" alt="아직 안만듬"><br/>
