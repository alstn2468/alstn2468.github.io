---
title: 'GatsbyJS와 NextJS로 알아보는 React 렌더링 방식'
date: 2022-10-21 00:00:14
category: 'React'
thumbnail: './images/2022-10-21/thumbnail.png'
draft: true
---

## React의 기본적인 렌더링 방식

React는 기본적으로 단일 페이지 애플리케이션(**S**ingle **P**age **A**pplication, SPA)으로 흔하게 사용됩니다.
SPA가 동작하기 위해서는 처음 요청을 보냈을 때 앱에 필요한 스크립트들을 전부 다운로드해야 합니다.
이 SPA 앱은 라우터(router)를 이용해 URL을 변경하며 페이지 이동을 자연스럽게 할 수 있습니다.

이처럼 SPA 개념이 등장하면서 하나의 앱에서 여러 페이지를 보여주는 개념이 같이 생겨났는데 이를 클라이언트 사이드 렌더링(**C**lient **S**ide **R**endering, CSR)이라고 합니다.

### **C**lient **S**ide **R**endering (CSR)

CSR 방식은 구현된 코드들을 번들링 도구를 통해 하나 또는 여러 개의 JavaScript 파일로 묶어 사용자에게 한 번에 전달합니다.

<img src="./images/2022-10-21/1-client-side-rendering.png" />

위의 그림과 같이 HTML 문서를 응답으로 전달받으면, 브라우저는 HTML에서 필요로 하는 JavaScript 파일을 다운로드합니다. JavaScript 파일이 다운로드되면 React는 컴포넌트 트리를 렌더링하고 DOM 노드들을 생성합니다.

React에서 기본적으로 제공하는 보일러 플레이트인 `create-react-app`를 보면 알 수 있듯이 [기본 제공되는 HTML 파일](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/public/index.html)은 의미 있는 정보를 포함하고 있지 않습니다.

사용자들은 모든 스크립트가 다운로드가 끝나고 실행이 끝나기 전까지는 실제 필요한 정보들을 볼 수 없다는 것을 의미합니다. 이것은 흔히 CSR 방식의 단점으로 꼽히는 **SEO 최적화 문제**로 이어집니다. SEO를 수집하기 위한 웹 크롤러들은 서버에서 응답으로 전달하는 HTML 문서는 쉽게 읽을 수 있지만, 실제 페이지의 의미 있는 정보는 스크립트가 모두 실행된 이후에 설정될 수 있기 때문입니다.

또한 React는 컴포넌트가 그려지는 시점에 서버 API를 통해 데이터를 가져오기 때문에 초기 페이지 로딩이 오래걸릴 수 있습니다.

하지만 CSR 방식이 단점만 있는 것은 아닙니다. CSR 방식으로 구현된 앱 어플리케이션의 **번들링 된 결과물은 모두 정적 파일**이기 때문에 콘텐츠 전송 네트워크(**C**ontent **D**elivery **N**etwork, CDN)를 통해 사용자에게 제공할 수 있습니다.

또한 모든 렌더링을 사용자의 브라우저에서 수행하기 때문에 **페이지 전환이 자연스럽다는** 장점 또한 존재하며, CSR 방식은 기본적으로 작은 HTML 문서 하나를 응답으로 받기 때문에 **T**ime **T**o **F**irst **B**yte (TTFB) 시간이 빠릅니다.

CSR 방식의 전체적인 흐름과 장단점을 요약하면 아래와 같습니다.

<img src="./images/2022-10-21/2-client-side-rendering.png" />

**장점**

- 모든 렌더링을 사용자 브라우저에서 수행하므로 페이지 전환이 자연스럽다.
- 번들링 된 결과물은 모두 정적 파일이므로 CDN을 통해 쉽게 제공할 수 있다.
- 작은 HTML 문서 하나를 응답으로 받으므로 TTFB 시간이 빠르다.

**단점**

- 모든 스크립트가 다운로드되고 실행되기 전까지 필요한 정보를 볼 수 없다.
- SEO 최적화에 문제가 있을 수 있다.
- 컴포넌트가 그려지는 시점에 API를 통해 데이터를 가져와 초기 로딩이 길 수 있다.

<br/>
이런 CSR 방식의 단점들을 보완하기 위해 여러 가지 렌더링 방식들이 생겨났습니다. React를 이용하는 대표적인 프레임워크인 GatsbyJS와 NextJS를 통해 다양한 렌더링 방식들을 살펴보겠습니다.

## GatsbyJS의 렌더링 방식

### **S**tatic **S**ite **G**eneration (SSG)

### **S**erver **S**ide **R**endering (SSR)

### **D**eferred **S**tatic **G**eneration (DSG)

## NextJS의 렌더링 방식

### **S**tatic **S**ite **G**eneration (SSG)

### **S**erver **S**ide **R**endering (SSR)

### **I**ncremental **S**tatic **R**egeneration (ISR)

## 마무리

**참고자료**
- [Prateek Surana: The future of rendering in React](https://prateeksurana.me/blog/future-of-rendering-in-react/)
- [NextJS: Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering)
- [NextJS: Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [NextJS: Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Vercel: Incremental Static Regeneration](https://vercel.com/docs/concepts/incremental-static-regeneration/overview)
- [GatsbyJS: What’s New in Gatsby 4](https://www.gatsbyjs.com/blog/whats-new-in-gatsby-4)
- [GatsbyJS: Rendering Options](https://v4.gatsbyjs.com/docs/conceptual/rendering-options/)
- [GatsbyJS: Server-Side Rendering](https://www.gatsbyjs.com/docs/glossary/server-side-rendering/)
- [GatsbyJS: Using Server-side Rendering (SSR)](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-server-side-rendering/)
- [GatsbyJS: Using Deferred Static Generation (DSG)](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-deferred-static-generation/)
- [GatsbyJS: A Guide To Deferred Static Generation](https://www.gatsbyjs.com/blog/deferred-static-generation-guide/)