---
title: 'ReScript 공식문서로 ReScript 훑어보기 (6)'
date: 2020-12-21 00:00:05
category: 'ReScript'
draft: false
---

본 포스트는 <a href="https://rescript-lang.org/docs/latest/">ReScript 공식문서</a>를 스터디하며 정리한 포스트 입니다.<br/>
포스트를 작성하며 작성한 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial)에서 확인할 수 있습니다.

## Record

Record는 JavaScript의 객체와 비슷하지만 아래와 같은 차이점이 존재한다.

- 기본적으로 불변하다.
- 확장 불가능한 고정적인 필드들을 갖는다.

### Record의 타입 선언

Record는 필수적으로 타입 선언이 필요하다.

```reason
type person = {
  age: int,
  name: string
}
```

### Record를 생성하는 방법

위에서 선언한 `person`타입의 Record를 생성하는 방법은 아래와 같다.

```reason
let me = {
  age: 5,
  name: "Big ReScript"
}
```

새로운 Record값을 생성하면 ReScript는 값의 모양과 알맞는 Record타입을 찾으려한다. 따라서 여기서 `me`의 값은 `person`타입으로 추론된다.

대신에 타입이 다른 파일이나 모듈에 존재할 경우 해당 파일 또는 모듈을 명시적으로 표시해야 한다.

```reason
// School.res
type person = { age: int, name: string }

// Example.res
let me: School.person = {age: 20, name: "Big ReScript"}
/* or */
let me2 = {School.age: 20, name: "Big ReScript"}
```

위의 예시는 Record의 타입 정의가 School 파일에 존재한다 명시되어 있다. 첫번째 예시인 `me: School.person`과 같은 일반적인 타입 주석이 더 선호된다.

### Record의 필드에 접근하는 방법

친숙한 `.`표기법을 사용해 Record의 필드에 접근할 수 있다.

```reason
let name = me.name
```

### Record의 불변한 업데이트

오래된 Record로부터 새로운 Record를 생성해야 할 경우 전개 연산자인 `...`를 사용해 원본 Record의 변형없이 새로운 Record를 생성할 수 있다.

```reason
let meNextYear = {...me, age: me.age + 1}
```

Record의 형태는 타입에따라 고정되어 있으므로 전개 연산자를 사용해도 Record에 새로운 필드를 추가할 수 없다.

### Record의 변경 가능한 업데이트

선택적으로 Record의 필드를 변경할 수 있다. Record의 필드에 `mutable`키워드를 추가하고 `=` 연산자를 사용해 해당 필드를 효율적으로 업데이트 할 수 있다.

```reason
type person = {
  name: string,
  mutable age: int
}

let baby = {name: "Baby ReScript", age: 5}
baby.age = baby.age + 1
```

타입 선언에서 `mutable`이 명시되지 않은 필드는 업데이트할 수 없다.

### JavaScript 결과물

ReScript의 Record는 JavaScript의 객체로 직접 컴파일된다.

- ReScript 코드

```reason
type person = {
  name: string,
  mutable age: int
}

let baby = {name: "Baby ReScript", age: 5}
baby.age = baby.age + 1
```

- JavaScript로 컴파일된 결과물

```reason
var baby = {
  name: "Baby ReScript",
  age: 5
};

baby.age = baby.age + 1 | 0;
```

위와 같이 예시들의 컴파일된 결과물을 확인해보면 된다.

### 팁 & 트릭

**Record의 타입은 필드의 이름으로 찾을 수 있다.** 레코드의 경우 "`age`필드가 있는 한 함수가 모든 Record타입을 사용하고 싶다"라고 말할 수 없다. 아래 코드는 의도 한대로 작동하지 않는다.

```reason
type person = {age: int, name: string}
type monster = {age: int, hasTentacles: bool}

let getAge = (entity) => entity.age
```

대신 `getAge`함수는 매개 변수 `entity`가 `age`필드가 존재하는 가장 가까운 Record타입인 `monster`라고 추론할 것이다. 따라서 아래 코드의 마지막 줄에서 에러가 발생한다.

```reason
let kraken = {age: 9999, hasTentacles: true}
let me = {age: 5, name: "Baby ReScript"}

getAge(kraken)
getAge(me) // type error!
```

타입 시스템은 `me`가 `person`타입이고 `getAge`함수는 `monster`타입에 대해서만 동작한다고 오류를 발생시킬 것이다. 이러한 기능이 필요한 경우 [여기](https://rescript-lang.org/docs/manual/latest/object)에 설명된 ReScript object를 사용하면 된다.

### Record타입의 설계 결정

이전 섹션의 제약 조건을 읽은 후 동적 언어 배경에서 왔다면 명시적인 타입 작성이 필요하고 동일한 필드 이름을 가진 다른 Record가 동일한 함수에 전달되는 것을 허용하지 않기 때문에 처음부터 객체를 사용하지 않고 Record를 사용하는 이유가 궁금할 것이다.

1. 대부분의 경우 앱에서의 데이터의 모양이 실제로는 고정이 되어 있으며 그렇지 않은 경우 다음에 소개될 Variant의 결합과 Record를 같이 사용하는 것이 더 잘 표현해준다.

2. Record타입은 단일 명시적 타입 선언(nominal typing)을 찾아서 결정되므로 타입 오류 메시지가 대응되는 타입(튜플과 같은 구조적 타입)보다 잘 표시된다. 이렇게하면 리팩토링을 더 쉽게 만들 수 있다. Record타입의 필드를 변경하면 자연적으로 컴파일러가 해당 Record가 여전히 동일한 Record이며 특정 위치에서 잘못 사용되고 있음을 알 수 있다. 그렇지 않으면 구조적 타이핑에서 정의 또는 사용이 잘못되었는지 여부를 구별하기 어려울 수 있습니다.