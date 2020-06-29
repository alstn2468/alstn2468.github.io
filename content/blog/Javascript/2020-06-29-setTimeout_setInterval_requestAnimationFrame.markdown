---
title: 'setTimeout, setInterval and requestAnimationFrame'
date: 2020-06-29 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 자바스크립트에서의 스케쥴링

자바스크립트에서는 **스케쥴링**을 위한 **타이머 함수**가 존재한다.<br/>
사용가능한 **타이머 함수**와 **타이머 함수**의 기능은 아래와 같다.<br/>

|         함수 이름         |                    기능                    |
| :-----------------------: | :----------------------------------------: |
|  setTimeout(fn, timeout)  | 일정 시간 후 fn으로 받은 함수를 실행한다.  |
| setInterval(fn, interval) | fn으로 받은 함수를 일정 시간마다 실행한다. |
|     clearTimeout(id)      |    실행되고 있는 id값의 timeout을 중지     |
|     clearInterval(id)     |    실행되고 있는 id값의 interval을 중지    |

**타이머 함수**는 함수를 당장 실행하지 않고 **일정 시간 후 실행**하고자 할 때 사용한다.<br/>
이와 같은 상황을 **호출 스케쥴링**(scheduling a call)이라고 한다.<br/>
**타이머 함수**는 자바스크립트의 스펙이 아닌 **브라우저**와 `node.js`에서 제공한다.<br/>

## setTimeout

### setTimeout함수의 기본 문법

```javascript
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);
```

### setTimeout함수의 파라미터

-   `func|code`

`setTimeout`에서 실행을 할 **함수**나 **문자열**을 받는다.<br/>
주로 **함수**를 받으나 코드의 **문자열**도 받을 수 있지만 **권장 사항은 아니다**.<br/>

-   `delay`

파라미터로 받은 `func|code`를 실행하기전 딜레이를 의미한다.<br/>
`ms`단위로 이루어져 있으며 `1000ms`는 `1s`와 같다.<br/>
기본 설정 값은 `0`이 들어있다.<br/>

-   `arg1`, `arg2` ...

함수에 대한 인자를 의미한다. (IE9 아래의 버전에서는 지원하지 않는다.)<br/>

### setTimeout 예시

-   인자가 없는 함수

1초 뒤에 `sayHello()`를 호출하는 코드를 아래와 같이 작성할 수 있다.<br/>

```javascript
function sayHello() {
    alert("Hello!");
}

setTimeout(sayHello, 1000);
```

위의 코드를 실행시켜보면 약 1초뒤에 `Hello!`라는 alert이 보이게 된다.<br/>

-   인자가 있는 함수

함수에 인자가 있는 경우 `arg1`, `arg2` ...를 이용해 함수에 인자를 전달할 수 있다.<br/>

```javascript
function sayHello(name) {
    alert("Hello " + name + "!");
}

setTimeout(sayHello, 1000, "Minsu");
```

넘겨준 `Minsu`라는 인자가 `sayHello`함수에 잘 전달되는 것을 확인할 수 있다.<br/>

-   함수 대신에 문자열을 넘겼을 때

`func|code`인자에서 함수가 아닌 **문자열이 들어가게 될 경우도 작동**한다.<br/>
자바스크립트는 **문자열을 통해 함수를 만들어내 실행**하게 된다.<br/>

```javascript
setTimeout('alert("Hello")', 1000);
```

정상적으로 작동하지만 권장되는 방식은 아니다.<br/>

### setTimeout 사용 시 유의사항

`setTimeout`의 인자로 함수를 넘겨주어야 한다.<br/>
하지만 함수를 넘겨주어야 하지만 아래와 같이 함수를 실행해서는 안된다.<br/>

```javascript
function sayHello() {
    alert("Hello!");
}

setTimeout(sayHello(), 1000); // Wrong!
```

위의 코드는 작동하지 않는다. `setTimeout`함수는 **함수의 참조**를 받는다.<br/>
함수를 실행한다면 `sayHello`함수의 반환값은 `undefined`가 되어 스케쥴이 되지 않는다.<br/>

### clearTimeout으로 스케쥴 취소하기

`setTimeout`을 호출하면 반환 값으로 우리가 실행한 `setTimeout`의 `timerId`를 반환한다.<br/>
스케쥴을 취소하기 위해서는 `clearTimeout`함수를 사용한다.<br/>

-   `clearTimeout` 기본 문법

```javascript
let timerId = setTimeout(...);
clearTimeout(timerId);
```

`timerId`를 `clearTimeout`에 넘겨줌으로 써 스케쥴을 취소할 수 있다.<br/>

-   `clearTimeout` 예시

아래의 코드를 실행시키면 알 수 있듯이 브라우저에서의 `timerId`는 `Number`다.
`node.js`에서는 추가적인 메소드를 제공하고 `timer object`를 반환한다.<br/>

```javascript
let timerId = setTimeout(() => alert("Nothing happens..."), 1000);
alert(timerId);

clearTimeout(timerId);
alert(timerId);
```

`1000ms`뒤에 실행시키기로 했던 스케쥴이 `clearTimeout`을 통해 취소된 것을 확인할 수 있다.<br/>
2번째 줄의 `alert`으로 확인한 `timerId`와 `clearTimeout`후에 확인한 `timerId`가 동일하다.<br/>
스케쥴을 취소하더라도 `timerId`가 `null`이 되지는 않는다.<br/>

## setInterval

### setInterval함수의 기본 문법

`setInterval`함수는 `setTimeout`과 동일한 문법을 갖는다.<br/>

```javascript
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...);
```

모든 인자들은 `setTimeout`과 동일한 의미를 갖는다.<br/>
다른점은 `setTimeout`함수는 인자로 받은 함수를 한 번만 실행한다.<br/>
`setInterval`함수는 `delay`를 주기로 인자로 받은 함수를 계속 실행한다.<br/>
스케쥴을 중지하고 싶다면 `clearInterval`함수를 호출해야한다.<br/>

### setInterval과 clearInterval 예시

```javascript
let timerId = setInterval(() => console.log("tick"), 2000);

setTimeout(() => {
    clearInterval(timerId);
    console.log("stop");
}, 5000);
```

위의 예제는 `2s`를 주기로 `tick`이라는 문자열에 콘솔에 출력되게 된다.<br/>
`setTimeout`을 이용해 `5s`뒤에 `tick`을 출력하는 스케쥴을 중지하고 `stop`을 출력하게 된다.<br/>

<img src="/assets/2020-06-29-setTimeout_setInterval_requestAnimationFrame/1.PNG" width="200"/>

위와 같이 2초 주기로 `tick`이 출력되었고 5초뒤에 `stop`이 출력되는 것을 볼 수 있다.<br/>

## 재귀적인 setTimeout

주기적으로 무언가를 실행시키는 방법은 `setInterval`외에도 **재귀적**으로 `setTimeout`을 사용할 수 있다.<br/>
아래와 같이 **재귀적**으로 `setTimeout`을 사용할 수 있다.<br/>

```javascript
let timerId = setTimeout(function tick() {
    console.log("tick");
    timerId = setTimeout(tick, 2000);
}, 2000);
```

위의 `setTimeout`은 현재 실행중인 것이 종료되면 3번째 줄을 스케쥴한다.<br/>
**재귀적**인 `setTimeout`은 `setInterval`보다 유연하다.<br/>
예를 들어 서버에 5초마다 데이터를 요청하는 프로그램을 작성하고자 한다고 가정해보자.<br/>
서버에 요청이 너무 많을 경우 계속 요청을 보내기 보다는 주기를 늘리는 것이 바람직할 것 이다.<br/>
아래와 같이 **재귀적**인 `setTimeout`을 사용해 코드를 작성할 수 있을 것 이다.<br/>

```javascript
let delay = 5000;

let timerId = setTimeout(function sendRequest() {
    ... Send Request ...

    if (to many request) {
        delay *= 2;
    }

    timerId = setTimeout(request, delay);
}, delay);
```

`setInterval`은 설정한 `delay`를 변경할 수 없지만 `setTimeout`을 **재귀적**으로 사용하면 가능하다.<br/>
또한 **재귀적**인 `setTimeout`은 `setInterval`이 보장하지 못하는 **주기를 보장**할 수 있다.<br/>

-   `setInterval`을 사용할 때

```javascript
let i = 1;

setInterval(function () {
    func(i);
}, 100);
```

-   **재귀적**인 `setTimeout`을 사용할 때

```javascript
let i = 1;

setTimeout(function run() {
    func(i);
    setTimeout(run, 100);
}, 100);
```

동일한 기능을 하는 위의 두개의 예제가 존재한다.<br/>
`setInterval`을 사용할 경우 내부의 스케쥴러가 `func(i)`를 100ms마다 실행한다.<br/>

<img src="/assets/2020-06-29-setTimeout_setInterval_requestAnimationFrame/2.PNG" width="500"/>

우리가 원하는 함수의 실행주기는 100ms지만 실제 delay는 더 적다.<br/>
`func`함수가 실행되며 소비되는 시간이 원인이다.<br/>
여기에서 우리가 작성한 `func`함수가 `100ms`보다 더 걸리면 다음 함수가 바로 실행될 것이다.<br/>
**재귀적**인 `setTimeout`을 사용할 경우 고정된 delay를 보장할 수 있다.<br/>

<img src="/assets/2020-06-29-setTimeout_setInterval_requestAnimationFrame/3.PNG" width="500"/>

새로운 함수의 호출이 이전에 호출된 함수의 끝에 추가되기 때문이다.<br/>

## setTimeout(func, 0)

`setTimeout(func, 0)`이나 `setTimeout(func)`과 같은 코드는 특별하게 사용된다.<br/>
위의 코드는 `func`함수의 실행을 가능한 빠르게 스케쥴링 한다.<br/>
하지만 스케쥴러는 현재 진행중인 코드가 모두 끝난뒤에 이 `func`함수를 호출한다.<br/>
이러한 함수 호출을 **비동기적**으로 실행된다고 한다.<br/>

```javascript
setTimeout(() => console.log("World!"));

console.log("Hello");
```

위의 코드의 작동을 확인하면 `Hello`가 먼저 출력이된 후 `World!`가 출력이 된다.<br/>
이는 Javscript의 **호출 스택**과 **메시지 큐**, **이벤트 루프**와 연관이 있다.<br/>
`World`를 출력하는 함수는 0ms의 딜레이를 가져 바로 **메시지 큐**에 담기게 된다.<br/>
이후 `Hello`를 출력하는 함수가 **호출 스택**에 추가되고 이 함수가 호출이 먼저 된다.<br/>
그 후 **이벤트 루프**가 **호출 스택**이 비어있는 것을 확인해 **메시지 큐**에 담긴 함수를 **호출 스택**에 추가한다.<br/>
그 후 `World`를 출력하는 함수가 실행되게 된다.<br/>

## requestAnimationFrame

자바스크립트에서 애니메이션을 구현하기 위한 방법으로는 `new Date()`를 사용한 타이머를 이용한다.<br/>
시작 시점과 종료 시점을 변수에 저장해 반복으로 실행하는 방법이다.<br/>
이러한 방법은 **호출 스택**이 지나치게 많다는 단점이 존재한다.<br/>
이러한 경우 필요한 함수가 `requestAnimationFrame()`함수다.<br/>

```javascript
requstAnimationFrame(func);
```

`requestAnimationFrame`함수는 반복할 함수를 인자로 받는다.<br/>
`requestAnimationFrame`함수 사용의 장점은 아래와 같다.<br/>

-   백그라운드 동작 및 비활성화 시 중지
-   최대 1ms로 제한되며 1초에 60번 동작
-   다수의 애니메이션에도 동일한 타이머를 참조

### requstAnimationFrame 예시

```javascript
!(function () {
    let start = new Date().getTime();
    let i = 1;
    let callback = function () {
        let ts = new Date().getTime();
        if (ts - 1000 > start) {
            // console.log('End');
        } else {
            console.log(i++, ts);
            requestAnimationFrame(callback);
        }
    };
    requestAnimationFrame(callback);
})();
```

위의 코드를 실행시켜보면 1초동안 `callback`함수가 60번으로 제한되어 실행된다.<br/>
**호출 스택**이 과도하게 커지는 현상을 방지하며 코드를 작성할 수 있게 된다.<br/>

### requstAnimationFrame 취소하기

`requstAnimationFrame`함수를 취소하기 위해서는 `cancelAnimationFrame`함수를 사용한다.<br/>
`setTimeout`과 `setInterval`함수와 동일하게 사용할 수 있다.<br/>

```javascript
let requestId = requestAnimationFrame(() => console.log("Hello World!"));
cancelAnimationFrame(requestId);
```

`requestAnimationFrame`함수를 호출하였지만 바로 `cancelAnimationFrame`함수가 사용되었다.<br/>
따라서 콘솔에는 아무것도 출력되지 않고 코드가 종료되게 된다.<br/>
