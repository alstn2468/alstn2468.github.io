---
title: 'ConvNet의 활용 예'
date: 2019-06-13 00:00:04
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## LeNet-5

**Lecun** et al (1998)<br/>
손으로 쓴 $32 \times 32$크기의 글씨 이미지를 학습<br/>
Filter로 $5 \times 5$크기의 **Filter**로 **1**의 크기의 **Stride**사용<br/>
**Pooling**을 진행할 때 $2 \times 2$크기와 **2**의 크기의 **Stride**사용<br/>
<img src="/assets/2019-06-13/10.jpg" width="700" height="auto" alt="아직 안만듬"><br/>

## AlexNet

**Krizhevsky** et al (2012)<br/>

<img src="/assets/2019-06-13/11.png" width="700" height="auto" alt="아직 안만듬"><br/>

입력값 : $227 \times 227 \times 3 $의 컬러 이미지<br/>
첫번째 Layer : **CNN** (96개의 $11 \times 11$크기, Stride가 4인 Filter)<br/>
출력값의 크기: $55 \times 55 \times 96$<br/>
첫 번쨰 Layer의 Parameter : $(11 \times 11 \times 3) \times 96 = 35K$<br/>

두 번쨰 Layer : Pooling Layer($3 \times 3$크기, Stride가 2인 Filter)<br/>
출력값의 크기 : $27 \times 27 \times 96$<br/>
두 번째 Layer의 Parameter : 0<br/>

### AlexNet의 Full Architecture

1. **[$227 \times 227 \times 3$]** INPUT
2. **[$55 \times 55 \times 96$]** CONV1
   - $11 \times 11$ 크기의 Filter 96개
   - Stride : 4
   - pad : 0
3. **[$27 \times 27 \times 96$]** MAX POOL1
   - $3 \times 3 $ 크기의 Filter
   - Stride : 2
4. **[$27 \times 27 \times 96$]** NORM1
   - Normalization layer
5. **[$27 \times 27 \times 256$]** CONV2
   - $5 \times 5$ 크기의 Filter 256개
   - Stride : 1
   - pad : 2
6. **[$13 \times 13 \times 256$]** MAX POOL2
   - $3 \times 3 $ 크기의 Filter
   - Stride : 2
7. **[$13 \times 13 \times 256$]** NORM2
   - Normalization layer
8. **[$13 \times 13 \times 384$]** CONV3
   - $3 \times 3$ 크기의 Filter 384개
   - Stride : 1
   - pad : 1
9. **[$13 \times 13 \times 384$]** CONV4
   - $3 \times 3$ 크기의 Filter 384개
   - Stride : 1
   - pad : 1
10. **[$13 \times 13 \times 256$]** CONV5
    - $3 \times 3$ 크기의 Filter 256개
    - Stride : 1
    - pad : 1
11. **[$6 \times 6 \times 256$]** MAX POOL3
    - $3 \times 3 $ 크기의 Filter
    - Stride : 2
12. **[$4096$]** FC6
    - 4096 neurons
13. **[$4096$]** FC7
    - 4096 neurons
14. **[$1000$]** FC8
    - 1000 neurons (class scores)

### Details

- **ReLU**를 처음 사용
- **정규화**를 하는 Layer 사용
- 0.5의 **DropOut**을 사용
- 128크기의 **Batch Size**
- 7개의 CNN **앙상블**

## GoogLeNet

**Szegedy** et al (2014)<br/>
**Inception Moudle**이라는 것을 사용했다.<br/>
<img src="/assets/2019-06-13/12.png" width="700" height="auto" alt="아직 안만듬"><br/>

## ResNet

**He** et al (2015)<br/>
152개의 Layer에 **Fastforward**사용<br/>
실제 Layer는 많지만 실제 학습되는 Layer는 깊지 않다.<br/>
잘 동작하지만 왜 잘되는지는 알지 못한 상태다.<br/>

## CNN for Sentence Classfiation

**Yoon Kim** (2014)<br/>
자연어 처리 분야에 CNN을 사용<br/>

## AlphaGo

**DeepMind**<br/>
흔히 잘 알고있는 AlphaGo도 CNN을 사용<br/>

- Policy Network

입력값 : **[$19 \times 19 \times 48$]**<br/>
$19 \times 19$는 바둑판의 크기, 48개의 Feature<br/>

CONV1 : 192 $5 \times 5$ Filters, strid 1, pad 2<br/>
CONV1의 출력값은 **[$19 \times 19 \times 192$]**<br/>

CONV2 ~ 12 : 192 $3 \times 3$ Filters, strid 1, pad 1<br/>
CONV2 ~ 12의 출력값은 **[$19 \times 19 \times 192$]**<br/>

CONV : 1 $1 \times 1$ Filters, strid 1, pad 0<br/>
CONV의 출력값은 **[$19 \times 19 $]**<br/>
