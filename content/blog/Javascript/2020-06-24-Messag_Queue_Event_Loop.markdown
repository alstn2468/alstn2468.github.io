---
title: '메시지 큐와 이벤트 루프'
date: 2020-06-24 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 자바스크립트의 특징

자바스크립트는 **싱글 스레드** 기반의 언어이며 1개의 **콜스택**을 사용한다.<br/>
1개의 **콜스택**을 사용하기 때문에 하나의 함수의 작업이 오래걸리게 되면<br/>
그 이후에 실행될 다른 작업들은 실행이 되지 못하는 상황이 발생하게 된다.<br/>
이 문제를 해결하기 위하여 **비동기 콜백** 방식을 사용하고 있다.<br/>
이와 관련된 내용이 **메시지 큐**와 **이벤트 루프**다.

## 메시지 큐

메시지 큐는 자료구조 큐(**Queue**)를 기반으로 구성되어 있다.<br/>
큐는 먼저들어온 것이 먼저나가는 **FIFO**(**F**irst **I**n **F**irst **O**ut)의 특징을 갖는다.<br/>
자바스크립트의 브라우저 엔진의 메시지 큐에는 **비동기**로 처리될 **콜백 함수**가 저장된다.<br/>

<img src="/assets/2020-06-24-Message_Queue_Event_Loop/1.png" width="500"/>

**콜스택**이 비어있게 되면 메시지 큐에 있는 **콜백 함수**를 꺼내와 실행하게 된다.<br/>
**메시지큐**에서 **콜백 함수**를 꺼내오는 이 과정은 **이벤트 루프**가 담당한다.<br/>

## 이벤트 루프

이벤트 루프는 **콜스택이 비어있으면** 메시지 큐에서 **콜백 함수를 꺼내 실행**하는 역할을 한다.<br/>

```javascript
while (queue.waitForMessage()) {
  queue.processNextMessage()
}
```

위와 같은 가상의 코드로 이벤트 루프를 설명할 수 있다.<br/>
`waitForMessage`함수를 이용해 실행 중인 함수가 없을때 까지 대기하게된다.<br/>

## 메시지 큐 와 이벤트 루프 예시

`setTimeout`을 이용해 비동기 적인 흐름을 작성해볼 수 있다.<br/>

```javascript
function foo() {
  console.log('foo')
}

setTimeout(function bar() {
  console.log('bar')
}, 1000)

foo()
```

위와 같이 `setTimeout`함수에 `1000ms`를 주어 실행하게되면<br/>
1초뒤에 `bar`가 출력되는 것을 확인 할 수 있다.<br/>

```javascript
foo
... after 1sec ...
bar
```

`setTimeout`에 `0ms`를 주어 실행하면 `bar`부터 출력이 될 것 같지만 그렇지 않다.<br/>

```javascript
function foo() {
  console.log('foo')
}

setTimeout(function bar() {
  console.log('bar')
}, 0)

foo()
```

`foo`가 먼저 출력이 된 후 `bar`가 출력이 되는 것을 확인할 수 있다.<br/>
`setTimeout`을 사용하게 되면서 `bar`함수는 **메시지 큐**에 들어가게된다.<br/>
그 후 `foo`함수는 **콜스택**에 들어가게 된다. 그림으로 표현하면 아래와 같다.<br/>

<img src="/assets/2020-06-24-Message_Queue_Event_Loop/2.png" width="500"/>

이 과정에서 `foo`함수가 먼저 실행이 되고 **콜스택**이 비어있게되면<br/>
**이벤트 루프**가 `bar`함수를 **콜스택**에 추가해주게 된다.<br/>

## setTimeout

`setTimeout`함수는 **Web API**에 포함되어있는 함수다.<br/>
**Web API**는 브라우저에 내장되어 있으며 `AJAX`, `DOM`, `setTimeout` 등이 있다.<br/>
`Javscript`자체에 존재하지는 않지만 `Javascript`기반으로 만들어졌다.<br/>

```javascript
function foo() {
  console.log('foo')
}

setTimeout(function bar() {
  console.log('bar')
}, 0)

foo()
```

**이벤트 루프**에서 설명했던 위의 예시의 설명을 보면 `setTimeout`에 등록된<br/>
`bar`콜백함수를 바로 **메시지 큐**에 넣는 것 처럼 설명을 했지만 실제로는 그렇지 않다.<br/>
2번째 인자로 받은 일정 시간이 지난 후에 **메시지 큐**에 등록이 된다.<br/>
따라서 `setTimeout`함수에 **2번째 인자로 준 시간 뒤에 실행된다는 보장은 없다**.<br/>
해당 시간이 지난 후 **메시지 큐**에 등록이되며 또한 **콜스택**이 비어있어야<br/>
**이벤트 루프**를 통해 등록된 콜백 함수가 **콜스택**에 위치 될 수 있다.<br/>
