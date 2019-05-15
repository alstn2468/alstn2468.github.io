---
title:  "XOR 문제 딥러닝으로 풀기"
date:   2019-05-15 00:00:03
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Neural Network를 사용해 XOR 풀기

| X1  | X2  | XOR |
| --- | --- | --- |
| 0   | 0   | 0   |
| 0   | 1   | 1   |
| 1   | 0   | 1   |
| 1   | 1   | 0   |

#### 하나의 Unit

<img src="/assets/2019-05-15/1.png" width="500" height="auto" alt="아직 안만듬">

위의 Unit과 같은 모양이지만 다른 **weight**과 **bias**를 갖는<br/>
두개의 Unit에서 나온 결과(Y1, Y2) 다른 Unit에 넣어 값을 예측한다.

<img src="/assets/2019-05-15/2.png" width="700" height="auto" alt="아직 안만듬">

#### Sigmoid Function
입력값이 **작을수록 0**에 수렴<br/>
입력값이 **클수록 1**에 수렴

<img src="/assets/2019-05-15/4.png" width="300" height="auto" alt="아직 안만듬">

[[이미지 참조]](https://en.wikipedia.org/wiki/Sigmoid_function)

#### 계산 과정

$$
    Y1 =
    \begin{bmatrix}
        0 & 0 \\
    \end{bmatrix}
    \begin{bmatrix}
        5 \\
        5 \\
    \end{bmatrix}
    -8 = -8, Sigmoid(Y1) = 0
$$

$$
    Y2 =
    \begin{bmatrix}
        0 & 0 \\
    \end{bmatrix}
    \begin{bmatrix}
        -7 \\
        -7 \\
    \end{bmatrix}
    + 3 = 3, Sigmoid(Y2) = 1
$$

$$
    \bar{ Y } =
    \begin{bmatrix}
        0 & 1 \\
    \end{bmatrix}
    \begin{bmatrix}
        -11 \\
        -11 \\
    \end{bmatrix}
    + 6 = -11 + 6 = 5, Sigmoid(\bar{ Y }) = 0
$$

위와 같은 방법으로 아래의 모든 케이스를 진행

#### 결과 확인 표

| X1  | X2  | Y1  | S(Y1) | Y2  | S(Y2) | Ȳ   | S(Ȳ) | XOR |
| --- | --- | --- | ----- | --- | ----- | --- | ---- | --- |
| 0   | 0   | -8  | 0     | 3   | 1     | -5  | 0    | 0   |
| 0   | 1   | -3  | 0     | -4  | 0     | 6   | 1    | 1   |
| 1   | 0   | -3  | 0     | -4  | 0     | 6   | 1    | 1   |
| 1   | 1   | 2   | 1     | -11 | 0     | -5  | 0    | 0   |


위의 표를 확인하면 **2개의 Unit**과 **Sigmoid Function**을<br/>
사용한 결과 **XOR문제가 해결**되었다.

<br/>

### Forward Propagation

<img src="/assets/2019-05-15/3.png" width="800" height="auto" alt="아직 안만듬">
