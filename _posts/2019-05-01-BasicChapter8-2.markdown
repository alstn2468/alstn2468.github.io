---
title:  "Training/Testing 데이타 셋"
date:   2019-05-01 00:00:01
categories: [Machine Learning]
tags: [Machine Learning, Deep Learning, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### 모델의 성능 평가
다음과 같은 **트레이닝 셋(Training Set)**이 있다고 가정한다.

| Size | Price |
| ---- | ----- |
| 2104 | 400   |
| 1600 | 330   |
| 2400 | 369   |
| 1416 | 232   |
| 3000 | 540   |
| 1985 | 300   |
| 1534 | 315   |
| 1427 | 199   |
| 1380 | 212   |
| 1494 | 243   |

이 트레이닝 셋을 가지고 **모델**을 만들어 학습시키고<br/>
다시 이 트레이닝 셋으로 값을 **예측**하게 된다면<br/>
이 값들을 **외우는 경우**와 같아 100% 정확도를 갖지만 좋지 않은 결과다.

따라서 트레이닝 셋의 70% 정도를 **Training Set**으로 사용하고<br/>
나머지 뒷 부분의 30% 정도를 **Test Set**으로 사용한다.<br/>

**Training Set**을 가지고만 **모델**을 생성해 학습 시키고<br/>
**Test Set**으로 모델이 잘 만들어 졌는지 확인해야 한다.

<br/>

### Training, Validation and Test Set

<img src="/assets/2019-05-01/1.png" width="600" height="auto">

가지고 있는 **Training Set**을 두개로 나눈다.<br/>
**Training Set**으로 학습을 시키고 **Validation Set**으로<br/>
**𝛂**, **𝜆**의 **최적값**을 찾는 튜닝을 하기위해 사용한다.<br/>
튜닝을 한 후 **Test Set**으로 예측하여 값을 확인한다.

<br/>

### Online learning
데이터 셋이 많을 경우 사용<br/>
100만개의 데이터 셋이 있다고 가정할 경우<br/>
10만개 씩 **나누어** 데이터 셋을 사용해 학습<br/>
**이전 학습의 결과**를 기억하고 있어야 한다.

<br/>

### 정확도 (Accuracy)
- 얼마나 예측이 잘되는가?
- Test Set의 **Y값**과 모델이 예측한 값을 비교
- 최근 이미지 관련 예측 정확도는 95%를 넘는다.
