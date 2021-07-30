---
title: '함수형 디자인: time combinators를 더 일반적으로 만드는 방법'
date: 2021-07-20 00:01:04
category: 'TypeScript'
draft: false
---

본 포스트는 fp-ts 공식 문서의 [Learning Resources](https://gcanti.github.io/fp-ts/learning-resources/)에 있는 Functional design series에서 소개하는 문서들을 번역하며 학습한 문서입니다. 원본 문서는 [링크](https://dev.to/gcanti/functional-design-how-to-make-the-time-combinator-more-general-3fge)에서 확인할 수 있으며 작성한 코드들은 [여기](https://github.com/alstn2468/getting-started-fp-ts/tree/main/src/functional_design_series/2_combinator_two)에서 확인할 수 있습니다.

## 함수형 디자인: time combinators를 더 일반적으로 만드는 방법

[지난 포스트](https://alstn2468.github.io/TypeScript/2021-07-12-fp-ts-funtional-design-1/)에서 유사한 Unix 명령을 모방하는 `IO<A>` 작업이 주어지면 실행 시간을 콘솔에 출력하는 작업 `IO<A>`를 파생할 수 있는 `time` combinator를 작성했습니다.

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

하지만 이 combinator에는 두 가지 문제가 있습니다.

- 유연하지 않습니다. 즉, 실행 시간으로 무엇을 할지 선택할 수 없습니다.
- `IO` 타입에 한해서 동작합니다.

이 포스트에서는 유연하지 않은 첫 번째 문제를 다룰 것입니다.

## 실행 시간을 반환하여 유연성 추가하기

항상 값을 출력하는 대신에 계산된 값과 함께 실행 시간을 반환할 수 있습니다.

```typescript
import type { IO } from 'fp-ts/lib/IO';
import { now } from 'fp-ts/lib/Date';
import { Monad } from 'fp-ts/lib/IO';

export function time<A>(ma: IO<A>): IO<[A, number]> {
  return Monad.chain(now, (start) =>
    Monad.chain(ma, (a) => Monad.map(now, (end) => [a, end - start])),
  );
}
```

이제는 다른 combinator를 정의해 실행 시간으로 무엇을 할 것인지 선택할 수 있습니다.

또한 여전히 콘솔에 출력할 수 있습니다.

```typescript
export function withLogging<A>(ma: IO<A>): IO<A> {
  return Monad.chain(time(ma), ([a, millis]) =>
    Monad.map(log(`Result: ${a}, Elapsed: ${millis}`), () => a),
  );
}
```

작성한 `withLogging` combinator를 사용하는 방법

```typescript
import { randomInt } from 'fp-ts/lib/Random';

function fib(n: number): number {
  return n <= 1 ? 1 : fib(n - 1) + fib(n - 2);
}

const program = withLogging(map(fib)(randomInt(30, 35)));

program()
/*
Result: 14930352, Elapsed: 127
*/
```

또는 실행 시간을 무시할 수도 있습니다.

```typescript
export function ignoreSnd<A>(ma: IO<[A, unknown]>): IO<A> {
  return Monad.map(ma, ([a]) => a);
}
```

또는 예를 들어 비어 있지 않은 작업 목록 중 가장 빠른 것만 유지할 수도 있습니다.

```typescript
import type { IO } from 'fp-ts/lib/IO';
import { Apply } from 'fp-ts/lib/IO';
import { Ord } from 'fp-ts/lib/number';
import { contramap } from 'fp-ts/lib/Ord';
import { getApplySemigroup } from 'fp-ts/lib/Apply';
import { concatAll, min } from 'fp-ts/lib/Semigroup';

export function fastest<A>(head: IO<A>, tail: Array<IO<A>>): IO<A> {
  const ordTuple = contramap(([_, elapsed]: [A, number]) => elapsed)(Ord);
  const semigroupTuple = min(ordTuple);
  const semigroupIO = getApplySemigroup(Apply)(semigroupTuple);
  const fastest = concatAll(semigroupIO)(time(head))(tail.map(time));
  return ignoreSnd(fastest);
}
```

작성한 `fastest` combinator를 사용하는 방법

```typescript
Monad.chain(
  fastest(program, [program, program]),
  a => log(`Fastest result is: ${a}`)
)()
/*
Result: 5702887, Elapsed: 49
Result: 2178309, Elapsed: 20
Result: 5702887, Elapsed: 57
Fastest result is: 2178309
*/
```

다음 포스트에서는 강력한 프로그래밍 스타일인 tagless final을 도입해 두 번째 문제를 다루겠습니다.

## 부록

`fastest` combinator의 구현은 매우 조밀합니다. 상세한 내용을 살펴보겠습니다.

1) 함수 시그니처를 통해 비어 있지 않은 작업 목록을 제공할 수 있습니다.

```typescript
//   적어도 하나의 작업 --v            v--- 가능한 다른 작업
function fastest<A>(head: IO<A>, tail: Array<IO<A>>): IO<A>
```

2) `contramap`은 `Ord` combinator입니다. `T`에 대한 `Ord` 인스턴스와 `U`에서 `T`로의 함수가 주어지면 `U`에 대한 `Ord` 인스턴스를 파생할 수 있습니다.

```typescript
// `Ord<number>`에서 `Ord<[A, number]>`로 파생
const ordTuple = contramap(([_, elapsed]: [A, number]) => elapsed)(Ord);
```

3) `min`은 `Ord<T>` 인스턴스를 `Semigroup<T>` 인스턴스로 변환합니다. 이 인스턴스는 두 값을 결합할 때 더 작은 값을 반환합니다.

```typescript
// `Ord<[A, number]>`에서 `Semigroup<[A, number]>`로 변환
const semigroupTuple = min(ordTuple);
```

4) `getSemigroup`은 `Semigroup` combinator입니다. `T`에 대한 `Semigroup` 인스턴스가 주어지면 `IO<T>`에 대한 `Semigroup` 인스턴스를 파생할 수 있습니다.

```typescript
// `Semigroup<[A, number]>`에서 `Semigroup<IO<[A, number]>>`로 파생
const semigroupIO = getApplySemigroup(Apply)(semigroupTuple);
```

5) `concatAll`는 제공된 `Semigroup`을 사용하여 비어있지 않은 작업 목록을 줄입니다.

```typescript
// 비어있지 않은 배열 `IO<[A, number]>`에서`IO<[A, number]>`로 변환
const fastest = concatAll(semigroupIO)(time(head))(tail.map(time));
```

6) 마지막으로 실행 시간을 무시하고 값만 반환합니다.

```typescript
// `IO<[A, number]>`에서 `IO<A>`로 변환
return ignoreSnd(fastest);
```