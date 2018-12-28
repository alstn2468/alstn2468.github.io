---
title:  "TensorFlow의 설치및 기본적인 operations (new)"
date:   2018-12-29 01:41:23
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### TensorFlow란
- **Data flow graphs**를 사용해서 **numerical** 계산을 할 수 있는 라이브러리
- **Python**으로 구현 가능

<br/>

### Data Flow Graph란
- 하나의 **노드**는 **연산자**로 구성
- **간선**은 데이터 배열(**tensors**)로 구성

<br/>

### TensorFlow 설치하기
- Linux, Max OSX, Windows
    + (sudo -H) pip install --upgrade tensorflow
    + (sudo -H) pip install --upgrade tensorflow-gpu

<br/>

### TensorFlow 설치 및 버전 확인하기


```python
import tensorflow as tf

tf.__version__
```

    '1.12.0'



<br/>

### TensorFlow Hello World!
- b'String'의 `'b'`는 **바이트 문자**를 나타낸다.
- 노드를 생성한 후 세션을 만들고 세션에 노드를 실행


```python
# Create a constant op
# This op is added as a node to the default graph
hello = tf.constant("Hello, TensorFlow!")

# Seart a TF session
sess = tf.Session()

# Run the op and get result
print(sess.run(hello))
```

    b'Hello, TensorFlow!'


<br/>

### Computational Graph


```python
node1 = tf.constant(3.0, tf.float32)
node2 = tf.constant(4.0) # 명시적으로 tf.float32형
node3 = tf.add(node1, node2) # node3 = node1 + node2
```

#### 그냥 노드를 출력할 경우
- 결과 값이 출력되지 않는다.


```python
print("node1 : ", node1, "node2 : ", node2)
print("node3 : ", node3)
```

    node1 :  Tensor("Const_1:0", shape=(), dtype=float32) node2 :  Tensor("Const_2:0", shape=(), dtype=float32)
    node3 :  Tensor("Add:0", shape=(), dtype=float32)


#### 해결 방법
- Session을 생성하여 run해야한다.


```python
sess = tf.Session()
print("sess.run(node1, node2) : ", sess.run([node1, node2]))
print("sess.run(node3) : ", sess.run(node3))
```

    sess.run(node1, node2) :  [3.0, 4.0]
    sess.run(node3) :  7.0


<br/>

### TensorFlow의 Mechanics
1. TensorFlow 연산자를 사용해 **Graph를 생성**
2. `sess.run(op)`를 사용해 그래프 실행
3. 그래프 변수값 업데이트 및 반환

<br/>

### 예제
1. TensorFlow 연산자를 사용해 **Graph를 생성**


```python
node1 = tf.constant(3.0, tf.float32)
node2 = tf.constant(4.0)
node3 = tf.add(node1, node2)
```

2. `sess.run(op)`를 사용해 그래프 실행
3. 그래프 변수값 업데이트 및 반환


```python
sess = tf.Session()
print("sess.run(node1, node2) : ", sess.run([node1, node2]))
print("sess.run(node3) : ", sess.run(node3))
```

    sess.run(node1, node2) :  [3.0, 4.0]
    sess.run(node3) :  7.0


<br/>

### Placeholder
- 데이터 값을 모를 때 사용 가능


```python
a = tf.placeholder(tf.float32)
b = tf.placeholder(tf.float32)
adder_node = a + b

print(sess.run(adder_node, feed_dict={a: 3, b: 4.5}))
print(sess.run(adder_node, feed_dict={a: [1, 3], b: [2, 4]}))
```

    7.5
    [3. 7.]


<br/>

### Tensor의 모든것
- Rank : 차원


```python
# a rank 0 tensor
# This is a scalar with shape []
3

# a rank 1 tensor
# This is a vector with shape [3]
[1., 2., 3.]

# a rank 2 tensor
# This is a matrix with shape [2, 3]
[[1., 2., 3.], [4., 5., 6.]]

# a rank 3 tensor with shape [2, 1, 3]
[[[1., 2., 3.]], [[7., 8., 9.]]]
```




    [[[1.0, 2.0, 3.0]], [[7.0, 8.0, 9.0]]]



### Rank

| Rank | Math entity                      | Python example                                               |
| ---- | -------------------------------- | ------------------------------------------------------------ |
| 0    | Scalar (magnitude only)          | s = 483                                                      |
| 1    | Vector (magnitude and direction) | v = [1.1, 2.2, 3.3]                                          |
| 2    | Matrix (table of numbers)        | m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]                        |
| 3    | 3-Tensor (cube of numbers        | t = [[[2], [4], [6]], [[8], [10], [12]], [[14], [16], [18]]] |
| n    | n-Tensor                         | ...                                                          |

<br/>

### Shape

| Rank | Shape               | Dimension number | Example                                  |
| ---- | ------------------- | ---------------- | ---------------------------------------- |
| 0    | []                  | 0-D              | A 0-D tensor. A scalar.                  |
| 1    | [D0]                | 1-D              | A 1-D tensor with shape [5].             |
| 2    | [D0, D1]            | 2-D              | A 2-D tensor with shape [3, 4].          |
| 3    | [D0, D1, D2]        | 3-D              | A 3-D tensor with shape [1, 4, 3].       |
| n    | [D0, D1, ..., Dn-1] | n-D              | A tensor with shape [D0, D1, ..., Dn-1]. |

<br/>

### Types

| Data type | Python type | Description             |
| --------- | ----------- | ----------------------- |
| DT_FLOAT  | tf.float32  | 32 bits floating point. |
| DT_DOUBLE | tf.float64  | 64 bits floating point. |
| DT_INT8   | tf.int8     | 8 bits signed integer.  |
| DT_INT16  | tf.int16    | 16 bits signed integer. |
| DT_INT32  | tf.int32    | 32 bits signed integer. |
| DT_INT64  | tf.int64    | 64 bits signed integer. |
