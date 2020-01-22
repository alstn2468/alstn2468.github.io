---
title: 'lab:TensorFlow로 파일에서 데이타 읽어오기'
date: 2019-01-07 01:41:23
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Slicing

```python
nums = list(range(5)) # Range is a built in function that creates a of integers
print(nums)           # Prints "[0, 1, 2, 3, 4]"
print(nums[2:4])      # Get a slice from index 2 to 4 (exclusive) prints "[2, 3]"
print(nums[2:])       # Get a slice from index 2 to end prints "[2, 3, 4]"
print(nums[:2])       # Get a slice from start to 2 (exclusive) prints "[0, 1]"
print(nums[:])        # Get a slice of the whole list prints "[0, 1, 2, 3, 4]"
print(nums[:-1])      # Slice indices can be negative prints "[0, 1, 2, 3]"
nums[2:4] = [8, 9]    # Assign a new sublist to a slice
print(nums)           # Prints "[0, 1, 8, 9, 4]"
```

    [0, 1, 2, 3, 4]
    [2, 3]
    [2, 3, 4]
    [0, 1]
    [0, 1, 2, 3, 4]
    [0, 1, 2, 3]
    [0, 1, 8, 9, 4]

## Indexing, Slicing, Iterating

- Arrays can be indexted, sliced, iterated much like lists<br/>
  and other sequence types in Python
- As with Python lists, slicing in Numpy can be<br/>
  accomplished with the colon(`:`) syntax
- Colon instances(`:`) can be replaced with dots(`...`)

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
print(a)
# [1 2 3 4 5]
print(a[1:3])
# [2 3]
print(a[-1])
# 5
a[0:2] = 9
print(a)
# [9 9 3 4 5]
```

    [1 2 3 4 5]
    [2 3]
    5
    [9 9 3 4 5]

```python
b = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
print(b)
# [[ 1  2  3  4]
#  [ 5  6  7  8]
#  [ 9 10 11 12]]

print(b[:, 1])
# [ 2  6 10]
print(b[-1])
# [ 9 10 11 12]
print(b[-1, :])
# [ 9 10 11 12]
print(b[-1, ...])
# [ 9 10 11 12]
print(b[0:2, :])
# [[1 2 3 4]
#  [5 6 7 8]]
```

    [[ 1  2  3  4]
     [ 5  6  7  8]
     [ 9 10 11 12]]
    [ 2  6 10]
    [ 9 10 11 12]
    [ 9 10 11 12]
    [ 9 10 11 12]
    [[1 2 3 4]
     [5 6 7 8]]

## Loading data from file

```python
import tensorflow as tf
import numpy as np

xy = np.loadtxt('data-01-test-score.csv',
               delimiter=',',
               dtype=np.float32)
x_data = xy[:, 0:-1]
y_data = xy[:, [-1]]

# Make sure the shape and data are OK
print(x_data.shape, x_data, len(x_data))
print(y_data.shape, y_data)

# Placeholders for a tensor that will be always fed.
X = tf.placeholder(tf.float32, shape=[None, 3])
Y = tf.placeholder(tf.float32, shape=[None, 1])

W = tf.Variable(tf.random_normal([3, 1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

# Hypothesis
hypothesis = tf.matmul(X, W) + b

# Simplifed cost/loss function
cost = tf.reduce_mean(tf.square(hypothesis - Y))

# Minimize
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

# Launch the graph in a session.
sess = tf.Session()
# Initalizaties global variables in the graph.
sess.run(tf.global_variables_initializer())
# Set up feed_dict variables inside the loop.
for step in range(2001):
    cost_val, hy_val, _ = sess.run([cost, hypothesis, train],
                                  feed_dict={X: x_data, Y: y_data})
    if step % 200 == 0:
        print(step, "Cost:", cost_val, "\nPrediction:\n", hy_val)

# Ask my score
print('Your score will be ',
      sess.run(hypothesis, feed_dict={X: [[100, 70, 101]]}))
print('Other scores will be ',
      sess.run(hypothesis, feed_dict={X: [[60, 70, 110], [90, 100, 80]]}))
```

    (25, 3) [[ 73.  80.  75.]
     [ 93.  88.  93.]
     [ 89.  91.  90.]
     [ 96.  98. 100.]
     [ 73.  66.  70.]
     [ 53.  46.  55.]
     [ 69.  74.  77.]
     [ 47.  56.  60.]
     [ 87.  79.  90.]
     [ 79.  70.  88.]
     ...
     [168.16574 ]
     [154.1013  ]
     [190.0794  ]]
    Your score will be  [[178.08527]]
    Other scores will be  [[177.84918]
     [179.8424 ]]

## Queue Runners

파일이 커 메모리에 한 번에 올리기 어려울 때 사용<br/>
여러개의 파일을 읽어와 `큐`에 삽입한 후 사용

```python
filename_queue = tf.train.string_input_producer(['data-01-test-score.csv'],
                                                shuffle=False,
                                                name='filename_queue')

reader = tf.TextLineReader()
key, value = reader.read(filename_queue)

# Default values, in case of empty columns. Also specifies the type of the
# decoded result.
record_defaults = [[0.], [0.], [0.], [0.]]
xy = tf.decode_csv(value, record_defaults=record_defaults)
```

## tf.train.batch

```python
# collect batches of csv in
train_x_batch, train_y_batch = \
    tf.train.batch([xy[0:-1], xy[-1:]], batch_size=10)

# placeholders for a tensor that will be always fed.
X = tf.placeholder(tf.float32, shape=[None, 3])
Y = tf.placeholder(tf.float32, shape=[None, 1])

W = tf.Variable(tf.random_normal([3, 1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

# Hypothesis
hypothesis = tf.matmul(X, W) + b

# Simplified cost/loss function
cost = tf.reduce_mean(tf.square(hypothesis - Y))

# Minimize
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

# Launch the graph in a session.
sess = tf.Session()
# Initializes global variables in the graph.
sess.run(tf.global_variables_initializer())

# Start populating the filename queue.
coord = tf.train.Coordinator()
threads = tf.train.start_queue_runners(sess=sess, coord=coord)

for step in range(2001):
    x_batch, y_batch = sess.run([train_x_batch, train_y_batch])
    cost_val, hy_val, _ = sess.run([cost, hypothesis, train],
                                   feed_dict={X: x_batch, Y: y_batch})
    if step % 200 == 0:
        print(step, "Cost: ", cost_val, "\nPrediction:\n", hy_val)

coord.request_stop()
coord.join(threads)

# Ask my score
print("Your score will be ",
      sess.run(hypothesis, feed_dict={X: [[100, 70, 101]]}))

print("Other scores will be ",
      sess.run(hypothesis, feed_dict={X: [[60, 70, 110], [90, 100, 80]]}))
```

    0 Cost:  22151.262
    Prediction:
     [[ 7.2209897]
     [ 8.223362 ]
     [ 8.158764 ]
     [11.476162 ]
     [ 3.9453242]
     [ 6.7052045]
     [12.457916 ]
     [14.690582 ]
     [10.668201 ]
     [15.46727  ]]
    200 Cost:  10.406
    Prediction:
     [[153.47284 ]
     [183.99193 ]
     [181.35991 ]
     ...
     [117.32164 ]
     [174.39641 ]
     [165.7827  ]]
    2000 Cost:  6.780886
    Prediction:
     [[153.70616 ]
     [184.24493 ]
     [181.66989 ]
     [199.7963  ]
     [138.71309 ]
     [105.05913 ]
     [152.4696  ]
     [117.156815]
     [174.3722  ]
     [165.6622  ]]
    Your score will be  [[184.30801]]
    Other scores will be  [[192.92122]
     [173.19138]]

## shuffle_batch

```python
# min_after_dequeue defines how big a buffer we will randomly sample
#   from -- bigger means better shuffling but slower start up and more
#   memory used.
# capacity must be Larger than min_after_dequeue and the amount Larger
#   determines the maximum we will prefetch. Recommendation:
#   min_after_dequeue + (num_threads + a small safety margin) * batch_size
min_after_dequeue = 10000
capacity = min_after_dequeue + 3 * batch_size
example_batch, label_batch = tf.train.shuffle_batch([example, label],
                                                    batch_size=batch_size,
                                                    capacity=capacity,
                                                    min_after_dequeue=min_after_dequeue)
```
