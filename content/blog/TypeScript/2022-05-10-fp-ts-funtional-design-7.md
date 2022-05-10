---
title: '함수형 디자인: 대수적 자료형'
date: 2022-05-10 00:01:04
category: 'TypeScript'
draft: false
---

본 포스트는 fp-ts 공식 문서의 [Learning Resources](https://gcanti.github.io/fp-ts/learning-resources/)에 있는 Functional design series에서 소개하는 문서들을 번역하며 학습한 문서입니다. 원본 문서는 [링크](https://dev.to/gcanti/functional-design-algebraic-data-types-36kf)에서 확인할 수 있으며 작성한 코드들은 [여기](https://github.com/alstn2468/getting-started-fp-ts/tree/main/src/functional_design_series/7_algebraic_data_types)에서 확인할 수 있습니다.

## 함수형 디자인: 대수적 자료형

새로운 애플리케이션을 구축하는 첫 번째 단계는 해당 도메인 모델을 정의하는 것입니다. TypeScript는 이 작업에 도움이 되는 많은 도구를 제공합니다. **Algebraic Data Types**(대수적 자로형, 줄여서 ADT)은 이런 도구 중 하나입니다.

## ADT란?

컴퓨터 프로그래밍, 특히 함수형 프로그래밍 및 타입 이론에서 대수적 자료형은 일종의 합성 타입, 즉 **다른 타입을 결합해 생성된 타입**입니다.

대수적 자료형의 두가지 일반적인 종류는 아래와 같습니다.

- **Product 타입**
- **Sum 타입**

## Product 타입

Product 타입은 집합 `I`에 의해 인덱싱된 타입 $$T_i$$의 모음입니다.

일반적으로 사용되는 첫 번째 타입은 `n`-튜플이며, `I`는 자연수인 비어 있지 않은 간격입니다.

```typescript
type Tuple1 = [string]; // I = [0]
type Tuple2 = [string, number]; // I = [0, 1]
type Tuple3 = [string, number, boolean]; // I = [0, 1, 2]

// 인덱스로 접근
type Fst = Tuple2[0]; // string
type Snd = Tuple2[1]; // number
```

두 번째 타입은 구조체이며, 여기서 `I`는 레이블 집합입니다.

```typescript
// I = {"name", "age"}
interface Person {
  name: string;
  age: number;
};

// 레이블로 접근
type Name = Person['name']; // string
type Age = Person['age']; // number
```

### 왜 "Product" 타입인가?

`A` 타입의 원소의 수(**cardinality**라고도 함)에 대해 `C(A)`는 아래의 등식이 성립합니다.

```ts
C([A, B]) = C(A) * C(B)
```

> Product의 cardinality는 각 타입의 cardinality의 곱과 같습니다.

**예시**

```typescript
type Hour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Period = 'AM' | 'PM';
type Clock = [Hour, Period];
```

`Clock` 타입은 `12 * 2 = 24`의 원소의 수를 갖습니다.

### Product 타입을 사용해야 할 때

Product 타입은 구성 요소가 **독립적**일 때 사용합니다.

```typescript
type Clock = [Hour, Period];
```

여기서 `Hour`와 `Period`는 독립적입니다. 즉, `Hour`의 값은 `Period`의 값에 영향을 미치지 않으며 반대의 경우도 같습니다. 모든 쌍은 적절하며 의미가 있습니다.

## Sum 타입

Sum 타입은 다르지만 고정된 타입을 취할 수 있는 값을 보유하는 데 사용되는 데이터 구조입니다. 한 번에 하나의 타입만 사용할 수 있으며 태그 필드는 사용 중인 타입을 명시적으로 나타냅니다.

TypeScript 문서에서는 *태그가 지정된 유니온 타입* 이라고 합니다.

**예시** (redux 액션)

```typescript
type Action =
  | {
      type: 'ADD_TODO';
      text: string;
    }
  | {
      type: 'UPDATE_TODO';
      id: number;
      text: string;
      completed: boolean;
    }
  | {
      type: 'DELETE_TODO';
      id: number;
    };
```

`type` 필드는 *태그* 로 사용되며 `Action` 타입의 멤버들이 분리되도록 합니다.

### 생성자

`n`개의 멤버가 있는 Sum 타입은 각 멤버에 대해 하나씩 `n`개의 **생성자**가 필요합니다.

```typescript
const add = (text: string): Action => ({
  type: 'ADD_TODO',
  text,
});

const update = (
  id: number, text: string, completed: boolean,
): Action => ({
    type: 'UPDATE_TODO',
    id,
    text,
    completed,
  });

const del = (id: number): Action => ({
  type: 'DELETE_TODO',
  id,
});
```

Sum 타입은 **다형성**을 갖거나 또는 **재귀적**일 수 있습니다.

**예시** (연결 리스트)

```typescript
//        ↓ 타입 매개변수
type List<A> =
  | { type: 'Nil' }
  | { type: 'Cons'; head: A; tail: List<A> };
//                                  ↑ 재귀
```

### 패턴 매칭

TypeScript에는 [패턴 매칭](https://github.com/tc39/proposal-pattern-matching)이 없지만 `fold` 함수를 정의해 "가난한" 패턴 매칭을 정의할 수 있습니다.

```typescript
const fold = <A, R>(
  fa: List<A>,
  onNil: () => R,
  onCons: (head: A, tail: List<A>) => R,
): R => (fa.type === 'Nil' ? onNil() : onCons(fa.head, fa.tail));
```

**예시** (재귀적으로 `List`의 길이 계산하기)

```typescript
const length = <A>(fa: List<A>): number =>
  fold(
    fa,
    () => 0,
    (_, tail) => 1 + length(tail),
  );
```

### 왜 "Sum" 타입인가?

Sum 타입은 아래의 등식을 만족합니다.

```typescript
C(A | B) = C(A) + C(B)
```

> 두 Sum 타입의 cardinality의 합은 각각의 cardinality의 합과 같습니다.

**예시** (`Option` 타입)

```typescript
type Option<A> =
  | { type: 'None' }
  | {
      type: 'Some';
      value: A;
    };
```

공식 `C(Option<A>) = 1 + C(A)`에서 예를 들어 `Option<boolean>`의 cardinality를 `1 + 2 = 3`과 같이 유도할 수 있습니다.

### Sum 타입을 사용해야 할 때

Sum 타입은 Product 타입으로 구현된 경우 구성 요소가 종속되는 경우 사용합니다.

**예시** (컴포넌트 props)

```typescript
interface Props {
  editable: boolean;
  onChange?: (text: string) => void;
};

class Textbox extends React.Component<Props> {
  render() {
    if (this.props.editable) {
      // 오류: 'undefined' 객체를 호출할 수 없습니다. :(
      this.props.onChange(...);
    }
  };
};
```

여기서 문제는 `Props`가 Product 타입으로 모델링되지만 `onChange`는 `editable`에 의존한다는 것입니다.

여기서 Sum 타입이 더 좋은 선택이 될 수 있습니다.

```typescript
type Props =
  | {
      type: 'READONLY';
    }
  | {
      type: 'EDITABLE';
      onChange: (text: string) => void;
    };

class Textbox extends React.Component<Props> {
  render() {
    switch (this.props.type) {
      case 'EDITABLE' :
        this.props.onChange(...); // :)
      ...
    };
  };
};
```

**예시** (NodeJs 콜백)

```typescript
declare function readFile(
  path: string,
  //         ↓ ---------- ↓ CallbackArgs
  callback: (err?: Error, data?: string) => void,
): void;
```

`readFile` 함수의 결과는 제품 유형으로 모델링됩니다.

```typescript
type CallbackArgs = [Error | undefined, string | undefined]
```

그러나 구성 요소는 **종속적** 입니다. 우리는 오류 **또는** 문자열을 얻을 수 있습니다.

| err | data | 가능 여부 |
| :- | :- | :- |
| Error | undefined | ✅ |
| undefined | string | ✅ |
| Error | string | ❌ |
| undefined | undefined | ❌ |

Sum 타입이 더 좋은 선택이 될 것입니다. 어떤 게 좋아 보이시나요?

## 함수형으로 예외 처리하기

이제 함수형 프로그래밍 스타일에서 오류를 처리하는 방법을 살펴보겠습니다.

### `Option` 타입

`Option` 타입은 실패하거나 타입 `A`의 값을 반환할 수 있는 계산의 이펙트를 표현합니다.

```typescript
type Option<A> =
  | { type: 'None' } // 실패롤 표현
  | { type: 'Some'; value: A }; // 성공을 표현
```

생성자와 패턴 매칭 함수는 아래와 같습니다.

```typescript
// none 생성자는 상수로 구현할 수 있습니다.
const none: Option<never> = { type: 'None' };

const some = <A>(value: A): Option<A> => ({ type: 'Some', value });

const fold = <A, R>(
  fa: Option<A>,
  onNone: () => R,
  onSome: (a: A) => R,
): R => (fa.type === 'None' ? onNone() : onSome(fa.value));
```

`Option` 타입은 예외가 발생하지 않도록 하거나 선택적 값을 나타내는 데 사용할 수 있습니다.

```typescript
//               거짓말 입니다. ↓
const head = <A>(as: Array<A>): A => {
  if (as.length === 0) {
    throw new Error('Empty array')
  }
  return as[0]
}

let s: string
try {
  s = String(head([]))
} catch (e) {
  s = e.message
}
```

타입 시스템이 발생할 수 있는 오류를 위와 같이 인식하지 못할 수 있습니다.

```typescript
const head = <A>(as: Array<A>): Option<A> => {
  return as.length === 0 ? none : some(as[0]);
};

const s = fold(head([]), () => 'Empty array', a => String(a));
```

위의 예시에서 실패의 가능성은 타입 시스템으로 *들어 올려* 집니다.

### `Either` 타입

`Either`는 일반적으로 가능한 결측값을 처리하기 위한 `Option`의 대안입니다. 여기서 `None`은 유용한 정보를 포함할 수 있는 `Left`로 대체됩니다. `Right`는 `Some`를 대체 합니다. 관습에 따르면 `Left`는 실패에 사용되고 `Right`는 성공에 사용됩니다.

```typescript
type Either<L, A> =
  | { type: 'Left'; left: L } // 실패를 표현
  | { type: 'Right'; right: A }; // 성공을 표현
```

생성자와 패턴 매칭 함수는 아래와 같습니다.

```typescript
const left = <L, A>(left: L): Either<L, A> => ({ type: 'Left', left });

const right = <L, A>(right: A): Either<L, A> => ({
  type: 'Right',
  right,
});

const fold = <L, A, R>(
  fa: Either<L, A>,
  onLeft: (left: L) => R,
  onRight: (right: A) => R,
): R => (fa.type === 'Left' ? onLeft(fa.left) : onRight(fa.right));
```

콜백 예시로 돌아가보겠습니다.

```typescript
declare function readFile(
  path: string,
  callback: (err?: Error, data?: string) => void,
): void;

readFile('./myfile', (err, data) => {
  let message: string;
  if (err !== undefined) {
    message = `Error: ${err.message}`;
  } else if (data !== undefined) {
    message = `Data: ${data.trim()}`;
  } else {
    // 절대 발생하지 않는다.
    message = 'The impossible happened';
  }
  console.log(message);
});
```

`readFile` 함수의 시그니처를 아래와 같이 변경할 수 있습니다.

```typescript
declare function readFile(
  path: string,
  callback: (result: Either<Error, string>) => void,
): void;
```

그리고 아래와 같이 API를 사용할 수 있습니다.

```typescript
readFile('./myfile', (e) => {
  const message = fold(
    e,
    (err) => `Error: ${err.message}`,
    (data) => `Data: ${data.trim()}`,
  );
  console.log(message);
});
```

## 결론

이 포스트에서 우리는 Product 타입과 Sum 타입을 살펴보고 그것들이 나타내는 상태의 수에 대한 추론이 도메인 모델의 디자인에 얼마나 큰 영향을 미칠 수 있는지 보았습니다.

많은 실제 API의 일반적인 함정은 모든 가능한 상태 외에도 많은 불가능한 상태를 모델링하는 Product 타입을 오용하는 것입니다.

Sum 타입은 매우 유용하고 기본적인 언어 기능이며, 불가능한 상태를 표현할 수 없도록 하여 우수한 도메인 모델을 설계하는 열쇠입니다.
