---
title: "node-oracledb 설치 오류 해결"
date: 2020-01-13 00:00:05
categories: [Bug fix]
tags: [Node, npm, node-oracledb, oracle db, react]
comments: true
---

### node-oracledb 설치 오류 발생

처음들어간 회사에서 `node-oracledb`패키지가 필요한 프로젝트에 참여하게 되었다.<br/>
프로젝트를 클론한 후 `npm install`명령어를 실행했지만 설치가 되지않고 오류가 발생했다.<br/>

> oracledb ERR! NJS-067: a pre-built node-oracledb binary was not found for Node.js v12.14.1 (NODE_MODULE_VERSION=72) on win32 x64
> oracledb ERR! Try compiling node-oracledb source code using https://oracle.github.io/node-oracledb/INSTALL.html#github

### 오류 해결 방법

에러 로그에서도 확인이 가능하지만 설치되어있는 `Node`의 버전 문제였다.<br/>
회사의 컴퓨터에는 **LTS**버전인 `v12.14.1`이 설치되어 있지만<br/>
`node-oracledb`패키지는 해당 버전을 지원하지 않는다.<br/>
`node-oracledb`의 [설치 문서](https://oracle.github.io/node-oracledb/INSTALL.html)를 확인해보자.

> Note Node.js 8.16, Node.js 10.16, or later is required.

위와 같이 필요한 `Node`의 버전이 명시되어 있는 것을 확인할 수 있다.<br/>
나는 `Node`의 버전관리를 `nvm`을 활용해 하고있으므로<br/>
`nvm install`명령어로 해당 버전의 노드를 설치했다.<br/>

#### nvm으로 노드 버전 변경

<img src="/assets/2020-01-13/nvm-install-use.png" width="800" height="auto"><br>

위와 같이 `nvm install 10.16.0`으로 `10.16.0`버전의 노드를 설치했다.<br>
설치한 `10.16.0`버전의 `Node`를 사용하기 위해 `nvm use 10.16.0`명령어를 실행했다.

### node-oracledb 설치확인

<img src="/assets/2020-01-13/install-success.png" width="800" height="auto"><br>

위의 스크린샷과 같이 모든 패키지가 문제없이 설치되는 것을 확인할 수 있다.
