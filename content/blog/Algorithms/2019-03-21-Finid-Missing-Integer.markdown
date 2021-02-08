---
title: '1부터 N까지의 배열에서 사라진 정수 찾기'
date: 2019-03-21 00:00:01
category: 'Algorithms'
draft: false
---

## 문제

1~N 까지 있는 정수 배열에 원소 하나가 없어졌습니다.<br/>
없어진 원소의 값을 구하시오.<br/>

Given an integer array of 1~N except one number,<br/>
find the missing integer.

### 입력

이 문제는 입력 값이 없습니다.

### 출력

```
This is Missing Integer : <사라진 정수값>
```

---

## 풀이

간단하게 문제를 해결할 수 있었다.<br/>
1 ~ N까지가 저장되어 있는 배열에서<br/>
정수가 사라지기 전의 **배열의 합**을 구해놓은 다음<br/>
어떠한 정수 하나가 사라지게 되면<br/>
값이 없어진 **배열의 합**을 구하여 이전의 배열에서 빼면 된다.

## 코드 구현부

임의의 정수 하나를 삭제하기 위하여 `random`을 추가

```python
import random
```

일단 1 ~ 99까지의 값을 갖는 정수 리스트를 선언했다.

```python
arr = [x for x in range(100)]
```

간단한 반복문을 사용해 **값이 사라지기 전**의 배열의 값을 확인했다.

```python
print("- Before Integer Array -")

for i, val in enumerate(arr):
    print(" %3d |" % val, end="")

    if (i + 1) % 10 == 0:
        print()
```

아래의 사진과 같은 결과를 얻을 수 있다.<br/>
<img src="./images/2019-03-21/1.png" width="600" height="auto">

그리고 `sum`함수를 이용해 **리스트의 모든 값의 합**을 구했다.

```python
before = sum(arr)
```

그 후 `random`의 `randrange`함수를 이용해 0 ~ 99 사이의 값을 지웠다.<br/>
원본 리스트를 그냥 이용해도 되지만, 당장은 메모리가 중요하지 않기 때문에<br/>
리스트 이름을 바꾸어 값이 사라진 배열을 복사해줬다.

```python
arr.remove(random.randrange(100))

misiing_one_val_in_arr = arr
```

그 후 `before`이라는 변수에 저장해 둔 값이 사라지기 **전의 리스트의 합**과<br/>
`sum`함수를 사용해 값이 사라진 **후의 리스트의 값의 합을 빼** 새로운 변수에 저장했다.

```python
missing_val = before - sum(misiing_one_val_in_arr)
```

과연 어떠한 값이 사라졌는지 출력할 순서다.<br/>
`print`함수를 사용해 `missing_val`에 저장해둔 값을 출력했다.

```python
print("\nThis is Missing Integer :", missing_val, "\n")
```

아래의 사진과 같은 결과를 확인할 수 있다.<br/>
<img src="./images/2019-03-21/2.png" width="600" height="auto">

어떠한 값이 사라졌는지 확인은 했지만 리스트의 값들을 모두 출력해<br/>
다시한번 확인해보도록 하자.

```python
print("- After Integer Array -")

for i, val in enumerate(misiing_one_val_in_arr):
    print(" %3d |" % val, end="")

    if (i + 1) % 10 == 0:
        print()

print("     |")
```

아래의 사진과 같은 결과를 확인할 수 있다.
<img src="./images/2019-03-21/3.png" width="600" height="auto">

정수 21과 23사이의 **22가 사라진 것**을 찾았다.

## 전체 코드

전체 코드는 아래와 같다.

```python
import random

arr = [x for x in range(100)]

print("- Before Integer Array -")

for i, val in enumerate(arr):
    print(" %3d |" % val, end="")

    if (i + 1) % 10 == 0:
        print()

before = sum(arr)

arr.remove(random.randrange(100))

misiing_one_val_in_arr = arr
missing_val = before - sum(misiing_one_val_in_arr)

print("\nThis is Missing Integer :", missing_val, "\n")

print("- After Integer Array -")

for i, val in enumerate(misiing_one_val_in_arr):
    print(" %3d |" % val, end="")

    if (i + 1) % 10 == 0:
        print()

print("     |")

```

## 분석

`sum`함수의 **Time Complexity**는 **O(n)**이므로<br/>
내가 해결한 방법은 **O(n)**이 되겠다.<br/>
문제 출제자의 의도에 알맞게 접근했는지는 확신하지 못하겠지만<br/>
**최선의 시간복잡도**로 문제를 해결했다 생각한다.
