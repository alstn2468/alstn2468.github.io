---
title: 'ReScript 공식문서로 ReScript 훑어보기 (10)'
date: 2020-12-31 00:00:05
category: 'ReScript'
draft: false
---

본 포스트는 <a href="https://rescript-lang.org/docs/latest/">ReScript 공식문서</a>를 스터디하며 정리한 포스트 입니다.<br/>
포스트를 작성하며 작성한 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial)에서 확인할 수 있습니다.

## Array and List

### Array

Array는 ReScript에서 기본적으로 정렬된 자료구조다. JavaScript의 배열과 동일한 방식으로 동작한다.

```reason
let myArray = ["hello", "world", "how are you"]
```

ReScript의 배열의 각 항목은 타입이 동일해야 한다.

#### Array를 사용하는 방법

[Js.Array](https://rescript-lang.org/docs/manual/latest/api/js/array) API를 보면된다.

Array의 항목에 접근하고 업데이트 하기위해서는 아래와 같이 사용하면 된다.

```reason
let myArray = ["hello", "world", "how are you"]
let firstItem = myArray[0] // "hello"
myArray[0] = "hey" // ["hey", "world", "how are you"]
```

### List

ReScript는 아래와 같은 특징을 갖는 단방향 연결리스트 또한 제공한다.

- 불변하다. (Immutable)
- 항목을 앞에 추가할 때 빠르다. (Fast at prepending items)
- 끝을 가져올 때 빠르다. (Fast at getting the tail)
- 다른 모든것에선 느리다. (Slow at everything else)

```reason
let myList = list{1, 2, 3}
```

Array와 마찬가지로 List의 항목들의 타입은 모두 같아야한다.

#### List를 사용하는 방법

크기를 조절해야하는 가능성이 있을 경우 앞에 빠르게 항목을 추가하거나 빠르게 분할을 하기위해 List를 사용한다. 모든것은 불변하고 상대적으로 효율적이다.

항목에 무작위로 접근하거나 앞이 아닌 위치에 항목을 삽입해야하는 경우 List를 사용하지 않는 것이 좋다. 코드가 둔화되거나 느려질 수 있다.

ReScript의 표준 라이브러리는 [List모듈](https://rescript-lang.org/docs/manual/latest/api/belt/list)을 제공한다.

#### List에 불변하게 항목을 앞에 추가하는 방법

아래와 같은 전개(spread) 문법을 사용하면 된다.

```reason
let myList = list{1, 2, 3}
let anotherList = list{0, ...myList}
```

`myList`는 변경되지 않았고 `anotherList`는 `list{0, 1, 2, 3}`의 값을 갖는다. 이것은 O(1)의 시간복잡도로 효율적이다. `anotherList`의 뒤의 3개의 요소들은 `myList`와 공유된다.

**`list{a, ...b, ...c}`와 같은 문법은 오류를 발생시킨다는 것을 알아야 한다.** ReScript는 List에서 여러개의 전개를 지원하지 않는다. `b`의 각 항목이 `c`의 머리에 하나씩 추가되기 때문에 우연하게 선형 연산(O(b))가 된다. 이것을 위해 `List.concat`을 사용할 수 있지만 권장되는 방법은 아니다.

List의 중간에 있는 임의의 항목을 업데이트하는 것 또한 성능 및 할당 오버헤드가 선형 연산(O(n))이기 때문에 권장하지 않는다.

#### List의 항목에 접근하는 방법

`switch` ([패턴 매칭 섹션](https://rescript-lang.org/docs/manual/latest/pattern-matching-destructuring)에서 설명)가 일반적으로 List의 항목에 접근할 때 사용된다.

```reason
let message =
  switch myList {
  | list{} => "This list is empty"
  | list{a, ...rest} => "The head of the list is the string " ++ Js.Int.toString(a)
  }
```