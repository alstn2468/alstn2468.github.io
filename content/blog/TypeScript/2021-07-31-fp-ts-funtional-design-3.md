---
title: '함수형 디자인: tagless final'
date: 2021-07-31 00:01:04
category: 'TypeScript'
draft: false
---

본 포스트는 fp-ts 공식 문서의 [Learning Resources](https://gcanti.github.io/fp-ts/learning-resources/)에 있는 Functional design series에서 소개하는 문서들을 번역하며 학습한 문서입니다. 원본 문서는 [링크](https://dev.to/gcanti/functional-design-tagless-final-332k)에서 확인할 수 있으며 작성한 코드들은 [여기](https://github.com/alstn2468/getting-started-fp-ts/tree/main/src/functional_design_series/3_tagless_final)에서 확인할 수 있습니다.

## 함수형 디자인: tagless final

[지난 글](https://alstn2468.github.io/TypeScript/2021-07-20-fp-ts-funtional-design-2/)에서 유사한 Unix 명령을 모방하는 `time` combinator를 작성했습니다. `IO<A>` 작업이 주어지면 계산된 값과 함께 실행 시간을 반환하는 작업 `IO<[A, number]>`를 파생할 수 있습니다.

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

하지만 여전히 문제가 있습니다. `time` combinator는 `IO`에서만 동작합니다.

`Task`에 대한 `time` combinator를 원하면 어떻게 할 수 있을까요? 아니면 `TaskEther`? 아니면 `ReaderTaskEither`라도?

## 조금 수정해보기

`io`의 이름을 **M**onad와 같은 `M`으로 바꾸겠습니다.

> 원문에서는 `io`를 사용해서 내부 매서드들을 사용하고 있었지만, 현재 `fp-ts`의 버전에서는 `Monad`로 이미 변경되어 있습니다.

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

`fp-ts/lib/IO`에서 내보낸 값 `Monad`에는 `IO`의 `Monad` 인스턴스가 포함됩니다.

`fp-ts`에서 타입 클래스는 `interfaces`로 인코딩되고 인스턴스는 타입 클래스에 의해 정의된 연산을 포함하는 정적 딕셔너리로 인코딩됩니다.

따라서 `Monad` 인스턴스의 경우 `map`, `of`, `ap` 및 `chain`과 같은 작업이 필요합니다.

```typescript
// fp-ts/lib/IO.ts

export const Monad = {
  map: ...,
  of: ...,
  ap: ...,
  chain: ...
}
```

같은 스타일을 사용하여 `Task`에 대한 `time` combinator를 작성해 봅시다.

## 들어 올리기

타입 검사기를 만족스럽게 만들기 위해 `IO<number>` 타입의 `now` 작업을 `Task` 모나드로 들어 올려야 합니다.

다행히 `fp-ts`는 이를 위해 내장된 `fromIO` 함수를 제공합니다. `fromIO`는 모든 `A`에 대해 `IO<A>`를 `Task<A>`로 변환합니다.

```typescript
import type { Task } from 'fp-ts/lib/Task';
import { task as M, fromIO } from 'fp-ts/lib/Task';
import * as D from 'fp-ts/lib/Date';

export function time<A>(ma: Task<A>): Task<[A, number]> {
  const now = fromIO(D.now);
  return M.chain(now, (start) =>
    M.chain(ma, (a) => M.map(now, (end) => [a, end - start])),
  );
}
```

위 코드는 정상적으로 동작하지만, 너무 많은 중복이 있습니다.

함수의 첫 번째 줄만 무시하면 두 개의 코드는 완전히 비슷합니다.

```typescript
export function time<A>(ma: IO<A>): IO<[A, number]> {
  return M.chain(now, start => M.chain(ma, a => M.map(now, end => [a, end - start])))
}

export function time<A>(ma: Task<A>): Task<[A, number]> {
  return M.chain(now, start => M.chain(ma, a => M.map(now, end => [a, end - start])))
}
```

이것이 모나딕 인터페이스의 장점입니다. 거의 같은 코드로 동기 및 비동기 계산을 처리할 수 있습니다.

## Tagless final

그래서 아이디어는 `time` combinator가 `now`를 들어 올릴 수 있는 모나드 `M`을 지원하는 것입니다.

또는 더 일반적으로 모든 `A`에 대해 `IO<A>` 작업을 `M<A>` 작업으로 올릴 수 있는 모나드 `M`입니다.

이러한 기능을 `MonadIO`라는 타입 클래스(즉, TypeScript의 `interface`)로 인코딩해 보겠습니다.

```typescript
import type { IO } from 'fp-ts/lib/IO';
import type { Monad1 } from 'fp-ts/lib/Monad';
import type { Kind, URIS } from 'fp-ts/lib/HKT';

export interface MonadIO<M extends URIS> extends Monad1<M> {
  readonly fromIO: <A>(fa: IO<A>) => Kind<M, A>;
}
```

`Kind<M, A>` 타입은 `fp-ts`가 `* -> *` 타입의 일반 타입 생성자 `M<A>`를 인코딩하는 방법입니다.

> TypeScript는 기본적으로 상위 유형(HKT, Higher Kinded Types)을 지원하지 않습니다.

추가로 첫 번째 매개변수로 전달된 `MonadIO` 인터페이스에 대해 `time` combinaotr를 다시 작성해 보겠습니다.

```typescript
export function time<M extends URIS>(
  M: MonadIO<M>,
): <A>(ma: Kind<M, A>) => Kind<M, [A, number]> {
  const now = M.fromIO(D.now); // 들어 올리기
  return (ma) =>
    M.chain(now, (start) =>
      M.chain(ma, (a) => M.map(now, (end) => [a, end - start])),
    );
}
```

> 이러한 스타일의 프로그래밍을 "tagless final" 또는 "MTL 스타일"이라고 합니다.

이제부터는 `MonadIO` 인스턴스를 허용하는 모든 모나드에서 `time`을 사용할 수 있습니다!

## `MonadIO` 인스턴스 작성하기

`IO`에 대한 `MonadIO` 인스턴스를 작성하려면 `identity` 함수인 `fromIO` 연산으로 `Monad` 인스턴스를 확장해야 합니다.

```typescript
import type { URI } from 'fp-ts/lib/IO';
import { Monad } from 'fp-ts/lib/IO';
import { identity } from 'fp-ts/lib/function';

export const monadIOIO: MonadIO<URI> = {
  ...Monad,
  fromIO: identity,
};
```

`Task`를 위한 `MonadIO` 인스턴스는 아래와 같이 작성할 수 있습니다.

```typescript
import type { URI } from 'fp-ts/lib/Task';
import { Monad, fromIO } from 'fp-ts/lib/Task';

export const monadIOTask: MonadIO<URI> = {
  ...Monad,
  fromIO: fromIO,
};
```

이제 해당 `MonadIO` 인스턴스를 전달하여 구체적인 타입 생성자에 대한 `time`의 특별화된 버전을 얻을 수 있습니다.

```typescript
// timeIO: <A>(ma: IO<A>) => IO<[A, number]>
const timeIO = time(monadIOIO)

// timeTask: <A>(ma: Task<A>) => Task<[A, number]>
const timeTask = time(monadIOTask)
```

이 접근 방식은 큰 이점이 있습니다. tagless final을 기반으로 함수를 작성할 때 함수의 대상 모나드는 사용자가 나중에 변경할 수 있습니다.