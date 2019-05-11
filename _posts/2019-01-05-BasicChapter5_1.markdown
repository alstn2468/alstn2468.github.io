---
title:  "multi-variable linear regression"
date:   2019-01-05 01:41:23
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Predicting exam score
**Regression using three inputs(x1, x2, x3)**

multi-variable/feature

| x1 (quiz1) | x2 (quiz2) | x3 (midterm 1) | Y (final) |
| ---------- | ---------- | -------------- | --------- |
| 73         | 80         | 75             | 152       |
| 93         | 88         | 93             | 185       |
| 89         | 91         | 90             | 180       |
| 96         | 98         | 100            | 196       |
| 73         | 66         | 70             | 142       |

3가지의 변수(x1, x2, x3)을 이용해 Y를 **예측**

<br/>

### Hypothesis

\begin{align}
H(x_1, x_2, x_3) = w_1x_1 + w_2x_2+ w_3x_3 + b \\
\end{align}

<br/>

### Cost function

\begin{align}
cost(W,b) = \frac{1}{m}\sum_{i=1}^m(H(x_1^{(i)}, x_2^{(i)}, x_3^{(i)}) - y^{(i)})^2 \\
\end{align}

<br/>

### Multi - Variable
- Hypothesis
\begin{align}
H(x_1, x_2, x_3, ..., x_n) = w_1x_1 + w_2x_2+ w_3x_3 + ... + w_nx_n + b \\
\end{align}

<br/>

### Matrix
- 데이터의 개수가 늘어날 때 사용하면 된다.
- **Matrix multiplication(행렬 곱셈)**을 사용

<br/>

### Hypothesis using matrix
- Hypothesis
\begin{align}
w_1x_1 + w_2x_2 + w_3x_3 + ... + w_nx_n \\
\end{align}

- Matrix multiplication
\begin{align}
(x_1 x_2 x_3) \cdot \begin{pmatrix}w_1\\\w_2\\\w_3\end{pmatrix} = (x_1w_1 + x_2w_2 + x_3w_3) \\
\end{align}

Hypothesis와 다르게 행렬 곱셈은 `X`가 앞에 나오기 때문에<br/>
matrix를 사용할 때 `X`를 앞에다 쓴다.

\begin{align}
H(X) = XW \\
\end{align}

<br/>

### Many x instances

| x1 (quiz1) | x2 (quiz2) | x3 (midterm 1) | Y (final) |
| ---------- | ---------- | -------------- | --------- |
| 73         | 80         | 75             | 152       |
| 93         | 88         | 93             | 185       |
| 89         | 91         | 90             | 180       |
| 96         | 98         | 100            | 196       |
| 73         | 66         | 70             | 142       |

Hypothesis에서 `x`는 3개 밖에 없지만 해당 table의 `instance`는 5개<br/>
이곳에서 **matrix multiplication**을 사용<br/>
각각의 `instance`를 계산할 필요 없이 사용 가능한 장점<br/>

`[5, 3] X [3, 1] = [5, 1]`<br/>

보통 [5, 3]에서 3은 variable의 갯수, 5는 instance의 갯수로 주어진다.<br/>
`Linear regression`에서 출력값 또한 보통 **주어진다**.<br/>
주어진 값을 토대로 `W`를 추측 가능하다.<br/>

`[5, 3] X [?, ?] = [5, 1]`<br/>

위의 내용을 토대로 `W`가 `[3, 1]`의 크기임을 예측 가능<br/>

<br/>

### WX vs XW
- Lecture(theory)
\begin{align}
H(X) = Wx + b \\
\end{align}

- Implementation (TensorFlow)
\begin{align}
H(X) = XW \\
\end{align}
