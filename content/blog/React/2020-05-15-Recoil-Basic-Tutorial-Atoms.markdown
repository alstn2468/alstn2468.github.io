---
title: 'Atoms'
date: 2020-05-15 00:00:12
category: 'React'
draft: false
---

[Recoil 공식 문서](https://recoiljs.org/) 중 [Basic Tutorial Atoms](https://recoiljs.org/docs/basic-tutorial/atoms)를 번역한 포스트입니다.<br/>

## Atoms

Atoms는 애플리케이션 상태의 source of truth를 갖는다.<br/>
todo 리스트에서 source of truth는 todo 아이템을 나타내는 객체로 이루어진 배열이 될 것이다.<br/>

우리는 atom 리스트를 `todoListState`라고 하고 이것을 `atom()` 함수를 이용해 생성할 것이다.<br/>

```javascript
const todoListState = atom({
  key: 'todoListState',
  default: [],
});
```

우리는 atom에 고유한 `key`를 주고 비어있는 배열 값을 `default`로 설정할 것이다.<br/>
이 atom의 항목을 읽기 위해, 우리는 `useRecoilValue()` 훅을 우리의 `TodoList` 컴포넌트에서 사용할 수 있다.<br/>

```jsx
function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} />
      ))}
    </>
  );
}
```

주석 처리된 컴포넌트들은 다음 섹션에서 구현될 것이다.<br/>

새로운 todo 아이템을 생성하기 위해 우리는 `todoListState` 내용을 업데이트하는 setter 함수에 접근해야 한다.<br/>
우리는 `TodoItemCreator` 컴포넌트의 setter 함수를 얻기 위해 `useSetRecoilState()` 훅을 사용할 수 있다.<br/>

```jsx
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
  return id++;
}
```

기존 todo 리스트를 기반으로 새 todo 리스트를 만들 수 있도록 setter 함수의 **updater** 형식을 사용한다는 점에 유의해야 한다.<br/>

`TodoItem` 컴포넌트는 todo 리스트의 값을 표시하는 동시에 텍스트를 변경하고 항목을 삭제할 수 있다.<br/>
우리는 `todoListState`를 읽고 항목 텍스트를 업데이트하고, 완료된 것으로 표시하고, 삭제하는 데 사용하는 setter 함수를 얻기 위해 `useRecoilState()`를 사용한다.<br/>

```jsx
function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
```

그리고 우리는 완전한 기능을 갖춘 todo 리스트를 가지고 있다!<br/>
다음 섹션에서는 우리는 selector들을 이용하여 우리의 리스트를 다음 단계로 끌어올리는 방법을 볼 것이다.<br/>

## 실행 결과

실제 작성한 코드는 [여기](https://github.com/alstn2468/Recoil_Tutorial/tree/master/BasicTutorial)에서 확인할 수 있습니다.<br/>

<img src="/assets/2020-05-15-Recoil-Basic-Tutorial-Atoms/demo.gif" width="400" height="auto"><br>