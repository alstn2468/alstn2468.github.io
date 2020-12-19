---
title: 'ReScript 공식문서로 ReScript 훑어보기 (4)'
date: 2020-12-19 00:00:05
category: 'ReScript'
draft: false
---

본 포스트는 <a href="https://rescript-lang.org/docs/latest/">ReScript 공식문서</a>를 스터디하며 정리한 포스트 입니다.<br/>
포스트를 작성하며 작성한 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial)에서 확인할 수 있습니다.

## ReScript의 Primitive Type

ReScript는 string, int, float과 같은 친숙한 원시 타입을 제공한다. ReScript의 원시 타입은 아래와 같다.

- String
- Char
- Regular Expression
- Boolean
- Integers
- Floats
- Unit

## String

ReScript의 `string` 타입은 큰따옴표(")를 구분자로 사용한다. 따옴표(')는 아래에 있는 `char`타입의 구분자로 사용된다.

```reason
let gretting = "Hello world!"
let multilineGreeting = "Hello
 world!"
```

문자열을 합치기 위해서는 `++` 연산자를 사용한다.

```reason
let gretting = "Hello " ++ "world!"
```

### String Interpolation

아래와 같이 문자열에만 허용되는 특별한 문법이 있다.

- 여러줄의 문자열
- 필요하지 않은 특수 문자 이스케이핑
- 보간법 (Interpolation)
- 적절한 유니코드 처리

```reason
let name = "Joe"

let greeting = `Hello
World
👋
${name}
`
```

특수 문자를 이스케이핑할 필요가 없는 경우를 제외하고 JavaScript의 `` ` ``를 사용하는 문자열 보간법과 동일하다.

보간법을 사용할 때 바인딩된 값(위의 예제에서 `name`)이 문자열이 아닐 경우 문자열로 변환해야한다. 보간법을 사용할 때 바인딩을 문자열로 암시적으로 변환하려면 `j`를 앞에 추가하면 된다.

```reason
let age = 10
let message = j`Today I am $age years old.`
```

### 사용법

[API 문서](https://rescript-lang.org/docs/manual/latest/api/js/string)에서 비슷한 `Js.String` API를 참조하면된다. ReScript의 문자열은 JavaScript 문자열에 매핑되므로 두 표준 라이브러리에서 문자열을 사용하는 작업을 섞거나 및 일치시킬 수 있다.

### 팁 & 트릭

ReScrpt는 좋은 타입시스템이 존재한다. 타입이 지정되지 않은 언어에서 문자열을 아래와 같이 사용해 문자열의 의미를 확장하는 경우가 많다.

- 고유한 ID : `var BLUE_COLOR = "blue"`
- 데이터 구조에 대한 식별자 : `var BLUE = "blue" var RED = "red" var colors = [BLUE, RED]`
- 객체 필드의 이름 : `person["age"] = 24`
- 열거형 : `if (audio.canPlayType() === 'probably') { ... }`
- ReScript에 익숙해지면 또 다른 끔찍한 패턴을 찾을 수 있을 것이다.

부족한 문자열 타입에 과부하가 생길수록 타입 시스템이 도움을 줄 수 있다. ReScrpt는 위의 예시에 대하여 간결하고 빠르며 유지 가능한 타입 및 데이터 구조를 제공한다. (예: 나중에 나올 [Variant](https://rescript-lang.org/docs/manual/latest/variant) 섹션)

## Char

ReScript는 하나의 문자만 가지고 있는 문자열 타입을 가지고 있다.

```reason
let firstLetterOfAlphabet = 'a'
```

참고 : `Char`타입은 유니코드 또는 UTF-8을 지원하지 않으므로 권장되지 않는다.

`String`을 `Char`로 변환하려면 `"a". [0]`와 같이 사용하면 된다.  반대로 `Char`를 `String`으로 변환하려면 `String.make (1, 'a')`와 같이 사용하면 된다.

## Regular Expression

ReScript 정규표현식은 JavaScript에 대응되도록 깔끔하게 컴파일된다.

```reason
let r = %re("/b/g")
```

위와 같은 정규표현식에는 `Js.Re.t` 타입이 있다. [Js.Re](https://rescript-lang.org/docs/manual/latest/api/js/re) 모듈에는 JavaScript에서 보았던 정규표현식 헬퍼가 포함되어 있다.

## Boolean

ReScript의 `boolean`은 `bool`타입을 가지며 `true` 또는 `false`일 수 있다. 지원되는 일반적인 연산자는 아래와 같다.

- `&&` : AND 연산자
- `||` : OR 연산자
- `!` : NOT 연산자
- `<=`, `>=`, `<`, `>`
- `==` : 구조가 같음을 판단하는 연산자, 데이터의 구조를 자세히 비교한다. `(1, 2) == (1, 2)`는 참이다. 편하지만 유의해서 사용해야 한다.
- `===` : 참조가 동일한지 판단하는 연산자, 얕은 비교를 한다. `(1, 2) === (1, 2)`는 거짓이고 `let myTuple = (1, 2); myTuple === myTuple`은 참이다.
- `!=` : 구조가 다름을 판단하는 연산자
- `!==` : 참조가 다름을 판단하는 연산자

ReScript의 `true`/`false`는 JavaScript의 `true`/`false`로 컴파일 된다.

## Integers

32비트이며 필요한 경우 잘린다. `+`, `-`, `*`, `/`등 일반적인 연산자를 제공한다. 헬퍼 함수들은 [Js.Int](https://rescript-lang.org/docs/manual/latest/api/js/int)를 참조하면 된다.

**JavaScript의 `number`에 바인딩 할 때 주의해야한다.** 숫자가 긴 경우에는 잘릴 수 있다. 이 경우 JavaScript의 `number`(특히 `Dates`)를 `float`로 대신 바인딩할 수 있다.

## Floats

`Floats`타입은 `Integers`와 다른 연산자를 요구한다. `+.`, `-.`, `*.`, `/.` 등이 존재하며 `0.5 +. 0.6`과 같이 사용한다. 헬퍼 함수들은 [Js.Float](https://rescript-lang.org/docs/manual/latest/api/js/float)를 참조하면 된다.

## Unit

`Unit`타입에는 JavaScript의 `undefined`로 컴파일되는 단일 값 `()`가 존재한다. 다양한 위치에서 플레이스홀더로 사용되는 더미 타입이다. 실제로 이 타입을 보기 전까지는 필요하지 않을 것이다.