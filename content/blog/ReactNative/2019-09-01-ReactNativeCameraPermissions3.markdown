---
title: 'React Native로 카메라 사용하기 (3)'
date: 2019-09-01 00:00:04
category: 'React Native'
draft: false
---

해당 포스트는 [Nomad Coder](https://academy.nomadcoders.co/courses/category/KR)의 초보를 위한 RN강의를 정리한 내용입니다.<br>

## 지난 포스트 Review

[[이전 포스트로 이동]](https://alstn2468.github.io/2019/ReactNativeCameraPermissions2/)

1. `componentDidMount` 수정하기
2. 카메라 **권한**에 따라 **다른 화면 표시**하기
3. 화면에 **스타일 적용**하기
4. 화면에 **카메라 띄우기**

지금까지 카메라 **권한**을 얻고 카메라를 **띄우는 것**까지 진행하였고<br>
이번 포스트에는 **전방/후방** 카메라를 **변경**하는 방법에 대해 설명해보겠습니다.<br>

## 9. 카메라 타입 설정

카메라의 타입은 `Camera`컴포넌트에 `type`을 속성으로 주면된다.<br>
카메라의 속성은 `Camera`의 `Constants`안에 정의 되어있다.<br>

```javascript
<Camera
  style={{
    width: width - 40,
    height: height / 1.5,
    borderRadius: 10,
    overflow: 'hidden',
  }}
  type={Camera.Constants.Type.front}
/>
```

기본값은 `Type.back`이고 `Type.front`를 사용하면 전방 카메라가 켜진다.<br>
위와 같이 코드를 변경해주고 전방 카메라가 켜지는지 **테스트**해보자.<br>

### 작동 테스트

<img src="./images/2019-09-01/1.png" width="300" height="auto" alt="아직 안만듬"><br/>

전방 카메라로 잘 작동하는 것을 확인할 수 있다.<br>

## 10. 카메라 상태를 state로 추가

우리 앱의 `cameraType`의 **기본 값**은 전면 카메라로 설정해 사용하겠습니다.<br>
`Camera` 컴포넌트에 `type`에 `cameraType`을 전달합니다.<br>

```javascript
state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.front
};

...

<Camera
    style={{
        width: width - 40,
        height: height / 1.5,
        borderRadius: 10,
        overflow: "hidden"
    }}
    type={cameraType}
/>
```

## 11. 전면/후면 변경 버튼 추가

### 필요한 모듈 추가

```javascript
...
import { MaterialIcons } from "@expo/vector-icons";
...
```

### state에 따라 다른 아이콘 표시

```javascript
<MaterialIcons
  name={
    cameraType === Camera.Constants.Type.front ? 'camera-rear' : 'camera-front'
  }
  size={44}
  color="white"
/>
```

### 아이콘을 담을 View 작성

아래와 같이 `IconBar`를 작성하고 `MaterialIcons`를 감싸줍니다.<br>

```javascript
const IconBar = styled.View`
    margin-top: 40px;
`;

...

<IconBar>
    <MaterialIcons
        ...
    />
</IconBar>
```

### 작동 테스트

`state`를 `Camera.Constants.Type.front`와 `Camera.Constants.Type.back`으로<br>
바꾸면서 화면과 아이콘의 변화를 테스트합니다.<br>

<img src="./images/2019-09-01/2.png" width="280" height="auto" alt="아직 안만듬">
<img src="./images/2019-09-01/3.png" width="280" height="auto" alt="아직 안만듬"><br/>

## 12. 버튼을 눌렀을 때 state 변경하기

`state`에 따라 화면이 변화하는 것을 확인할 수 있습니다.<br>
이제 버튼을 클릭하면 `state`를 변경하도록 하는 함수를 작성하겠습니다.<br>

### 필요한 모듈 추가

`react-native`의 `TouchableOpacity`를 추가합니다.<br>

```javascript
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
```

### 아이콘을 TouchableOpacity로 감싸기

```javascript
<TouchableOpacity>
  <MaterialIcons
    name={
      cameraType === Camera.Constants.Type.front
        ? 'camera-rear'
        : 'camera-front'
    }
    size={44}
    color="white"
  />
</TouchableOpacity>
```

### 카메라 타입 변경 함수 작성

`cameraType`을 `front`일 경우 `back`으로 `back`일 경우 `front`로<br>
`this.setState` 함수를 사용해 변경해준다.<br>

```javascript
switchCameraType = () => {
  const { cameraType } = this.state

  if (cameraType === Camera.Constants.Type.front) {
    this.setState({
      cameraType: Camera.Constants.Type.back,
    })
  } else {
    this.setState({
      cameraType: Camera.Constants.Type.front,
    })
  }
}
```

### TouchableOpacity에 함수 전달

작성한 `swithCameraType`함수를 `onPress`속성에 전달한다.<br>

```javascript
<TouchableOpacity onPress={this.switchCameraType}>
  <MaterialIcons
    name={
      cameraType === Camera.Constants.Type.front
        ? 'camera-rear'
        : 'camera-front'
    }
    size={44}
    color="white"
  />
</TouchableOpacity>
```

### 작동 테스트

아래와 같이 잘 작동하는 것을 확인할 수 있다.<br>

<img src="./images/2019-09-01/4.gif" width="300" height="auto" alt="아직 안만듬"><br>

다음 포스트에서는 **얼굴을 인식**하고 직접 **사진을 찍는 것** 까지 진행해보겠습니다.
