---
title: 'Recoil Basic Tutorial Intro'
date: 2020-05-15 00:00:10
category: 'React'
draft: false
---

[Recoil 공식 문서](https://recoiljs.org/) 중 [Basic Tutorial Intro](https://recoiljs.org/docs/basic-tutorial/intro)를 번역한 포스트입니다.

## Intro

이 섹션은 Recoil과 React가 설치했다고 가정한다.<br>
Recoil과 React를 처음부터 시작하는 방법은 [Getting Started](https://alstn2468.github.io/React/2020-05-15-Recoil/)를 보면된다.<br/>
앞으로의 섹션의 컴포넌트들은 부모트리에 `<RecoilRoot /`가 있다고 가정한다.<br/>

이 튜토리얼에서는 간단한 todo 리스트 애플리케이션을 제작한다. 애플리케이션은 다음 기능을 수행한다.<br/>

- todo 아이템 추가
- todo 아이템 수정
- todo 아이템 삭제
- todo 아이템 필터링
- 유용한 통계 표시

그 과정에서, 우리는 Recoil API에 의해 노출된 atoms, selectors, atom families와 hook를 다룰 것이다.<br/>
최적화 또한 다룰 것이다.