---
title: '함수 범위, 블록 범위, 렉시컬(lexical) 범위'
date: 2020-05-13 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 범위 (Scope)란?

프로그램 언어에서 **범위** (**Scope**)는 변수의 접근 가능과, 생존 기간을 뜻한다.<br/>
**범위** (**Scope**)는 크게 **전역 범위**(**Global Scope**), **지역 범위**(**Local Scope**)가 존재한다.<br/>
**전역 범위**(**Global Scope**)는 코드 전체에서 참조 가능한 것을 의미하고<br/>
**지역 범위**(**Local Scope**)는 정해진 코드 부분에서만 참조 가능한 것을 의미한다.<br/>

## 자바스크립트에서의 범위의 특징

- 변수의 범위는 **함수 단위**다.
- 스크립트 실행시 **함수 범위의 변수 선언**은 **호이스팅**이 이루어진다.<br/>
- 스크립트 실행시 **변수 관리**는 **렉시컬 영역**을 기준으로 한다.<br/>
- 스크립트 실행시 **변수 검색**은 **스코프 체인**을 이용한다.<br/>

### 함수 범위 (Function Scope)

**함수 범위**(**Function Scope**)는 **함수 내부**에서 **변수를 선언** 했을 경우에 해당한다.<br/>
**함수 내부**에서 **선언된 변수**는 **함수 내부**에서만 **접근**이 **가능**하다.<br/>

```javascript
var variable = 1

function functionScopeTest() {
  if (true) {
    var inCondition = 2
  }

  console.log(inCondition) // 2;

  return inCondition
}
```

`c`, `c++`과 같은 프로그래밍 언어는 변수의 유효 범위가 블록 범위다.<br/>
따라서 `if`문에서 선언된 `inCondition`변수를 참조할 수 없어 에러가 발생할 것이다.<br/>
하지만 자바스크립트는 **변수의 범위**가 **함수 단위**이기 때문에 문제가 발생하지 않는다.<br/>

### 중복 가능한 변수 선언

자바스크립트에서는 `var`키워드를 사용해 변수를 선언할 경우 **중복된 변수명** 사용이 가능하다.<br/>

```javascript
var duplicatedVariable = 1

function duplicatedVariableTest() {
  var duplicatedVariable = 2
  var duplicatedVariable = 3

  console.log('duplicatedVariable :', duplicatedVariable)
}

duplicatedVariableTest() // duplicatedVariable : 3
```

실질적으로 참조되는 변수값은 가장 **가까운 범위**의 **변수**를 **참조**하게 된다.<br/>

### var키워드 없이 선언 가능한 변수

또한 변수를 선언할 때 `var`나 `let`같은 키워드 없이 변수 선언이 가능하다.<br/>
키워드가 없이 선언된 변수는 `window`객체의 변수로 **전역 변수**로 사용 가능하다.<br/>

```javascript
function noKeywordVariableTestOne() {
  noKeywordVariable = 1

  console.log('noKeywordVariable (1) :', noKeywordVariable)
}

function noKeywordVariableTestTwo() {
  console.log('noKeywordVariable (2) :', noKeywordVariable)
}

noKeywordVariableTestOne() //noKeywordVariable (1) : 1
noKeywordVariableTestTwo() // noKeywordVariable (2) : 1
console.log(window.noKeywordVariable) // 1
```

`window.noKeywordVariable`과 같이 접근이 가능한 것을 확인할 수 있다.<br/>

### 호이스팅 (Hoisting)

**호이스팅**(**Hoisting**)이라는 단어를 직역하면 끌어올리기, 들어 올려 나르기라는 뜻이다.<br/>
자바스크립트에서의 **호이스팅**은 **변수 선언문**을 **끌어올리는 역할**을 한다.<br/>

```javascript
function hoistingTest() {
  console.log('variable :', variable) // variable : undefined

  var variable = 1
  console.log('variable :', variable) // variable : 1
}
```

위의 코드에서 `hostingTest`함수 내부의 첫번째 콘솔 출력 전에는 `varibale`이 선언되지 않았다.<br/>
자바스크립트에서는 위와 같은 코드를 아래와 같이 **호이스팅**을 통해 **변수 선언문을 위로** 올린다.<br/>

```javascript
function hoistingTest() {
  var variable
  console.log('variable :', variable) // variable : undefined

  variable = 1
  console.log('variable :', variable) // variable : 1
}
```

### 렉시컬 범위 (Lexical Scope)

**렉시컬 범위**는 **함수의 실행** 시 범위를 **함수 정의 단계의 범위**로 참조하는 특성이다.<br/>
아래 코드에서 `lexicalScopeTestOne`함수의 첫번째 `console.log`에서 `variable`을 참조하려한다.<br/>
첫번째 출력에는 `variable`이 아직 선언되지 않았지만 **호이스팅**되어 `undefined`가 된다.<br/>
그 후 `variable`에 `"local"`이라는 값이 대입되어 두번째 출력문은 정상적으로 출력이 된다.<br/>
여기서 참조한 `variable`은 함수 내부에서 정의된 값이다.<br/>

```javascript
var variable = 'global'

function lexicalScopeTestOne() {
  console.log(variable) // undefined

  var variable = 'local'

  console.log(variable) // local
}

function lexicalScopeTestTwo() {
  console.log(variable) // global
}

lexicalScopeTestOne()
lexicalScopeTestTwo()
```

`lexicalScopeTestTwo`함수는 전역에 선언되어 있다.<br>
`lexicalScopeTestTwo`함수가 정의된 시점의 상위 범위는 **전역 범위**다.<br/>
또한 내부에서 `variable`이 선언되지 않았으므로 **호이스팅**이 발생하지 않고 전역 변수를 참조한다.<br/>

### 스코프 체인 (Scope Chain)

자바스크립트 **함수 객체**에 **유효 범위**를 나타내는 **스코프**가 `[[Scope]]` 프로퍼티로 존재한다.<br/>
`[[Scope]]`는 함수 객체에서 **연결리스트 형식**으로 관리된다.<br/>
각각의 함수는 `[[Scope]]` 프로퍼티로 실행 컨텍스트의 **스코프 체인**을 참조하게 된다.<br/>
실행 컨텍스트는 함수가 실행 되는 순간 만들어 진다.<br/>
또 실행 컨텍스트는 실행된 함수의 `[[Scope]]`를 기반으로 새로운 **스코프 체인**을 만든다.<br/>

```javascript
var variable = 'one'

function scopeChainTest() {
  var variable = 'two'

  function returnVariable() {
    return variable
  }

  console.log(returnVariable()) // two
}

scopeChainTest()
```

위의 코드의 실행 컨텍스트는 아래와 같다.<br/>

<img src="./images/2020-05-13-FunctionScope_BlockScope_and_LexicalScope/1.PNG" width="800"/>

함수가 실행 될 때마다 `[[Scope]]`가 연결리스트 처럼 연결된다.<br/>
`returnVariable`에서는 아래와 같은 `[[Scope]]`를 가지게 된다.<br/>

<img src="./images/2020-05-13-FunctionScope_BlockScope_and_LexicalScope/2.PNG" width="300"/>

실제 크롬 개발자 도구를 이용해 `[[Scope]]`를 확인해 보았다.<br/>

<img src="./images/2020-05-13-FunctionScope_BlockScope_and_LexicalScope/3.PNG" width="600"/>

`scopeChainTest`함수에서는 `[[Scope]]`로 `Global` 전역 범위를 가지고 있다.<br/>
`returnVariable`함수에서는 `0`번째로 `scopeChainTest` 다음으로 `Global`을 가지고 있다.<br/>
따라서 `returnVariable`에서 먼저 참조하게 되는 변수는 `scopeChainTest`내부의 변수다.<br/>

```javascript
var variable = 'one'

function returnVariable() {
  return variable
}

function scopeChainTest(func) {
  var variable = 'two'

  console.log(func()) // one
}

scopeChainTest(returnVariable)
```

바뀐 코드에서 `returnVariable`함수가 참조하는 `[[Scope]]`는 `Global`이 될 것이다.<br/>

<img src="./images/2020-05-13-FunctionScope_BlockScope_and_LexicalScope/4.PNG" width="600"/>

개발자 도구에서 확인해 보면 두 함수 모드 `Global`만 범위로 가지고 있다.<br/>
두 함수 모두 **전역 범위에서 정의**되었기 때문에 **자신의 변수 객체**와 `Global`만 갖게 된다.<br/>

## 블록 범위 (Block Scope)

자바스크립트는 기본적으로 함수를 범위로 한다.<br/>
하지만 `let`과 `const`키워드를 사용할 경우 **블록 범위**를 갖는다.<br/>

```javascript
function usingVarKeyword() {
  for (var i = 0; i < 3; i++) {}
  console.log(i) // 3
}

function usingLetKeyword() {
  for (let i = 0; i < 3; i++) {}
  console.log(i) // ERROR!
}
```

위와 같이 `for-loop`내부에서 각각 `var`과 `let`키워드를 이용해 `i`를 선언했다.<br/>
`var`키워드를 사용한 함수에서는 `i`의 값이 `3`으로 출력되었다.<br/>
그러나 `let`키워드를 사용한 함수에서는 `i`가 정의되지 않았다는 에러가 발생했다.<br/>

<img src="./images/2020-05-13-FunctionScope_BlockScope_and_LexicalScope/5.PNG" width="300"/>

`let`과 `const`키워드를 사용할 경우 **괄호의 범위** 안에서만 접근이 가능하다.<br/>
