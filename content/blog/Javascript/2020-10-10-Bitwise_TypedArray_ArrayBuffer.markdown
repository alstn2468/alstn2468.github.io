---
title: '비트 연산자, 형식화 배열, 버퍼(배열)'
date: 2020-10-10 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 비트 연산자

자바스크립트는 아래의 7가지의 **비트 연산자**를 지원한다.<br/>

| 연산자 |         이름          |                               섦명                               |
| :----: | :-------------------: | :--------------------------------------------------------------: |
|   &    |          AND          |           양쪽의 비트가 모두 1인 비트만 1로 설정한다.            |
|   \|   |          OR           |          양쪽 비트 중 하나가 1이면 비트를 1로 설정한다.          |
|   ^    |          XOR          |        양쪽 비트 중 하나만 1일 경우 비트를 1로 설정한다.         |
|   ~    |          NOT          |                     모든 비트를 반전시킨다.                      |
|   <<   | Zero fill left shift  |  오른쪽에 0을 넣어 왼쪽으로 이동하고 가장 왼쪽 비트를 버립니다.  |
|   >>   |  Signed right shift   |    가장 왼쪽 비트를 왼쪽에 넣고 가장 오른쪽 비트를 버립니다.     |
|  >>>   | Zero fill right shift | 왼쪽에 0을 넣어 오른쪽으로 이동하고 가장 오른쪽 비트를 버립니다. |

자바스크립트에서 10진수를 2진수 문자열로 변환하기 위해서는 `toString(2)`와 같이 사용한다.<br/>

```javascript
;(5).toString(2) // 101
;(2).toString(2) // 10
;(1000).toString(2) // 1111101000
```

2진수 문자열을 10진수 숫자로 변환하기 위해서는 `parseInte("2진수 문자열", 2)`와 같이 사용한다.<br/>

```javascript
parseInt('101', 2) // 5
parseInt('10', 2) // 2
parseInt('1111101000', 2) // 1000
```

### 비트연산자 사용 예시

#### & 연산자

```javascript
const a = 5
const b = 2

console.log(`a.toString(2): ${a.toString(2)}`)
// a.toString(2): 101
console.log(`b.toString(2): ${b.toString(2)}`)
// b.toString(2): 01
console.log(`a & b: ${a & b}`)
// a & b: 0
```

`&` 연산자는 양쪽의 비트가 모두 1인 비트만 1로 설정한다.<br/>

#### | 연산자

```javascript
const a = 5
const b = 2

console.log(`a.toString(2): ${a.toString(2)}`)
// a.toString(2): 101
console.log(`b.toString(2): ${b.toString(2)}`)
// b.toString(2): 01
console.log(`a | b: ${a | b}`)
// a | b: 7
```

`|` 연산자는 양쪽 비트 중 하나가 1이면 비트를 1로 설정한다.<br/>

#### ^ 연산자

```javascript
const a = 5
const b = 2

console.log(`a.toString(2): ${a.toString(2)}`)
// a.toString(2): 101
console.log(`b.toString(2): ${b.toString(2)}`)
// b.toString(2): 01
console.log(`a ^ b: ${a ^ b}`)
// a ^ b: 7
```

`^` 연산자는 양쪽 비트 중 하나만 1일 경우 비트를 1로 설정한다.<br/>

#### ~ 연산자

```javascript
const a = 5
const b = 2

console.log(`a.toString(2): ${a.toString(2)}`)
// a.toString(2): 101
console.log(`~a: ${~a}`)
// ~a: -6
console.log(`(~a).toString(2): ${(~a).toString(2)}`)
// (~a).toString(2): -110

console.log(`b.toString(2): ${b.toString(2)}`)
// b.toString(2): 01
console.log(`~b: ${~b}`)
// ~b: -3
console.log(`(~b).toString(2): ${(~b).toString(2)}`)
// (~b).toString(2): -11
```

`~` 연산자는 모든 비트를 반전시킨다.<br/>
자바스크립트는 **가장 왼쪽 비트를 빼기 부호**로 사용하는 **32비트 부호있는 정수**를 사용한다.<br/>
따라서 숫자 5의 2진수인 `101`에 `~`연산자를 사용하면 2가 아닌 -6을 반환한다.<br/>

#### << 연산자

```javascript
const a = 5

console.log(`a.toString(2): ${a.toString(2)}`)
// a.toString(2): 101
console.log(`a << 1: ${a << 1}`)
// a << 1: 10
console.log(`(a << 1).toString(2): ${(a << 1).toString(2)}`)
// (a << 1).toString(2): 1010
console.log(`a << 2: ${a << 2}`)
// a << 2: 20
console.log(`(a << 2).toString(2): ${(a << 2).toString(2)}`)
// (a << 2).toString(2): 10100
```

`<<` 연산자는 오른쪽에 0을 넣어 왼쪽으로 이동하고 가장 왼쪽 비트를 버립니다.<br/>

#### >> 연산자

```javascript
const a = -5

console.log(`a.toString(2): ${a.toString(2)}`)
// a.toString(2): -101
console.log(`a >> 1: ${a >> 1}`)
// a >> 1: 3
console.log(`(a >> 1).toString(2): ${(a >> 1).toString(2)}`)
// (a >> 1).toString(2): -11
console.log(`a >> 2: ${a >> 2}`)
// a >> 2: -2
console.log(`(a >> 2).toString(2): ${(a >> 2).toString(2)}`)
// (a >> 2).toString(2): -10
```

`>>` 연산자는 가장 왼쪽 비트를 왼쪽에 넣고 가장 오른쪽 비트를 버립니다.<br/>

#### >>> 연산자

```javascript
const a = -5

console.log(`a.toString(2): ${a.toString(2)}`)
// a.toString(2): -101
console.log(`a >>> 1: ${a >>> 1}`)
// a >>> 1: 2
console.log(`(a >>> 1).toString(2): ${(a >>> 1).toString(2)}`)
// (a >>> 1).toString(2): 10
console.log(`a >>> 2: ${a >>> 2}`)
// a >>> 2: 1
console.log(`(a >>> 2).toString(2): ${(a >>> 2).toString(2)}`)
// (a >>> 2).toString(2): 1
```

`>>` 연산자는 왼쪽에 0을 넣어 오른쪽으로 이동하고 가장 오른쪽 비트를 버립니다.<br/>

## 비트 연산자 활용하기

아래와 같이 4개의 독립적인 `true`, `false` 변수들을 갖는 객체들이 존재할 수 있다.<br/>

```javascript
const obj = {
  a: false,
  b: true,
  c: false,
  d: true,
}
```

각 속성의 존재를 확인하고 저장하는 가장 좋은 방법이 무엇일지 생각해 볼 수 있을 것이다.<br/>
이 속성들의 아주 많은 조합을 체크해야될 필요가 있고 앞으로 새로운 속성이 추가될 수도 있다.<br/>
이런 문제를 해결하기 위해서 아래의 두가지의 확실한 방법이 존재한다.<br/>

### 1. 모든 가능한 경우 객체를 만들어 비교하기

아래의 `hasAandB` 객체와 같이 확인해야 할 조건의 모든 객제들을 생성해 비교할 수 있을 것이다.<br/>
아래처럼 객체를 이용해 확인할 경우 a, b 속성 외에 다른 속성을 가지고 있는지 확인할 수 없습니다.<br/>

```javascript
const hasAandB = {
  a: true,
  b: true,
  c: false,
  d: false,
}

if (isEqual(obj, hasAandB)) {
  // obj가 a, b 뿐만 아니라 c, d 또한 가지고 있을 수 있다.
}
```

다만 이렇게 모든 객체들을 만들어 확인을 해야할 경우 4개의 속성이 존재할 때 16개의 객체를 생성해야한다.<br/>
또한 확인해야할 객체에 새로운 속성이 추가될 경우 비교할 객체를 2배로 늘려야하는 문제가 발생한다.<br/>

### 2. 조건문에서 각 속성을 확인하기

아래와 같이 조건문에서 직접 각 속성의 존재 여부를 확인할 수도 있습니다.<br/>

```javascript
if (obj['a'] && obj['b'] && !(obj['c'] || obj['d'])) {
  // obj가 a와 b 속성만 가지고 있는지 확인할 수 있다.
}
```

하지만 이런 방식의 코드는 처음 코드를 작성할때 부터 유지보수할 때까지 오류가 발생하기 쉽다.<br/>
그리고 객체에 어떤 속성을 추가하게 될 경우 엄청나게 많은 작업이 필요하게 될 것이다.<br/>

### 비트 연산자를 활용해 문제 해결하기

자바스크립트의 모든 정수들은 `toString(2)`를 호출해 2진법으로 표기할 수 있다.<br/>

```javascript
;(1).toString(2) // 1
;(2).toString(2) // 10
;(3877494).toString(2) // 1110110010101001110110
```

아래와 같이 `<<` 비트 연산자는 10진법 정수를 2진법의 규칙에 맞게 증가시켜 줍니다.<br/>

```javascript
;(2).toString(2) // 10
;(2 << 1).toString(2) // 100
```

이와 같이 비트연산의 전반을 고려해 자바스크립트는 2진법에서 값을 더하거나 빼거나 비교할 수 있다.<br/>
위의 문제에서 각 객체의 속성을 4비트 숫자 내부에 저장할 수 있게 된다는 사실을 알 수 있게 있다.<br/>

```javascript
const hasAandB = '0011'
const hasAandC = '0101'

// 더 많은 경우의 수
```

각 속성이 `true`일 때는 1로 `false`일 때는 0으로 표기를 할 수 있습니다.<br/>
중요한 점은 첫번째 속성인 `a`만 `true`인 경우의 값은 `"0001"`과 같이 표기가 된다는 점이다.<br/>
**이진법에서 값의 증가는 오른쪽에서 왼쪽**으로 간다는 것을 염두에 두어야 한다.<br/>
제시된 문제를 해결하기 위해 `<<` 비트 연산자를 이용해 각 속성을 갖는지 확인하는 상수를 정의한다.<br/>

```javascript
const obj = {
  a: false,
  b: true,
  c: false,
  d: true,
}

const HAS_A = 1 // 0001
const HAS_B = HAS_A << 1 // 0010
const HAS_C = HAS_B << 1 // 0100
const HAS_D = HAS_C << 1 // 1000
```

그 후 결과를 담을 변수를 선언하고 초기값으로 `0`을 대입한다.<br/>

```javascript
let result = 0
```

이제 각 속성을 수동으로 확인하고 조건문 하나에 각 속성을 확인해 결과에 추가해 줍니다.<br/>

```javascript
if (obj['a']) {
  result = result | HAS_A
}

if (obj['b']) {
  result = result | HAS_B
}

if (obj['C']) {
  result = result | HAS_C
}

if (obj['D']) {
  result = result | HAS_D
}

console.log(result.toString(2)) // 1010
```

최종 결과를 저장한 `result` 변수는 이제 `1010`이라는 값을 갖게 된다.<br/>
`obj` 객체가 두번째, 네번째 속성을 가지고 있기 때문에 뒤에서 두번째와 네번째 비트가 1이 된다.<br/>
`|` 연산자을 이용해 생성된 결과에서 어떤 속성을 갖는지 확인하기 위해서 `&` 연산자를 사용할 수 있다.<br/>

```javascript
if (result & HAS_A) {
  // (1010 & 0001) = 0000 -> False
}

if (result & HAS_B) {
  // (1010 & 0010) = 0010 -> True
}
```

또한 특정 속성중 하나를 가지고 있는지 확인할 수도 있다.<br/>

```javascript
if (result & (HAS_A | HAS_B)) {
  // (1010 & (0001 | 0010)) = (1010 & 0011) = 0010 -> True
}

if (result & (HAS_A | HAS_C)) {
  // (1010 & (0001 | 0100)) = (1010 & 0101) = 0000 -> False
}
```

아래와 같이 조건문에 명시된 속성들만 가지고 있는지 확인할 수 있다.<br/>

```javascript
if (result == (HAS_B | HAS_D)) {
  // 1010 == (0010 | 1000) -> 1010 == 1010 -> True
}

if (result == (HAS_B | HAS_C | HAS_D)) {
  // 1010 == (0010 | 0100 | 1000) -> 1010 == 1110 -> False
}
```

비트 연산자를 사용해 `true`, `false`로 이루어진 객체의 속성을 효율적으로 저장하고 비교할 수 있다.<br/>
또한 비트 연산자를 이용하면서 코드를 업데이트하거나 유지보수하기 조금 더 간편해질 것이다.<br/>

## 형식화 배열

자바스크립트의 형식화 배열(Typed Array)은 일반적인 배열(Array)와 몇 가지 차이가 있는 유사 배열 객체다.<br/>

- 형식화 배열의 원소는 모두 숫자다.
- 생성자에 숫자의 타입과 크기를 사용해 형식화 배열을 생성한다.
- 형식화 배열은 크기가 고정된다.
- 배열이 생성된 시점에 형식화 배열의 원소들은 항상 0으로 초기화 된다.

생성할 수 있는 형식화 배열의 종류는 아래와 같다.<br/>

| 생성자         | 범위                           | 원소의 타입                  |
| :------------- | :----------------------------- | :--------------------------- |
| Int8Array()    | -128 ~ 127                     | 부호 있는 8비트 정수         |
| Uint8Array()   | 0 ~ 255                        | 부호 없는 8비트 정수         |
| Int16Array()   | -32,768 ~ 32,767               | 부호 있는 16비트 정수        |
| Uint16Array()  | 0 ~ 65,535                     | 부호 없는 16비트 정수        |
| Int32Array()   | -2,147,483,648 ~ 2,147,483,647 | 부호 있는 32비트 정수        |
| Uint32Array()  | 0 ~ 4,294,967,295              | 부호 없는 32비트 정수        |
| Float32Array() | -3.4 x 10^38 ~ 3.4 x 10^38     | 32비트 부동 소수점 값 (실수) |
| Float64Array() | -1.79 x 10^308 ~ 1.79 x 10^308 | 64비트 부동 소수점 값 (실수) |

형식화 베열을 생성할 때는 생성자에 배열의 크기를 전달하거나 배열 또는 타입 배열을 전달해 원소를 초기화 한다.<br/>
형식화 배열을 사용하면 일반 배열에 비하여 **실행 시간과 메모리 사용 측면에서 효율적**일 수 있다.<br/>

## 버퍼(배열)

버퍼는 길이가 정해져 있는 이진 데이터를 저장하며 데이터 부분을 나타낸다.<br/>
형식화 배열의 버퍼를 생성하는 방법은 아래와 같으며 생성자의 매개변수는 **버퍼의 바이트 크기**다.<br/>

```javascript
var buffer = new ArrayBuffer(8)
```

위의 `ArrayBuffer`로 생성된 `buffer`는 8바이트 크기의 버퍼다.<br/>
버퍼는 데이터에 직접 접근할 수 있는 방법을 저장하지 않으며 접근하기 위해서는 뷰를 사용해야 한다.<br/>

### 버퍼와 뷰

뷰는 아래와 같이 `DataView` 생성자를 이용해 생성하며 버퍼를 매개변수로 받는다.<br/>

```javascript
var view = new DataView(buffer)
```

`DataView`는 메모리에 접근해 다양한 형태의 데이터를 읽고 쓸 수 있다.<br/>

### DataView의 데이터를 설정하는 set 메소드

| 메소드 이름 | 메소드 설명                              |
| :---------- | :--------------------------------------- |
| setInt8     | 8비트 크기의 값을 설정한다.              |
| setUint8    | 8비트 크기의 부호없는 값을 설정한다.     |
| setInt16    | 16비트 크기의 값을 설정한다.             |
| setUint16   | 16비트 크기의 부호없는 값을 설정한다.    |
| setInt32    | 32비트 크기의 값을 설정한다.             |
| setUint32   | 32비트 크기의 부호없는 값을 설정한다.    |
| setFloat32  | 32비트 크기의 부동 소수점 값을 설정한다. |
| setFloat64  | 64비트 크기의 부동 소수점 값을 설정한다. |

`setInt8`과 같이 값을 설정하는 메서드는 두 개의 매개변수를 받는다.<br/>
첫 번째 매개변수는 값을 설정하는 버퍼의 위치 두번째 매개변수는 설정되는 값이다.<br/>

### DataView의 데이터를 읽는 get 메소드

| 메소드 이름 | 메소드 설명                              |
| :---------- | :--------------------------------------- |
| getInt8     | 8비트 크기의 값을 반환한다.              |
| getUint8    | 8비트 크기의 부호없는 값을 반환한다.     |
| getInt16    | 16비트 크기의 값을 반환한다.             |
| getUint16   | 16비트 크기의 부호없는 값을 반환한다.    |
| getInt32    | 32비트 크기의 값을 반환한다.             |
| getUint32   | 32비트 크기의 부호없는 값을 반환한다.    |
| getFloat32  | 32비트 크기의 부동 소수점 값을 반환한다. |
| getFloat64  | 64비트 크기의 부동 소수점 값을 반환한다. |

`getInt8`과 같은 값을 반환하는 메서드는 읽을 버퍼의 위치를 의미하는 하나의 매개변수를 받는다.<br/>

`ArrayBuffer`를 이용해 자바스크립트에서도 메모리를 수동적으로 관리할 수 있게 된다.<br/>
하지만 메모리를 수동 관리할 만큼의 성능 저하가 발생하지 않고 수동 관리를 해도 오히려 성능이 나빠질 수 있다.<br/>
상황에 맞게 메모리를 수동관리하게 된다면 성능을 향상 시킬 수 있고 그때 `ArrayBuffer`를 사용하면 된다.<br/>
