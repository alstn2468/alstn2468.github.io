---
title: 'IIFE, Modules, Namespaces'
date: 2020-05-18 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## IIFE

**IIFE**는 **I**mmediately **I**nvoked **F**unction **E**xpression으로 즉시 호출 함수 표현식이다.<br/>
**IIFE**의 기본적인 형태는 아래와 같다.<br/>

```javascript
(function() {
  // Do something...
})();
```

**IIFE**는 함수 **선언**과 **동시**에 함수 **호출**이 되는 **익명 함수**다.<br/>
함수 선언을 아래와 같이 함수 이름이 없이 선언을 할 경우에는 오류가 발생한다.<br/>

```javascript
function() {
    console.log("This is IIFE!");
} // SyntaxError: Function statements require a function name
```

위와 같은 **익명 함수**를 `()`로 감싸주어 **함수 선언문**을 **함수 표현식**으로 바꾸어준다.<br/>

```javascript
(function() {
  console.log('This is IIFE!')
})
```

`()`로 감싸줌으로써 **함수를 반환하는 함수**가 되었다.<br/>
이 상태에서 반환 받은 함수에 `()`를 붙여주면서 **함수를 바로 실행**한다.<br/>

```javascript
(function() {
  console.log('This is IIFE!')
})();
```

### IIFE를 쓰는 이유

- 전역 범위에서 변수가 선언되는 것을 방지한다.
- **IIFE**내부에 선언된 변수에 접근하지 못하도록할 수 있다.

아래와 같이 변수를 선언할 경우 모든 범위에서 `array`변수를 사용할 수 있다.<br/>

```javascript
const array = [1, 2, 3]

function consoleArray() {
  console.log(array)
}

consoleArray() // [1, 2, 3]
```

**IIFE**를 사용해 내부에 변수를 선언할 경우 변수를 **private**하게 사용할 수 있다.<br/>

```javascript
(function() {
  const array = [1, 2, 3]
})();
console.log(array) // ReferenceError: array is not defined
```

**IIFE** 내부에서 선언된 변수는 **IIFE**에서만 사용할 수 있다.<br/>
**IIFE**를 사용하면서 변수를 **private**하게 관리할 수 있게되며 캡슐화 되었다.<br/>

## Modules

**Module**은 프로그램의 일부분으로 프로그램은 하나 이상의 **Module**의 조합으로 구성된다.<br/>
**Module**은 **구현을 캡슐화**하고 다른 코드에서 **쉽게 불러오고 사용**할 수 있도록 한다.<br/>

### Module Pattern

Module Pattern은 `class`와 비슷하게 `private`, `public` 메서드 모두 포함할 수 있다.<br/>
또한 단일 객체 내의 변수도 포함할 수 있다.<br/>

#### Module Pattern을 사용하는 이유

- 특정 부분을 전역 범위로 부터 보호
- 동일 페이지 내부에서 함수 이름이나 변수 이름이 충돌하는 것을 예방

#### Module Pattern 예시

아래와 같이 `counter` 모듈을 **IIFE**로 구현하였다.<br/>
**IIFE**가 **함수 객체**들을 반환하면서 내부의 변수에 접근할 수 있다.<br/>

```javascript
var counter = (function() {
  let count = 0

  return {
    increase: function() {
      count++
    },
    decrease: function() {
      count--
    },
    reset: function() {
      count = 0
    },
    getCount: function() {
      return count
    },
  }
})();

console.log('Init :', counter.getCount())
counter.increase()
console.log('After increase :', counter.getCount())
counter.decrease()
console.log('After decrease :', counter.getCount())
counter.reset()
console.log('After reset :', counter.getCount())
```

### 대표적인 Module Pattern

- UMD (Universal Module Definition)
- CommonJS
- AMD (Asynchronous Module Definition)
- ES6 Module
- System.register

### CommonJS

`Node.js`에서 사용하는 Module Pattern<br/>
`require`과 `module.exports`로 의존성과 Module을 정의한다.

```javascript
var module1 = require('./module1')
var module2 = require('./module2')

module.exports = function() {
  // ...
}
```

### ES6 Module

`export`를 이용해 Module을 내보낸다.<br/>

```javascript
export function sayHello() {
  console.log('Hello!')
}
```

`import`를 이용해 Module을 불러온다.<br/>

```javascript
import { sayHello } from './library'

sayHello() // Hello!
```

`as`를 이용한 별칭 (alias)도 사용할 수 있다.<br/>

```javascript
import { sayHello as Hello } from './library'

Hello() // Hello!
```

모든 Module을 가져오고 싶을 경우 `*`를 사용한다.<br/>

```javascript
import * from "./library";

library.sayHello(); // Hello!
```

기본 Module을 지정하고 싶을 경우 `export default`를 사용한다.<br/>

```javascript
export default function sayHello() {
  console.log('Hello!')
}

export function sayBye() {
  console.log('Bye!')
}
```

위와 같이 `export`한 Module은 아래와 같이 가져와 사용할 수 있다.<br/>

```javascript
import sayHello, { sayBye } from './library'

sayHello() // Hello!
sayBye() // Bye!
```

`export`하는 Module은 함수가 아니어도 된다.<br/>
ES6 Module은 아직 모든 브라우저에서 적용되지 않는다.<br/>
따라서 `Babel`과 같은 transpiler를 사용해 하위 버전의 포맷으로 변환한다.<br/>

### Module Loader

Module Format으로 작성된 모듈을 해석하고 로드한다.<br/>
**Module Loader**는 런타임에 실행된다.<br/>
개발자 도구의 네트워크 탭에서 **많은 Moudle 파일** 확인 가능<br/>

#### Module Loader 동작 과정

1. 브라우저에 **Module Loader**를 불러옴
2. **Module Loader**에 메인 App 파일을 가져옴
3. **Module Loader**가 메인 App 파일을 다운로드 받고 해석
4. **Module Loader**가 필요한 Module 파일들을 다운로드

#### 흔히 쓰이는 Module Loader

대표적으로는 `RequireJS`와 `SystemJS`가 존재한다.<br/>

- `RequireJS` : AMD Format의 Module Loader
- `SystemJS` : AMD, CommonJS, UMD, System.register Format의 Module Loader

### Module Bundler

**Module Bundler**는 **Module Loader**를 대신해 사용할 수 있다.<br/>
**Module Loader**와 반대로 웹 어플리케이션의 `build` 과정에서 동작한다.<br/>
개발자 도구의 네트워크 탭에서 **하나의 bundle 파일** 확인 가능<br/>

#### Module Bundler 동작 과정

- `build` 과정에서 Bundler에 bundle 파일을 만들라고 지시
- 만들어진 bundle 파일을 브라우저에 로드

#### 흔히 쓰이는 Module Bundler

대표적으로는 `Browserify`와 `Webpack`가 존재한다.<br/>

- `Browserify` : CommonJS Module의 Bundler
- `Webpack` : AMD, CommonJS, ES6 Module의 Bundler

## Namespaces

**Namespace**는 구분이 가능하도록 정해놓은 **범위나 영역**을 뜻한다.<br/>
객체너 변수가 겹쳐지지 않도록 안전한 코드를 만들기 위한 개념<br/>

Javascript에서는 아직 Namespacing을 지원하지 않아 다음 특성을 이용한다.<br/>

- Javascript의 모든 객체는 속성을 갖는다.
- 객체에 담긴 속성은 다른 객체를 담을 수 있다.

```javascript
var globalObject = {}

globalObject.sayHello = function() {
  console.log('Hello!')
}
globalObject.sayBye = function() {
  console.log('Bye!')
}

globalObject.sayHello()
globalObject.sayBye()
```

**전역 객체** 하나를 만들고 **모든 기능**을 **전역 객체**에 **추가**하는 패턴이다.<br/>
현재는 Module을 사용하는 것이 더 직관적이고 간편해 많이 사용되지 않는다.<br/>
