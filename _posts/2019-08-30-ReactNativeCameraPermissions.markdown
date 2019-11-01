---
title: "React Native로 카메라 사용하기 (1)"
date: 2019-08-30 00:00:04
categories: [React Native]
tags: [React Native, JavaScript, ES6, React, Front-End, Application]
comments: true
---

## Dependencies

-   expo
-   react
-   react-native
-   expo-permissions
-   expo-camera
-   styled-components

모든 모듈의 버전은 **최신 버전** 기준 입니다.

## 1. 프로젝트 생성하기

```shell
expo init <프로젝트 이름>
```

-   Template는 `blank`를 선택합니다.
-   `name`과 `slug`는 임의로 작성합니다.

## 2. App.js 변경하기

`function` 기반의 메인 `App.js`를 `class` 기반으로 변경 합니다.<br>
`React`의 `Component`를 상속하는 `class`를 만들어줍니다.

### 변경 전

```javascript
export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    );
}
```

### 변경 후

```javascript
export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
            </View>
        );
    }
}
```

`npm start` 또는 `yarn start`를 해 잘 작동하는지 확인합니다.

### 동작 테스트

아래와 같이 잘 동작하는 것을 확인할 수 있습니다.<br>
<img src="/assets/2019-08-30/1.png" width="300" height="auto" alt="아직 안만듬"><br/>

## 3. 필요한 모듈 import 하기

아래와 같이 필요한 모듈들을 추가해줍니다.

```javascript
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import styled from "styled-components";
```

## 4. 카메라 접근 권한 얻기

`App`클래스 내부에 **권한**을 갖는지 확인하는 `state`를 선언합니다.<br>
초기값은 `null`로 설정해줍니다.

```javascript
state = {
    hasPermission: null
};
```

`componentDidMount`함수를 `async`를 붙여 사용해 줍니다.<br>
`Permissions`모듈의 `askAsync`함수에 `Permissions.CAMERA`를 인자로 전달합니다.<br>
권한 설정을 사용자가 할때까지 기다리도록 `await`을 사용해 함수를 호출합니다.

```javascript
componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    console.log(status);
};
```

### 동작 테스트

#### 주의 사항

-   권한 설정을 한번 **승인(거부)**하면 다시 팝업이 뜨지 않습니다.

<img src="/assets/2019-08-30/2.png" width="300" height="auto" alt="아직 안만듬"><br/>

<img src="/assets/2019-08-30/3.png" width="500" height="auto" alt="아직 안만듬"><br/>

카메라 사용 권한을 허락하면 `status`가 **granted**가 되는 것을 확인할 수 있다.<br>

다음 포스트에서는 `status`를 이용해 권한에 따라 다른 화면이 보여지도록 해보겠습닏다.
