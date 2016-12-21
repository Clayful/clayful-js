# Clayful JavaScript/Node.js Library

[English](README.md) | [한국어](README_ko.md)

## Features

- Supports Node.js & Browsers
- Provides a promisified version
- Plugin systems for request and token storage middlewares

## Links

- [API Documentation]() 

## Prerequisite

- Create an account of [Clayful API](http://clayful.io).
- Create a store.
- Create an API client in a store with desired API access scopes
    - If you are developing for Node.js environments, create a **private client**.
    - If you are developing for browser environments, create a **public client**.

## Installation

```
npm install clayful --save
```

Or simply clone or download this repository into your project folder.

## Importing the Library

**For Node.js**
```js
const Clayful = require('clayful');

// or for promisified version
const Clayful = require('clayful/promisified.js');
```

**For browsers with browserify**
```js
const Clayful = require('clayful/dist/clayful.js');

// AJAX request middleware (import only one that you need!)
const jQueryRequestMiddleware = require('clayful/dist/request-jquery.js');
const axiosRequestMiddleware = require('clayful/dist/request-axios.js')
```

**Manually importing the library with HTML**
```html
<script src="/node_modules/clayful/dist/clayful.min.js"></script>

<!-- AJAX request middleware (import only one that you need!) -->
<script src="/node_modules/clayful/dist/request-jquery.min.js"></script>
<script src="/node_modules/clayful/dist/request-axios.min.js"></script>
```

## Configuring the Environment

**For Node.js**
```js
const clayful = Clayful({
    clientId:     '...', // your private client's client id
    clientSecret: '...'  // your private client's client secret
});
```

**For browsers**
```js
const clayful = Clayful({
   clientId: '...', // your public client's client id 
});

// install AJAX middleware (install only one that you need!)
clayful.install('request', jQueryRequestMiddleware($));    // for jQuery
clayful.install('request', axiosRequestMiddleware(axios)); // for axios
```

## Making a First Request

```js
const Product = clayful.Product;

Product.list((err, products) => {

    if (err) {
        // error handling..
    }
    
    console.log(products);
});
```

## Global APIs

```js
clayful.config({
    errorLanguage:   'en',    // A language to use for API errors. 'ko', 'en' where 'en' is default.
    renewTokenBefore: 60 * 5, // When to renew an access token. Default setting is 300 seconds before the existing token expires.
});
```

## Useful Tips

### Using a Promisified version (Node.js)

```js
const Clayful = require('clayful/promisified.js'); // import promisified version

const clayful = Clayful({ ... });
const Product = clayful.Product;

Product
    .list()
    .then(products => {
        console.log(products);
    })
    .catch(err => {
        // error handling..
    });
```

### Using ES6 destructuring assignment to access API models

```js
const Product = clayful.Product;
const Brand = clayful.Brand;

// is equals to..

const { Product, Brand } = clayful; 
```

## TODO

- Add more detailed guidelines for error handling
- Add more detailed guidelines for plugins developments - clayful.install()
- Add actual links in Links section