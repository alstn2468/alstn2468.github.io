---
title: 'ReScript 공식문서로 ReScript 훑어보기 (7)'
date: 2020-12-23 00:00:05
category: 'ReScript'
draft: false
---

본 포스트는 <a href="https://rescript-lang.org/docs/latest/">ReScript 공식문서</a>를 스터디하며 정리한 포스트 입니다.<br/>
포스트를 작성하며 작성한 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial)에서 확인할 수 있습니다.

## Object

ReScript의 Object타입은 [Record](https://rescript-lang.org/docs/manual/latest/record)타입과 비슷하지만 아래와 같은 차이점이 있다.

- 타입 선언이 필요하지 않다.
- Record타입과 다르게 구조적이고 다형성이 강하다.
- 객체가 JavaScript쪽에서 오지 않는한 업데이트를 지원하지 않는다.
- [패턴 매칭](https://rescript-lang.org/docs/manual/latest/pattern-matching-destructuring)을 지원하지 않는다.

ReScript의 Record타입은 깔끔한 JavaScript 객체로 컴파일되지만 ReScript의 Object타입은 JavaScript 객체에 에뮬레이팅이나 바인딩을할 수 있는 더 나은 후보다.

### Object의 타입 선언

Record타입과 달리 타입 선언이 선택적이다. Object타이은 값에서 타입이 추론되므로 실제로는 입력할 필요가 없다. 그럼에도 불구하고 타입 선언 문법은 아래와 같다.

```reason
type person = {
  "age": int,
  "name": string
};
```

Record타입의 타입 선언 문법과 보기에 비슷하지만 필드의 이름이 `"`로 감싸져 있다.

### Object를 생성하는 방법

Object타입의 값을 생성하는 방법은 아래와 같습니다.

```reason
let me = {
  "age": 5,
  "name": "Big ReScript"
}
```

위에서 설명한 것처럼, Record와 달리 이 `me`는 `"age"` 및 `"name" `필드를 사용하여 일치하는 타입 선언을 찾으려고 하지 않는다. 대신 `me`의 타입은 `{"age":int, "name":string}`로 추론된다. 이는 편리하지만 아래의 코드가 오류 없이 타입 검사를 통과한다는 것을 의미한다.

```reason
type person = {
  "age": int
};

let me = {
  "age": "hello!" // age는 string이지만 오류가 발생하지 않는다.
}
```

왜냐하면 타입 체커는 `me`가 `person`타입인지 맞추려고 하지 않는다. Object값을 미리 선언된 Object타입으로 지정하기위해서는 아래와 같이 타입 주석을 사용하면 된다.

```reason
let me:person = {
  "age": "hello!"
}
```

이제 타입 시스템은 적절하게 오류를 발생시킬 것이다.

### Object의 필드에 접근하는 방법

```reason
let age = me["age"]
```

Object의 필드에 접근하기 위해서는 위와 같이 `[]`를 이용해 접근한다.

### Object를 업데이트하는 방법

Object가 JavaScript에서 오는 바인딩이 아닌 경우 허용되지 않는다. 이 경우에는 `=:`를 사용한다.

```reason
type student = {
  @bs.set "age": int,
  @bs.set "name": string,
}
@bs.module("MyJSFile") external student1: student = "student1"

student1["name"] = "Mary"
```

### 팁 & 트릭

Object는 타입 선언이 필요하지 않고 ReScript가 모든 타입을 제공하므로 매우 빠르고 쉽지만 위험하게 모든 JavaScript의 API에 바인딩할 수 있다. 아래 코드의 JavaScript 출력을 확인해볼 수 있다.

> 실제 동작하는 코드는 [여기](https://github.com/alstn2468/ReScript_Tutorial/blob/main/src/6_Object/index.html)에 있다.

```reason
// document의 타입은 랜덤 타입인 'a 다
// 굳이 명시하지 않아도 되는 타입이다.
@bs.val external document: 'a = "document"

// 메서드 호출
document["addEventListener"]("mouseup", _event => {
  Js.log("clicked!")
})

// 속성 가져오기
let loc = document["location"]

// 속성 설정하기
document["location"]["href"] = "http://www.rescript-lang.org"
```

`External` 기능과 이 트릭의 사용법은 뒷부분의 [external](https://rescript-lang.org/docs/manual/latest/external#tips--tricks) 섹션에도 나와 있다. 특정 라이브러리에 대한 바인딩이 있는지에 대해 걱정하지 않고 일부 ReScript 코드를 쓰기 시작할 수 있는 훌륭한 방법이다.