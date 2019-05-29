---
title:  "Dropout 과 앙상블"
date:   2019-05-29 00:00:03
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Overfitting
**Training Set**에 대해서 **높은 정확도**를 갖는다.<br/>
**Test Set**에 대해서는 **낮은 정확도**를 갖는다.<br/>
**Overfitting**된 모델은 실제로 사용 불가능하다.<br/>

<br/>

### Overfitting을 방지하는 법
- 더 많은 학습 데이터
- **Feature**의 갯수를 줄인다.
- **정규화(Regularization)**

<br/>

### 정규화 (Regularization)
**Weight**값이 너무 크지 않도록 조절<br/>

#### L2 Regularization
\begin{align}
    cost + \lambda \sum{W^2}
\end{align}

```python
l2reg = 0.001 * tf.reduce_sum(tf.square(W))
```

<br/>

### Dropout
연결된 **Neural Network**에서 데이터를<br/>
학습할때 몇개의 **노드의 연결을 끊는** 방법

아래와 같은 코드로 **Dropout** 사용 가능
```python
dropout_rate = tf.placeholder("float")
_L1 = tf.nn.relu(tf.add(tf.matmul(X, W1), B1))
L1 = tf.nn.dropout(_L1, dropout_rate)
```

#### Train
학습시에는 아래와 같이 `feed_dixt`에 `dropout_rate`를 지정해서 사용
```python
sess.run(
    optimizer, 
    feed_dict={
        X: batch_xs, 
        Y: batch_ys, 
        dropout_rate: 0.7
    }
)
```

#### Evaluation
평가시에는 `dropout_rate`를 1로 지정해 사용
```python
print("Accuracy : ",
      accuracy.eval({
          X: mnist.test.images,
          Y: mnist.test.labels,
          dropout_rate: 1
      })
)
```

<br/>

### Ensemble (앙상블)
실제 데이터에 대해 좋은 결과를 낸다는 뜻이다.<br/>
데이터가 많고, 컴퓨터도 많다면 **앙상블(ensemble)** 사용 가능<br/>
데이터를 **여러 개**의 Training Set으로 **나누어**서 **동시에 학습을 진행**해서,<br/>
모든 training set에 대한 **학습이 끝나면 결과를 통합**하는 방법이다.<br/>
앙상블을 사용하면 **최소 2%에서 4~5%까지의 성능이 향상**이 가능하다.<br/>
여러 번의 시도를 거쳐 **균형 잡힌 결과를 도출하**기 때문에 점에서 dropout과 비슷한 부분이 있다.<br/>
