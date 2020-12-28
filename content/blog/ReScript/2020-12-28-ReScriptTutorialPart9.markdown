---
title: 'ReScript 공식문서로 ReScript 훑어보기 (9)'
date: 2020-12-28 00:00:05
category: 'ReScript'
draft: false
---

본 포스트는 <a href="https://rescript-lang.org/docs/latest/">ReScript 공식문서</a>를 스터디하며 정리한 포스트 입니다.<br/>
포스트를 작성하며 작성한 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial)에서 확인할 수 있습니다.

## Null, Undefined and Option

ReScriptt에는 `null` 또는 `undefined` 개념이 존재하지 않는다. 모든 카테고리의 버그를 없애기 때문에 이것은 좋은 일이다. 더이상 `undefined is not function`이나 `cannot access someAttriute of undefined`를 마주칠 일이 없다.

그러나, 잠재적으로 존재하지 않는 값에 대한 개념은 여전히 유용하고, ReScript에도 안전하게 존재한다.

`option`타입으로 값을 감싸 값의 존재와 존재하지 않음을 나타낸다다. 표준 라이브러리에서 정의한 내용은 아래와 같다.

```reason
type option<'a> = None | Some('a)
```

위 코드의 `option`타입은 아무것도 나타내지 않는 `None`이거나 `Some`에 포함된 실제 갓을 의미한다.

`option`타입이 일반적인 [Variant](https://rescript-lang.org/docs/manual/latest/variant)라는 점을 유의해야 한다.

### 예시

아래 코드에는 일반적인 값을 갖는 `licenseNumber`가 있다.

```reason
let licenseNumber = 5
```

null일 수도 있다는 개념을 나타내려면 이 변수를 감싸 `option`타입으로 변환해야 한다. 좀 더 설명이되는 예시를 위해 아래와 같은 조건을 제시할 수 있다.

```reason
let licenseNumber =
  if personHasACar {
    Some(5)
  } else {
    None
  }
```

나중에 다른 코드 조각이 이런 값을 받으면 [패턴 매칭](https://rescript-lang.org/docs/manual/latest/pattern-matching-destructuring)를 통해 두 가지 경우를 모두 처리해야한다.

```reason
switch licenseNumber {
| None =>
  Js.log("The person doesn't have a car")
| Some(number) =>
  Js.log("The person's license number is " ++ Js.Int.toString(number))
}
```

일반 `number`를 `option`타입으로 바꾸고 `None`케이스를 처리하도록 강요함으로써 언어는 개념적 `null` 값을 잘못 처리하거나 처리하는 것을 잊을 가능성을 효과적으로 제거했다. **순수한 ReScript 프로그램에는 null 오류가 없다.**

### JavaScript의 undefined와 null과 상호 운용

`option`타입은 JavaScript로 컴파일할 때 특별한 경우가 있을 정도로 일반적이다.

```reason
let x = Some(5)
```

위의 코드의 `x`는 간단히 `5`로 컴파일되고,

```reason
let x = None
```

이 코드의 `x`는 `undefined`로 컴파일 된다. 예를 들어 `undefined`일수도 있는 JavaScript의 문자열 인 경우 `option<string>`타입을 사용하면 된다. 마찬가지로, `Some(5)` 또는 `None`을 JavaScript에 보내고 올바르게 해석 될 것으로 기대할 수 있다.

#### Caveat 1

ReScript에서는 `option` 값을 구성할 수 있기 때문에 `option`에서 `undefined`로 번환되는 것은 완벽하지 않다.

```reason
let x = Some(Some(Some(5)))
```

위의 `x`는 여전히 `5`로 컴파일되지만 아래 코드는 문제가 생긴다.

```reason
let x = Some(None)
```

`Caml_option.some`은 무엇일까? 왜 이것이 `undefined`로 컴파일되지 않을까? 간단히 말해 다형성 옵션 타입(`'a`의 경우 `option<'a>`)을 다룰 때 값에 특별한 주석을 표시하지 않으면 많은 작업이 복잡해진다. 이해가 되지않아도 걱정하지 말고 아래의 규칙을 기헉하면 된다.

- **절대로 `Some(Some(Some(5)))`와 같은 충첩된 `option`값을 JavaScript로 넘기면 안된다.**
- **절대로 JavaScript에서 온 값에 `option<'a>`로 타입 주석을 작성하면 안된다. 항상 고정된 비다형성 타입을 주어야한다.**

#### Caveat 2

안타깝게도 JavaScript 값이 `null`이거나 `undefined`인 경우가 많다. 이런 경우 불행하게도 `option<int>`같이 값을 입력 할 수 없다. 왜냐하면 ReScript의 `option`타입은 `None`을 다룰 때 `undefined`이거나 `null`이 아닌지 확인하기 때문입니다.

##### Solution: 보다 정교한 undefined & null 인터럽트

이를 해결하기 위해 [`Js.Nullable`](https://rescript-lang.org/docs/manual/latest/api/js/nullable) 모듈을 통해보다 정교한 `null` 및 `undefined` 헬퍼를 이용한 접근을 제공한다. 이것은 `option`타입처럼 어느정도 작동하지만 다르다.

##### 예시

JavaScript의 `null`을 만들기위해서는 `Js.Nullable.null`값을 사용하면 된다. JavaScript의 `undefined`를 만들기위해서는 `Js.Nullable.undefined`를 사용하면 된다. (당연히 `None`도 사용할 수 있지만 여기서 그게 중요하지 않다. `Js.Nullable.*`헬퍼는 작동하지 않는다.)

예를 들어 `null`이거나 `undefined`일 수 있는 JavaScript 문자열을 받는 경우 아래와 같이 작성할 수 있다.

```reason
@bs.module("MyConstant") external myId: Js.Nullable.t<string> = "myId"
```

ReScript에서 이런 `nullable`문자열을 생성하기 위해서(아마 인터럽트 목적으로 JavaScript쪽으로 값을 전달하기 위해)는 아래와 같이 작성할 수 있다.

```reason
@bs.module("MyIdValidator") external validate: Js.Nullable.t<string> => bool = "validate"
let personId: Js.Nullable.t<string> = Js.Nullable.return("abc123")

let result = validate(personId)
```

`return`부분은 문자열을 `nullable`문자열로 감싸 타입 시스템이이 값을 전달할 때 단순히 문자열이 아니라 `null`이거나 `undefined`일 수 있는 문자열이라는 사실을 이해하고 추적하도록한다.

##### option에서 또는 option으로 변환

`Js.Nullable.fromOption`은 `option`으로부터 `Js.Nullable.t`로 변환한다. `Js.Nullable.toOption`은 반대의 기능을 한다.