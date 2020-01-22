---
title: '10분안에 미분 정리하기'
date: 2019-05-17 00:00:03
category: 'Machine Learning'
draft: false
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

## Basic derivative

아래의 식이 **도함수**의 정의 또는 **순간 변화율**이라고 한다.

$$
\dfrac{ d }{ dy } f(x) =
\lim_{ \triangle x \to 0 }
\dfrac{ f( x + \triangle x ) - f( x ) }{ \triangle x }
$$

### 예제 1

$$
f(x) = 3
$$

의 식에서 $\triangle x = 0.01$이라고 가정할 경우<br/>

$$
\dfrac{ f( x + 0.01 ) - f( x ) }{ 0.01 }
$$

의 식으로 표현할 수 있고<br/>

$$
\dfrac{ f( 3 + 0.01 ) - f( 3 ) }{ 0.01 } = 0
$$

과 같이 값을 얻을 수 있고,<br/>
**상수 함수를 미분**할 경우 **0**이라는 값을 얻음을 확인할 수 있다.

### 예제 2

$$
f(x) = x
$$

의 식에서 $\triangle x = 0.01$이라고 가정할 경우<br/>

$$
\dfrac{ f( x + 0.01 ) - f( x ) }{ 0.01 }
$$

의 식으로 표현할 수 있고<br/>

$$
\dfrac{ x + 0.01 - x }{ 0.01 } = \dfrac{0.01}{0.01} = 1
$$

과 같이 값을 얻을 수 있고,<br/>
$x$를 미분할경우 **1**을 얻음을 확인할 수 있다.

### 예제 3

$$
f(x) = 2x
$$

의 식에서 $\triangle x = 0.01$이라고 가정할 경우<br/>

$$
\dfrac{ f( x + 0.01 ) - f( x ) }{ 0.01 }
$$

의 식으로 표현할 수 있고<br/>

$$
\dfrac{ 2(x + 0.01) - 2x }{ 0.01 } = \dfrac{0.02}{0.01} = 2
$$

과 같이 값을 얻을 수 있고,<br/>
$2x$를 미분할경우 **2**을 얻음을 확인할 수 있다.

## Partial derivative

$$
f(x) = 2x \rightarrow \dfrac{df}{dx} = 2
$$

$$
f(x, y) = xy, \dfrac{\partial f}{\partial x}
$$

과 같은 식에서 $$ y $$를 상수로 취급해<br/>
$\dfrac{df}{dx} = y$와 같은 값을 얻을 수 있다.

$$
f(x, y) = xy, \dfrac{\partial f}{\partial y}
$$

과 같은 식에서 $$ x $$를 상수로 취급해<br/>
$\dfrac{df}{dy} = x$와 같은 값을 얻을 수 있다.

### 예제 1

$$
f(x, y) = x + y, \dfrac{\partial f}{\partial x} = 1
$$

### 예제 2

$$
f(x, y) = x + y, \dfrac{\partial f}{\partial y} = 1
$$

## 합성 함수의 미분

$$
(f(g(x)))' = \dfrac{\partial f}{\partial x}
= \dfrac{\partial f}{\partial g} \dfrac{\partial g}{\partial x}
$$
