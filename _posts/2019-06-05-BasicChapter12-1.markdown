---
title:  "ConvNet의 Conv 레이어 만들기"
date:   2019-06-03 00:00:03
categories: [Machine Learning]
tags: [Machine Learning, Deep Learning, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

### Convolutional Neural Network
고양이가 어떠한 사물을 볼때 뇌 전체가 아닌<br/>
**일부**만 **활성화** 된다는 사실을 발견함에서 시작<br/>

기본적인 **CNN**의 구성으로 **CONV**와 **RELU**가 한 쌍으로 구성되고<br/>
중간중간 **POOL**이 구성되어 있으며 마지막에는 **FC**로 구성되어 있다.<br/>

<br/>

### Image Input
<img src="/assets/2019-06-05/1.png" width="300" height="auto" alt="아직 안만듬"><br/>
위 그림의 크기가 $$32 \times 32$$이고 색상을 갖고 있기 때문에<br/>
3(Red, Green, Blue)을 곱해 $$32 \times 32 \times 3$$크기다.<br/>
픽셀 1개는 흑백의 경우 1Byte를 사용하기 때문에 256단계의 Grey Scale을 표현할 수 있고<br/>
컬러의 경우 RGB에 1Byte씩 할당하기 때문에 $$256 \times 256 \times 256$$만큼의 색상을 표현할 수 있다.<br/>


<img src="/assets/2019-06-05/2.png" width="500" height="auto" alt="아직 안만듬"><br/>
위의 이미지 처럼 전체의 이미지를 한번에 처리하지않고<br/>
**일부분**만 처리(**Filter**)하며 필터의 Size는<br/>
임의로 정의할 수 있으나 색상은 항상 같은 값이다.<br/>


<img src="/assets/2019-06-05/3.png" width="400" height="auto" alt="아직 안만듬"><br/>
하나의 필터가 하는 일은 궁극적으로 **하나의 값을 생성**한다.<br/>


<img src="/assets/2019-06-05/4.png" width="600" height="auto" alt="아직 안만듬"><br/>
지금까지 많이 사용한 $$Wx + b$$의 식을 사용해 하나의 값을 생성한다.<br/>
$$5 \times 5 \times 3$$의 필터에서는 아래와 같은 식으로 값이 생성된다.<br/>
$$ W_{1}x_{1} + W_{2}x_{2} + W_{3}x_{3} + W_{4}x_{4} + W_{5}x_{5} + b$$<br/>
이 식에서 변하지 않는 **Weight**이 어떤 값을 만들지 결정한다.<br/>
**ReLU**라는 함수를 붙이기만 하면 **ReLU Layer**가 생성이 된다.<br/>


하나의 filter로 하나의 값을 생성할 때 옆으로 움직이는 칸의 단위를 **Stride**라고 한다.<br/>
출력값의 크기는 $$(이미지 사이즈 - 필터 사이즈) / Stride + 1$$의 크기를 갖는다.<br/>

Stride가 클수록 출력값의 크기가 작아져 정보를 잃어버리게 되는데<br/>
**CNN**을 구성할 때 **Pad**라는 개념을 사용한다.<br/>

#### Pad를 사용하는 이유
1. 그림이 작아지는 것을 방지
2. 그림의 모서리임을 알려주기 위해서

<br/>

### Pad 사용 예시
<img src="/assets/2019-06-05/5.png" width="600" height="auto" alt="아직 안만듬"><br/>
원본 이미지의 크기가 $$ 7 \times 7 $$의 크기고 **1 Stride**로<br/>
$$ 3 \times 3$$크기의 필터를 사용한다고 가정했을때<br/>
$$ 5 \times 5$$의 출력값을 얻을 수 있었지만<br/>
1개의 **Pad**를 추가한 결과 $$ 7 \times 7$$의 출력값을 얻을 수 있다.<br/>


보통 Pad를 추가하였을때 입력값의 크기와 출력값의 크기가 같도록 설정한다.<<br/>

<br/>

### Convolution Layer 
<img src="/assets/2019-06-05/6.png" width="600" height="auto" alt="아직 안만듬"><br/>
filter를 적용해 만들어진 출력 결과를 **Activation Map**이라고 한다.<br/>
여러개의 **Convolution Layer**를 겹쳐 사용할 수 있다.<br/>

**filter의 깊이는 이미지의 깊이와 동일해야 한다.**<br/>

Layer를 구성할 때 많은 **Weight**값이 존재하는 데 이 값들은<br/>
Neural Network과 동일하게 초기화 후 학습을 진행한다.
