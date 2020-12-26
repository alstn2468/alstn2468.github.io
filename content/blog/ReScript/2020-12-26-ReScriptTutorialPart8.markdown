---
title: 'ReScript 공식문서로 ReScript 훑어보기 (8)'
date: 2020-12-26 00:00:05
category: 'ReScript'
draft: false
---

본 포스트는 <a href="https://rescript-lang.org/docs/latest/">ReScript 공식문서</a>를 스터디하며 정리한 포스트 입니다.<br/>
포스트를 작성하며 작성한 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial)에서 확인할 수 있습니다.

## Variant

지금까지 살펴본 대부분의 ReScript의 자료구조는 익숙할 수 있다. 이 절에서는 매우 중요하면서도 익숙하지 않은 자료구조인 Variant를 소개한다.

대부분의 언어에서 대부분의 자료구조는 "이것 **and** 저것"에 관한 것입니다. Variant는 우리가 "이것 **or** 저것"을 표현할 수 있게 해준다.

```reason
type myResponse =
  | Yes
  | No
  | PrettyMuch

let areYouCrushingIt = Yes
```

`myResponse`는 `Yes`, `No`, `PrettyMuch`의 Variant 타입이며, 이를 "Variant 생성자"(또는 "Variant 태그")라고 합니다. `|`는 각 생성자를 분리한다.

> 참고: Variant의 생성자는 대문자로 작성해야한다. (자세한 내용은 쓰여있지 않지만 첫글자는 필수적으로 대문자임을 의미하는 것 같다.)

### 명시적 타입 정의가 포함하는 Variant

사용 중인 Variant 모델이 다른 파일에 있는 경우 [Record](https://rescript-lang.org/docs/manual/latest/record#record-needs-an-explicit-definition)에서 사용하는 것과 같은 범위로 가져온다.

- `Zoo.res`

```reason
type animal = Dog | Cat | Bird
```

- `Example.res`

```reason
let pet: Zoo.animal = Dog // 선호되는 방식
// or
let pet2 = Zoo.Dog
```

### 생성자 인자

Variant 생성자는 `,`로 구분된 추가 데이터를 저장할 수 있다.

```reason
type account =
  | None
  | Instagram(string)
  | Facebook(string, int)
```

`Instagram`은 `string`타입 값을 가질 수 있으며  `Facebook`은 `string`타입과 `int`타입 값을 가질 수 있다.

```reason
let myAccount = Facebook("Josh", 26)
let friendAccount = Instagram("Jenny")
```

### 레이블된 Variant 인자

Variant의 인자에 여러 개의 필드가 있는 경우 Record와 유사한 구문을 사용하여 읽기 쉽도록 레이블을 지정할 수 있다.

```reaon
type user =
  | Number(int)
  | Id({name: string, password: string})

let me = Id({name: "Joe", password: "123"})
```

이를 기술적으로 "인라인 레코드"라고 하며, Variat생성자 내에서만 허용됩니다. Record타입 선언은 ReScript의 다른 곳에서는 인라인으로 연결할 수 없다.

물론, 일반 Record타입도 Variant모델에 넣을 수 있다.

```reason
type u = {name: string, password: string}
type user =
  | Number(int)
  | Id(u)

let me = Id({name: "Joe", password: "123"})
```

결과물은 앞의 예시보다 약간 못생기고 성능이 떨어진다.

### Variant의 패턴 매칭

이후에 [패턴 매칭/비구조화](https://rescript-lang.org/docs/manual/latest/pattern-matching-destructuring) 섹션을 참고하면 된다.

### JavaScript 출력

Variant는 타입 선언에 따라 가능한 JavaScript 출력 3개로 컴파일된다.

- Variant가 인자가 없는 생성자인 경우 `number`로 컴파일된다.
- 인자가 있는 생성자일 경우, 첫 번째 인자의 경우 `_0`필드와 두 번째 인자의 경우 `_1`필드가 있는 객체로 컴파일된다.
- 위의 예외는 타입 선언에 인자가 있는 단일 생성자만 포함된 Variant다. 이 경우 생성자는 `TAG` 필드가 없는 객체로 컴파일된다.
- 레이블이 지정된 Variant 인자는 `_0`, `_1`등 대신 레이블 이름을 가진 객체로 컴파일된다. 객체에는 이전 규칙에 따라 `TAG`필드가 있거나 없을 수 있다.

- ReScript 코드 (인자가 없는 경우)

```reason
type greeting = Hello | Goodbye
let g1 = Hello
let g2 = Goodbye
```

- JavaScript 코드 (인자가 없는 경우)

```javascript
var g1 = /* Hello */0;
var g2 = /* Goodbye */1;
```

- ReScript 코드 (하나의 인자가 있는 경우)

```reason
type outcome = Good | Error(string)
let o1 = Good
let o2 = Error("oops!")
```

- JavaScript 코드 (하나의 인자가 있는 경우)

```javascript
var o1 = /* Good */0;
var o2 = /* Error */{
  _0: "oops!"
};
```

- ReScript 코드 (하나 또는 두개의 인자가 있는 경우)

```reason
type family = Child | Mom(int, string) | Dad (int)
let f1 = Child
let f2 = Mom(30, "Jane")
let f3 = Dad(32)
```

- JavaScript 코드 (하나 또는 두개의 인자가 있는 경우)

```javascript
var f1 = /* Child */0;
var f2 = {
  TAG: /* Mom */0,
  _0: 30,
  _1: "Jane"
};
var f3 = {
  TAG: /* Dad */1,
  _0: 32
};
```

- ReScript 코드 (레이블이 지정된 인자가 있는 경우)

```reason
type person = Teacher | Student({gpa: float})
let p1 = Teacher
let p2 = Student({gpa: 99.5})
```

- JavaScript 코드 (레이블이 지정된 인자가 있는 경우)

```javascript
var p1 = /* Teacher */0;
var p2 = /* Student */{
  gpa: 99.5
};
```

- ReScript 코드 (여러 형식이 결합된 경우)

```reason
type s = {score: float}
type adventurer = Warrior(s) | Wizard(string)
let a1 = Warrior({score: 10.5})
let a2 = Wizard("Joe")
```

- JavaScript 코드 (여러 형식이 결합된 경우)

```javascript
var a1 = {
  TAG: /* Warrior */0,
  _0: {
    score: 10.5
  }
};
var a2 = {
  TAG: /* Wizard */1,
  _0: "Joe"
};
```

### 팁 & 트릭

2개의 인자를 가진 생성자와 단일 튜플 인자를 가진 생성자를 혼동하지 않도록 주의해야한다.

```reason
type account =
  | Facebook(string, int) // 두개의 인자
type account2 =
  | Instagram((string, int)) // 한개의 인자 튜플
```

#### Variant는 생성자를 필수적으로 갖는다.

타입이 없는 언어를 사용하다 왔을 경우 `type myType = int | string`와 같이 시도할 수 있을 것이다. 이것은 ReScript에서는 불가능하다. 이러한 타입을 사용하기 위해서는 `type myType = Int(int) | String(string)`와 같이 각각 생성자를 전달해야 한다. `type myType = int | string`는 보기에 깔끔해 보이지만 많은 문제를 발생시킨다.

#### JavaScript 인터럽트

이 섹션에서는 JavaScript 인터럽트에 대한 지식이 있다는 것을 가정한다. JavaScript의 함수를 감싸는데 데 Variant를 사용할 마음이 아직 느껴지지 않았다면 이 섹션을 건너뛰어도 된다.

많은 JavaScript 라이브러리는 많은 타입의 인자를 허용할 수 있는 함수를 사용한다. 이런 경우, 모델을 Variant 모델로 만드는 것은 매우 유혹적이다. 예를 들어 숫자나 문자열을 사용하는 `myLibrary.draw` JavaScript 함수가 있다고 가정하고 아래와 같이 묶고 싶을 수 있다.

```reason
// reserved for internal usage
@bs.module("myLibrary") external draw : 'a => unit = "draw"

type animal =
  | MyFloat(float)
  | MyString(string)

let betterDraw = (animal) =>
  switch animal {
  | MyFloat(f) => draw(f)
  | MyString(s) => draw(s)
  }

betterDraw(MyFloat(1.5))
```

이렇게 하면 문제가 추가적으로 발생할 수 있으므로 그렇게 하는 것은 좋지 않다. 또는 둘 다 동일한 JavaScript 호출로 컴파일하는 두 개의 `external` 항목을 정의할 수 있다.

```reason
@bs.module("myLibrary") external drawFloat: float => unit = "draw"
@bs.module("myLibrary") external drawString: string => unit = "draw"
```

ReScript는 또한 이를 위한 [몇 가지 다른 방법](https://rescript-lang.org/docs/manual/latest/bind-to-js-function#modeling-polymorphic-function)을 제공합니다.

### 필드의 이름으로 Variant의 타입을 찾을 수 있다.

이전의 Record 섹션을 참조할 수 있다. Variant 또한 동일하다. 함수는 두 Variant가 공유하는 임의의 생성자를 허용할 수 없다. 이런 기능들이 존재하며 다형성 변형이라고 불린다.

### Variant타입의 설계 결정

다양한 형태(다형변형, 개방변형, GADT 등)의 변형은 ReScript와 같은 타입 시스템의 특징일 가능성이 높다. 예를 들어, 앞에서 언급한 옵션 변형은 다른 언어에서 버그의 주요 원천인 null 가능한 유형의 필요성을 없앤다. 철학적으로 말하면, 문제는 많은 가능한 분기/조건으로 구성되어 있다. 이러한 조건들을 잘못 다루는 것은 우리가 버그라고 부르는 것의 대부분이다. **타입 시스템은 마법처럼 버그를 제거하는 것이 아니라 처리되지 않은 상태를 지적하고 이를 커버하도록 요청한다.** "이것 또는 저것"을 정확하게 모형화하는 능력은 매우 중요하다.

예를 들어, 어떤 사람들은 어떻게 타입 시스템이 잘못 포맷된 JSON 데이터가 자신의 프로그램으로 전파되는 것을 안전하게 제거할 수 있는지 궁금해한다. 그러나 파서가 `None | Some(actualData)` 옵션 타입을 반환하면 나중에 호출부에서 `None` 케이스를 명시적으로 처리해야 한다.

성능 면에서 Variant는 잠재적으로 프로그램 처리의 속도를 엄청나게 높일 수 있다. 다음은 JavaScript 코드다.

```javascript
let data = 'dog'
if (data === 'dog') {
  ...
} else if (data === 'cat') {
  ...
} else if (data === 'bird') {
  ...
}
```

위의 코드는 시간복잡도가 O(n)인 조건 확인 분기가 있다. 이것을 ReScript의 Variant의 사용과 비교할 수 있다.

```reason
type animal = Dog | Cat | Bird
let data = Dog
switch data {
| Dog => Js.log("Wof")
| Cat => Js.log("Meow")
| Bird => Js.log("Kashiiin")
}
```

컴파일러가 Variant를 보고, 개념적으로 그들을 `type animal = 0 | 1 | 2`로 바꾼다. 그 후 `switch`를 일정한 시간 O(1)이 소요되는 점프 테이블로 컴파일한다.