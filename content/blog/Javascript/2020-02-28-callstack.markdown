---
title: '콜스택 (Call Stack)'
date: 2020-02-28 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 스택(Stack)이란?

스택(Stack)은 후입선출(**L**ast **I**n **F**irst **O**ut, **LIFO**)을 기본으로하는 자료구조다.<br>
기본적인 보통 연산은 `pop`, `push`, `peek`, `is_empty`가 존재한다.<br>

- `pop` : 스택의 출력 연산
- `push` : 스택의 입력 연산
- `peek` : 스택의 가장 상단의 데이터를 확인하는 연산
- `is_empty` : 스택이 비어있는지 확인하는 연산

### 스택(Stack)의 사용 사례

- 콜스택 (함수의 재귀호출)
- 웹 브라우저 방문기록
- 실행 취소 (undo)
- 괄호 검사
- 후위 표기법 계산

## 자바스크립트에서의 콜스택

자바스크립트는 **하나의 스레드**로 단 **1개의 동시성**만 다루는 언어다.<br>
이것은 자바스크립트가 한 번에 1개의 작업만 다룰 수 있다는 뜻이다.<br>
자바스크립트는 **힙**, **큐**와 함께 구성하는 **단일 콜스택**을 갖는다.<br>

## 콜스택이란?

자바스크립트 엔진이 구동되면서 실행 중인 **코드를 추적**하는 공간이 **콜스택**이다.<br>
함수(`function`)의 호출(`call`)을 기록하는 스택(`stack`)자료구조다.<br>

### 코드로 이해하기

아래의 간단한 코드를 이용해 `Call Stack`을 설명해보겠습니다.<br>

```javascript
function foo() {
  console.log('function foo is called')
  throw new Error('oops!')
}

function bar() {
  console.log('function bar is called')
  foo()
}

function baz() {
  console.log('function baz is called')
  bar()
}

baz()
```

아래와 같이 `foo`, `bar`, `baz`라는 3개의 함수를 작성했습니다.<br>
3개의 함수는 아래와 같은 역할을 한다.<br>

- `baz`함수 : `bar`함수를 호출(`call`)
- `bar`함수 : `foo`함수를 호출(`call`)
- `foo`함수 : `Error`를 던짐(`throw`)

### 이미지로 이해하기

1. `baz`함수 호출

<img src="./images/2020-02-26-CallStack/1.png" width="400"/><br>

`baz`함수가 호출되고 콜스택에 `baz`함수가 `push`된다.<br>

2. `bar`함수 호출

<img src="./images/2020-02-26-CallStack/2.png" width="400"/><br>

`bar`함수가 호출되고 콜스택에 `bar`함수가 `push`된다.<br>

3. `foo`함수 호출

<img src="./images/2020-02-26-CallStack/3.png" width="400"/><br>

`foo`함수가 호출되고 콜스택에 `foo`함수가 `push`된다.<br>

4. 최종 콜스택

<img src="./images/2020-02-26-CallStack/4.png" width="400"/><br>

모든 콜스택이 `push`되고 문제가 없는 경우 상단에 존재하는 함수부터<br>
하나씩 `pop`되게되어 콜스택이 비어 있게 되면 해당 프로그램이 종료되는 것이다.<br>
위의 경우 가장 상단에 있는 `foo`에서 오류가 발생해 프로그램이 비정상 종료된다.<br>

### 콘솔로 이해하기

작성한 자바스크립트 파일을 실행시켜 보았다.<br>

<img src="./images/2020-02-26-CallStack/5.png" width="400"/><br>

`baz`, `bar`, `foo`함수가 순서대로 호출되는 것을 확인할 수 있다.<br>
`Error`가 던져진 이후의 아래의 로그를 보면 콜스택(`Call Stack`)을 확인할 수 있다.<br>

<img src="./images/2020-02-26-CallStack/6.png" width="600"/><br>

에러가 발생한 이후의 로그를 확인해보면 위의 콜스택(`Call Stack`)이미지와 같이<br>
`foo`, `bar`, `baz` 순서로 쌓여있는 것을 확인할 수 있다.<br>

### 콜스택 오버플로우

아래와 같이 `overflow`함수를 재귀호출하는 코드를 작성해보았다.<br>

```javascript
function overflow() {
  overflow()
}

overflow()
```

실행 결과는 아래의 이미지와 같다.<br>

<img src="./images/2020-02-26-CallStack/7.png" width="600"/><br>

**Maximum call stack size exceeded**와 같이 콜스택 사이즈가 초과되었다는 오류를 볼 수 있다.<br>

<img src="./images/2020-02-26-CallStack/8.png" width="500"/><br>

콜스택의 사이즈를 초과하면 더 이상 함수를 실행할 수 없고 오류가 발생하고 종료된다.<br>

## 힙

자바스크립트 엔진이 구동되면서 번수, 함수 같은 정보를 저장하는 곳이 **메모리 힙**(**Memory Heap**)이다.<br>

```javascript
let n = 123
let s = 'string'

let o = {
  a: 1,
  b: null,
}

let a = [1, null, 'string']

function f(a) {
  return a + 2
}
```

위와 같이 자바스크립트 코드에서 변수, 함수를 선언하게 되면 **힙**에 저장되는 것이다.<br>

## 큐

큐는 **선입선출**(**F**irst **I**n **F**irst **O**ut, **FIFO**)의 특징을 갖는 자료구조다.<br>
자바스크립트의 런타임 환경의 **이벤트 큐**는 처리할 **메세지 목록**과 **실행할 콜백 함수**들을 갖는다.<br>
`setTimeOut`과 같은 비동기 함수는 `Web API`를 호출하며 `Web API`는 **콜백 함수**를 큐에 삽입한다.<br>

```javascript
setTimeOut(function() {
  console.log('First Log')
}, 0)

console.log('Second Log')
```

자바스크립트의 **이벤트 큐**와 **이벤트 루프**를 잘 모르고 위의 코드를 실행시켰다면<br>
코드의 실행결과가 `First Log`, `Second Log` 순서대로 출력되는 것을 기대했을 것이다.<br>

<img src="./images/2020-02-26-CallStack/9.png" width="400"/><br>

코드를 실행시켜보면 위와 같이 `Second Log`가 먼저 출력되게 된다.<br>

<img src="./images/2020-02-26-CallStack/10.png" width="700"/><br>

`setTimeOut`함수의 2번째 인자에 0ms를 주었다고 바로 실행되는 것이 아니다.<br>
`Web API`에 의해 호출된 `First Log`가 출력되는 **콜백 함수**는 이벤트 큐에 삽입된다.<br>
이것은 0ms뒤에 함수를 실행시키라는 의미가 아니라 **이벤트 큐에 삽입하라는 의미**다.<br>

<img src="./images/2020-02-26-CallStack/11.png" width="700"/><br>

따라서 `console.log("Second Log");`가 **콜스택**에 삽입 된다.<br>

<img src="./images/2020-02-26-CallStack/12.png" width="700"/><br>

**콜스택**에 있는 모든 함수 실행이 끝나고 삭제되어 **콜스택**이 비어있게 된다.<br>

<img src="./images/2020-02-26-CallStack/13.png" width="700"/><br>

즉 스택이 비어있는 시점에 `setTimeOut`함수의 콜백함수로 들어간<br>
`console.log("First Log")`가 큐에서 나오며 실행되는 것이다.<br>
