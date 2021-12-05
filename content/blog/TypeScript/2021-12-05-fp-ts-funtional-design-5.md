---
title: '함수형 디자인: Typescript에서의 TDD (declare의 남용)'
date: 2021-12-05 00:01:04
category: 'TypeScript'
draft: false
---

본 포스트는 fp-ts 공식 문서의 [Learning Resources](https://gcanti.github.io/fp-ts/learning-resources/)에 있는 Functional design series에서 소개하는 문서들을 번역하며 학습한 문서입니다. 원본 문서는 [링크](https://dev.to/gcanti/functional-design-tdd-in-typescript-aka-abusing-declare-59il)에서 확인할 수 있으며 작성한 코드들은 [여기](https://github.com/alstn2468/getting-started-fp-ts/tree/main/src/functional_design_series/5_tdd_in_typescript)에서 확인할 수 있습니다.

## 함수형 디자인: Typescript에서의 TDD (`declare`의 남용)

**타입** 주도 개발(TDD)은 문제를 더 작은 문제들로 나누기 위해 사용되는 기술로, 타입 검사기가 구체적인 구현을 제안하거나 최소한 목표를 달성하는 데 도움을 줍니다. 아래에 실용적인 예시가 있습니다.

예를 들어,  `Promise.all` 함수를 다시 구현하고 싶다면 이것을 `sequence`로 부르고 이것의 시그니처부터 시작하겠습니다.

```typescript
// TODO
declare function sequence<T>(
  promises: Array<Promise<T>>,
): Promise<Array<T>>;
```

선언된(`declare`d) 함수는 아직 구현되지 않았지만 즉시 사용할 수 있으며 나머지 코드의 타입 검사에 사용될 수 있습니다. 하지만 빌드 시스템을 실행하는 경우 런타임에 이러한 함수가 없기 때문에 오류가 발생합니다. 현재로서는 "타입의 세계"에만 존재합니다.

그러나 이 기술의 목표는 **코드를 실행할 필요 없이 가능한 한 오랫동안 편집기에서 작업하는 것**입니다. 우리는 타입 검사기에 전적으로 의존해 오류가 발생하지 않도록 할 것입니다.

문제로 돌아가서 `A` 타입의 값 배열을 `B` 타입의 값으로 변환(또는 "축소")해야 합니다.

우리가 찾고 있는 변환은 실제로 아래와 같은 시그니처가 있는 `reduce`입니다.

```typescript
declare function reduce<A, B>(
  this: Array<A>,
  f: (acc: B, x: A,
) => B, init: B): B;
```

`f`와 `init`을 모두 구현하는 방법을 아직 모르지만, 이전처럼 구체적인 구현을 건너뛸 수 있습니다. 지금은 단순히 누락된 비트를 선언(`declare`)하고 타입 매개변수 `A`와 `B`를 우리가 작업 중인 타입으로 바꾸는 것으로 충분합니다.

```typescript
A = Promise<T>

B = Promise<Array<T>>
```

우리는 아래와 같은 결과를 얻을 수 있습니다.

```typescript
// TODO
declare function pushPromise<T>(
  acc: Promise<Array<T>>,
  x: Promise<T>,
): Promise<Array<T>>;

// TODO
function sequence<T>(promises: Array<Promise<T>>): Promise<Array<T>> {
  declare const init: Promise<Array<T>>; // TypeScript 오류
  return promises.reduce(pushPromise, init);
}
```

`declare`는 함수 본문 안에서 사용할 수 없음으로 임시적인 해결 방법이 필요합니다.

```typescript
declare const TODO: any;

// TODO
declare function pushPromise<T>(acc: Promise<Array<T>>, x: Promise<T>): Promise<Array<T>>;

// 부분적으로 구현되었다.
function sequence<T>(promises: Array<Promise<T>>): Promise<Array<T>> {
  const init: Promise<Array<T>> = TODO;
  return promises.reduce(pushPromise, init);
}
```

이제 `init`은 간단합니다. 빈 배열을 `Promise` "컨테이너"에 넣을 수 있습니다.

```typescript
const init: Promise<Array<T>> = Promise.resolve([]);
```

`pushPromise`를 구현하는 것은 더 복잡합니다. 우리는 `Array<T>` 타입의 값을 `T` 타입의 값과 연결해 `Array<T>` 타입의 다른 값을 얻는 방법을 알고 있습니다. 이것의 이름은 `push`로 부르겠습니다.

```typescript
declare function push<T>(x: Array<T>, y: T): Array<T>;
```

두 `Promise`가 모두 주어진 경우 `pushPromise`에서 `acc`와 `x`를 어떻게 연결할 수 있을까요?

우리가 필요한 것은 프로시저이며 `liftA2`로 부르겠습니다. 이 프로시저는 `Promise` "안의" 값에 대해 작업할 수 있는 새 함수를 생성하는 함수 `push`를 "들어올릴" 수 있습니다. 다시 우리는 구현 없이 예상 결과를 선언(`declare`)합니다.

```typescript
// TODO
declare function liftA2<A, B, C>(
  f: (a: A, b: B) => C,
): (fa: Promise<A>, fb: Promise<B>) => Promise<C>;

// TODO
declare function push<T>(x: Array<T>, y: T): Array<T>;

// 구현되었다.
function pushPromise<T>(acc: Promise<Array<T>>, x: Promise<T>): Promise<Array<T>> {
  return liftA2<Array<T>, T, Array<T>>(push)(acc, x);
}

// 구현되었다.
function sequence<T>(promises: Array<Promise<T>>): Promise<Array<T>> {
  const init: Promise<Array<T>> = Promise.resolve([]);
  return promises.reduce(pushPromise, init);
}
```

이제 `liftA2`와 `push`만 구현하면 됩니다.

```typescript
function liftA2<A, B, C>(
  f: (a: A, b: B) => C
): (fa: Promise<A>, fb: Promise<B>) => Promise<C> {
  return (a, b) => a.then(aa => b.then(bb => f(aa, bb)));
}

function push<T>(x: Array<T>, y: T): Array<T> {
  return x.concat([y]);
}

function pushPromise<T>(acc: Promise<Array<T>>, x: Promise<T>): Promise<Array<T>> {
  return liftA2<Array<T>, T, Array<T>>(push)(acc, x);
}

function sequence<T>(promises: Array<Promise<T>>): Promise<Array<T>> {
  const init: Promise<Array<T>> = Promise.resolve([]);
  return promises.reduce(pushPromise, init);
}
```

우리는 아래와 같이 구현한 함수를 사용해볼 수 있습니다.

```typescript
sequence([]).then((x) => console.log(x)); // []
sequence([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)],
).then((x) =>
  console.log(x)
); // [1, 2, 3]
```

위에서 확인할 수 있듯이 강력한 타입 시스템은 오류를 방지할 수 있을 뿐만 아니라 설계 단계에서 사용자를 안내하고 피드백을 제공할 수 있습니다.