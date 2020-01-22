---
title: 'ConvNet Max pooling 과 Full Network'
date: 2019-06-06 00:00:04
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Pooling Layer (Sampling)

<img src="/assets/2019-06-06/7.png" width="600" height="auto" alt="아직 안만듬"><br/>
**Pooling**은 **Sampling**이라고도 한다.<br/>
이미지에서 **Filter**를 처리한 후 생성된 **Conv Layer**에서<br/>
**하나의 Layer**만 뽑아낸 후 **resize**(Sampling)를 한 **Layer**를<br/>

<img src="/assets/2019-06-06/8.png" width="600" height="auto" alt="아직 안만듬"><br/>
위의 그림과 같이 여러겹으로 다시 **쌓는** 것을 **Pooling**이라고 한다.<br/>

## MAX Pooling Example

<img src="/assets/2019-06-06/9.png" width="500" height="auto" alt="아직 안만듬"><br/>
**MAX Pooling**하나의 **Filter**에서 가장 큰 값을<br/>
선택하여 값을 출력하는 **Pooling** 방법이다.<br/>

$4 \times 4$ 크기의 Layer에서 $2 \times 2$ 크기의 **Filter**와<br/>
**2**의 크기의 **Stride**를 적용해 **Pooling**을 진행하면<br/>
$2 \times 2$크기의 Output이 나오게된다.<br/>

## Fully Connected Layer (FC Layer)

마지막으로 **Pooling**한 값을 **Fully Connected Layer**에<br/>
입력한 후 Softmax같은 **Classifier**에 넣어 결과를 출력한다.<br/>
