---
title:  "lab 04-2: TensorFlow로 파일에서 데이타 읽어오기 (new)"
date:   2019-01-07 01:41:23
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Slicing


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


### Indexing, Slicing, Iterating
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


<br/>

### Loading data from file


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
     [ 69.  70.  73.]
     [ 70.  65.  74.]
     [ 93.  95.  91.]
     [ 79.  80.  73.]
     [ 70.  73.  78.]
     [ 93.  89.  96.]
     [ 78.  75.  68.]
     [ 81.  90.  93.]
     [ 88.  92.  86.]
     [ 78.  83.  77.]
     [ 82.  86.  90.]
     [ 86.  82.  89.]
     [ 78.  83.  85.]
     [ 76.  83.  71.]
     [ 96.  93.  95.]] 25
    (25, 1) [[152.]
     [185.]
     [180.]
     [196.]
     [142.]
     [101.]
     [149.]
     [115.]
     [175.]
     [164.]
     [141.]
     [141.]
     [184.]
     [152.]
     [148.]
     [192.]
     [147.]
     [183.]
     [177.]
     [159.]
     [177.]
     [175.]
     [175.]
     [149.]
     [192.]]
    0 Cost: 83459.91
    Prediction:
     [[428.80652]
     [508.6254 ]
     [504.6094 ]
     [549.4961 ]
     [386.36072]
     [284.1231 ]
     [413.24695]
     [309.21674]
     [473.7868 ]
     [438.21057]
     [396.19135]
     [387.69818]
     [521.2238 ]
     [432.9361 ]
     [414.14325]
     [516.72235]
     [410.28946]
     [497.39478]
     [497.9635 ]
     [446.31726]
     [483.5828 ]
     [477.58524]
     [461.6496 ]
     [432.16376]
     [528.17664]]
    200 Cost: 17.090117
    Prediction:
     [[156.8759 ]
     [182.35207]
     [182.82706]
     [199.17577]
     [137.56065]
     [100.95138]
     [151.0479 ]
     [114.8609 ]
     [169.14423]
     [156.3639 ]
     [143.61533]
     [138.94885]
     [188.6603 ]
     [156.33766]
     [150.83678]
     [185.6988 ]
     [146.88855]
     [182.67897]
     [180.80528]
     [162.498  ]
     [176.1491 ]
     [171.58302]
     [168.45245]
     [157.71538]
     [189.88504]]
    400 Cost: 15.374473
    Prediction:
     [[156.57225 ]
     [182.50536 ]
     [182.70175 ]
     [199.15286 ]
     [137.71259 ]
     [101.29906 ]
     [151.05412 ]
     [114.882866]
     [169.5464  ]
     [157.03372 ]
     [143.65918 ]
     [139.26428 ]
     [188.42386 ]
     [156.01375 ]
     [150.933   ]
     [185.91467 ]
     [146.60306 ]
     [182.63808 ]
     [180.48201 ]
     [162.17323 ]
     [176.19043 ]
     [171.80441 ]
     [168.41559 ]
     [157.15746 ]
     [189.90921 ]]
    600 Cost: 13.932299
    Prediction:
     [[156.2931 ]
     [182.6473 ]
     [182.58708]
     [199.13144]
     [137.85411]
     [101.61861]
     [151.05777]
     [114.89901]
     [169.91609]
     [157.64734]
     [143.69882]
     [139.55367]
     [188.20811]
     [155.71881]
     [151.01941]
     [186.1131 ]
     [146.34483]
     [182.59712]
     [180.18636]
     [161.87575]
     [176.22652]
     [172.00786]
     [168.38005]
     [156.64696]
     [189.93275]]
    800 Cost: 12.719558
    Prediction:
     [[156.03636 ]
     [182.77873 ]
     [182.48218 ]
     [199.11133 ]
     [137.98595 ]
     [101.91234 ]
     [151.05914 ]
     [114.909996]
     [170.25595 ]
     [158.20947 ]
     [143.73462 ]
     [139.81915 ]
     [188.01125 ]
     [155.45026 ]
     [151.0969  ]
     [186.2955  ]
     [146.11136 ]
     [182.55627 ]
     [179.91594 ]
     [161.60321 ]
     [176.25784 ]
     [172.1948  ]
     [168.3458  ]
     [156.17978 ]
     [189.95569 ]]
    1000 Cost: 11.699425
    Prediction:
     [[155.80025 ]
     [182.90048 ]
     [182.38614 ]
     [199.09245 ]
     [138.10881 ]
     [102.1824  ]
     [151.0585  ]
     [114.916466]
     [170.56845 ]
     [158.72452 ]
     [143.7669  ]
     [140.06276 ]
     [187.8316  ]
     [155.20583 ]
     [151.16632 ]
     [186.4632  ]
     [145.90042 ]
     [182.51569 ]
     [179.66861 ]
     [161.35353 ]
     [176.28488 ]
     [172.36661 ]
     [168.31279 ]
     [155.75229 ]
     [189.97797 ]]
    1200 Cost: 10.840978
    Prediction:
     [[155.58301]
     [183.0133 ]
     [182.29825]
     [199.07472]
     [138.22337]
     [102.4307 ]
     [151.05615]
     [114.91895]
     [170.8558 ]
     [159.19638]
     [143.79602]
     [140.28632]
     [187.66772]
     [154.98337]
     [151.22842]
     [186.6174 ]
     [145.70998]
     [182.47548]
     [179.44238]
     [161.12476]
     [176.30812]
     [172.52454]
     [168.28102]
     [155.36108]
     [189.99956]]
    1400 Cost: 10.1183
    Prediction:
     [[155.38315 ]
     [183.11789 ]
     [182.21783 ]
     [199.05807 ]
     [138.33023 ]
     [102.65909 ]
     [151.0523  ]
     [114.917984]
     [171.12012 ]
     [159.62875 ]
     [143.82227 ]
     [140.49147 ]
     [187.51822 ]
     [154.78094 ]
     [151.2839  ]
     [186.75922 ]
     [145.53813 ]
     [182.43579 ]
     [179.23547 ]
     [160.91513 ]
     [176.32793 ]
     [172.66974 ]
     [168.25046 ]
     [155.00308 ]
     [190.02051 ]]
    1600 Cost: 9.509633
    Prediction:
     [[155.19919 ]
     [183.21486 ]
     [182.1442  ]
     [199.04243 ]
     [138.42992 ]
     [102.86916 ]
     [151.04716 ]
     [114.913994]
     [171.3633  ]
     [160.02493 ]
     [143.84587 ]
     [140.6798  ]
     [187.38185 ]
     [154.59683 ]
     [151.33339 ]
     [186.8897  ]
     [145.38318 ]
     [182.3967  ]
     [179.04623 ]
     [160.72304 ]
     [176.34465 ]
     [172.80324 ]
     [168.22108 ]
     [154.67546 ]
     [190.04079 ]]
    1800 Cost: 8.996802
    Prediction:
     [[155.02988]
     [183.30481]
     [182.07684]
     [199.02774]
     [138.52298]
     [103.06242]
     [151.04094]
     [114.90741]
     [171.58704]
     [160.388  ]
     [143.8671 ]
     [140.85266]
     [187.2575 ]
     [154.42941]
     [151.37744]
     [187.00974]
     [145.24362]
     [182.3583 ]
     [178.87317]
     [160.54703]
     [176.35867]
     [172.92601]
     [168.19286]
     [154.37567]
     [190.06042]]
    2000 Cost: 8.564464
    Prediction:
     [[154.874   ]
     [183.38828 ]
     [182.01517 ]
     [199.01392 ]
     [138.60986 ]
     [103.240265]
     [151.03378 ]
     [114.898575]
     [171.79295 ]
     [160.72073 ]
     [143.88617 ]
     [141.01137 ]
     [187.14409 ]
     [154.2772  ]
     [151.4166  ]
     [187.12021 ]
     [145.118   ]
     [182.32065 ]
     [178.71487 ]
     [160.38571 ]
     [176.37025 ]
     [173.03894 ]
     [168.16574 ]
     [154.1013  ]
     [190.0794  ]]
    Your score will be  [[178.08527]]
    Other scores will be  [[177.84918]
     [179.8424 ]]


<br/>

### Queue Runners
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


<br/>

### tf.train.batch


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
     [200.02066 ]
     [138.06415 ]
     [105.453125]
     [153.46744 ]
     [119.05544 ]
     [174.82988 ]
     [167.33237 ]]
    400 Cost:  9.778231
    Prediction:
     [[153.51967]
     [184.01764]
     [181.40793]
     [199.98935]
     [138.14502]
     [105.37993]
     [153.32802]
     [118.79093]
     [174.74454]
     [167.0656 ]]
    600 Cost:  9.226278
    Prediction:
     [[153.55983]
     [184.04445]
     [181.4518 ]
     [199.95985]
     [138.22379]
     [105.31602]
     [153.19685]
     [118.54186]
     [174.67007]
     [166.82373]]
    800 Cost:  8.739838
    Prediction:
     [[153.59407 ]
     [184.07213 ]
     [181.49191 ]
     [199.93213 ]
     [138.30038 ]
     [105.26045 ]
     [153.07343 ]
     [118.307274]
     [174.60542 ]
     [166.60457 ]]
    1000 Cost:  8.309912
    Prediction:
     [[153.62297]
     [184.10042]
     [181.5286 ]
     [199.90599]
     [138.37477]
     [105.21237]
     [152.95721]
     [118.08624]
     [174.5495 ]
     [166.40598]]
    1200 Cost:  7.929006
    Prediction:
     [[153.64714]
     [184.12914]
     [181.5621 ]
     [199.88136]
     [138.44691]
     [105.17097]
     [152.84778]
     [117.87793]
     [174.50143]
     [166.22612]]
    1400 Cost:  7.5907335
    Prediction:
     [[153.66708 ]
     [184.15808 ]
     [181.59277 ]
     [199.85818 ]
     [138.51682 ]
     [105.135544]
     [152.74466 ]
     [117.68153 ]
     [174.46039 ]
     [166.06331 ]]
    1600 Cost:  7.2896514
    Prediction:
     [[153.6833  ]
     [184.18712 ]
     [181.6208  ]
     [199.83633 ]
     [138.58449 ]
     [105.105484]
     [152.64752 ]
     [117.49634 ]
     [174.42561 ]
     [165.91599 ]]
    1800 Cost:  7.021037
    Prediction:
     [[153.6962  ]
     [184.21611 ]
     [181.64644 ]
     [199.81572 ]
     [138.64989 ]
     [105.080185]
     [152.55595 ]
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


<br/>

### shuffle_batch

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
