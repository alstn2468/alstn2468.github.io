---
title: 'Weight를 잘 초기화 해보자'
date: 2019-05-23 00:00:03
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Vanishing gradient를 해결하는 방법

1. ReLU
2. 초기 **Weight**값 설정

랜덤으로 **Weight**값 설정시 같은 코드를 실행시켜도<br/>
**Cost**값이 변하는 것을 확인할 수 있다.

## 모든 **Weight**값을 0으로 초기화해서 사용할 경우

**Chain rule**을 사용할 때 **Weight**값이 사용된다.<br/>
**Weight**값이 0이게 되면 뒤의 모든 값이 0이되어서<br/>
**Vanishing gradient**가 생긴다.

## 어떻게 초기 Weight값을 설정할 것인가?

- 무조건 **0**으로 설정하면 안된다.
- "A Fast Learning Algorithm for Deep Belief Nets"<br/>
  논문에서 **R**estricted **B**oatman **M**achine(**RBM**) 사용

## Restricted Boatman Machine (RBM)

RBM의 구조<br/>
Reestriction : Layer안에서 연결이 없다.<br/>
<img src="/assets/2019-05-24/2.png" width="300" height="auto" alt="아직 안만듬">

2가지 Operation을 갖는다.<br/>

- Forward

<img src="/assets/2019-05-24/3.png" width="300" height="auto" alt="아직 안만듬"><br/>
위의 그림과 같은 방법으로 값을 구하는 방법

- Backward

<img src="/assets/2019-05-24/4.png" width="300" height="auto" alt="아직 안만듬"><br/>

입력받은 $$X$$의 값과 **Forward**로 생성된 $$X$$의 값의<br/>
**차가 최저**가 되도록 **Weight**를 조절하는 방법이다.

**KL DIVERGENCE**은 거리를 구할때 사용하는 연산자다.<br/>
**Encode**/**Decode**라고도 한다.

## 어떻게 RBM이 작동하는가?

앞의 2개의 Layer에서 **Encode**/**Decode**를<br/>
반복하며 **Weight**값을 찾는다.<br/>
이러한 Network를 **D**eep **B**elief **N**etwork (**DBN**)이라고 한다.

**Pre Traning**과정에서 $$X$$값만 가지고<br/>
**RBM**을 진행해 최적화된 **Weight**를 찾는다.<br/>
앞의 Layer에서 뒤의 Layer로 이동하면서 같은 과정을 반복한다.<br/>
모든 과정이 완료 되면 모든 **Weight**값이 **초기화된 상태**다.

**Fine Tuning**과정에서 실제 $$X$$데이터를 넣고 **학습을 진행**한다.<br/>
**Fine Tuning**이라고 부르는 이유는 데이터를<br/>
많이 쓰지않고 빠르게 학습이 되기 떄문이다.

## Good News

- 복잡한 **RBM**을 사용하지 않아도된다.
- 간단한 방법으로도 가능하다.
  - **Xavier initialization**
  - **He's initialization**

### Xavier/He initialization

**좋은 Weight값을 선택**하고자 하는 기본적인 아이디어<br/>
입력의 갯수(**fan_in**), 출력의 갯수(**fan_out**)에 따라 구하면 된다.<br/>

Xavier initialization (2010)

```python
W = np.random.randn(fan_in, fan_out) / np.sqrt(fan_in)
```

He initialization (2015)

```python
W = np.random.randn(fan_in, fan_out) / np.sqrt(fan_in / 2)
```

복잡하게 구현되어 있는 `xavier_init`함수를 사용해도 된다.<br/>

초기 Weight을 설정하는 알고리즘은 아직도 연구중인 분야다.
