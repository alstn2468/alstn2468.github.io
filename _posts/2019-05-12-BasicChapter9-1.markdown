---
title:  "딥러닝의 시작과 XOR 문제"
date:   2019-05-12 00:00:01
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Ultimate Dream
**생각하는 기계**를 만드는 것<br/>

사람의 뇌를 공부하기 시작했다.<br/>
사람의 뇌는 **복잡하게 구성**되어 있지만 **단순하게 동작**한다.<br/>
어떠한 **input**이 존재하고 이것의 **길이**에 <br/>
따라 신호의 양이 달라진다. $$ \sum{(x * w + b)} $$ <br/>
이 더해진 값이 어떠한 값 이상이 되면 **활성화** 상태가 결정된다.<br/>


이것을 토대로 만들어진 것이 **활성화 함수** (**Activation Functions**)다.

<br/>

### Logistic regression uniuts
#### 소프트웨어
<img src="/2019-05-12/1.png" width="200" height="auto" alt="아직 안만듬">

#### 하드웨어적
- Perceptron(Frank Rosenblatt, ~1957)
- Adaline/Madaline(Widrow and Hoff, ~1960)

<br/>

### AND/OR Problem
기계가 **AND/OR** 문제를 **예측**할 수 있는 것이 중요했다.<br/>
**Linear**한 모델을 사용해서 **예측이 가능**하다.<br/>

<br/>

### XOR Problem

<img src="/2019-05-12/2.png" width="400" height="auto" alt="아직 안만듬">

| X1  | X2  | Y   |
| --- | --- | --- |
| 0   | 0   | 0   |
| 1   | 0   | 1   |
| 0   | 1   | 1   |
| 1   | 1   | 0   |

**XOR** 문제는 **Linear**한 모델로 예측이 **불가능**하다<br/>
그래프에 어떠한 선을 그어도 결과를 찾을 수 없다.<br/>

<br/>

### Perceptrons (1969)
- Marvain Minsky (Founder of the MIT AI Lab)
- 여러개의 신경망을 합친 **MLP**를 사용하면 해결할 수 있다.
- 하지만 **Weight**과 **Bias**는 학습시킬 수 없다.

<br/>

### Backpropaagation
- Paul Werbos (1974, 1982)
- **Hinton** (1986)
- **Weight**과 **Bias**를 조절하는 것이 어려움
- 값을 **뒤로 전달**하며 진행시키는 알고리즘
- 더 복잡한 형태의 예측 가능

<br/>

### Convolutional Neural Networks
- LeCun (1980)
- 고양이의 신경망 세포를 관찰
- **일부**의 신경망 세포가 **활성화**되는 것을 확인
- 이미지를 잘라서 **나중에 합치는 방법**으로 학습
- 문자와 숫자를 인식하는데 **90% 이상** 정확도

<br/>

### A Big Problem
- **Backpropaagation**이 몇 개의 Layer에서 잘 동작
- **10여개 이상**에서의 Layer에서 학습시킬 경우 **은닉**을<br/>
할 수록 약해져 앞쪽으로 갈 수록 에러가 잘 전달되지 않음
- 새로운 알고리즘의 발견 (**SVM**, **RandomForest**)
