---
title: "React Native로 카메라 사용하기 (2)"
date: 2019-08-31 00:00:04
categories: [React Native]
tags: [React Native, JavaScript, ES6, React, Front-End, Application]
comments: true
---

<br>

## 지난 포스트 Review

[[이전 포스트로 이동]](https://alstn2468.github.io/2019/ReactNativeCameraPermissions/)

1. 프로젝트 **생성**하기
2. `App.js` 수정하기
3. 필요한 **모듈 추가**하기
4. 카메라 접근 **권한 얻기**

마지막까지 해서 우리는 카메라 권환이 **승인**될 경우<br>
`granted`라는 `status`를 얻을 수 있었습니다.<br>
이번 포스트는 `status`를 이용해 `state`를 변경하고<br>
`state`에 따라 다른 화면이 보여지도록 하겠습니다.<br>

## 5. cdm 내부 수정하기

`cdm`은 `componentDidMount`를 줄여서 작성했습니다.<br>
우리가 얻은 `status`즉 권한 여부를 가지고 `state`를 변경해봅시다.<br>

```javascript
componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === "granted") {
        this.setState({ hasPermission: true });
    } else {
        this.setState({ hasPermission: false });
    }
};
```

권한 설정으로 얻어온 값 즉 `status`가 `granted`인 경우<br>
카메라 **권한이 혀용**된 상태이므로 현재 화면의 `state`인 `hasPermission`을<br>
`true`로 변경하고 그렇지 않은 경우 **거절**된 상태이므로 `false`로 변경합니다.

### 직동 테스트

`render`함수 내부에서 `console.log(this.state);`를 해봅시다.<br>

<img src="/assets/2019-08-31/1.png" width="500" height="auto" alt="아직 안만듬"><br/>

첫번째 `object`는 `componentDidMount`가 **실행**되기 **전** 초기의 상태이고<br>
두번째 `object`는 `componentDidMount`가 **실행**된 **후**의 상태이다.<br>
이로써 우리는 **권한 여부**에 따라 화면을 조절할 수 있는 `state`를 갖게 되었다.

## 6. 권한에 따라 다른 화면 보여주기

`styled-component`를 사용하기 위해 기본 생성되어 있는 `stylesheet`는 지워준다.<br>
`render`함수 내부에서 `state`의 `hasPermission`을 가져와 사용한다.<br>

```javascript
render () {
    const { hasPermission } = this.state;

    if (hasPermission === true) {
        // 권한 설정이 되었을 경우 보여줄 곳
    } else if (hasPermission === false) {
        // 권한 설정이 되지 않았을 경우 보여줄 곳
    } else {
        // 권한 설정 전 로딩 화면을 보여줄 곳
    }
}
```

위와 같은 방식으로 **조건문**을 이용해 다른 화면을 보여준다.<br>
아무 스타일 없이 아래와 같이 일단 작성해보자.<br>

```javascript
render() {
    const { hasPermission } = this.state;

    if (hasPermission === true) {
        return <Text>Has Permission</Text>;
    } else if (hasPermission === false) {
        return <Text>Don't have Permission for this App.</Text>;
    } else {
        return <ActivityIndicator />;
    }
}
```

### 작동 테스트

아무런 style이 적용되지 않아서 잘 보이진 않지만 **잘 작동**하는 것이 확인된다.<br>
`hasPermission`이 `null`일 때를 확인하고 싶으면 `cdm`내용을 지우면 된다.<br>

<img src="/assets/2019-08-31/2.png" width="280" height="auto" alt="아직 안만듬">
<img src="/assets/2019-08-31/3.png" width="280" height="auto" alt="아직 안만듬"><br/>

## 7. 스타일 조금 넣기

`styled-components`를 사용해 화면 가운데에 보이도록 만들어 보겠습니다.<br>

```javascript
const CenterView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: cornflowerblue;
`;

const Text = styled.Text`
    color: white;
    font-size: 22px;
`;
```

`render`내부의 `Text`, `ActivityIndicator`를 `CenterView`로 감싸줍니다.<br>

`ActivityIndicator`에 `props`를 추가합니다.<br>
`size`는 **enum**값을 받으며 `0`은 **small** `1`은 **large**다.<br>

```javascript
<ActivityIndicator color="white" size={1} />
```

### 작동 테스트

화면 가운데에 잘 보이도록 작동하는 것을 확인할 수 있다.<br>

<img src="/assets/2019-08-31/4.png" width="280" height="auto" alt="아직 안만듬">
<img src="/assets/2019-08-31/5.png" width="280" height="auto" alt="아직 안만듬"><br/>

## 8. 카메라 띄위기

카메라를 띄우기 위해서 `Camera`를 사용하는데 여기에는 **크기**를 **지정**해야한다.<br>
화면의 크기를 알기 위해서 `Dimensions`모듈을 추가한다.<br>
`Dimensions`의 `get`함수를 사용해 화면의 크기를 저장한다.<br>

```javascript
...
import { ActivityIndicator, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
...
```

`hasPermission`이 `true`인 부분을 아래와 같이 변경한다.<br>

{% raw %}

```javascript
if (hasPermission === true) {
    return (
        <CenterView>
            <Camera
                style={{
                    width: width - 40,
                    height: height / 1.5,
                    borderRadius: 10,
                    overflow: "hidden"
                }}
            />
        </CenterView>
    );
}
```

{% endraw %}

### 작동 테스트

#### 주의 사항

-   시뮬레이터에서는 카메라 기능을 사용할 수 없습니다.

<img src="/assets/2019-08-31/6.png" width="300" height="auto" alt="아직 안만듬"><br>

위와 같이 잘 작동하는 것을 확인할 수 있다.<br>

**~~그냥 제 방입니다..~~**<br>

다음 포스트에서는 **전방/후방** 카메라를 **변경**하는 방법에 대해서 설명해보겠습니다.
