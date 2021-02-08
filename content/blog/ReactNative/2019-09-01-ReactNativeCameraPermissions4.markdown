---
title: 'React Native로 카메라 사용하기 (4)'
date: 2019-09-01 00:00:05
category: 'React Native'
draft: false
---

해당 포스트는 [Nomad Coder](https://academy.nomadcoders.co/courses/category/KR)의 초보를 위한 RN강의를 정리한 내용입니다.<br>

## 지난 포스트 Review

[[이전 포스트로 이동]](https://alstn2468.github.io/2019/ReactNativeCameraPermissions3/)

1. 카메라 **타입**(전방/후방) **설정**
2. 카메라 타입 `state`로 관리
3. 카메라 타입 변경 **버튼** 추가
4. 카메라 타입 변경 **함수** 작성

지난 포스트에는 카메라 **타입**(전방/후방)을 **변경**하는 것까지 진행했습니다.<br>
이번 포스트에서는 얼굴을 인식하고 **웃는 얼굴**일 경우 **사진**을 찍도록 해보겠습니다.<br>

## 13. 카메라로 얼굴 인식 하기

[Expo 공식 문서](https://docs.expo.io/versions/v34.0.0/sdk/camera/)를 확인해 보면 `onFacesDetected`속성이 존재한다.<br>
일단 아래와 같이 **함수**를 **구현**하고 해당 속성에 전달해 테스트 해보자.<br>

```javascript
<Camera
    style={{
        width: width - 40,
        height: height / 1.5,
        borderRadius: 10,
        overflow: "hidden"
    }}
    type={cameraType}
    onFacesDetected={this.onFacesDetected}
/>

...

onFacesDetected = faces => {
    console.log(faces);
};
```

### 작동 테스트

아래와 같이 얼굴을 잘 찾는 것을 확인할 수 있다.<br>

<img src="./images/2019-09-01/5.gif" width="280" height="auto" alt="아직 안만듬"><br/>

얼굴을 **찾지 못하면** 아래와 같이 빈 `array`가 반환된다.<br>

<img src="./images/2019-09-01/6.png" width="400" height="auto" alt="아직 안만듬"><br/>

## 14. 웃는 얼굴 분류하기 (1)

`expo`의 `FaceDetector`모듈을 추가하고<br>
`Camera` 컴포넌트에 `faceDetectionClassifications`속성을 `all`로 지정해준다.<br>
다음으로 `faceDetectorSettings`속성을 작성한다.<br>

```javascript
import * as FaceDetector from 'expo-face-detector';

...

<Camera
    style={{
        width: width - 40,
        height: height / 1.5,
        borderRadius: 10,
        overflow: "hidden"
    }}
    type={cameraType}
    onFacesDetected={this.onFacesDetected}
    faceDetectionClassifications="all"
    faceDetectorSettings={{
        detectLandmarks: FaceDetector.Constants.Landmarks.all
    }}
/>
```

### 작동 테스트

얼굴의 모든 **부분**의 **좌표**를 찾는 것을 확인할 수 있다.<br>

<img src="./images/2019-09-01/7.gif" width="280" height="auto" alt="아직 안만듬"><br/>

## 15. 웃는 얼굴 분류하기 (2)

`faceDetectorSettings`에 `runClassifications`를 추가한다.<br>

```javascript
<Camera
    ...
    faceDetectionClassifications="all"
    faceDetectorSettings={{
        detectLandmarks:
            FaceDetector.Constants.Landmarks.all,
        runClassifications:
            FaceDetector.Constants.Classifications.all
    }}
/>
```

### 작동 테스트

이전과 같은 이미지를 가지고 테스트하여 콘솔을 확인한 결과<br>
`smilingProbability`라는 **웃는 얼굴일 가능성**을 확인할 수 있는 값이 생겼다.<br>

<img src="./images/2019-09-01/8.png" width="700" height="auto" alt="아직 안만듬"><br/>

## 16. 웃는 얼굴을 분류 결과 state 만들기

아래와 같이 `smileDetected`라는 `state`를 추가해준다.<br>

```javascript
export default class App extends React.Component {
    state = {
        hasPermission: null,
        cameraType: Camera.Constants.Type.front,
        smileDetected: false
    };

    ...

    render() {
        const { hasPermission, cameraType, smileDetected } = this.state;

    ...
```

## 17. 웃는 얼굴을 찾았을 경우 감지 종료 시키기

`Camera` 컴포넌트의 `onFacesDetected`를 아래와 같이 수정한다<br>

```javascript
<Camera
  style={{
    width: width - 40,
    height: height / 1.5,
    borderRadius: 10,
    overflow: 'hidden',
  }}
  type={cameraType}
  onFacesDetected={smileDetected ? null : this.onFacesDetected}
  faceDetectionClassifications="all"
  FaceDetectorSettings={{
    detectLandmarks: FaceDetector.Constants.Landmarks.all,
    runClassifications: FaceDetector.Constants.Classifications.all,
  }}
/>
```

`smileDetected`가 `true`가 되면 `onFaceDetected`에 `null`이 들어가 중지된다.<br>

## 18. 웃는 얼굴을 찾았을 경우 state 변경하기

`onFacesDetected`를 수정해 사용한다.<br>
`faces`객체 내부의 `smilingProbability`에 따라 `state`를 변경하도록 한다.<br>
아래와 같이 `JSON`을 **Destructuring**해서 필요한 부분만 가져온다.<br>

```javascript
onFacesDetected = faces => {
  const {
    faces: [face],
  } = faces

  if (face) {
    console.log(face)
  }
}
```

출력 결과는 아래와 같다.

```javascript
Object {
  "bottomMouthPosition": Object {
    "x": 356.0579520321626,
    "y": 205.984289517859,
  },
  ...
  "rightMouthPosition": Object {
    "x": 361.66983528473065,
    "y": 201.3538326735288,
  },
  ...
  "smilingProbability": 0.029783526435494423,
  "yawAngle": 34.714847564697266,
}
```

`Object`에서 필요한 `smilingProbability`를 사용해 함수를 작성한다.<br>

```javascript
onFacesDetected = faces => {
  const {
    faces: [face],
  } = faces

  if (face) {
    console.log(face.smilingProbability)

    if (face.smilingProbability > 0.7) {
      this.setState({
        smileDetected: true,
      })
    }
  }
}
```

### 작동 테스트

`smilingProbability`가 **낮은** 사진에서는 얼굴을 계속 찾고있고<br>
`smilingProbability`가 **높은** 사진에서는 `smileDetected`가 `true`가 되었고<br>
얼굴을 더 이상 감지하지 않음을 확인할 수 있다.<br>

<img src="./images/2019-09-01/9.gif" width="300" height="auto" alt="아직 안만듬"><br/>

## 19. 카메라를 작동해 사진 찍기

### 카메라 Reference 만들기

`constructor`를 사용해 아래와 같이 코드를 작성한다.<br>
`React`의 `createRef`를 이용해 `Reference`를 만들고 `Camera`에 전달한다.<br>

```javascript
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasPermission: null,
            cameraType: Camera.Constants.Type.front,
            smileDetected: false
        };

        this.cameraRef = React.createRef();
    }

    ...

    render() {
        const { hasPermission, cameraType, smileDetected } = this.state;

        if (hasPermission === true) {
            return (
                <CenterView>
                    <Camera
                        ...
                        ref={this.cameraRef}
                    />

    ...
```

### 사진을 찍는 함수 작성하기

1. `Camera`에 전달된 `ref`가 존재하는지 확인한다.
2. `takePictureAsync`함수를 사용해 사진을 찍는다.
3. 사진 객체를 **Destructuring**해 `uri`를 가져와 확인한다.
4. `uri`가 존재할 경우 `savePhoto`함수를 사용해 저장한다.
5. 에러가 발생할 경우 띄워주고 **다시** 얼굴을 찾도록 `state` 변경

```javascript
takePhoto = async () => {
  try {
    if (this.cameraRef.current) {
      let { uri } = await this.cameraRef.current.takePictureAsync({
        quality: 1,
      })

      if (uri) {
        this.savePhoto(uri)
      }
    }
  } catch (error) {
    alert(error)

    this.setState({
      smileDetected: false,
    })
  }
}
```

### 사진을 저장하는 함수 작성하기

찍은 사진의 `uri`는 저장하지 않으면 **사라지기때문에**<br>
사진을 **저장하는 함수**를 작성해 **따로 저장**해줘야한다.<br>
`expo-media-library`모듈 추가 및 **앨범 이름**을 선언한다.<br>

```javascript
import * as MediaLibrary from "expo-media-library";

...

const ALBUM_NAME = "Smiley Cam";
```

아래와 같이 `savePhoto`함수를 작성한다.<br>

1. `askAsync`를 사용해 카메라 권한이 있는지 확인한다.
2. `createAssetAsync`를 사용해 `asset`생성한다.
3. `getAlbumAsync`를 사용해 선언한 앨범의 이름을 가져온다.
4. 앨범이 존재하지 않을 경우 `createAlbumAsync`를 사용해 생성 및 사진 저장
5. 앨범이 존재할 경우 `addAssetsToAlbumAsync`를 사용해 사진 저장
6. 2초 뒤 `smileDetected`를 `false`로 변경해 다시 사진 촬영 가능
7. 권한이 없을 경우 권한을 설정하도록 `hasPermission`을 `false`로 변경

```javascript
savePhoto = async uri => {
  try {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(uri)
      let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)

      if (album === null) {
        album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset)
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id)
      }
      setTimeout(
        () =>
          this.setState({
            smileDetected: false,
          }),
        2000
      )
    } else {
      this.setState({ hasPermission: false })
    }
  } catch (error) {
    console.log(error)
  }
}
```

### 작동 테스트

`smilingProbability`가 `0.7`보다 커진 경우 사진이 찍혔으며<br>
**Smiley Cam**폴더에 사진이 저장된 것을 확인할 수 있다.<br>

<img src="./images/2019-09-01/10.gif" width="280" height="auto" alt="아직 안만듬">
<img src="./images/2019-09-01/11.png" width="280" height="auto" alt="아직 안만듬"><br/>

#### ~~아이유 짱짱걸~~

지금까지 4개의 포스트에 거쳐 `React Native`에서 카메라를 사용해<br>
**웃는 얼굴**이 감지된 경우 사진이 찍히는 어플리케이션을 제작해보았다.<br>
자세한 코드는 [여기](https://github.com/alstn2468/ReactNative_For_Beginners/tree/master/smiley-cam)에서 확인할 수 있습니다.
