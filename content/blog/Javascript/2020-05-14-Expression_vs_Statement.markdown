---
title: '식(expression) vs 문(statement)'
date: 2020-05-13 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 자바스크립트의 식과 문

자바스크립트에는 대표적은 2가지 문법 카테고리가 존재한다.<br/>

1. **식** (**Expression**)
2. **문** (**Statement**)

**식** (**Expression**)은 **문** (**Statement**)처럼 동작할 수 있다.<br/>
**문** (**Statement**)은 **식** (**Expression**)처럼 동작할 수 없다.<br/>

## 식 (Expression)

**식** (**Expression**)은 하나의 **값**을 만들어 낸다.<br/>
**식** (**Expression**)의 종류는 4가지가 존재한다.<br/>

-   **값**

아래 같은 `number`, `string`, `undefined`, `null`같은 **값 자체도 식**이다.<br/>

```javascript
1
3.14
"expression"
undefined
null
```

-   **연산식**

아래와 같은 **연산자가 포함**된 경우도 결과적으로 **하나의 값을 갖는 식**이 된다.<br/>
연산자가 많아져 연산식이 길어져도 결국은 **하나의 값**만 갖는다.<br/>

```javascript
1 + 1 // 2
2 > 1 // true
(1 * 2 * 3) / 2 // 3
1 * 2 * 3 > 1 // true
true || 1 // true
5 > 1 ? 5 : 1 // 5
```

-   **리터럴**

**객체를 생성**하기 위한 **리터럴** 또한 **참조값을 갖는 식**이다.<br/>

```javascript
{} // 객체 리터럴
function () {} // 함수 리터럴
[] // 배열 리터럴
/\b/ // 정규식 리터럴
```

-   **함수 호출**

아래와 같이 **함수의 호출** 결과 또한 **값을 반환하는 식**이다.<br/>
`voidFunction`과 같이 반환값이 없는 함수도 `undefined`라는 값을 반환하는 **식**이된다.<br/>

```javascript
Math.ceil(3.14) // 4
voidFunction() // undefined
(5).toString() // "5"
```

## 문 (Statement)

**문** (**Statement**)은 기본적으로 무언가를 수행한다.<br/>
자바스크립트에서 문장은 값이 들어가야할 곳에 들어갈 수 없다.<br/>
따라서 **문** (**Statement**)은 **함수의 인자**, **대입 연산의 값**, 연**산자의 피연산자**로 사용할 수 없다.<br/>

```javascript
foo(if (true) { return 2 }) // Uncaught SyntaxError: Unexpected token 'if'
```

자바스크립트의 문은 아래와 같다.<br/>

1. `if`
2. `if-else`
3. `while`
4. `do-while`
5. `for`
6. `switch`
7. `for-in`
8. `debugger`
9. `variable declaration`

아래와 같은 코드를 콘솔에 치면 `18`이 반환된 것을 볼 수 있다.<br/>

```javsscript
if (true) { 9 + 9 }
```

<img src="/assets/2020-05-14-Expression_vs_Statement/1.PNG" width="200"/>

하지만 우리는 이 **문** (**Statement**)의 결과를 **식** (**Expression**)처럼 사용할 수 없다.<br/>
지금까지의 내용으로는 **문** (**Statement**)은 아무 값도 반환하지 않았어야 한다.<br/>
우리는 이 반환된 값을 이용할 수 없고, 따라서 **문** (**Statement**)이 반환하는 값은 의미가 없다.<br/>

> That’s Javascript for you, weird.
> 자바스크립트가 널 위한 거야, 이상해.

## 함수 선언, 함수 표현식, 네임드 (Named) 함수 표현식

기본적으로 함수의 선언은 **문** (**Statement**)이다.<br/>

```javascript
function thisIsStatement(func) {
    return func.name;
}
```

**익명 함수**라 불리는 **함수 표현식**은 **식** (**Expression**)이다.<br/>

```javascript
thisIsStatement(function () {}); // ""
```

**익명 함수**와 비슷하지만 이름이 있는 **네임드 함수 표현식**은 **식** (**Expression**)이다.<br/>

```javascript
thisIsStatement(function namedFunc() {}); // "namedFunc"
```

**값이 들어올 곳**에 **함수를 선언**하면, 자바스크립트는 **그 함수를 값으로 사용**하려 한다.<br/>
값이 들어올 곳에 선언된 함수가 **값으로 사용될 수 없다면**, **에러가 발생**할 것이다.<br/>
값이 들어가는 곳이 아닌 위치에 있는 곳에 함수를 선언하면 **문** (**Statement**)으로 쓰인다.<br/>

```javascript
if () {
    function foo() {} // 함수 선언문
}

function foo() {} // 함수 선언문

function foo() {
    function bar() {} // 함수 선언문
}

function foo() {
    return function bar() {} // 네임드 함수 표현식
}

callFunction(function () {}) // 익명 함수 표현식

function foo() {
    return function bar() {
        function baz() {} // 함수 선언문
    }
}

function () {} // Function statements require a function name
```

## 식 (Expression)은 상태 (State)를 바꿀 수 있다.

아래의 코드에서 변수 `a`는 상태다.<br/>
`a * 1`, `a - 1`같은 식에 의해서도 `a`의 값은 그대로 `1`이다.<br/>

```javascript
let a = 1; // 문 (Statement)

a * 1 // 식 (Expression)
a - 1 // 식 (Expression)
a + 1 // 식 (Expression)
a / 1 // 식 (Expression)

console.log(a) // 1
```

이 예제는 사용한 **식**이 변수가 가진 **상태** (**State**)를 변경시키지 않았다.<br/>
하지만 **함수 호출**과 같은 식은 **상태을 변화시키는 문**을 포함할 수 있다.<br/>

```javascript
let a = 1;
function foo() {
    a = 2;
}

console.log(a) // 1
foo();
console.log(a) // 2
```

`foo`함수를 호출하는 것은 **식**이지만 내부에 **상태를 변화시키는 문**이 존재한다.<br/>
**함수 호출** 식으로 인한 **의도치않은 상태 변경**을 막기위해서는 **명시적 반환**을 하면 된다.<br/>

```javascript
let a = 1;
function foo() {
    return 2;
}

console.log(a) // 1
foo();
console.log(a) // 1
a = foo();
console.log(a) // 2
```

## 식 (Expression)을 문 (Statement)으로 바꾸기

**식** (**Expression**)을 **문** (**Statement**)으로 바꾸기 위해서는 `;`만 추가하면 된다.<br/>

```javascript
2 + 2
2 + 2;
```

위의 `2 + 2`는 **식** (**Expression**)이다.<br/>
식에 `;`을 추가한 `2 + 2;`는 **표현식 문장** (**Expression Statements**)이다.<br/>
`2 + 2;`가 **문** (**Statement**)이 되었기 떄문에 아래와 같이 사용하면 에러가 발생한다.<br/>

```javascript
Math.ceil(2 + 2;) // ERROR
```

**식** (**Expression**)이 들어가야할 곳에 **문** (**Statement**)이 들어갔기 때문이다.<br/>

## 세미콜론과 콤마 연산자

세미콜론 (`;`)을 사용하면 여러줄의 **문** (**Statement**)을 한 줄에 넣을 수 있다.<br/>

```javascript
let a; function foo() {}; const b = 2;
```

콤마 연산자(`,`)를 사용하면 여러 개의 **식** (**Expression**)을 **연결**할 수 있다.<br/>
반환되는 식의 값은 **마지막 식**의 **값만 반환**된다.<br/>

```javascript
(1 + 2, true, Math.ceil(4.5)) // 5
(function () {}, 5 > 1 ? 5 : 1) // 5
```

또한 **식** (**Expression**)은 왼쪽에서 오른쪽으로 계산된다.<br/>

```javascript
function foo() { return true, false, 1, "expression" }
foo() // expression
```
