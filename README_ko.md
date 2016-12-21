# Clayful JavaScript/Node.js Library

[English](README.md) | [한국어](README_ko.md)

## 기능

- Node.js 및 브라우저 지원
- Promise 버전 지원
- API 요청 및 토큰 저장 미들웨어를 플러그인 시스템으로 지원

## 링크

- [API 다큐먼테이션]() 

## 준비사항

- [Clayful API](http://clayful.io)에서 계정을 생성해주세요.
- 스토어를 생성해주세요.
- API 클라이언트를 생성하고 필요한 API 접근 권한을 설정해주세요.
    - 만약 Node.js 환경에서 개발하신다면 **비공개 클라이언트(private client)**로 생성해주세요.
    - 만약 브라우저 환경에서 개발하신다면 **공개 클라이언트(public client)**로 생성해주세요.

## 설치

```
npm install clayful --save
```

혹은 이 리포지토리를 작업하고 있는 프로젝트 디렉토리에 클론하시거나 다운받으셔서 사용할 수 있습니다.

## 라이브러리 임포트

**Node.js 환경**
```js
const Clayful = require('clayful');

// Promisified된 버전을 사용하려는 경우
const Clayful = require('clayful/promisified.js');
```

**브라우저 환경 (Browserify 사용시)**
```js
const Clayful = require('clayful/dist/clayful.js');

// AJAX 요청용 미들웨어 (필요한 것만 임포트하세요!)
const jQueryRequestMiddleware = require('clayful/dist/request-jquery.js');
const axiosRequestMiddleware = require('clayful/dist/request-axios.js')
```

**브라우저 환경 (HTML에서 직접 임포트하기)**
```html
<script src="/node_modules/clayful/dist/clayful.min.js"></script>

<!-- AJAX 요청용 미들웨어 (필요한 것만 임포트하세요!) -->
<script src="/node_modules/clayful/dist/request-jquery.min.js"></script>
<script src="/node_modules/clayful/dist/request-axios.min.js"></script>
```

## 기본 환경 설정

**Node.js 환경**
```js
const clayful = Clayful({
    clientId:     '...', // 비공개 클라이언트의 client id
    clientSecret: '...'  // 비공개 클라이언트의 client secret
});
```

**브라우저 환경**
```js
const clayful = Clayful({
   clientId: '...', // 공개 클라이언트의 client id
});

// AJAX 미들웨어 사용 (필요한 것만 사용하시면 됩니다.)
clayful.install('request', jQueryRequestMiddleware($));    // jQuery 사용시
clayful.install('request', axiosRequestMiddleware(axios)); // axios 사용시
```

## 첫번째 API 요청하기

```js
const Product = clayful.Product;

Product.list((err, products) => {

    if (err) {
        // 에러 처리..
    }
    
    console.log(products);
});
```

## 글로벌 APIs

```js
clayful.config({
    errorLanguage:   'en',    // API 에러 언어. 'ko', 'en'이 허용되며 'en'이 디폴트입니다. 한글 사용시 'ko'로 설정해주세요.
    renewTokenBefore: 60 * 5, // 언제 만료되려는 토큰을 새로 갱신할지 설정. 디폴트는 저장된 토큰 만료 300초 전에 새롭게 토큰을 갱신.
});
```

## 팁

### Promisified 버전 사용하기 (Node.js)

```js
const Clayful = require('clayful/promisified.js'); // promisified 버전 임포트

const clayful = Clayful({ ... });
const Product = clayful.Product;

Product
    .list()
    .then(products => {
        console.log(products);
    })
    .catch(err => {
        // 에러 처리..
    });
```

### ES6 비구조화 할당을 이용하여 API 모델에 접근하기

```js
const Product = clayful.Product;
const Brand = clayful.Brand;

// 는 이하와 동일합니다..

const { Product, Brand } = clayful; 
```
