---
title:  "Lab:Tensor Manipulation"
date:   2019-05-13 00:00:03
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

```python
import numpy as np
import tensorflow as tf
import pprint

pp = pprint.PrettyPrinter(indent=4)
sess = tf.InteractiveSession()
```


### 1차원 Array


```python
t = np.array([0., 1., 2., 3., 4., 5., 6.])
pp.pprint(t)
```

    array([0., 1., 2., 3., 4., 5., 6.])


#### Rank (차원)


```python
print(t.ndim)
```

    1


#### Shape (모양)


```python
print(t.shape)
```

    (7,)


#### Indexing & Slicing


```python
print(t[0], t[1], t[-1])
print(t[2:5], t[4:-1])
print(t[:2], t[3:])
```

    0.0 1.0 6.0
    [2. 3. 4.] [4. 5.]
    [0. 1.] [3. 4. 5. 6.]


<br/>

### 2차원 Array


```python
t = np.array([
    [1., 2., 3.],
    [4., 5., 6.],
    [7., 8., 9.],
    [10., 11., 12.],
])
pp.pprint(t)
```

    array([[ 1.,  2.,  3.],
           [ 4.,  5.,  6.],
           [ 7.,  8.,  9.],
           [10., 11., 12.]])


#### Rank (차원)


```python
print(t.ndim)
```

    2


#### Shape (모양)


```python
print(t.shape)
```

    (4, 3)


<br/>

### Shape, Rank, Axis
- Shape (모양)
- Rank (차원, **대괄호의 갯수**)
- Axis (축)


```python
t = tf.constant([1, 2, 3, 4])
tf.shape(t).eval()
```




    array([4], dtype=int32)



Rank = 1, Shape = (4)


```python
t = tf.constant([
    [1, 2],
    [3, 4],
])
tf.shape(t).eval()
```




    array([2, 2], dtype=int32)



Rank = 2, Shape = (2, 2)


```python
t = tf.constant([
    [
        [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ],
        [
            [13, 14, 15, 16],
            [17, 18, 19, 20],
            [21, 22, 23, 24],
        ]
    ]
])
tf.shape(t).eval()
```




    array([1, 2, 3, 4], dtype=int32)



Rank = 4, Shape = (1, 2, 3, 4)<br/>
4개의 축(**Axis**) 존재

<br/>

### Matmul vs Multiply
행령 곱셈은 두 행렬이 (a, **b**) (**b**, c)의<br/>
**shape**을 갖고 있어야 곱셈이 가능하다.

#### Matmul


```python
matrix1 = tf.constant([[1., 2.], [3., 4.]])
matrix2 = tf.constant([[1.], [2.]])
print("Matrix 1 shape", matrix1.shape)
print("Matrix 2 shape", matrix2.shape)
tf.matmul(matrix1, matrix2).eval()
```

    Matrix 1 shape (2, 2)
    Matrix 2 shape (2, 1)

    array([[ 5.],
           [11.]], dtype=float32)



#### Multiply


```python
(matrix1 * matrix2).eval()
```




    array([[1., 2.],
           [6., 8.]], dtype=float32)



<br/>

### Broadcasting
굉장이 **유용**하나 **유의**해서 사용


```python
# Operations between the same shapes
matrix1 = tf.constant([[3., 3.]])
matrix2 = tf.constant([[2., 2.]])
(matrix1 + matrix2).eval()
```




    array([[5., 5.]], dtype=float32)



Rank나 Shape이 다르더라도 연산을 가능하도록<br/>
하는것이 **Broadcaating**기능 이다.


```python
matrix1 = tf.constant([[1., 2.]])
matrix2 = tf.constant(3.)
print((matrix1 + matrix2).eval())

matrix1 = tf.constant([[1., 2.]])
matrix2 = tf.constant([3., 4.])
print((matrix1 + matrix2).eval())

matrix1 = tf.constant([[1., 2.]])
matrix2 = tf.constant([[3.], [4.]])
print((matrix1 + matrix2).eval())
```

    [[4. 5.]]
    [[4. 6.]]
    [[4. 5.]
     [5. 6.]]


<br/>

### Reduce mean
**평균**을 계산


```python
tf.reduce_mean([1, 2], axis=0).eval()
```




    1



1과 2의 평균은 1.5가 나올것으로 예상되나<br/>
데이터 타입이 `Integer`이기 때문에 1이 반환<br/>
아래와 같이 `Float`자료형을 사용하는 것이 좋다.


```python
x = [
    [1., 2.],
    [3., 4.],
]
tf.reduce_mean(x).eval()
```




    2.5



위의 x리스트의 axis=0은 `[1., 3.], [2., 4.]`이고<br/>
axis=1은 `[1., 2.], [3., 4.]`이다.<br/>
axis가 -1인 경우 **가장 안쪽**에 있는 축을 뜻한다.<br/>


```python
tf.reduce_mean(x, axis=0).eval()
```




    array([2., 3.], dtype=float32)




```python
tf.reduce_mean(x, axis=1).eval()
```




    array([1.5, 3.5], dtype=float32)




```python
tf.reduce_mean(x, axis=-1).eval()
```




    array([1.5, 3.5], dtype=float32)



<br/>

### Reduce sum
**합**을 계산


```python
x = [
    [1., 2.],
    [3., 4.],
]
tf.reduce_sum(x).eval()
```




    10.0




```python
tf.reduce_sum(x, axis=0).eval()
```




    array([4., 6.], dtype=float32)




```python
tf.reduce_sum(x, axis=1).eval()
```




    array([3., 7.], dtype=float32)




```python
tf.reduce_sum(x, axis=-1).eval()
```




    array([3., 7.], dtype=float32)




```python
tf.reduce_mean(tf.reduce_sum(x, axis=-1)).eval()
```




    5.0



<br/>

### Argmax
`argmax`함수는 리스트에서 가장 **큰 값의 인덱스** 반환<br/>
아래의 x리스트의 axis=1값은 `[0, 1, 2], [2, 1, 0]`고<br/>
axis=0의 값은 `[0, 2], [1, 1], [2, 0]`다.


```python
x = [
    [0, 1, 2],
    [2, 1, 0],
]
tf.argmax(x, axis=0).eval()
```




    array([1, 0, 0])




```python
tf.argmax(x, axis=1).eval()
```




    array([2, 0])




```python
tf.argmax(x, axis=-1).eval()
```




    array([2, 0])



<br/>

### Reshape (⭐️중요⭐️)
기존 데이터는 유지하고 **차원과 형상을 바꾸는데 사용**<br/>
파라미터로 입력한 차원에 맞게 변경한다.<br/>
**-1로 설정**하면 나머지를 **자동**으로 맞춘다.


```python
t = np.array([
    [
        [0, 1, 2],
        [3, 4, 5]
    ],
    [
        [6, 7, 8],
        [9, 10, 11]
    ]
])
t.shape
```




    (2, 2, 3)




```python
tf.reshape(t,  shape=[-1, 3]).eval()
```




    array([[ 0,  1,  2],
           [ 3,  4,  5],
           [ 6,  7,  8],
           [ 9, 10, 11]])




```python
tf.reshape(t, shape=[-1, 1, 3]).eval()
```




    array([[[ 0,  1,  2]],

           [[ 3,  4,  5]],

           [[ 6,  7,  8]],

           [[ 9, 10, 11]]])



#### Reshape (squeeze, expand)
- squeeze : 값들을 펴준다.
- expand : 차원을 확장한다.


```python
tf.squeeze([[0], [1], [2]]).eval()
```




    array([0, 1, 2], dtype=int32)




```python
tf.expand_dims([0, 1, 2], 1).eval()
```




    array([[0],
           [1],
           [2]], dtype=int32)



<br/>

### One hot
정보를 가지고 있을때 자리를 보고<br/>
**값이 있는 곳**을 1로 바꾸어 주는 방법


```python
tf.one_hot([[0], [1], [2], [0]], depth=3).eval()
```




    array([[[1., 0., 0.]],

           [[0., 1., 0.]],

           [[0., 0., 1.]],

           [[1., 0., 0.]]], dtype=float32)



<br/>

### Casting
모든 데이터 **타입을 바꾸어**주는 기능<br/>
`True`, `False` 값으로도 변경 가능


```python
tf.cast([1.8, 2.2, 3.3, 4.9], tf.int32).eval()
```




    array([1, 2, 3, 4], dtype=int32)




```python
tf.cast([True, False, 1 == 1, 0 == 1], tf.int32).eval()
```




    array([1, 0, 1, 0], dtype=int32)



<br/>

### Stack
값을 쌓아주는 기능<br/>
축(**axis**)를 기준으로도 가능


```python
x = [1, 4]
y = [2, 5]
z = [3, 6]

tf.stack([x, y, z]).eval()
```




    array([[1, 4],
           [2, 5],
           [3, 6]], dtype=int32)




```python
tf.stack([x, y, z], axis=1).eval()
```




    array([[1, 2, 3],
           [4, 5, 6]], dtype=int32)



<br/>

### Ones and Zeros like
**똑같은 shape**을 가진 0 또는 1로 채워진 Tensor 생성


```python
x = [[0, 1, 2],
     [2, 1, 0]]

tf.ones_like(x).eval()
```




    array([[1, 1, 1],
           [1, 1, 1]], dtype=int32)




```python
tf.zeros_like(x).eval()
```




    array([[0, 0, 0],
           [0, 0, 0]], dtype=int32)



<br/>

### Zip
복수개의 Tensor들을 한번에 처리할 때 유용


```python
for x, y in zip([1, 2, 3], [4, 5, 6]):
    print(x, y)
```

    1 4
    2 5
    3 6



```python
for x, y, z in zip([1, 2, 3], [4, 5, 6], [7, 8, 9]):
    print(x, y, z)
```

    1 4 7
    2 5 8
    3 6 9
