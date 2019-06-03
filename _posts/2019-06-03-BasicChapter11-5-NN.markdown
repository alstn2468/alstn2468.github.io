---
title:  "Neural Network로 MNIST 학습하기"
date:   2019-06-03 00:00:03
categories: [Machine Learning]
tags: [Machine Learning, Deep Learning, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### 사용할 모듈 추가

```python
import tensorflow as tf
import matplotlib.pyplot as plt
import random
```


### MNIST 데이터 불러오기


```python
from tensorflow.examples.tutorials.mnist import input_data

mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)
```

### 상수 정의


```python
learning_rate = 0.001
training_epochs = 15
batch_size = 100
```

### 입력값 placeholder 선언


```python
X = tf.placeholder(tf.float32, [None, 784])
Y = tf.placeholder(tf.float32, [None, 10])
```

### Neural Network 구성


```python
W1 = tf.Variable(tf.random_normal([784, 256]))
b1 = tf.Variable(tf.random_normal([256]))
L1 = tf.nn.relu(tf.matmul(X, W1) + b1)

W2 = tf.Variable(tf.random_normal([256, 256]))
b2 = tf.Variable(tf.random_normal([256]))
L2 = tf.nn.relu(tf.matmul(L1, W2) + b2)

W3 = tf.Variable(tf.random_normal([256, 10]))
b3 = tf.Variable(tf.random_normal([10]))
hypothesis = tf.matmul(L2, W3) + b3
```

### 손실함수와 최적화 방법 정의


```python
cost = tf.reduce_mean(
    tf.nn.softmax_cross_entropy_with_logits_v2(
        logits=hypothesis, labels=Y
    )
)
optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate).minimize(cost)
```

### Session 초기화


```python
sess = tf.Session()
sess.run(tf.global_variables_initializer())
```

### 모델 학습 진행


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

    Epoch: 0001 cost = 183.513505096
    Epoch: 0002 cost = 43.499959541
    Epoch: 0003 cost = 27.054975612
    Epoch: 0004 cost = 18.866209335
    Epoch: 0005 cost = 13.745875303
    Epoch: 0006 cost = 10.223983004
    Epoch: 0007 cost = 7.581343187
    Epoch: 0008 cost = 5.765891739
    Epoch: 0009 cost = 4.320811899
    Epoch: 0010 cost = 3.161147363
    Epoch: 0011 cost = 2.411464093
    Epoch: 0012 cost = 1.727428055
    Epoch: 0013 cost = 1.445400364
    Epoch: 0014 cost = 1.131284376
    Epoch: 0015 cost = 0.882475840
    Learning Finished!


### 모델 테스트 및 정확도 확인


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

    Accuracy: 0.9459


### 임의의 정수 예측하기


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

    Label:  [9]
    Prediction:  [9]


### 예측한 정수 그리기


```python
plt.imshow(
    mnist.test.images[r:r + 1].reshape(28, 28), 
    cmap='Greys', interpolation='nearest'
)
plt.show()
```


<img src="/assets/2019-06-03/1.png" width="300" height="auto" alt="아직 안만듬"><br/>
