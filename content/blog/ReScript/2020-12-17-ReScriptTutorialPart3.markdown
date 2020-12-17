---
title: 'ReScript 공식문서로 ReScript 훑어보기 (3)'
date: 2020-12-17 00:00:05
category: 'ReScript'
draft: false
---

본 포스트는 <a href="https://rescript-lang.org/docs/latest/">ReScript 공식문서</a>를 스터디하며 정리한 포스트 입니다.<br/>
포스트를 작성하며 작성한 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial)에서 확인할 수 있습니다.

## ReScript의 Type

ReScript의 타입 시스템은 아래와 같은 장점이 존재한다.

- **강하다** (Strong)

ReScript에서 **하나의 타입은 다른 타입으로 변경될 수 없다.** JavaScript에서는 코드가 실행되는 런타임에서 작성된 변수들의 타입이 변경될 수 있다. 예를 들어 `number` 타입의 변수가 때때로 `string` 타입으로 변경될 수 있다. 타입의 변경은 좋지 않은 기능이며 타입의 변경은 코드를 읽거나 디버깅할 때 코드를 이해하기 어렵게 만든다.

- **정적이다** (Static)

ReScript의 타입들은 **컴파일 이후에는 모두 사라져 런타임에서는 존재하지 않는다.** 타입으로 인해 저하되는 성능 걱정을 할 필요가 없다. 런타임에는 타입에 대한 정보가 필요하지 않으며 모든 정보 특히나 모든 타입 오류를 컴파일 타임에 알려줍니다.

- **정확하다** (Sound)

이것은 JavaScript로 컴파일되는 다른 많은 타입 언어들과 비교할 때 큰 차별화 요소다. **ReScript의 타입은 절대 틀리지 않을 것을 보장한다.** 대부분 언어의 타입 시스템은 값의 타입을 추측하고 에디터에서 잘못된 타입을 표시한다. ReScript는 그렇게 동작하지 않는다. ReScript는 가끔 정확하지 않은 타입 시스템은 기대와 일치하지 않아 결국 위험할 수 있다고 믿는다.

> 원문은 Sound라고 작성되어 있지만 설명의 맥락과 알맞는 뜻을 Sound에서 찾을 수 없어 "정확하다"라고 의역을 진행했습니다.

- **빠르다** (Fast)

많은 개발자들이 프로젝트의 빌드 시간 중 얼마나 많은 시간이 타입 검사에 소요되는지 과소평가한다. ReScript의 **타입 검사는 가장 빠른 것 중 하나다.**

- **추론된다** (Inferred)

타입을 직접 적을 필요는 없다. ReScript에서는 **값에 해당하는 타입을 추론할 수 있다.** 프로그램의 모든 타입을 틀리지 않고 타입 주석없이 추론하여 신속하게 추론할 수 있다는 것이 신기할 수 있다. ReScript는 가능하며 ReScript에 오신것을 환영한다. =)


## Inference

아래의 let binding은 어떠한 작성된 타입도 포함하지 않는다.

- ReScript 코드

```reason
let score = 10
let add = (a, b) => a + b
```

하지만 ReScript는 `score`가 `int` 타입이라는 것을 값인 `10`을 통해 판단한다. 이것을 **추론**(inference)라고 한다. 마찬가지로 `add`함수가 2개의 `int` 타입 인자를 받으며 `int` 타입을 반환한다는 것을 `+` 연산자가 `int` 타입끼리만 동작한다는 것으로 판단해 알고있다.

## Type Annotation

타입은 추론할 수 있지만 선택적으로 타입 주석을 통해 타입을 작성할 수 있다.

```reason
let score: int = 10
```

만약 `score`에 대한 타입 주석의 해당 타입의 추론된 타입과 일치하지 않을 경우 컴파일 타임에서 오류가 발생한다. 다른 언어들과 달리 ReScript는 사용자가 작성한 타입 수적이 정확하다고 가정하지 않는다.

또한 괄호를 이용해 표현식을 묶고 타입 주석을 작성할 수도 있습니다.

```reason
let myInt = 5
let myInt: int = 5
let myInt = (5: int) + (4: int)
let add = (x: int, y: int): int => x + y
let drawCircle = (~radius as r: int): circleType => /* code here */
```

마지막 줄의 `(~radius as r: int)`는 레이블이 지정된(labeled) 인자다. 자세한 내용은 [함수 페이지](https://rescript-lang.org/docs/manual/latest/function)를 참조할 수 있다.

## Type Alias

타입 별칭을 이용해 다른 이름으로 타입을 참조할 수 있다.

```reason
type scoreType = int
let x: scoreType = 10
```

위 코드의 `scoreType`은 `int` 타입과 동일하다.

## Type Parameter (aka Generic)

타입은 다른 언어들에서 제네릭과 유사한 매개변수들을 받을 수 있다. 매개변수의 이름은 `'`로 시작해야 한다. 매개변수화된 타입의 사용은 **중복을 제거**하는 것으로 중복 제거 이전의 코드는 아래와 같다.

```reason
// 아래는 3가지 항목을 갖는 튜플이다.
type intCoordinates = (int, int, int)
type floatCoordinates = (float, float, float)

let a: intCoordinates = (10, 20, 20)
let b: floatCoordinates = (10.5, 20.5, 20.5)
```

매개변수화된 타입인 `coordinates`를 사용해 아래와 같이 중복된 타입을 제거할 수 있다.

```reason
type coordinates<'a> = ('a, 'a, 'a)

let a: coordinates<int> = (10, 20, 20)
let b: coordinates<float> = (10.5, 20.5, 20.5)
```

위의 코드는 단지 설명을 위한 목적으로 만들어진 예제일 뿐이며 ReScript는 타입을 추론할 수 있으므로 아래와 같이 작성할 수 있다.

```reason
let buddy = (10, 20, 20)
```

타입 시스템은 `buddy`가 `(int, int, int)`임을 유추할 수 있으며 다른 것을 작성할 필요는 없다. 타입 인자는 많은 곳에 나타나며 ReScript의 배열은 `array<'a>`와 같이 타입 매개변수를 요구하는 타입이다.

```reason
// `array<string>`으로 추론된다.
let greetings = ["hello", "world", "how are you"]
```

타입이 매개변수를 받지 않는 경우 표준 라이브러리에서 지루하게 타입 `arrayOfString`, `arrayOfInt`, `arrayOfTuplesOfInt` 등을 정의해야 한다.

타입은 많은 인자들을 받을 수 있으며 구성이 가능하다.

```reason
type result<'a, 'b> =
  | Ok('a)
  | Error('b)

type myPayload = {data: string}

type myPayloadResults<'errorType> = array<result<myPayload, 'errorType>>

let payloadResults: myPayloadResults<string> = [
  Ok({data: "hi"}),
  Ok({data: "bye"}),
  Error("Something wrong happened!")
]
```

위 코드에서 `result` 타입은 `Ok`에 전달되는 `a`타입과 `Error`에 전달되는 `b`타입을 타입 매개변수로 전달 받는다. `myPayloadResults`에 사용되는 `result`타입의 `a`타입에 전달되는 `myPayload`타입은 타입 별칭으로 작성되어 있으며 `myPayloadResults`타입은 `errorType`을 타입 매개변수로 전달받으며 전달받은 이 타입은 `result`의 `b`타입에 전달된다.

## Recursive Types

함수와 같이 타입도 `rec`를 사용해 스스로를 참조할 수 있다.

```reason
type rec person = {
  name: string,
  friends: array<person>
}
```

`person`타입의 필드인 `friends`는 `array<person>`타입이며 `rec`을 이용해 자기 자신의 타입인 `person`타입을 참조할 수 있다.

## Mutually Recursive Types

타입은 `and`를 이용해 상호 재귀적으로 사용할 수도 있다.

```reason
type rec student = {taughtBy: teacher}
and teacher = {students: array<student>}
```

`student`타입은 `teacher`타입을 참조하며 `teacher`타입은 `array<student>`형태로 `student`를 참조한다.

## Type Escape Hatch

ReScript의 타입 시스템은 견고하며 암시적 타입 캐스팅, 임의의 값 타입 추측과 같은 위험하고 안전하지 않은 것들을 허용하지 않는다. 하지만 실용적으로 ReScript는 타입 시스템에게 거짓말을 할 수 있도록 하나의 탈출구를 노출한다.

```reason
external myShadyConversion: myType1 => myType2 = "%identity"
```

위의 선언은 `myType1`을 `myType2`로 변환하며 아래와 같이 사용할 수 있다.

```reason
external convertToFloat : int => float = "%identity"
let age = 10
let gpa = 2.1 +. convertToFloat(age)
```

이 기능은 남용하지 않는게 좋으며 지나치게 동적인 JavaScript 코드와 같이 사용해야 한다면 유용하게 사용할 수 있다. 자세한 enternal 기능들은 [여기](https://rescript-lang.org/docs/manual/latest/external)에서 확인할 수 있다.

참고 : 이 특정 `external` 기능이 `@bs` 주석이 앞에 붙지않는 유일한 항목이다.