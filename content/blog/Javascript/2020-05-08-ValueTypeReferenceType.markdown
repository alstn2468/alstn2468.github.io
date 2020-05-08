---
title: '값 타입(Value Type)과 참조 타입(Reference Type))'
date: 2020-05-08 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 값 타입(Value Type)이란?

자바스크립트에서 **값 타입**(**Value Type**)은 **원시 타입**(**Primitive Type**)과 비슷하다.<br/>
아래의 **6**가지 데이터 타입을 자바스크립트에서 **값 타입**(**Value Type**)이라고 한다.<br/>

1. `Boolean` (`true`, `false`)
2. `null`
3. `undefinded`
4. `number` (`1`, `1000`, `3.14`)
5. `string` (`"Primitive"`, `'Type'`)
6. `symbol` (`Symbol()`, `Symbol(42)`, `Symbol('foo')`)

모든 **값 타입**(**Value Type**)은 값을 표현하는 **리터럴**(**literal**) 형식이 존재한다.<br/>

### 리터럴(Literal) 이란?

**리터럴**(**Literal**)은 **데이터** 그 **자체**를 의미한다.<br/>
아래와 같이 **변수**에 저장하는 **변하지 않는 데이터**를 뜻한다.<br/>

```javascript
var numberVar = 1
var stringVar = 'string'
var booleanVar = true
```

위의 코드에서 **리터럴**(**Literal**)은 `1`과 `"string"`, `true`다.<br/>

### 값 타입(Value Type)의 저장 방식

자바스크립트에서 이러한 **값 타입**(**Value Type**)은 **리터럴**(**Literal**) 그대로 저장된다.<br/>

```javascript
var lunch = 'pizza'
var dinner = lunch

console.log(lunch) // "pizza"
console.log(dinner) // "pizza"
```

위의 예제에서 `lunch`변수는 `"pizza"`라는 **문자 리터럴**을 가지고 있다.<br/>
`lunch`가 가지고 있는 데이터를 **대입연산자**(`=`)를 이용해 `dinner`변수에 대입하였다.<br/>
그 결과 `dinner`변수 또한 `"pizza"`라는 **문자 리터럴**을 가지고 있게 되었다.<br/>
크롬 개발자 도구에서 메모리 할당 스냅샷을 찍어 확인해 보면 아래와 같다.<br/>

<img src="/assets/2020-05-08-ValueTypeReferenceType/1.png" width="300"/><br>

`lunch`변수와 `dinner`변수가 같은 문자열 데이터 **메모리**를 가지고 있다.<br/>

이 상황에서 `lunch`에 저장된 값을 다른 값으로 변경시키면 어떻게 될까?<br/>

```javascript
lunch = 'chicken'

console.log(lunch) // "chicken"
console.log(dinner) // "pizza"
```

위의 상황과 동일하게 크롬 개발자 도구의 메모리를 확인해보았다.<br/>

<img src="/assets/2020-05-08-ValueTypeReferenceType/2.png" width="300"/><br>

`lunch`의 값을 `chicken`이라는 값으로 변경했음에도 `dinner`의 값은 변하지 않았다.<br/>
또한 `launch`와 `dinner` 두 변수 모두 **다른 메모리 주소**를 가리키고 있다.<br/>
이 결과를 확인하면서 자바스크립트에서의 **값 타입**의 저장 방식을 확인할 수 있다.<br/>
**값 타입**은 메모리를 참조해 저장하는 것이 아니라 **값을 그대로 저장**한다.<br/>

## 참조 타입(Reference Type)이란?

**참조 타입**(**Reference Type**)은 **값 타입이 아닌 모든 데이터 타입**을 말한다.<br/>
대표적으로 아래의 **4**가지 데이터 타입이 **참조 타입**이다.<br/>

1. `object` (`{foo: "bar"}`)
2. `array` (`[1, 2, 3, 4]`)
3. `function (object)` (`function foo() { }`)
4. `class` (`class foo { }`)

### 참조 타입(Reference Type) 사용하기

**참조 타입**(**Reference Type**)을 정의하는 방법은 **값 타입**과 동일하다.<br/>
`{}`(**객체 리터럴**)이나 `[]`(**배열 리터럴**)을 사용하거나 `new`함수를 사용할 수 있다.

```javascript
var objectVar = {}
var arrayVar = []
var funcVar = function() {}
var classVar = class {}
var usingNewOjbect = new Object()
var usingNewArray = new Array()

console.log(typeof objectVar) // object
console.log(typeof arrayVar) // object
console.log(typeof funcVar) // function
console.log(typeof classVar) // funcion
console.log(typeof usingNewOjbect) // object
console.log(typeof usingNewArray) // object
```

**대입 연산자**(`=`)를 이용해 사용할 `object`나 `array`, `function`을 대입하면 된다.<br/>
자바스크립트에서의 배열(`array`)과 함수(`function`)는 모두 객체(`object`)다.<br/>
추후에 정리를 하겠지만 자세한 내용은 아래의 링크를 확인해보면 좋을 것이다.<br/>

> [자바스크립트 함수 (1) - 함수 객체, 함수 객체 생성](https://meetup.toast.com/posts/118)<br/> > [JavaScript에서는 배열(Array)도 객체(Object)다](https://preamtree.tistory.com/115)<br/> > [[스터디\_자바스크립트] 12. 함수도 객체이다!](https://programmer-seva.tistory.com/25)

### 참조 타입(Reference Type)의 저장 방식

사람의 정보를 갖는 객체 `person`을 생성하고 `newPerson`변수에 `=`를 사용해 저장했다.<br>
**값 타입**(**Value Type**)과 동일하게 두 개의 변수에는 **같은 값**이 들어가 있다.<br/>

```javascript
var person = {
  name: 'minsu',
  age: 22,
  job: 'Developer',
}
var newPerson = person

console.log(person) // {name: "minsu", age: 22, job: "Developer"}
console.log(newPerson) // {name: "minsu", age: 22, job: "Developer"}
```

동일하게 크롬 개발자 도구의 메모리 영역을 확인해보았다.<br>

<img src="/assets/2020-05-08-ValueTypeReferenceType/3.png" width="300"/><br>

`newPerson`과 `person`의 메모리 주소가 `@176907`로 같은 것을 확인할 수 있다.<br/>
여기까지는 이전의 **값 타입**과 별 다른 차이가 없다.<br/>
여기에서 `person`변수의 `job`을 변경시켜보았다.<br>

```javascript
person.job = 'Front-End Developer'

console.log(person) // {name: "minsu", age: 22, job: "Front-End Developer"}
console.log(newPerson) // {name: "minsu", age: 22, job: "Front-End Developer"}
```

분명 `person`의 `job`의 값만 변경시켰을 뿐인데 `newPerson`의 값 또한 변경되었다.<br/>
**참조 타입**은 리터럴을 저장하는 것이 아니라 **리터럴의 메모리 주소**를 **저장**하고 있기 때문이다.<br/>
값이 어떻게 변하였는지 크롬 개발자 도구의 메모리 영역을 확인해보았다.<br>

<img src="/assets/2020-05-08-ValueTypeReferenceType/4.png" width="300"/><br>

**값 타입**에서 값을 변경했을 때는 `dinner`에 대입된 `lunch`의 값을 변경시켰어도<br/>
기존의 `dinner`가 가지고 있는 값과 메모리 주소는 변경되지 않았었다.<br/>
**참조 타입**에서 값의 변경되면 **동일한 메모리 주소**를 가지고 있는 **모든 변수의 값이 변경**된다.<br/>

### 참조 타입을 값 타입 처럼 대입하기

참조 타입을 값 타입 처럼 대입하기 위해서는 `Object.assign`과 같은 함수를 사용해야한다.<br/>

```javascript
var person = {
  name: 'minsu',
  age: 22,
  job: 'Developer',
}
var newPerson = Object.assign({}, person)

console.log(person) // {name: "minsu", age: 22, job: "Developer"}
console.log(newPerson) // {name: "minsu", age: 22, job: "Developer"}
```

`Object.assign`함수를 사용한 코드의 메모리 주소를 확인해보았다.<br/>

<img src="/assets/2020-05-08-ValueTypeReferenceType/5.png" width="300"/><br>

`person`과 `newPerson`의 메모리 주소가 다른 것을 확인할 수 있다.<br/>
기존과 같이 `person`의 값을 바꾸어도 그대로 `newPerson`의 값이 유지되는지 확인해보았다.<br/>

```javascript
person.job = 'Front-End Developer'

console.log(person) // {name: "minsu", age: 22, job: "Front-End Developer"}
console.log(newPerson) // {name: "minsu", age: 22, job: "Developer"}
```

<img src="/assets/2020-05-08-ValueTypeReferenceType/6.png" width="300"/><br>

`person`의 값이 변경되었지만 `newPerson`의 값은 변경되지 않은 것을 확인할 수 있다.<br/>
하지만 아래와 같이 **참조 타입 내부에 참조 타입이 존재**하는 경우 다른 결과를 얻을 수 도 있다.<br/>

```javascript
var student = {
  info: {
    firstName: 'kim',
    lastName: 'minsu',
  },
  department: 'Computer Software Engineering',
  grade: 'senior',
  graduated: false,
}
var newStudent = Object.assign({}, student)

console.log(student)
// {
//     info: { firstName: "kim", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
console.log(newStudent)
// {
//     info: { firstName: "kim", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
```

위의 코드는 `Object.assign`함수를 이용해 객체를 할당했다.<br/>
하지만 `student`와 `newStudent`객체 내부에 있는 `info`객체가 **같은 메모리 주소**를 가지고 있다.<br/>

<img src="/assets/2020-05-08-ValueTypeReferenceType/7.png" width="700"/><br>

`student`객체의 `info`의 `firstName`의 값을 바꾸고 확인해보았다.<br/>

```javascript
student.info.firstName = 'park'

console.log(student)
// {
//     info: { firstName: "park", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
console.log(newStudent)
// {
//     info: { firstName: "park", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
```

`student`의 `info`의 값이 변하면서 `newStudent`의 `info`객체 또한 변하는 것을 확인할 수 있다.<br/>

<img src="/assets/2020-05-08-ValueTypeReferenceType/8.png" width="700"/><br>

`student`와 `newStudent`객체 자체의 주소는 다르지만 내부의 `info`객체의 주소가 동일하기 때문이다.<br/>
이와 같이 **객체 내부에 객체**가 있을 때 **재귀 함수**를 이용하거나 `JSON`객체의 함수를 이용하면 된다.<br>

```javascript
var student = {
  info: {
    firstName: 'kim',
    lastName: 'minsu',
  },
  department: 'Computer Software Engineering',
  grade: 'senior',
  graduated: false,
}
var newStudent = JSON.parse(JSON.stringify(student))
student.info.firstName = 'park'

console.log(student)
// {
//     info: { firstName: "park", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
console.log(newStudent)
// {
//     info: { firstName: "kim", lastName: "minsu" }
//     department: "Computer Software Engineering"
//     grade: "senior"
//     graduated: false
// }
```

`JSON.stringify`를 이용해 문자열로 바꾼후 `JSON.parse`로 다시 객체로 변환하면 된다.<br/>

<img src="/assets/2020-05-08-ValueTypeReferenceType/9.png" width="700"/><br>

위와 같이 `student`와 `newStudent`의 `info`객체가 **다른 주소**를 갖는 것을 확인할 수 있다.<br/>
