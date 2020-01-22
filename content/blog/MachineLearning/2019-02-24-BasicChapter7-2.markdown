---
title: 'Cost 함수 소개'
date: 2019-02-24 00:00:01
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Sigmoid?

`0`에서 `1`사이의 값을 필요로 하다.

$$
    WX = y
    \begin{bmatrix}
        2.0 \rightarrow p = 0.7 \\
        1.0 \rightarrow p = 0.2 \\
        0.1 \rightarrow p = 0.1 \\
    \end{bmatrix}
$$

<br/>

### SoftMax

\begin{align}
S(y^i) = \frac{e^{y^i}}{\displaystyle \sum\_{j}^{} e^{y^j}}
\end{align}

$$
    y
    \begin{bmatrix}
        2.0 \\
        1.0 \\
        0.1 \\
    \end{bmatrix}
    \rightarrow
    \begin{bmatrix}
        0.7 \\ 0.2 \\ 0.1 \\
    \end{bmatrix}
    \rightarrow
    \begin{bmatrix}
        1.0 \\ 0.0 \\ 0.0
    \end{bmatrix}
$$

**SoftMax**을 이용하여 수치를 `0`에서 `1`사이의 값으로 변환하고<br/>
**One Hot Encoding**을 이용하여 마지막 확률을 예측

<br/>

### Cost Function

**Cross - Entropy**를 사용
\begin{align}
D(S, L) = - \displaystyle \sum\_{i}^{} L_i log(S_i)
\end{align}

**Logistic cost**와 **Cross entropy**는 결국 같은 식
\begin{align}
C(H(x), y) == D(S, L)
\end{align}

**Cost Function**
\begin{align}
Loss = \frac{1}{N} \displaystyle \sum\_{i}^{} D(S(Wx_i+b), L_i)
\end{align}

**Cost**를 계산하며 **Gradient descent**알고리즘을 사용해 최적화된 값을 찾는다.
