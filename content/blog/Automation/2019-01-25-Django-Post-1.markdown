---
title: 'Github Action으로 Gatsby 블로그 배포 자동화하기'
date: 2020-01-23 00:00:01
category: 'Automation'
draft: false
---

## 계기

기존에 `Ruby On Rails`기반의 `jekyll`을 이용해 `Github Page`블로그를 사용하고 있었다.<br>
[jekyll uno](http://joshgerdes.com/jekyll-uno/)라는 테마를 사용하고 있었는데, 테마가 **글과 코드의 가독성**을 너무 해치는 듯 했다.<br>
기존부터 관심이 있었던 `React`기반의 `Gatsby`로 플랫폼을 옮기기로 결정하게 되었다.<br>
테마는 이전 부터 보았던 jbee님의 [gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee)를 사용하기로 했다.<br>
로컬 환경에서 테스트를 마치고 배포를 완료한 후 내 원격 저장소를 보고는 놀랄 수 밖에 없었다.<br>

<img src="/assets/2020-01-23/1.PNG" width="400" height="auto">

#### 어? 내 코드 다 어디갔지?

`gatsby build`명령어를 사용해 **정적 파일**로 변환 된 후 배포가 되는 방식인 데<br>
배포가 되어지는 `master`브랜치이기 때문에 기존의 코드가 모두 날아가는 현상이 생겼다.<br>
`Github Page`문서에 나와있지만 **정적 배포 파일**은 `master`브랜치에 존재해야한다고 써있었다.<br>
기존의 코드가 날아가지 않고 다른 브랜치를 하나 생성해 코드를 관리하고 싶어 방법을 찾게되었다.<br>

## Github Action의 발견

1. `gatsby github page deploy`
2. `another branch`

위의 두개의 키워드를 가지고 검색을 하다보니 `Github Action`을 발견하게 되었다.<br>

### Github Action이란?

깃허브 저장소 내에서 코드 프로젝트를 **빌드**, **테스트**, **패키지**, **릴리스**<br>
또는 **배포**하기 위해 설정할 수있는 사용자 지정 **자동화 프로세스**이다.<br>

### 짜여진 Github Action 찾아보기

사실 백엔드를 테스트, 배포를 자동화해보자하는 생각은 기존에도 여러번 했었지만<br>
프론트엔드까지 배포 자동화를 적용할 것이라고는 전혀 생각을 못했었다.<br>
`CircleCI`에서도 그랬듯이 사람들이 이미 작성해 놓은 `yml`파일을 찾기 시작했다.<br>
그 결과 내가 필요로하는 2개의 `Github Action`을 찾을 수 있었다.<br>

1. [checkout](https://github.com/actions/checkout/blob/v1.0.0/action.yml)
2. [ghpages](https://github.com/maxheld83/ghpages)

하나는 브랜치를 변경하도록 도와주고 하나는 배포를 하는 것을 도와주는 `Action`이였다.<br>
이 두개의 `Action`을 사용해 새로운 `workflow`를 구성하기로 하였다.<br>

## 배포 자동화하기

### Token 생성 및 키 적용하기

내 레파지토리에 직접적으로 접근을 하기위해 Github의 **Access Token**이 필요했다.<br>
[여기](https://github.com/settings/tokens)에서 `Generate new token`을 클릭해 생성할 수 있다.<br>

<img src="/assets/2020-01-23/2.PNG" width="400" height="auto">

위와 같이 모든 Repo설정에 대한 권한을 주고 토큰을 생성했다.<br>

<img src="/assets/2020-01-23/3.PNG" width="400" height="auto">

생성된 토큰을 복사해 사용할 레파지토르의 `settings`의 `Secrets`으로간 후<br>
`Add a new secret`을 클릭하고 `GITHUB_API_KEY`의 이름으로 키를 적용하자.<br>

### Workflow 생성하기

사용할 레파지토리의 상단 부분의 `Actions`버튼을 클릭해보자.<br>

<img src="/assets/2020-01-23/4.PNG" width="400" height="auto">

나는 이미 여러번 배포를 해서 이력이 있지만 아마 사용하지 않았다면 비어있을 것이다.<br>
`New workflow`버튼을 클릭해 새로운 `workflow`를 생성해보자.<br>
`Get started with Github Action`과 같은 페이지가 뜨는데 스킵하면 된다.<br>

<img src="/assets/2020-01-23/5.PNG" width="400" height="auto">

아래의 `yml`코드를 붙여넣기 한 후 저장하고 레파지토리에 `pull`을 해주자.

```
on:
  push:
    branches:
      - gh-pages
name: build gatsby
jobs:
  build_gatsby:
    name: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1

      - name: yarn install
        run: yarn install

      - name: gatsby build
        env:
          GH_API_KEY: ${{ secrets.GITHUB_API_KEY }}
        run: yarn build

      - name: deploy
        uses: maxheld83/ghpages@v0.2.1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GH_PAT: ${{ secrets.GITHUB_API_KEY }}
          BUILD_DIR: 'public/'
```

소개했던 `checkout`을 이용해 브랜치를 변경하고 `yarn install`명령어로 패키지 설치 후 빌드<br>
`ghpages`를 이용해 `deploy`를 하게 된다. 자세한 로직은 아직 이해하지 못해 보고있는 중이다.<br>

### 변경사항 적용하기

`workflow`를 생성하고 `pull`을 하면 `.github`폴더안에 `yml`파일이 생성되었을 것이다.<br>
이 상태에서 블로그에 관한것을 변경한 후 `push`하게되면 자동으로 배포가된다.<br>

<img src="/assets/2020-01-23/6.PNG" width="400" height="auto">

별 문제가 없다면 위의 사진과 같이 `deploy`단계 까지 완료가 될 것이다.<br>
`deploy`단계까지 오류가 없이 잘 진행되었다면 배포가 완료된 것이다.<br>
물론 `master`브랜치에는 정적인 파일만 존재하고 `gh-pages`브랜치에 기존 코드가 있다.<br>
`gh-pages`브랜치에서 작업을하고 그대로 `gh-pages`브랜치에 `push`하면 배포가 되는 것이다.<br>

## 출처

- [actions/checkout](https://github.com/actions/checkout)
- [maxheld83/ghpages](https://github.com/maxheld83/ghpages)
- [JaeYeopHan/gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee)
- [blog.joostory.net](https://blog.joostory.net/587)
