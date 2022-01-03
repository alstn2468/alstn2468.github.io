---
title: '함수형 디자인: 속성 기반 테스트 소개'
date: 2022-01-03 00:01:04
category: 'TypeScript'
draft: false
---

본 포스트는 fp-ts 공식 문서의 [Learning Resources](https://gcanti.github.io/fp-ts/learning-resources/)에 있는 Functional design series에서 소개하는 문서들을 번역하며 학습한 문서입니다. 원본 문서는 [링크](https://dev.to/gcanti/introduction-to-property-based-testing-17nk)에서 확인할 수 있으며 작성한 코드들은 [여기](https://github.com/alstn2468/getting-started-fp-ts/tree/main/src/functional_design_series/6_property_based_testing)에서 확인할 수 있습니다.

## 함수형 디자인: 속성 기반 테스트 소개

[Eq](https://alstn2468.github.io/TypeScript/2021-04-24-fp-ts-1/), [Ord](https://alstn2468.github.io/TypeScript/2021-04-25-fp-ts-2/), [Semigroup](https://alstn2468.github.io/TypeScript/2021-04-25-fp-ts-3/) 과 [Monoid](https://alstn2468.github.io/TypeScript/2021-04-29-fp-ts-4/)에 대한 이전 게시물에서는 인스턴스가 몇 가지 **규칙**을 지켜야 함을 보았습니다.

그렇다면 인스턴스가 **규칙을 지키는지** 어떻게 확인할 수 있을까요?

## 속성 기반 테스트

속성 기반 테스트는 기존 단위 테스트 방법을 보완하는 코드를 테스트하는 또 다른 방법입니다.

**생성된 임의의 항목**을 테스트하여 속성이 거짓이 되도록 하는 입력을 찾으려 시도합니다. 실패의 경우 속성 기반 테스트 프레임워크는 반례와 생성에 사용된 시드를 모두 제공합니다.

속성 기반 테스트를 `Semigroup`의 규칙에 적용해 보겠습니다.

- **결합 법칙(Associativity)** : `concat(concat(x, y), z) = concat(x, concat(y, z))`

TypeScript로 작성된 속성 기반 테스트 프레임워크인 [fast-check](https://github.com/dubzzz/fast-check)을 사용하겠습니다.

## `Semigroup` 인스턴스 테스트하기

아래의 세 가지 재료가 필요합니다.

1. 타입 `A`에 대한 `Semigroup<A>` 인스턴스
2. 결합 법칙을 인코딩하는 _속성_
3. 임의의 타입 `A` 값을 생성하는 방법

### 인스턴스

인스턴스는 아래와 같이 사용할 것입니다.

```typescript

import type { Semigroup } from 'fp-ts/lib/Semigroup';

const S: Semigroup<string> = {
  concat: (x, y) => x + ' ' + y,
};
```

### 속성

속성은 `boolean`을 반환하는 `predicate` 함수입니다. `predicate` 함수가 `true`를 반환하면 속성이 유지된다고 할 수 있습니다.

따라서 결합 법칙 속성을 아래와 같이 정의할 수 있습니다.

```typescript
const associativity = (x: string, y: string, z: string) =>
  S.concat(S.concat(x, y), z) === S.concat(x, S.concat(y, z));
```

### `Arbitrary<A>`

`Arbitrary<A>`는 타입 `A`의 임의 값을 생성하는 역할을 합니다. `Arbitrary<string>`이 ​​필요합니다. 다행스럽게도 `fast-check`은 많은 내장된 임의 값을 제공합니다.

```typescript
import * as fc from 'fast-check'

const arb: fc.Arbitrary<string> = fc.string();
```

모든 것을 사용하면 아래와 같습니다.

```typescript
describe('fast-check을 이용한 속성 기반 테스트', () => {
  it('(x + y) + z === x + (y + z)인지 확인하는 associativity 함수 테스트', () => {
    const arb: fc.Arbitrary<string> = fc.string();
    fc.assert(fc.property(arb, arb, arb, associativity));
  });
});
```

`fast-check`에서 오류가 발생하지 않으면 인스턴스가 잘 정의되어 있다고 확신할 수 있습니다.

## `Monoid` 인스턴스 테스트하기

인스턴스가 규칙을 어길 때 어떤 일이 발생하는지 봅시다.

인스턴스는 아래와 같이 사용할 것입니다.

```typescript
import type { Monoid } from 'fp-ts/lib/Monoid';
import { S } from './S';

const M: Monoid<string> = {
  ...S,
  empty: '',
};
```

`Monoid` 법칙을 속성으로 인코딩해야 합니다.

- 오른쪽 항등식(**Right identity**): `concat(x, empty) = x`
- 왼쪽 항등식(**Left identity**): `concat(empty, x) = x`

```typescript
const rightIdentity = (x: string) => M.concat(x, M.empty) === x;

const leftIdentity = (x: string) => M.concat(M.empty, x) === x;
```

마지막으로 아래와 같이 테스트를 작성합니다.

```typescript
describe('fast-check을 이용한 속성 기반 테스트', () => {
  it('concat(x, empty) == x인지 확인하는 rightIdentity 함수 테스트', () => {
    fc.assert(fc.property(arb, rightIdentity));
  });
  it('concat(empty, x) == x인지 확인하는 leftIdentity 함수 테스트', () => {
    fc.assert(fc.property(arb, leftIdentity));
  });
});
```

테스트를 실행하면 아래와 같은 결과를 얻을 수 있습니다.

```yml
Error: Property failed after 1 tests
{ seed: -2056884750, path: "0:0", endOnFailure: true }
Counterexample: [""]
```

훌륭합니다. `fast-check`은 우리에게 `""`라는 반례를 제공합니다.

```typescript
M.concat('', M.empty) = ' ' // ''가 되어야 한다.
```

## 참조

타입 클래스 규칙을 쉽게 테스트할 수 있는 라이브러리는 [fp-ts-laws](https://github.com/gcanti/fp-ts-laws)를 확인하면 된다.