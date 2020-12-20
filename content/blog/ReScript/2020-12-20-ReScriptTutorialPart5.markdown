---
title: 'ReScript 공식문서로 ReScript 훑어보기 (5)'
date: 2020-12-20 00:00:05
category: 'ReScript'
draft: false
---

본 포스트는 <a href="https://rescript-lang.org/docs/latest/">ReScript 공식문서</a>를 스터디하며 정리한 포스트 입니다.<br/>
포스트를 작성하며 작성한 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial)에서 확인할 수 있습니다.

## Tuple

Tuple은 JavaScript에는 없는 ReScrpt 전용 데이터 구조다. Tuple은 아래와 같은 특성이 존재한다.

- 불변함 (Immutable)
- 순서가 존재함 (Ordered)
- 생성될 때 고정된 크기를 갖음 (Fix-sized at creation time)
- 불균일함 (Heterogeneous, 다른 타입의 값을 가질 수 있음)

```reason
let ageAndName = (24, "Lil' ReScript")
let my3dCoordinates = (20.0, 30.5, 100.0)
```

Tuple타입은 타입 주석 또한 사용할 수 있다. Tuple타입은 시각적으로 Tuple의 값과 비슷하다.

```reason
let ageAndName: (int, string) = (24, "Lil' ReScript")
// a tuple type alias
type coord3d = (float, float, float)
let my3dCoordinates: coord3d = (20.0, 30.5, 100.0)
```

참고 : 크기가 1인 튜플은 존재하지 않는다. 크기가 1일 경우 값 자체를 사용하는 것이다.

### 사용법

Tuple의 특정 맴버를 얻으료면 Tuple을 비구조화 할 수 있다.

```reason
let (_, y, _) = my3dCoordinates // y를 얻을 수 있다.
```

`_`는 Tuple의 표시된 맴버들을 무시하고 있음을 의미한다.

Tuple은 변경과 같은 업데이트를 할 수 없다. 이전 항목들을 비구조화하여 새로운 Tuple을 생성해야 한다.

```reason
let coordinates1 = (10, 20, 30)
let (c1x, _, _) = coordinates1
let coordinates2 = (c1x + 50, 20, 30)
```

### 팁 & 트릭

많은 과정 없이 여러개의 값을 전달하는 편리한 상황에서 튜플을 사용할 수 있다.

```reason
let getCenterCoordinates = () => {
  let x = doSomeOperationsHere()
  let y = doSomeMoreOperationsHere()
  (x, y)
}
```

위와 같이 사용하게 되면 `getCenterCoordinates`는 `x`, `y` 두개의 값을 반환할 수 있다. Tuple을 사용하는 범위는 **지역 범위**을 유지하는 것이 좋다. 수명이 길고 자주 전달되는 데이터 구조의 경우 이름이 지정된 필드가 있는 **Record**를 사용하는 것이 더 선호된다.