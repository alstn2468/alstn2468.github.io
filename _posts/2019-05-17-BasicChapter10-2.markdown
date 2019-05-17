---
title:  "10분안에 미분 정리하기"
date:   2019-05-17 00:00:03
categories: [Machine Learnnig]
tags: [Machine Learnnig, Deep Learnnig, Data Science]
comments: true
---

해당 게시물은 [Edwith](https://www.edwith.org)에서 제공하는<br/>
[머신러닝과 딥러닝 BASIC](https://www.edwith.org/others26/joinLectures/9829)을 듣고 요약 정리한 글입니다.

<br/>

아래의 식이 **도함수**의 정의 또는 **순간 변화율**이라고 한다.

$$
\frac{ d }{ dy } f(x) =
\lim_{ \triangle x \to 0 }
\frac{ f( x + \triangle x ) - f( x ) }{ \triangle x }
$$


#### 예제 1
$$
f(x) = 3
$$
의 식에서 $$ \triangle x = 0.01 $$이라고 가정할 경우<br/>

$$
\frac{ f( x + 0.01 ) - f( x ) }{ 0.01 }
$$
의 식으로 표현할 수 있고<br/>
$$
\frac{ f( 3 + 0.01 ) - f( 3 ) }{ 0.01 } = 0
$$
과 같이 값을 얻을 수 있고,<br/>
**상수 함수를 미분**할 경우 **0**이라는 값을 얻음을 확인할 수 있다.

#### 예제 2
$$
f(x) = x
$$
의 식에서 $$ \triangle x = 0.01 $$이라고 가정할 경우<br/>

$$
\frac{ f( x + 0.01 ) - f( x ) }{ 0.01 }
$$
의 식으로 표현할 수 있고<br/>
$$
\frac{ x + 0.01 - x }{ 0.01 } = \frac{0.01}{0.01} = 1
$$
과 같이 값을 얻을 수 있고,<br/>
$$ x $$를 미분할경우 **1**을 얻음을 확인할 수 있다.

#### 예제 3
$$
f(x) = 2x
$$
의 식에서 $$ \triangle x = 0.01 $$이라고 가정할 경우<br/>

$$
\frac{ f( 2x + 0.01 ) - f( 2x ) }{ 0.01 }
$$
의 식으로 표현할 수 있고<br/>
$$
\frac{ 2(x + 0.01) - 2x }{ 0.01 } = \frac{0.02}{0.01} = 2
$$
과 같이 값을 얻을 수 있고,<br/>
$$ 2x $$를 미분할경우 **2**을 얻음을 확인할 수 있다.
