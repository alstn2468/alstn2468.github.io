---
title: '원시 타입 (Primitive Type)'
date: 2020-03-06 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 원시 타입(Primitive Type)이란?

자바스크립트에서는 **원시 타입** **참조 타입**이라는 두 가지 자료형을 제공한다.<br>
자바스크립트에서 **원시 타입**으로는 아래의 **7**개가 존재한다.<br>

1. `Boolean` (`true`, `false`)
2. `null`
3. `undefinded`
4. `number` (`1`, `1000`, `3.14`)
5. `string` (`"Primitive"`, `'Type'`)
6. `symbol` (`Symbol()`, `Symbol(42)`, `Symbol('foo')`)
7. `BigInt` (`9007199254740991n`, `BigInt(9007199254740991)`)

`symbol`은 `ES6`에 새로 추가된 원시 타입이고 `BigInt`는 `Chrome 67` 부터 추가되었다.<br>
위의 **7**가지 **원시 타입**을 제외한 모든 것들은 **참조 타입**이다.<br>
자바스크립트에서의 **참조 타입**은 `Object`다.<br>
자바스크립트에서 `Object`는  **함수**, **배열**또한 포함한다.<br>

```javascript
console.log(true instanceof Object); // false
console.log(false instanceof Object); // false
console.log(null instanceof Object); // false
console.log(undefined instanceof Object); // false
console.log(1 instanceof Object); // false
console.log(100 instanceof Object); // false
console.log(3.14 instanceof Object); // false
console.log('Primitive' instanceof Object); // false
console.log(Symbol() instanceof Object); // false
console.log(9007199254740991n instanceof Object); // false
```

위에서 확인할 수 있듯이 모든 값들이 `Object`의 `instance`가 아닌 것을 확인할 수 있다.<br>

```javascript
console.log({ foo: 'bar' } instanceof Object); // true
console.log([1, 'foo'] instanceof Object); // true
function func() {
    console.log('function');
}
console.log(func instanceof Object); // true
```

**원시 타입**이 아닌 객체, 배열, 함수는 `Object`의 `instance`인 것을 확인할 수 있다.<br>

## 원시 타입

기본적으로 **원시 타입** 내부에는 **어떠한 메소드도 없다**.<br>
`toString`과 같은 내장 메소드가 존재하지 않다.<br>
`undefined.toString()`, `111.toString()`처럼 사용하면 에러가 발생하는 것으로 알 수 있다.<br>
내장 메소드가 없는 속성때문에 **원시 타입**은 불변한(**immutable**)속성을 갖는다.<br>
어떠한 내장 메소드가 없기 때문에 **자기 자신을 수정할 수 없기 때문**이다.<br>
물론 아래와 같이 하나의 변수에 다른 값들을 계속 저장할 수 있다.<br>

```javascript
let variable = "100";
variable = 1;
variable = 3.14;
variable = null;
```

또한 **원시 타입**은 `Object`와 다르게 값 자체가 메모리에 저장된다.<br>

```javascript
"foo" === "foo"; // true
1 === 1; // true
```

하지만 `Object`는 값 자체가 아닌 객체 **레퍼런스를 저장**한다.<br>

```javascript
{} === {}; // false
[] === [] // false
(function () {}) === (function () {}); //false
```

위의 두 예제로 알 수 있는 것은 **원시 타입**은 **값**이 저장되고 **객체**는 **참조**가 저장이 된다는 것이다.<br>

## 예제로 알아보는 자바스크립트 원시 타입

아래와 같이 변수에 **원시 타입** 값들을 할당할 수 있다.<br>

```javascript
let firstName = "minsu";
let secondName = firstName;

console.log("firstName :", firstName); // firstName : minsu
console.log("secondName :", secondName); // secondName : minsu
```

`firstName`에 `minsu`라는 **원시 타입**인 `string`값을 할당 해 주고<br>
`secondName`에 `firstName`의 값을 대입했다.<br>
아래와 같이 `firstName`에 `"hun"`이라는 새로운 값을 할당 해 주었다.<br>

```javascript
firstName = "hun";

console.log("secondName :", secondName); // secondName : minsu
```

`firstName`에 새로운 값을 대입한 후 `secondName`을 출력해도 기존의 `minsu`가 출력이 된다.<br>
이 처럼 **원시 타입**은 **값** 자체로 저장되어 `secondName`에 저장된 값은 변하지 않는다.<br>

```javascript
let firstPerson = {
    name: 'minsu',
    age: 22
};
let secondPerson = firstPerson;

console.log('firstPerson :', firstPerson); 
// firstPerson : { name: 'minsu', age: 22 }
console.log('secondPerson :', secondPerson); 
// firstPerson : { name: 'minsu', age: 22 }
```

**원시 타입**이 아닌 `Object`타입을 선언해 `firstPerson`을 작성하고 `secondPerson`에 대입했다.<br>
**원시 타입**을 수정했을 경우 첫 번째 값을 대입한 두 번째 값은 변하지 않았었다.<br>

```javascript
firstPerson.age = 23;
console.log('secondPerson :', secondPerson); 
// firstPerson : { name: 'minsu', age: 23 }
```

 `firstPerson`의 `age`값을 변경했지만 `secondPerson`의 값도 변경된 것을 확인할 수 있다.<br>
 따라서 `Object`는 값(**Value**)가 아닌 참조(**Reference**)로 값을 저장하는 것을 확인할 수 있다.<br>

 ### 원시 타입처럼 값 복사하기

 그렇다면 `Object`에서 원시 타입처럼 값을 복사하려면 어떻게 해야할까?<br>
 `Object.assign`매서드를 사용해 복사하면 된다.<br>

```javascript
let assignLikePrimitiveOne = {
    name: 'minsu',
    age: 22
};
let assignLikePrimitiveTwo = Object.assign({}, assignLikePrimitiveOne);

console.log('assignLikePrimitiveOne :', assignLikePrimitiveOne); 
// assignLikePrimitiveOne : { name: 'minsu', age: 22 }
console.log('assignLikePrimitiveTwo :', assignLikePrimitiveTwo); 
// assignLikePrimitiveTwo : { name: 'minsu', age: 22 }
```

`Object.assign`을 이용해 `Obejct.assing(<원복 객체>, <복사할 객체>)`로 값을 대입한다.<br>
따로 유지해야할 객체 값이 없으므로 빈 객체(`{}`)에 `assignLikePrimitiveOne`을 할당했다.<br>
이전과 같이 `assignLikePrimitiveOne.age = 23`과 같이 값을 변경해 보자.<br>

```javascript
assignLikePrimitiveOne.age = 23;
console.log('assignLikePrimitiveTwo :', assignLikePrimitiveTwo); 
// assignLikePrimitiveTwo : { name: 'minsu', age: 22 }
```

`assignLikePrimitiveOne`의 값을 바꿨지만 `assignLikePrimitiveTwo`의 값은 변경되지 않았다.<br>

### 그림으로 Reference 이해하기

`secondPerson = firstPerson`처럼 값을 복사했을 경우 아래와 같이 복사된다.<br>

<img src="/assets/2020-03-06-PrimitiveType/1.png" width="400"/><br>

첫 번째 예시는 위와 같이 `firstPerson`, `secondPerson` 모두 `Heap`의 하나의 값을 가리킨다.<br>
따라서 `firstPerson`의 값을 변경할 경우 아래 처럼 두 개의 **참조**가 가르키는 값이 변경된다.<br>

<img src="/assets/2020-03-06-PrimitiveType/2.png" width="400"/><br>

`Object.assign`을 사용한 두 번째 예제는 아래와 같은 모습으로 값이 저장된다.<br>

<img src="/assets/2020-03-06-PrimitiveType/3.png" width="400"/><br>

`assignLikePrimitiveOne`의 값을 변경하면 아래 처럼 변경된다.<br>

<img src="/assets/2020-03-06-PrimitiveType/4.png" width="400"/><br>

두 개의 객체 모두 같은 값을 갖는 **다른 레퍼런스**를 갖기 때문에 값을 바꿔도 변경되지 않는다.<br>

## Reference 깊게 들어가기

이전의 예제와 다르게 `Object`안에 `Array`속성을 추가해보았다.<br>

```javascript
let firstInfo = {
    name: 'minsu',
    age: 22,
    hobbies: ['Baseball', 'Basketball']
};

let secondInfo = Object.assign({}, firstInfo);

console.log('firstInfo :', firstInfo); 
//firstInfo : { name: 'minsu', age: 22, hobbies: [ 'Baseball', 'Basketball' ] }
console.log('secondInfo :', secondInfo); 
//secondInfo : { name: 'minsu', age: 22, hobbies: [ 'Baseball', 'Basketball' ] }
```

`Object.assign`을 사용해서 객체를 복사한 후 `hobbies`에 값을 추가해보자.<br>

```javascript
firstInfo.hobbies.push('Games');
console.log('secondInfo :', secondInfo);
// secondInfo : {
//   name: 'minsu',
//   age: 22,
//   hobbies: [ 'Baseball', 'Basketball', 'Games' ]
// }
```

`Object.assign`을 사용했음에도 `secondInfo`의 `hobbies`배열에도 값이 추가되었다.<br>
아래 그림과같이 `Object`자체는 새로운 값으로 할당이 되었지만<br>
`hobbies`는 **참조**가 저장되어 있어서 `hobbies`는 참조하는 배열을 가르키고 있다.<br>

<img src="/assets/2020-03-06-PrimitiveType/5.png" width="400"/><br>

따라서 `push`함수로 배열에 값을 추가하면 아래와 같이 값이 저장된다.<br>

<img src="/assets/2020-03-06-PrimitiveType/6.png" width="400"/><br>

이는 `Object.assign`함수가 내부의 모든 객체를 복사하지 않기 때문이다.<br>
깊은 복사를하기 위해서는 **재귀 함수**를 이용하거나 `JSON`객체의 함수를 이용하면 된다.<br>
