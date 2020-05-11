---
title: '명시적, 암시적 변환, Nominal, 구조화, 덕 타이핑'
date: 2020-05-11 00:00:01
category: 'Javascript'
draft: false
---

<a href="https://github.com/leonardomso/33-js-concepts">33-js-concepts</a>를 스터디하며 정리한 포스트 입니다.

## 형변환(Type Conversion)이란?

프로그램을 작성하면서 문자를 숫자로, 숫자로 문자로 변환해야하는 작업이 생긴다.<br/>

```javascript
let num = 10
console.log(num, typeof num) // 10 "number"

num = num.toString()
console.log(num, typeof num) // 10 "string"

num = parseInt(num)
console.log(num, typeof num) // 10 "number"
```

위와 같은 코드 처럼 `parseInt`나 `toString`같은 함수를 이용해서 **형변환**을 할 수 있다.<br/>
자바스크립트에서는 `C`나 `Java`와 같은 언어와 달리 `var`나 `let`을 이용해 **변수를 선언**한다.<br/>
자바스크립트에서 **형변환**을 하는 방법은 **명시적 변환**과 **암시적 변환**이 존재한다.<br/>
또 자바스크립트에서 사용하지는 않지만 타입 검사 방법으로 **Nominal**, **Structural**, **Duck** 타이핑이 존재한다.<br/>

## 명시적 변환(Explict Conversion)이란?

**명시적 변환**(**Explict Conversion**)은 개발자가 **의도적**으로 **형변환**을 하는 것이다.<br/>
기본적인 형변환은 `Obejct()`, `Number()`, `String()`, `Boolean()`과 같은 함수를 이용한다.<br/>

```javascript
let variable = 100

console.log(variable, typeof variable) // 100 "number"

variable = Object(variable)
console.log(variable, typeof variable) // Number {100} "object"

variable = String(variable)
console.log(variable, typeof variable) // 100 "string"

variable = Boolean(variable)
console.log(variable, typeof variable) // true "boolean"
```

원래 `Object()`, `Number()`, `String()`과 같은 함수는 생성자 함수다.<br/>
하지만 `new`연산자가 없을 경우 **형변환**에 사용된다.<br/>

### Number Type으로 변환하기

`Number`가 아닌 다른 자료형을 `Number`로 변환하는 방법은 아래와 같다.<br/>

1. `Number()`

```javascript
console.log(Number('100000'), typeof Number('100000')) // 100000 "number"
console.log(Number('5' * 5), typeof Number('5' * 5)) // 25 "number"
console.log(Number('3.14'), typeof Number('3.14')) // 3.14 "number"
console.log(Number('a'), typeof Number('a')) // Nan "number"
console.log(Number(true), typeof Number(true)) // 1 "number"
console.log(Number(false), typeof Number(false)) // 0 "number"
console.log(Number(() => {}), typeof Number(Number(() => {}))) // NaN "number"
```

**정수형**과 **실수형** 데이터를 **숫자**로 **변환**하고 **숫자 데이터가 아닌 것**은 **Nan**을 반환한다.<br/>
`Boolean`데이터인 `true`와 `false`는 각각 `1`과 `0`으로 변환된다.<br/>

2. `parseInt()`

```javascript
console.log(parseInt('100000'), typeof parseInt('100000')) // 100000 "number"
console.log(parseInt('3.14'), typeof parseInt('3.14')) // 3 "number"
console.log(parseInt('a'), typeof parseInt('a')) // NaN "number"
console.log(parseInt(0033), typeof parseInt(0033)) // 27 "number"
console.log(parseInt('0033'), typeof parseInt('0033')) // 33 "number"
console.log(parseInt(0x1b), typeof parseInt(0x1b)) // 27 "number"
console.log(parseInt('0x1b'), typeof parseInt('0x1b')) // 27 "number"
console.log(parseInt(true), typeof parseInt(true)) // NaN "number"
console.log(parseInt(false), typeof parseInt(false)) // NaN "number"
console.log(parseInt(() => {}), typeof parseInt(() => {})) // NaN "number"
console.log(parseInt('    2'), typeof parseInt('    2')) // 2 "number"
console.log(parseInt('    2  '), typeof parseInt('    2  ')) // 2 "number"
console.log(parseInt('    2  ㄴ2'), typeof parseInt('    2  ㄴ2')) // 2 "number"
console.log(parseInt('      ㄴ2'), typeof parseInt('      ㄴ2')) // Nan "number"
```

`parseInt()`함수는 **정수형**의 숫자로 변환된다.<br/>
문자열이 숫자 `0`으로 시작시 8진수로 인식하고 `0x`, `0X`로 시작시 16진수로 인식한다.<br/>
또한 숫자가 아닌 데이터가 먼저 포함된 문자열이 들어올 경우 `Nan`을 반환한다.<br/>
뒷부분에 공백이나 숫자가 아닌 데이터가 들어올 경우 앞의 데이터만 반환한다.<br/>
`Number()`와 다르게 `Boolean`값인 `true`와 `false`또한 `Nan`을 반환한다.<br/>

1. `parseFloat()`

```javascript
console.log(parseFloat('100000'), typeof parseFloat('100000')) // 100000 "number"
console.log(parseFloat('3.14'), typeof parseFloat('3.14')) // 3.14 "number"
console.log(parseFloat('a'), typeof parseFloat('a')) // NaN "number"
console.log(parseFloat(0033), typeof parseFloat(0033)) // 27 "number"
console.log(parseFloat('0033'), typeof parseFloat('0033')) // 33 "number"
console.log(parseFloat(0x1b), typeof parseFloat(0x1b)) // 27 "number"
console.log(parseFloat('0x1b'), typeof parseFloat('0x1b')) // 0 "number"
console.log(parseFloat(true), typeof parseFloat(true)) // NaN "number"
console.log(parseFloat(false), typeof parseFloat(false)) // NaN "number"
console.log(parseFloat(() => {}), typeof parseFloat(() => {})) // NaN "number"
console.log(parseFloat('    2'), typeof parseFloat('    2')) // 2 "number"
console.log(parseFloat('    2  '), typeof parseFloat('    2  ')) // 2 "number"
console.log(parseFloat('    2  ㄴ2'), typeof parseFloat('    2  ㄴ2')) // 2 "number"
console.log(parseFloat('      ㄴ2'), typeof parseInt('      ㄴ2')) // Nan "number"
```

`parseFloat()`함수는 **실수형**의 숫자로 변환된다.<br/>
`parseInt()`와 비슷하지만 16진수 문자열 데이터(`"0x27"`)일 경우 `0`을 반환한다.<br/>

### String Type으로 변환하기

1. `String()`

```javascript
console.log(String(10000), typeof String(10000)) // "10000" "string"
console.log(String(3.14), typeof String(3.14)) // "3.14" "string"
console.log(String(true), typeof String(true)) // "true" "string"
console.log(String(false), typeof String(false)) // "false" "string"
console.log(String(() => {}), typeof String(() => {})) // "() => {}" "string"
console.log(String({ foo: 'bar' }), typeof String({ foo: 'bar' })) // "[object Object]" "string"
```

`number`나 `boolean`데이터 그리고 `() => {}`같은 함수도 문자열로 바뀌는 것을 확인할 수 있다.<br/>
`{ foo: "bar" }`와 같은 객체도 `string`으로 변환되긴하지만 `[object Object]`와 같이 표시된다.<br/>

2. `toString()`

```javascript
console.log((10000).toString(), typeof (10000).toString()) // "10000" "string"
console.log((10000).toString(2), typeof (10000).toString(2)) // "10011100010000" "string"
console.log((10000).toString(8), typeof (10000).toString(8)) // "23420" "string"
console.log((3.14).toString(), typeof (3.14).toString()) // "3.14" "string"
console.log(true.toString(), typeof true.toString()) // "true" "string"
console.log(false.toString(), typeof false.toString()) // "false" "string"
console.log((() => {}).toString(), typeof (() => {}).toString()) // "() => {}" "string"
console.log({ foo: 'bar' }.toString(), typeof { foo: 'bar' }.toString()) // "[object Object]" "string"
```

`toString()`함수도 `String()`과 비슷하지만 `number`데이터를 변환할 때 진수를 지정할 수 있다.<br/>
인자를 전달하지않으면 **기본적으로 10진수** 값으로 `number`데이터를 `string`으로 변환한다.<br/>

3. `toFixed()`

```javascript
console.log((10000).toFixed(), typeof (10000).toFixed()) // "10000" "string"
console.log((10000).toFixed(2), typeof (10000).toFixed(2)) // "10000.00" "string"
console.log((10000).toFixed(3), typeof (10000).toFixed(8)) // "10000.000" "string"
console.log((3.14).toFixed(), typeof (3.14).toFixed()) // "3" "string"
console.log((3.14).toFixed(1), typeof (3.14).toFixed()) // "3.1" "string"
console.log((3.16).toFixed(1), typeof (3.16).toFixed()) // "3.2" "string"
```

`toFixed()`는 `number`데이터에만 사용할 수 있다.<br/>
인자에 주는 값은 인자의 값만큼 **소수점 자리수**를 표현한다.<br/>

### Boolean Type으로 변환하기

1. `Boolean()`

```javascript
Boolean(100); //true
Boolean(“1”); //true
Boolean(true); //true
Boolean(Object); //true
Boolean([]); //true
Boolean(0); //false
Boolean(NaN); //false
Boolean(null); //false
Boolean(undefined); //false
```

`Boolean`으로 변환하기 위해서는 `Boolean()`을 사용한다.<br/>
`0`, `Nan`, `null`, `undefined`가 아닌 값들은 모두 `true`로 변환된다.<br/>

## 암시적 변환(Implicit Conversion)이란?

**암시적 변환**은 **자바스크립트 엔진**이 자동으로 **데이터 타입을 변환**시키는 것이다.<br/>

```javascript
let num = 10
let str = '10'

console.log(num + str, typeof (num + str)) // "1010" "string"
```

위와 같은 코드가 **암시적 변환**(**Implicit Conversion**)의 예시다.<br/>
`num`변수는 `number`타입의 값을 갖고 `str`변수는 `string`타입의 값을 갖는다.<br/>
`num + str`과 같이 `number`타입과 `string`타입의 더해 엔진에서 `"1010"`을 만들었다.<br/>
`num + str`의 타입은 `string`인 것을 `typeof`를 사용해서 확인할 수 있다.<br/>
다른 언어일 경우 아래와 같이 에러메세지를 발생시켰을 것이다.<br/>

```python
number = 10
string = "10"

print(number + string, type(number + string))

# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

일반적인 언어에서 **타입이 다른 값들의 연산**은 **지원하지 않지만** **자바스크립트**는 **가능**하다.<br/>
**자바스크립트**가 **타입에 대하여 상당히 유연한 언어**인 이유 중에 하나일 것이다.<br/>
**암시적 변환**은 **산술 연산자**와 **동등 연산자**를 사용할 때 변환이 발생한다.<br/>

### 산술 연산자에서의 암시적 변환

#### 더하기 연산자 (`+`)

더하기 연산자에서는 **문자**의 우선순위가 숫자보다 **높다**.<br/>
객체와 함수또한 **문자**보다 우선순위가 낮다.<br/>

- Number + String

```javascript
console.log(10 + '10', typeof (10 + '10')) // "1010" "string"
console.log(10 + 'abc', typeof (10 + 'abc')) // "10abc" "string"
console.log('10' + 10, typeof ('10' + 10)) // "1010" "string"
console.log('abc' + 10, typeof ('abc' + 10)) // "abc10" "string"
console.log(10 + 'abc' + 10, typeof (10 + 'abc' + 10)) // "10abc10" "string"
```

- String + Boolean

```javascript
console.log('abc' + true, typeof ('abc' + true)) // "abctrue" "string"
console.log('abc' + false, typeof ('abc' + true)) // "abcfalse" "string"
console.log(true + 'abc', typeof (true + 'abc')) // "trueabc" "string"
console.log(false + 'abc', typeof (false + 'abc')) // "falseabc" "string"
console.log(true + 'abc' + false, typeof (true + 'abc' + false)) // "trueabcfalse" "string"
```

- String + Object

```javascript
console.log('abc' + { foo: 'bar' }, typeof ('abc' + { foo: 'bar' })) // "abc[object Object]" "string"
console.log('abc' + (() => {}), typeof ('abc' + (() => {}))) // "abc() => {}" "string"
```

#### 그 외 연산자 (`-`, `*`, `/`, `%`)

더하기 연산자를 제외한 연산자에서는 **숫자**의 우선순위가 문자보다 **높다**.<br/>
숫자가 아닌 `"abc"`같은 문자열이 들어갈 경우 **연산이 불가능**해 `Nan`이 반환된다.<br/>

- Number \* String

```javascript
console.log(10 * '10', typeof (10 * '10')) // 100 "number"
console.log(10 * 'abc', typeof (10 * 'abc')) // Nan "number"
console.log('10' * 10, typeof ('10' * 10)) // 100 "number"
console.log('abc' * 10, typeof ('abc' * 10)) // Nan "number"
console.log(10 * 'abc' * 10, typeof (10 * 'abc' * 10)) // Nan "number"
```

- Number - String

```javascript
console.log(10 - '10', typeof (10 - '10')) // 0 "number"
console.log(10 - 'abc', typeof (10 - 'abc')) // Nan "number"
console.log('10' - 10, typeof ('10' - 10)) // 0 "number"
console.log('abc' - 10, typeof ('abc' - 10)) // Nan "number"
console.log(10 - 'abc' - 10, typeof (10 - 'abc' - 10)) // Nan "number"
```

- Number / String

```javascript
console.log(10 / '10', typeof (10 / '10')) // 1 "number"
console.log(10 / 'abc', typeof (10 / 'abc')) // Nan "number"
console.log('10' / 10, typeof ('10' / 10)) // 1 "number"
console.log('abc' / 10, typeof ('abc' / 10)) // Nan "number"
console.log(10 / 'abc' / 10, typeof (10 / 'abc' / 10)) // Nan "number"
```

- Number % String

```javascript
console.log(10 % '10', typeof (10 % '10')) // 0 "number"
console.log(10 % 'abc', typeof (10 % 'abc')) // Nan "number"
console.log('10' % 10, typeof ('10' % 10)) // 0 "number"
console.log('abc' % 10, typeof ('abc' % 10)) // Nan "number"
console.log((10 % 'abc') % 10, typeof ((10 % 'abc') % 10)) // Nan "number"
```

- Number (\*, -, /, %) Boolean

```javascript
console.log(10 * true, 10 * false) // 10 0
console.log(10 - true, 10 - false) // 9 10
console.log(10 / true, 10 / false) // 10 Infinity
console.log(10 % true, 10 % false) // 0 Nan
```

`Boolean`타입의 경우 `Number`와 연산이 될 경우 `true`는 `1`, `false`는 `0`으로 계산된다.<br/>

### 동등 연산자에서의 암시적 변환

`==`연산자를 사용할 경우에도 암시적 변환이 발생한다.<br/>

```javascript
console.log(0 == '0') // true
console.log(0 == false) // true
console.log('0' == false) // true
console.log(undefined == null) // true
console.log('' == false) // true
console.log('' == 0) // true
console.log('' == '0') // false
```

위와 같이 `Number`타입인 `0`과 `String`타입인 `"0"`은 `==`연산자를 사용할 경우 같다.<br/>
또한 `0`과 `"0"`은 `Boolean`타입인 `false`와 같다는 것을 확인할 수 있다.<br/>
비어있는 문자열인 `""`은 `false`와 `0`과는 같지만 문자열 `"0"`과는 다르다.<br/>

```javascript
console.log(1 == '1') // true
console.log(1 == true) // true
console.log('1' == true) // true
```

마찬가지로 `1`과 `"1"` 그리고 `true`도 동일한 관계를 갖는다.<br/>
타입에 엄격하지 않은 `==`연산자를 대체하여 엄격한 `===`연산자를 사용해 동등 비교를 한다.<br/>

## 명칭적 타이핑(Nominal Typing)이란?

**명칭적 타이핑**(**Nominal Typing**)은 특정 **키워드**를 통하여 **타입을 지정**해 사용하는 방식이다.<br/>
`C++`이나 `Java`와 같은 언어에서 **명칭적 타이핑**(**Nominal Typing**)으로 타입 검사가 이루어진다.<br/>
클래스의 경우에는 `extends`와 같은 키워드를 이용해 서로 호환 가능함을 명시한다.<br/>

```java
int num = 10;
char str = "a";

num = str; // ERROR!!
num = "a"; // ERROR!!
str = 10; // ERROR!!
```

위와 같은 상황에서 `num`은 `int`형으로 `str`은 `char`형으로 선언되었다.<br/>
따라서 서로 타입이 맞지않는 값을 **대입연산자**(`=`)를 이용해 대입하려 할 경우 에러가 발생한다.<br/>

```java
class Foo {};
class Bar {};

Foo foo = new Bar();
```

클래스에서도 마찬가지로 위의 예시의 `Foo`와 `Bar`는 서로 호환이 불가능한 클래스다.<br/>

```java
class Foo {};
class Bar extends Foo {};

Foo foo = new Bar();
```

위와 같이 `extends`를 이용해 서로 클래스 간의 상호 호환을 명시하면 클래스를 사용할 수 있다.<br/>

## 구조적 타이핑(Structural Typing)란?

**구조적 타이핑**(**Structural Typing**)은 맴버에 따라 타입을 검사하는 방법이다.<br/>
**명칭적 타이핑**(**Nominal Typing**)과 반대되는 방법으로 `TypeScript`, `Go`등에서 사용한다.<br/>
**구조적 타이핑**(**Structural Typing**)은 두 데이터의 **타입 구조를 비교**하여 호환되는 타입인지 검사한다.<br/>
한 타입이 **다른 타입이 갖는 맴버**를 **모두 가지고 있을 경우** 두 타입은 **호환되는 타입**이다.<br/>

```typescript
interface People {
  name: string
}

let people: People
let p = { name: 'Min Su', location: 'Pangyo' }
people = p
```

`People`인터페이스는 `string`타입의 `name`을 **타입 구조**로 갖는다.<br/>
`p`라는 `object`변수는 `string`타입의 `name`과 `location`을 갖고있다.<br/>
`p`가 가지고 있는 데이터에는 `key`가 `name`이고 `value`가 `string`인 값이 있다.<br/>
따라서 `People`이 요구하는 맴버가 `p`에는 모두 존재하여 `people`에 `p`를 대입할 수 있다.<br/>

## 덕 타이핑(Duck Typing)이란?

**덕 타이핑**(**Duck Typing**)은 객체의 **변수 및 메소드 집합**이 **객체의 타입**을 결정하는 것이다.<br/>
**덕 타이핑**(**Duck Typing**)이란 용어는 덕 테스트에서 유래했다.<br/>

> 어떤 새가 오리처럼 걷고, 헤엄치고, 소리를 낸다면 그 새를 오리라고 부를 것이다.

**덕 타이핑**(**Duck Typing**)은 `Python`, `Ruby`등에서 사용된다.<br/>
아래와 같이 `Duck`클래스와 `Dog`클래스를 파이썬 코드로 구현할 수 있다.<br/>

```python
class Duck:
    def __init__(self):
        self.name = "오리"

    def sound(self):
        print("꽥꽥!")

    def walk(self):
        print(f"{self.name}가 걷는다.")

class Dog:
    def __init__(self):
        self.name = "개"

    def sound(self):
        print("왈왈!")

    def walk(self):
        print(f"{self.name}가 걷는다.")
```

`Duck`클래스와 `Dog`클래스 모두 `sound`와 `walk`매서드를 내부에 가지고 있다.<br/>
객체를 인자로 받고 `sound`, `walk`매서드를 내부에서 사용하는 함수를 구현해보자.<br/>

```python
def make_sound(duck):
    duck.sound()

def take_walk(dog):
    dog.walk()
```

`make_sound`함수는 `duck`을 인자로 받고, `take_walk`함수는 `dog`를 인자로 받는다.<br/>
`Duck`클래스와 `Dog`클래스는 서로 다른 클래스이지만 **같은 메서드와 필드**를 갖는다.<br/>
따라서 **덕 타이핑**에 의해 아래와 같이 코드를 작성해 실행해도 문제가 없다.<br/>

```python
duck = Duck()
dog = Dog()

make_sound(duck) # 꽥꽥!
make_sound(dog) # 왈왈!

take_walk(duck) # 오리가 걷는다.
take_walk(dog) # 개가 걷는다.
```

`Duck`클래스와 `Dog`클래스가 갖는 메서드와 필드가 모두 동일하기 때문이다.<br/>
만약 `Duck`클래스나 `Dog`클래스에 메서드가 존재하지 않을 경우 **런타임 에러**를 발생시킨다.<br/>
타입을 지정하면서 생기는 **제약은 줄일 수** 있어 **유연하게 코드를 작성**할 수 있다.<br/>
하지만 타입 검사를 하지 않기 때문에 **오류가 발생**하기 **쉬우며** **테스트 코드**를 **작성하는 것**이 **좋다**.<br/>
