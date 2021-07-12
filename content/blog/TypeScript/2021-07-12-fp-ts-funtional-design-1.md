---
title: '함수형 디자인: combinators'
date: 2021-07-12 00:01:04
category: 'TypeScript'
draft: false
---

본 포스트는 fp-ts 공식 문서의 [Learning Resources](https://gcanti.github.io/fp-ts/learning-resources/)에 있는 Functional design series에서 소개하는 문서들을 번역하며 학습한 문서입니다. 원본 문서는 [링크](https://dev.to/gcanti/functional-design-combinators-14pn)에서 확인할 수 있으며 작성한 코드들은 [여기](https://github.com/alstn2468/getting-started-fp-ts/tree/main/src/functional_design_series/1_combinator_one)에서 확인할 수 있습니다.

## 함수형 디자인: combinators

이 글에서 "combinator"라는 용어는 [combinator 패턴](https://wiki.haskell.org/Combinator)을 가리킵니다.

> 어떤 것을 결합하는 아이디어 중심으로 라이브러리를 구성하는 방식. 일반적으로 `T` 타입, `T` 타입의 "원시" 값, 그리고 `T` 타입의 값을 다양한 방법으로 조합하여 `T` 타입보다 복잡한 값을 구성할 수 있는 "combinator"가 있습니다.

따라서 combinator의 일반적인 모양은 아래와 같습니다.

```haskell
combinator: Thing -> Thing
```

combinator의 목표는 이전에 정의된 "Thing"에서 새로운 "Thing"을 만드는 것입니다.

결과는 입력으로 다시 전달될 수 있기 때문에 복합적인 폭발적 가능성을 갖게 되고, 이는 이러한 패턴을 매우 강력하게 만듭니다.

여러 combinator를 함께 조합하면 훨씬 더 큰 조합 폭발이 일어납니다.

따라서 함수형 모듈에서 자주 찾을 수 있는 디자인은 아래와 같습니다.

- 아주 단순한 "원시값"의 작은 집합
- 더 복잡한 구조로 결합하기 위한 "combinator" 집합

몇 가지 예시를 살펴보겠습니다.

## 예시 1: `Eq`

`getEq` combinator: `A`에 대한 `Eq` 인스턴스가 주어지면 `ReadonlyArray<A>`에 대한 `Eq` 인스턴스를 파생할 수 있습니다.

```typescript
import type { Eq } from 'fp-ts/lib/Eq';
import { fromEquals } from 'fp-ts/lib/Eq';

export function getEq<A>(E: Eq<A>): Eq<ReadonlyArray<A>> {
  return fromEquals(
    (xs, ys) =>
      xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])),
  );
}
```

작성한 `getEq` combinator를 사용하는 방법

```typescript
/** `number`를 위한 원시적인 `Eq` 인스턴스 */
export const eqNumber: Eq<number> = {
  equals: (x, y) => x === y,
};

// 파생된
export const eqNumbers: Eq<ReadonlyArray<number>> = getEq(eqNumber);

// 파생된
export const eqNumbersNumbers: Eq<ReadonlyArray<ReadonlyArray<number>>> = getEq(
  eqNumbers,
);

// 파생된
export const eqNumbersNumbersNumbers: Eq<
  ReadonlyArray<ReadonlyArray<ReadonlyArray<number>>>
> = getEq(eqNumbersNumbers);

// etc...
```

또 다른 combinator인 `contramap`: `A`에 대한 `Eq` 인스턴스와 `B`에서 `A`로의 함수가 주어지면 `B`에 대한 `Eq` 인스턴스를 파생할 수 있습니다.

```typescript
import type { Eq } from 'fp-ts/lib/Eq';
import { fromEquals } from 'fp-ts/lib/Eq';

export const contramap = <A, B>(f: (b: B) => A) => (E: Eq<A>): Eq<B> =>
  fromEquals((x, y) => E.equals(f(x), f(y)));
```

작성한 `contramap` combinator를 사용하는 방법

```typescript
import type { Eq } from 'fp-ts/lib/Eq';
import { contramap } from 'fp-ts/lib/Eq';
import { pipe } from 'fp-ts/lib/function'
import * as N from 'fp-ts/lib/number';
import * as RA from 'fp-ts/lib/ReadonlyArray';

export interface User {
  id: number
  name: string
}

export const eqUser: Eq<User> = pipe(
  N.Eq,
  contramap((user: User) => user.id),
);

export const eqUsers: Eq<Array<User>> = RA.getEq(eqUser);
```

## 예시 2: `Monoid`

`getMonoid` combinator: `A`에 대한 `Monoid` 인스턴스가 주어지면 `IO<A>`에 대한 `Monoid` 인스턴스를 파생할 수 있습니다.

```typescript
import type { IO } from 'fp-ts/lib/IO';
import type { Monoid } from 'fp-ts/lib/Monoid';

export function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>> {
  return {
    concat: (x, y) => () => M.concat(x(), y()),
    empty: () => M.empty,
  };
}
```

`getMonoid`를 사용하여 다른 combinator인 `replicateIO`를 파생할 수 있습니다. 숫자 `n`과 `IO<void>` 타입의 작업 `mv`가 주어지면 `n`번 `mv`를 수행하는 작업을 파생할 수 있습니다.

```typescript
import type { Monoid } from 'fp-ts/lib/Monoid';
import { concatAll } from 'fp-ts/lib/Monoid';
import { replicate } from 'fp-ts/lib/ReadonlyArray';

/** `void`를 위한 원시적인 `Monoid` 인스턴스 */
export const monoidVoid: Monoid<void> = {
  concat: () => undefined,
  empty: undefined,
};

export function replicateIO(n: number, mv: IO<void>): IO<void> {
  return concatAll(getMonoid(monoidVoid))(replicate(n, mv));
}
```

`getMonoid` combinator에서 파생된 `replicateIO` combinator를 사용하는 방법

```typescript
//
// 헬퍼함수
//

/** 콘솔에 메세지를 출력하는 함수 */
export function log(message: unknown): IO<void> {
  return () => console.log(message);
}

/** `low`와 `high` 사이의 임의의 정수를 반환하는 함수. */
export const randomInt = (low: number, high: number): IO<number> => {
  return () => Math.floor((high - low + 1) * Math.random() + low);
};

//
// 프로그램
//
import { chain } from 'fp-ts/lib/IO';
import { pipe } from 'fp-ts/lib/function';

function fib(n: number): number {
  return n <= 1 ? 1 : fib(n - 1) + fib(n - 2);
}

/** 임의의 피보나치 수열을 계산하고 결과를 콘솔에 출력하는 함수 */
export const printFib: IO<void> = pipe(
  randomInt(30, 35),
  chain((n) => log(fib(n))),
);

replicateIO(3, printFib)()
/*
1346269
9227465
3524578
*/
```

## 예시 3: `IO`

`IO`를 위한 다른 많은 combinator를 만들 수 있습니다. 예를 들어 `time` combinator는 유사한 Unix 명령을 모방합니다. `IO<A>` 작업이 주어지면 실행 시간을 콘솔에 출력하는 작업 `IO<A>`를 파생할 수 있습니다.

```typescript
import type { IO } from 'fp-ts/lib/IO';
import { Monad } from 'fp-ts/lib/IO';
import { now } from 'fp-ts/lib/Date';
import { log } from 'fp-ts/lib/Console';

export function time<A>(ma: IO<A>): IO<A> {
  return Monad.chain(now, (start) =>
    Monad.chain(ma, (a) =>
      Monad.chain(now, (end) =>
        Monad.map(log(`Elapsed: ${end - start}`), () => a),
      ),
    ),
  );
}
```

작성한 `time` combinator를 사용하는 방법

```typescript
time(replicateIO(3, printFib))()
/*
5702887
1346269
14930352
Elapsed: 193
*/
```

아래와 같이 부분적으로도 적용할 수 있습니다.

```typescript
time(replicateIO(3, time(printFib)))()
/*
3524578
Elapsed: 32
14930352
Elapsed: 125
3524578
Elapsed: 32
Elapsed: 189
*/
```

어떻게 하면 `time` combinator를 더 일반적으로 만들 수 있을까요? 다음 글에서 방법을 살펴보겠습니다.