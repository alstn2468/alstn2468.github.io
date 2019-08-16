---
title: "TypeScript란?"
date: 2019-08-16 00:00:04
categories: [TypeScript]
tags: [TypeScript, JavaScript, ES6, React, Front-End, Web]
comments: true
---

## TypeScript란?

**자바스크립트 대체 언어**의 하나로써 **자바스크립트의 상위확장**이다.<br/>
**TypeScript**는 Microsoft에서 2012년 발표한 **오픈소스**로<br/>
**정적 타이핑**을 지원하며 ES6의 클래스, 모듈 등과 ES7의 Decorator 등을 지원<br/>

## JavaScript와 차이

#### JavaScript

```javascript
let hello = "hello";
console.log(typeof hello); // string
```

위와 같은 `hello`라는 변수를 선언할 때 **JavaScript**는<br/>
**동적**으로 변수의 **Type**을 추론한다.<br/>

아래와 같이 다른 **Type**의 값을 넣었을 때 **JavaScript**에서는 잘 작동한다.<br/>

```javascript
hello = 4;
console.log(typeof hello); // number
```

하지만 **TypeScript**에서는 아래와 같이 변수 선언을 할때<br/>
**정적**으로 타입을 지정해 사용할 수 있다.<br/>

#### TypeScript

```typescript
let hello: string = "hello";
console.log(typeof hello); // string
```

**JavaScript**에서 사용했던 것과 같이 변수에 다른 타입 데이터를<br/>
저장하려고 하면 오류가 발생한다.<br/>

```typescript
// hello = 4; 사용 불가
```

이는 해당 변수를 사용할 때 사용자가 입력한 값이 유효한지 검사할 때<br>
변수의 **Type**이 맞는지 검사하는 조건문을 줄여줄 수 있게된다.<br/>

### 함수에서의 TypeScript

아래와 같이 함수의 **Parameter**의 타입을 정할 수 있다.<br/>
지정한 **Type**과 다른 **Type**의 값이 들어온다면 실행되지 않을 것이다.<br/>

```typescript
const plus = (a: number, b: number) => a + b;
console.log(plus(1, 2)); // 3

// console.log(plus("NotWork", 2));
```

또한 **반환값**의 **Type**도 지정할 수 있다.<br/>

```typescript
const greet = (name: string, age: number): string => {
  return `Hello ${name} you are ${age} years old`;
};
console.log(greet("Minsu", 21));
```

위의 함수는 **Parameter**로 `string`하나와 `number`하나를 받고<br/>
`string`을 반환하도록 명시되어있는 함수다.<br/>

```typescript
// const greet = (name: string, age: number): string => {
//   console.log(`Hello ${name} you are ${age} years old`);
// };
```

이전의 함수를 `string`을 반환하지 않고 위와 같이 사용한다면 에러가 발생한다.<br/>
**TypeScript**의 **정적 타이핑**은 개발자들이 쉽게 할 수 있는 실수를 줄여줄 것이다.
