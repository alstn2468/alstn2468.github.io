---
title:  "학습 rate, Overfitting, 그리고 일반화 (Regularization)"
date:   2019-04-30 00:00:01
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Learning rate 조절

#### Learning rate가 클 경우
cost가 줄어들지 않고 그래프 밖으로 값이 튀어 나갈 수 있어<br/>
학습이 이루어지지 않을 수 있다.<br/>
이 현상을 **Overshooting**이라고 한다.<br/>

#### Learning rate가 작을 경우
cost가 줄어들지만 너무 오래걸려 멈추게 되면 최저점에<br/>
도달하지 않아도 멈추는 경우가 있다.<br/>
이 상황을 방지하기 위해 cost의 값을 출력해보고 값이<br/>
너무 변하지 않으면 Learning rate를 조절해야하 한다.<br/>

#### 결론
Lerning rate를 정하는 것에는 답이 없다.<br/>
초기값으로는 보통 **0.01**을 사용한다.<br/>
**발산**이 될 경우 더 작게 너무 **늦게** 움직일 경우 더 크게 바꾸며 사용<br/>

<br/>

### Data 전처리
경사하강법을 위한 데이터(X) 전처리

| x1 | x2 | y |
| - | - | - |
| 1 | 9000 | A |
| 2 | -5000 | A |
| 4 | -2000 | B |
| 6 | 8000 | B |
| 9 | 9000 | C |

다음과 같은 2차원 데이터에서 x2 데이터들의 **차이**가<br/>
너무 크기때문에 **왜곡**된 그래프가 그려질 수 있다.<br/>
이러한 상황에서 필요한 것이 **정규화(Normalization)**다.<br/>

#### Zero-centered data
데이터의 중심이 **0**으로 갈 수 있도록 변화

#### Normalization
데이터가 어떠한 **범위**안에 항상 들어가도록 변화

#### Standardization
$$
    x'_j = \frac{x_j - {\mu}_j}{\sigma_j} \
$$

계산한 평균과 분산을 나누어주면 된다.

#### Python Code
```python
X_sdt[:,0] = (X[:,0] - X[:,0].mean()) / X[:,0].std()
```

<br/>

### Overfitting 방지
학습된 데이터에 너무 잘 맞는 모델이 생성되어 실제 테스트 결과가<br/>
알맞지 않은 결과를 도출하는 상황을 **Overfitting**이라고 한다.<br/>

#### Overfitting을 해결하는 방법
- 학습 데이터가 더 많이가지고 있어야한다.
- 중복된 Feature들의 개수를 줄여야한다.
- 일반화 (**Regularization**)

#### 일반화 (Regularization)
가지고 있는 **Weight**을 큰 값을 갖지 안도록 하는 것<br/>
**Overfitting**된 그래프를 편다는 것은 **Weight**을 적은 값을 갖도록 하는 것

기존의 Loss (i는 Training SET)<br/>
$$
    Loss = \frac{1}{N} \sum_{i} D(S(WX_i+b), L_i) \
$$

변경된 Loss<br/>
$$
    Loss = \frac{1}{N} \sum_{i} D(S(WX_i+b), L_i) + \lambda \sum W^2\
$$

뒤에 추가된 식에서 **상수**(람다)는 **Regularization Strength**라고 한다.<br/>
이 값이 **0**일 경우 일반화를 하지 않겠다. **클 경우** 일반화를 중요하게 생각한다는 것이다.<br/>
**W**는 벡터의 값 각각의 Element에 **제곱**을 해준 값이다.<br/>

#### Python Code
```python
l2reg = 0.001 * tf.reduce_sum(tf.square(W))
```

<br/>

### 강의 요약
- Learning Rate 조절
- 데이터 전처리
- Overfitting 해결
    + 더 많은 데이터
    + 일반화 (Regularization)
