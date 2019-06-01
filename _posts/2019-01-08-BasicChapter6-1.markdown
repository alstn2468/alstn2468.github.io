---
title:  "Logistic Classification의 가설 함수 정의"
date:   2019-01-08 00:00:01
categories: [Machine Learning]
tags: [Machine Learning, Deep Learning, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Classification
- **Binary**
- 예시
    + 스팸 메일 탐지
    + 패이스북 피드
    + 신용카드 부정 거래 감지

<br/>

### 0, 1 encoding
- 스팸 메일 탐지
    + 스팸(**1**) or 햄(**0**)
- 페이스북 피드
    + 보이기(**1**) or 숨기기(**0**)
- 신용카드 부정 거래 감지
    + 정당(**0**) or 부정(**1**)

<br/>

### Pass(1) / Fail(0) based on study hours
- `Linear Regression`으로도 가능한가?
    + 기울기가 낮아질 수 있어 올바른 예측 불가능
- `Hypothesis`가 `1`보다 큰 값이나 `0`보다 작은 값을 줄 수도 있다.

<br/>

### Logistic Hypothesis
+ **logistic function**, **sigmoid function**

\begin{align}
g(z) = \frac{1}{(1+e^{-z})} \\
\end{align}

- sigmoid
    + 모든 범위의 **실수**를 취함
    + 출력 범위가 `0`에서 `1`사이
    + `"S"`모양의 그래프 형성

- **Logistic Hypothesis**

\begin{align}
H(X) = \frac{1}{1 + e^{-W^{T}X}} \\
\end{align}
