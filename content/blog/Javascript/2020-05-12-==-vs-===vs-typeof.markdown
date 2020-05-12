---
title: '== vs === vs typeof'
date: 2020-05-11 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 자바스크립트의 동등연산자

자바스크립트는 `==`와 `===`두개의 **동등연산자**가 존재한다.<br/>
아래는 유명한 자바스크립트 밈이다.<br/>

<img src="/assets/2020-05-12-==-vs-===vs-typeof/1.png" width="400"/>

위의 밈을 코드로 나타내면 아래와 같을 것이다.<br/>

```javascript
console.log(0 == "0"); // true
console.log(0 == []); // true
console.log("0" == []); // false
```

`0`과 `"0"`의 `==`연산 결과와 `true`고 `0`과 `[]`의 `==`연산결과는 `true`다.<br/>
삼단논법으로 추론할 경우 당연히 `"0"`과 `[]`의 `==`결과 또한 `true`겠지만,<br/>
자바스크립트 엔진은 `"0" == []`의 결과를 `false`로 반환한다.<br/>
왜 이런 결과가 나오는지 자바스크립트에서의 **동등 연산자**에 대해서 더 알아보자.<br/>

## == 연산자

자바스크립트에서 `==`연산자는 **느슨한 동등 비교**를 한다.<br/>
`"0" == []`의 경우 `"0"`의 타입은 `string`이고 `[]`은 `object`다.<br/>

```javascript
console.log(typeof "0"); // string
console.log(typeof []); // object
```

두 데이터의 타입이 다르기 때문에 자바스크립트 엔진에서는 두 데이터가<br/>
서로 비교 가능하도록 **암시적 형변환**을 하게된다.<br/>
`string`타입의 우선순위가 더 높기 때문에 `object`인 `[]`를 `string`으로 변환한다.<br/>

```javascript
let array = [];
array = String(array);

console.log(array, typeof array); // "" string
```

위의 코드와 같이 비어있는 배열 객체(`[]`)는 `string`으로 변환시 `""`가 된다.<br/>
결론적으로 `"0" == []`연산은 `"0" == ""`연산이 되어 `false`가 되는 것이다.<br/>
배열 객체(`[]`)는 어떤 과정으로 변환되어 비교되는지 확인해보았다.<br/>

```javascript
0 == [];
0 == [].valueOf();
0 == [].valueOf().toString();
0 == Number([].valueOf().toString());
0 == 0; // true
```

배열 객체(`[]`)는 위의 과정으로 `number`타입으로 형변환이 진행된다.<br/>
따라서 `[]`이 결국 `0`이 되어 `0 == 0`으로 변경되고 값은 `true`가 된다.<br/>
아래와 같은 몇개의 예제를 더 살펴볼 수 있다.<br/>

```javascript
0 == ""; //true
0 == "0"; //true
1 == true; //true
false == "0"; //true
null == undefined; //true
false == null; //false
false == undefined; //false
```

`==`연산자를 사용할 때 어떠한 방법으로 타입을 변환하는지는 [여기](https://corock.tistory.com/460?category=727443)를 참고하면 좋을 것 같다.<br/>
몇 개의 예제와 같이 `==`연산자는 의도치 않은 **형변환**이 발생할 수 있다.<br/>
따라서 자바스크립트에서는 **엄격한 동등연산자**`===`를 사용할 수 있다.<br/>

## === 연산자

`===`연산자는 **암시적 형변환**이 일어나지 않고 값으 **타입까지 검사**한다.<br/>
위에서 확인했던 예제들을 그대로 `===`연산자를 이용해 바꾸어보았다.<br/>

```javascript
0 === "0"; // false
0 === []; // false
"0" === []; // false
0 === ""; //false
0 === "0"; //false
1 === true; //false
false === "0"; //false
null === undefined; //false
false === null; //false
false === undefined; //false
```

두 데이터를 비교할 때 타입까지 검사하게 되어 모두 `false`가 되었다.<br/>
`null`과 `undefined`의 `===`연산 결과도 `false`다.<br/>
왜냐하면 `null`의 타입은 `object`이고 `undefined`은 **원시 타입**이기 때문이다.<br/>

```javascript
console.log(typeof null); // object
console.log(typeof undefined); // undefined
```

일반적인 상황에서는 `==`연산자 보다 `===`연산자를 사용하는 것을 추천한다.<br/>
`==`연산자를 사용하고자한다면 **명시적인 형변환**을 통해 사용해야한다.<br/>

## typeof

`typeof`는 피연산자의 타입을 반환하는 함수다.<br/>

```javascript
typeof "string"; // "string"
typeof 1; // "number"
typeof true; // "boolean"
typeof null; // "object"
typeof undefined; // "undefined"
typeof []; // "object"
typeof {}; // "object"
typeof (() => {}); // "function"
typeof class {}; // "function"
typeof Symbol(); // "symbol"
typeof BigInt(1111); // "bigint"
```

`typeof`는 함수처럼 보이지만 **함수는 아니다**.<br/>
`typeof (() => {});`와 같이 `()`를 함께 사용할 수 있지만 **피연산자를 묶는 역할**이다.<br/>
`typeof`은 아래와 같은 **자바스크립트의 내장 타입**만 반환한다.<br/>

1. `string`
2. `number`
3. `boolean`
4. `obejct`
5. `function`
6. `symbol`
7. `bigint`

또한 선언되지 않은 변수를 피연산자로 가지고 있을 경우 `undefined`를 반환한다.<br/>

```javascript
typeof undeclaredVaribale; // "undefined"
```

`typeof`를 이용해 값의 **타입 검사**를 진행한 후 이후 로직을 진행할 수 있겠다.<br/>

```javascript
if (typeof value == "string") {
    console.log("This value is string");
} else if (typeof value == "number") {
    console.log("This value is number");
} else if (typeof value == "boolean") {
    console.log("This value is boolean");
} ...
```
