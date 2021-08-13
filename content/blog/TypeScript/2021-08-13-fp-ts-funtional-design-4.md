---
title: '함수형 디자인: 똑똑한 생성자'
date: 2021-08-13 00:01:04
category: 'TypeScript'
draft: false
---

본 포스트는 fp-ts 공식 문서의 [Learning Resources](https://gcanti.github.io/fp-ts/learning-resources/)에 있는 Functional design series에서 소개하는 문서들을 번역하며 학습한 문서입니다. 원본 문서는 [링크](https://dev.to/gcanti/functional-design-how-to-make-the-time-combinator-more-general-3fge)에서 확인할 수 있으며 작성한 코드들은 [여기](https://github.com/alstn2468/getting-started-fp-ts/tree/main/src/functional_design_series/4_smart_constructors)에서 확인할 수 있습니다.

## 함수형 디자인: 똑똑한 생성자

때로는 일반적인 타입 검사로 달성할 수 있는 것 이상으로 프로그램의 값에 대한 보장이 필요합니다. 이를 위해 똑똑한 생성자를 사용할 수 있습니다.

## 문제점

```typescript
interface Person {
  name: string;
  age: number;
}

function person(name: string, age: number): Person {
  return { name, age };
}

const p = person('', -1.2); // 오류가 발생하지 않는다.
```

위와 같이 `string`과 `number`는 광범위한 유형입니다. 비어있지 않은 문자열을 어떻게 정의할 수 있을까요? 또는 양수, 정수, 양의 정수는 어떻게 정의할 수 있을까요?

> 어떻게 더 일반적으로 `T` 타입을 구체적으로 어떻게 정의할 수 있을까요?

## 레시피

1. 구체적 정의를 나타내는 타입 `R` 정의
2. `R`에 대한 타입 생성자를 **export 하지 마세요**.
3. 아래 시그니처를 사용하는 함수(**똑똑한 생성자**)를 export 하세요.

```typescript
make: (t: T) => Option<R>;
```

## 가능한 구현: branded 타입

**branded 타입**은 _고유한_ brand와 교차하는 타입 `T`입니다.

```typescript
type BrandT = T & Brand;
```

위의 레시피에 따라 `NonEmptyString`을 구현해 보겠습니다.

1. 구체적 정의를 나타내는 `NonEmptyString` 유형을 정의합니다.

```typescript
export interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
  // 전체 모듈/패키지에서 고유함을 보장한다.
}

export type NonEmptyString = string & NonEmptyStringBrand
```

2. `NonEmptyString`에 대한 생성자를 export하지 마세요.

```typescript
// 이렇게 하지 마세요.
export function nonEmptyString(s: string): NonEmptyString { ... }
```

3. 똑똑한 생성자인 `make: (s: string) => Option<NonEmptyString>`을 export 하세요.

```typescript
import type { Option } from 'fp-ts/lib/Option';
import { none, some } from 'fp-ts/lib/Option';

// 사용자 지정 타입 가드로 구현된 런타임 검사
function isNonEmptyString(s: string): s is NonEmptyString {
  return s.length > 0;
}

export function makeNonEmptyString(s: string): Option<NonEmptyString> {
  return isNonEmptyString(s) ? some(s) : none;
}
```

`age` 필드에 대해 동일한 작업을 진행합니다.

```typescript
export interface IntBrand {
  readonly Int: unique symbol
}

export type Int = number & IntBrand

function isInt(n: number): n is Int {
  return Number.isInteger(n) && n >= 0
}

export function makeInt(n: number): Option<Int> {
  return isInt(n) ? some(n) : none
}
```

작성한 `makeInt`와 `makeNonEmptyString`는 아래와 같이 사용할 수 있다.


```typescript
interface Person {
  name: NonEmptyString;
  age: Int;
}

function person(name: NonEmptyString, age: Int): Person {
  return { name, age };
}

person('', -1.2); // 정적 타입 오류

const goodName = makeNonEmptyString('Giulio');
const badName = makeNonEmptyString('');
const goodAge = makeInt(45);
const badAge = makeInt(-1.2);

import { Monad } from 'fp-ts/lib/Option';

Monad.chain(goodName, (name) => Monad.map(goodAge, (age) => person(name, age)));
// some({ "name": "Giulio", "age": 45 })

Monad.chain(badName, (name) => Monad.map(goodAge, (age) => person(name, age)));
// none

Monad.chain(goodName, (name) => Monad.map(badAge, (age) => person(name, age)));
// none
```

## 결론

이런 방법은 런타임 검사의 부담을 호출자에게 주는 것처럼 보입니다.
그것은 공평하지만, 호출자는 차례로 이 부담을 호출자에게 넘길 수 있으며, 어쨌든 입력 유효성 검사를 수행해야 하는 시스템 경계에 도달할 때까지 이런 식으로 계속됩니다.

시스템 경계에서 런타임 유효성 검사를 쉽게 수행하고 branded 타입을 지원하는 라이브러리는 [io-ts](https://github.com/gcanti/io-ts)가 있습니다.