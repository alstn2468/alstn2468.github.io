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

<img src='./images/2022-10-21/1-client-side-rendering.png' />

위의 그림과 같이 HTML을 응답으로 전달받으면, 브라우저는 HTML에서 필요로 하는 JavaScript 파일을 다운로드합니다. JavaScript 파일이 다운로드되면 React는 컴포넌트 트리를 렌더링하고 DOM 노드들을 생성합니다.

React에서 기본적으로 제공하는 보일러 플레이트인 `create-react-app`를 보면 알 수 있듯이 [기본 제공되는 HTML 파일](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/public/index.html)은 의미 있는 정보를 포함하고 있지 않습니다.

사용자들은 모든 스크립트가 다운로드가 끝나고 실행이 끝나기 전까지는 실제 필요한 정보들을 볼 수 없다는 것을 의미합니다. 이것은 흔히 CSR 방식의 단점으로 꼽히는 **SEO 문제**로 이어집니다. SEO를 수집하기 위한 웹 크롤러들은 서버에서 응답으로 전달하는 HTML은 쉽게 읽을 수 있지만, 실제 페이지의 의미 있는 정보는 스크립트가 모두 실행된 이후에 설정될 수 있기 때문입니다.

또한 React는 컴포넌트가 그려지는 시점에 서버 API를 통해 데이터를 가져오기 때문에 초기 페이지 로딩이 오래걸릴 수 있습니다.

하지만 CSR 방식이 단점만 있는 것은 아닙니다. CSR 방식으로 구현된 앱 어플리케이션의 **번들링 된 결과물은 모두 정적 파일**이기 때문에 콘텐츠 전송 네트워크(**C**ontent **D**elivery **N**etwork, CDN)를 통해 사용자에게 제공할 수 있습니다.

또한 모든 렌더링을 사용자의 브라우저에서 수행하기 때문에 **페이지 전환이 자연스럽다는** 장점 또한 존재합니다.

CSR 방식의 장단점을 요약하면 아래와 같습니다.

**장점**

- 모든 렌더링을 사용자 브라우저에서 수행하므로 페이지 전환이 자연스럽습니다.
- 번들링 된 결과물은 모두 정적 파일이므로 CDN을 통해 쉽게 제공할 수 있습니다.

**단점**

- 모든 스크립트가 다운로드되고 실행되기 전까지 필요한 정보를 볼 수 없습니다.
- SEO에 문제가 있을 수 있습니다.
- 컴포넌트가 그려지는 시점에 API를 통해 데이터를 가져와 초기 로딩이 길 수 있습니다.

<br/>
이런 CSR 방식의 단점들을 보완하기 위해 여러 가지 렌더링 방식들이 생겨났습니다. React를 이용하는 대표적인 프레임워크인 GatsbyJS와 NextJS를 통해 다양한 렌더링 방식들을 살펴보겠습니다.

## GatsbyJS의 렌더링 방식

GatsbyJS는 React 기반의 웹 애플리케이션 생성 프레임워크며 대표적으로 정적 사이트 생성(**S**tatic **S**ite **G**eneration, SSG) 방식을 사용했습니다. 최근 GatsbyJS v4가 공개되었고 v4부터는 SSG 방식 외에도 서버 사이드 렌더링(**S**erver **S**ide **R**endering, SSR)과 지연된 정적 사이트 생성(**D**eferred **S**tatic **G**eneration, DSG) 방식 또한 지원하게 되었습니다.

이번 섹션에서는 GatsbyJS에서의 SSG, SSR, DSG의 동작 방식과 장단점, 그리고 이 렌더링 방식이 어떻게 CSR의 단점을 보완할 수 있는지 알아보겠습니다.

### **S**tatic **S**ite **G**eneration (SSG)

CSR 방식의 애플리케이션의 라우팅은 JavaScript를 이용해 필요한 콘텐츠를 다시 그려주는 방식이지만 SSG 방식의 애플리케이션은 **빌드 과정에서 각 페이지의 HTML을 생성**해 페이지를 이동하는 방식입니다.

<img src='./images/2022-10-21/2-static-site-generation.png' />

SSG 방식은 애플리케이션의 **모든 페이지를 미리 렌더링**해 사용자의 요청에 맞는 HTML을 응답합니다. 이런 SSG 방식은 데이터베이스나 서버가 거의 필요 없는 구조로 애플리케이션을 구성할 수 있습니다. 또한 SSG 방식의 빌드 결과물은 CSR 방식과 같은 정적 파일이므로 CSR 방식의 장점인 **CDN 호스팅 또한 가능**합니다.

GatsbyJS의 SSG 방식으로 빌드된 HTML에는 JavaScript가 실행되지 않아도 의미있는 정보가 포함될 수 있습니다. 따라서 CSR 방식의 단점이었던 **SEO 문제 또한 보완**이 가능합니다. 애플리케이션에 필요한 데이터들은 모두 빌드 시점에 HTML로 생성되기 때문에 웹 크롤러들이 문제없이 HTML을 읽을 수 있습니다.

하지만 SSG 방식도 단점이 존재합니다. SSG 방식으로 구현된 애플리케이션에 새로운 페이지가 필요한 경우 **애플리케이션을 새로 빌드**해야하며 **빌드 시간에 데이터를 가져와 HTML**을 생성하므로 CSR 방식에 비하여 **빌드 시간이 오래** 걸립니다.

위의 내용으로 미루어 보았을 때 SSG 방식은 CSR 방식의 단점을 보완하지만 **애플리케이션의 내용이 자주 변하는 사이트에는 적합하지 않은** 방식입니다.

SSG 방식의 장단점을 요약하면 아래와 같습니다.

**장점**

- 번들링 된 결과물은 모두 정적 파일이므로 CDN을 통해 쉽게 제공할 수 있습니다.
- 브라우저에서 스크립트가 실행되지 않아도 콘텐츠가 그려질 수 있습니다.
- CSR 방식의 단점인 SEO 문제를 보완할 수 있습니다.

**단점**

- 새로운 페이지가 필요한 경우 애플리케이션을 새로 빌드해야 합니다.
- CSR 방식에 비해 빌드 시간이 오래 걸립니다.

<br/>

**GatsbyJS의 라우팅 최적화**

GatsbyJS는 애플리케이션 빌드가 완료되면 모든 페이지가 각각의 HTML로 만들어집니다. SSG 방식으로 빌드된 HTML 문서 간의 라우팅 과정에서 사용자 경험을 위해 페이지 데이터들을 [prefetch](https://developer.mozilla.org/en-US/docs/Glossary/Prefetch), [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)하는 방식을 추가로 사용합니다.

GatsbyJS의 라우팅을 위한 Link API는 [여기](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/)에서 자세히 확인할 수 있습니다.

<figure>
  <img src='./images/2022-10-21/3-gatsby-routing-optimization.gif' />
  <figcaption>
    GatsbyJS가 라우팅 될 페이지의 데이터를 미리 가져오는 모습
  </figcaption>
</figure>

<br/>

다음으로는 GatsbyJS v4에 새롭게 추가된 서버 사이드 렌더링(**S**erver **S**ide **R**endering, SSR) 방식에 대해서 살펴보겠습니다.

### **S**erver **S**ide **R**endering (SSR)

CSR 방식은 브라우저를 이용해 HTML을 생성하는 방식이지만 SSR 방식은 사용자의 요청에 따라 **서버에서 JavaScript를 실행해 HTML을 생성하는 방식**입니다.

<img src='./images/2022-10-21/4-server-side-rendering.png' />

JavaScript를 실행한 SSR 방식은 웹에 자주 사용되던 PHP나 JSP/Servlet과 비슷하게 동작합니다. 다른 점은 **GatsbyJS의 SSR의 런타임은 Node.js가 사용**됩니다.

SSR 방식은 브라우저에서 실행될 JavaScript를 서버에서 실행해 HTML을 생성하기 때문에 CSR 방식보다 **초기 페이지 렌더링이 늦어**질 수 있지만, CSR 방식에 비하여 사용자에게 보여주는 **콘텐츠가 로딩되는 시점은 빨라**질 수 있으며, HTML을 서버에서 생성해서 응답하기 때문에 CSR 방식의 단점인 **SEO 문제가 해결**될 수 있습니다.

SSR 방식은 CSR 방식과 다르게 C**DN을 이용한 정적 파일 제공이 불가능**하며 Node.js 환경에서 실행되기 때문에 **브라우저 API를 사용할 때 주의**해야 합니다. Node.js 환경에서는 `window`나 `document`와 같은 브라우저 객체에 접근할 수 없으므로 관련 코드를 작성할 때 유의해야 합니다.

- `typeof` 키워드를 이용해 예외 처리를 하는 예시

```typescript
if (typeof window !== 'undefined') {
  // 브라우저에서 실행되어야 하는 코드
  window.addEventListener('scroll', onScroll);
}
```

- `useEffect`를 이용해 예외 처리를 하는 예시

React의 `useEffect` 훅은 컴포넌트가 마운트 되는 시점에 호출되기 때문에 브라우저 환경에서 실행되므로 `window`나 `docuemnt` 같은 브라우저 객체에 접근할 수 있습니다.

```typescript
useEffect(() => {
  // 브라우저에서 실행되어야 하는 코드
  window.addEventListener('scroll', onScroll);
}, [])
```

SSR 방식의 장단점을 요약하면 아래와 같습니다.

**장점**

- 전체적인 콘텐츠 로딩이 CSR 방식에 비해 빨라질 수 있습니다.
- CSR 방식의 단점인 SEO 문제를 보완할 수 있습니다.

**단점**

- 서버에서 JavaScript를 실행해야 하므로 초기 페이지 렌더링이 늦어질 수 있습니다.
- Node.js 런타임에서 실행되므로 브라우저 API를 사용할 때 주의해야 합니다.
- CDN을 이용한 제공이 불가능하고 CSR 방식에 비하여 안정성이 떨어질 수 있습니다.

<br/>

**GatsbyJS의 SSR**

GatsbyJS의 SSR 방식은 v4부터 새롭게 추가되었습니다. GatsbyJS는 앞에서 소개한 SSG 방식이나 뒤에서 소개하게 될 DSG(**D**eferred **S**tatic **G**eneration) 방식을 사용하는 것을 권장하지만 사용자 인증이나 A/B 테스트, 위치나 사용자 데이터 기반으로 구성되어야 하는 사례가 있을 경우를 위해 SSR 방식 또한 제공합니다.

<img src='./images/2022-10-21/5-server-side-rendering.jpeg' />

GatsbyJS에서 소개하는 SSR 방식의 흐름은 위의 그림과 같습니다. SSR 방식으로 동작하기 위해서는 스크립트를 실행해야 하므로 Gatsby Cloud와 같은 **Cloud Worker 시스템이 추가로 필요**한 것을 확인할 수 있습니다.

GatsbyJS에서 SSR 방식을 사용하기 위해서는 비동기 `getServerData` 함수를 사용해야 합니다.

```typescript
import * as React from 'react'

const SSRPage = ({ serverData }) => (
  <main>
    <h1>SSR Page with Dogs</h1>
    <img alt='Happy dog' src={serverData.message} />
  </main>
);

export default SSRPage;

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return { props: await res.json() };
  } catch (error) {
    return { status: 500, headers: {}, props: {} };
  }
}
```

서버에서 페이지를 구성하기 위한 스크립트를 `getServerData` 함수에서 작성해 반환하여 페이지 컴포넌트에서 `serverData` 속성으로 가져와 사용할 수 있습니다. GatsbyJS의 SSR 방식에 대한 조금 더 자세한 내용은 [여기](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-server-side-rendering/)에서 확인할 수 있습니다.

다음으로는 SSR 방식과 같이 GatsbyJS v4에서 새롭게 추가된 **D**eferred **S**tatic **G**eneration (DSG) 방식에 대해서 알아보도록 하겠습니다.

### **D**eferred **S**tatic **G**eneration (DSG)

GatsbyJS의 기본 렌더링 방식인 **SSG 방식은 CSR 방식에 비해 빠른 웹사이트 경험을 제공하지만, 빌드 시간이 오래 걸린다는 단점**이 존재합니다. **D**eferred **S**tatic **G**eneration(DSG) 방식은 SSG 방식의 이런 단점을 개선합니다.

<img src='./images/2022-10-21/6-deferred-static-generation.png' />

DSG 방식을 이용하면 특정 페이지의 **빌드 시점을 지연(defer)**시킬 수 있습니다. 이러한 방식은 처음으로 페이지를 방문하는 사용자의 브라우저에서 빌드가 진행됩니다. 이 사용자에게는 로딩 시간이 길 수 있지만, 이어지는 사용자에게는 SSG 방식과 동일하게 페이지가 제공됩니다. DSG 방식을 사용한 페이지의 요청은 SSG 방식과 동일하게 **CDN을 이용해 제공**될 수 있지만 SSG 방식과 다르게 서버를 초기 빌드 후에도 계속 켜두어야 합니다.

<img src='./images/2022-10-21/7-deferred-static-generation.jpg' />

GatsbyJS에서 소개하는 DSG 방식의 흐름은 위의 그림과 같습니다. DSG 방식으로 동작하기 위해서는 SSR 방식과 동일하게 Gatsby Cloud와 같은 **Cloud Worker 시스템이 추가로 필요**합니다.

GatsbyJS에서 DSG 방식을 사용하기 위해서는 Gatsby Node API의 `createPage` 함수의 인자 객체에 `defer: true` 값을 추가해주면 됩니다.

```typescript
createPage({
  path: 'page-path',
  component: 'component-path',
  context: {},
  defer: true,
});
```

지금까지 GatsbyJS의 렌더링 방식에 대해서 알아보았습니다. 다음 섹션에서는 NextJS에서 이용하는 렌더링 방식에 대해서 알아보겠습니다.

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
- [GatsbyJS: Rendering Options](https://v4.gatsbyjs.com/docs/conceptual/rendering-options/)
- [GatsbyJS: Static Site Generator](https://www.gatsbyjs.com/docs/glossary/static-site-generator/)
- [GatsbyJS: Server-Side Rendering](https://www.gatsbyjs.com/docs/glossary/server-side-rendering/)
- [GatsbyJS: Using Server-side Rendering (SSR)](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-server-side-rendering/)
- [GatsbyJS: Using Deferred Static Generation (DSG)](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-deferred-static-generation/)
- [GatsbyJS: A Guide To Deferred Static Generation](https://www.gatsbyjs.com/blog/deferred-static-generation-guide/)
- [What’s New in Gatsby 4](https://www.gatsbyjs.com/blog/whats-new-in-gatsby-4)
- [Behind the Scenes: What makes Gatsby Great](https://www.gatsbyjs.com/blog/2019-04-02-behind-the-scenes-what-makes-gatsby-great/#why-server-side-render)