---
title: '기본적인 Machine Learning의 용어와 개념 설명'
date: 2018-12-27 01:41:23
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## 머신러닝이란 무엇인가?

- 일종의 **소프트웨어**
- Limitations of explicit programming
  - Spam filter : many rules
  - Automatic driving : too many rules
- 개발자가 일일이 정하지 않고 프로그램 자체 **학습**

## 러닝이란 무엇인가?

- **Supervised Learning**(지도 학습)

  - Learning with **labeled** examples - training set
  - 머신러닝의 **일반적**인 문제 타입
  - **트레이닝 데이터셋**을 기반으로 학습하여 결과 도출
  - 알파고 또한 Supervised Learning
  - 예시) 이미지 라벨링, 이메일 스팸 필터, 시험 점수 예측
  - Supervised Learning의 타입(예: 시험 점수 예측)
    - **Regression** : 0 ~ 100점 사이의 점수 예측
    - **Binary Classification** : Pass / Non-Pass 예측
    - **Multi-label Classification** : A, B, C, D, F 예측

- **Unsupervised Learning**(자율 학습)
  - Un-labeled data
  - 예시) Google news grouping, Word clustering
