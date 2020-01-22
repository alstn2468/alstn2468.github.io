---
title: '레고처럼 넷트웍 모듈을 마음껏 쌓아 보자'
date: 2019-06-01 00:00:03
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Feedforward neural network

지금까지 사용한 신경망 구조<br/>
몇단을 쌓을것인지는 선택하면된다.

## Fast forward

<img src="/assets/2019-06-01/5.png" width="700" height="auto" alt="아직 안만듬"><br/>
2015년에 He가 ImageNet에 제출한 모델<br/>
**3%이하**의 Error를 보인다.

## Split & Merge

<img src="/assets/2019-06-01/6.png" width="700" height="auto" alt="아직 안만듬"><br/>
입력이 1개일 경우 여러개의 출력으로 **나누어** 학습을<br/>
진행하다가 하나로 다시 **병합**하면서 예측할수도 있다.<br/>

<img src="/assets/2019-06-01/7.png" width="600" height="auto" alt="아직 안만듬"><br/>
입력이 여러개일 경우 각각의 입력을 처리하고<br/>
하나로 **병합**하는 과정으 학습을 진행할수 있다.<br/>
하나의 **Convolutional Neural Network(CNN)** 형태다.

## Recurrent network

<img src="/assets/2019-06-01/8.png" width="400" height="auto" alt="아직 안만듬"><br/>
앞으로만 나가지 않고 옆으로 나가게 Network를 구성<br/>
이 구조는 **Recurrent Neural Network(RNN**)의 구성이다.
