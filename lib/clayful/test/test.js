"use strict";

const expect = require('expect.js');

describe('clayful', () => {

	const ClayfulFactory = require('../');

	describe(`constructor()`, () => {

		it(`should extend with models`, () => {

			const models = () => ({
				Brand:   {},
				Product: {},
			});

			const instance = ClayfulFactory(models, {});

			expect(instance.Brand).to.eql({});
			expect(instance.Product).to.eql({});

		});

		it(`should set credentials`, () => {

			const credentials = {
				clientId:     'cid',
				clientSecret: 'secret'
			};

			const instance = ClayfulFactory(() => ({}), credentials);

			expect(instance.credentials.customer).to.be(null);
			expect(instance.credentials.clientId).to.be(credentials.clientId);
			expect(instance.credentials.clientSecret).to.be(credentials.clientSecret);

		});

	});

	describe(`.config()`, () => {

		it(`should configure instance`, () => {

			const models = () => ({
				Brand:   {},
				Product: {},
			});

			const credentials = {
				clientId:     'cid',
				clientSecret: 'secret'
			};

			const instance = ClayfulFactory(models, credentials);

			expect(instance.options).to.eql({
				baseUrl:         'https://api.clayful.io',
				errorLanguage:   'en',
				renewTokenBefore: 60 * 5,
				extraHeaders:     {}
			});

			const config = {
				baseUrl:          'url',
				errorLanguage:    'ko',
				renewTokenBefore: 10,
				extraHeaders:     {
					Custom: 'Header'
				}
			};

			instance.config(config);

			expect(instance.options).to.eql(config);

		});

	});

	describe(`.install()`, () => {

		it(`should install plugins`, () => {

			const models = () => ({
				Brand:   {},
				Product: {},
			});

			const credentials = {
				clientId:     'cid',
				clientSecret: 'secret'
			};

			const instance = ClayfulFactory(models, credentials);

			const tokenStorage = {};
			const request = () => {};

			instance.install('tokenStorage', tokenStorage);
			instance.install('request', request);

			expect(instance.plugins.tokenStorage).to.be(tokenStorage);
			expect(instance.plugins.request).to.be(request);

		});

	});

	describe(`.models()`, () => {

		it(`should return model list`, () => {

			const models = () => ({
				Brand:   {},
				Product: {},
			});

			const credentials = {
				clientId:     'cid',
				clientSecret: 'secret'
			};

			const instance = ClayfulFactory(models, credentials);

			expect(instance.models().sort()).to.eql(['Brand', 'Product']);

		});

	});

	describe(`.customer()`, () => {

		it(`should set customer token`, () => {

			const models = () => ({});

			const credentials = {};

			const instance = ClayfulFactory(models, credentials);

			expect(instance.credentials.customer).to.be(null);

			instance.customer('customer-token');

			expect(instance.credentials.customer).to.be('customer-token');

		});

	});

	describe(`.getEndpoint()`, () => {

		it(`should get an api endpoint`, () => {

			const models = () => ({
				Brand:   {},
				Product: {},
			});

			const credentials = {
				clientId:     'cid',
				clientSecret: 'secret'
			};

			const instance = ClayfulFactory(models, credentials);

			expect(instance.getEndpoint('/token')).to.be(instance.options.baseUrl + '/token');

		});

	});

	describe(`.getDefaultHeaders()`, () => {

		const models = () => ({});

		const credentials = {
			clientId:     'cid',
			clientSecret: 'secret'
		};

		const instance = ClayfulFactory(models, credentials);

		instance.install('tokenStorage', {
			getToken: () => ({ token: 'token' })
		});

		it(`should get default headers (without authorization)`, () => {

			const headers = instance.getDefaultHeaders();

			expect(headers).to.only.have.keys([
				'X-Clayful-Error-Language'
			]);

			expect(headers['X-Clayful-Error-Language']).to.be(instance.options.errorLanguage);

		});

		it(`should get default headers (with authorization)`, () => {

			const headers = instance.getDefaultHeaders(true);

			expect(headers).to.only.have.keys([
				'Authorization',
				'X-Clayful-Error-Language'
			]);

			expect(headers['Authorization']).to.be('Bearer token');
			expect(headers['X-Clayful-Error-Language']).to.be(instance.options.errorLanguage);

		});

		it(`should get default headers (with customer authorization)`, () => {

			instance.customer('customer-token');

			const headers = instance.getDefaultHeaders();

			expect(headers).to.only.have.keys([
				'X-Clayful-Error-Language',
				'X-Clayful-Customer-Authorization'
			]);

			expect(headers['X-Clayful-Error-Language']).to.be(instance.options.errorLanguage);
			expect(headers['X-Clayful-Customer-Authorization']).to.be('customer-token');

		});

	});

	describe(`.shouldRenewToken()`, () => {

		const models = () => ({});

		const credentials = {
			clientId:     'cid',
			clientSecret: 'secret'
		};

		const instance = ClayfulFactory(models, credentials);

		it(`should renew token if authorization token doesn't exist`, () => {

			instance.install('tokenStorage', {
				getToken: () => null
			});

			expect(instance.shouldRenewToken()).to.be(true);

		});

		it(`should renew token if authorization token is about to expire`, () => {

			instance.config({
				renewTokenBefore: 5
			});

			instance.install('tokenStorage', {
				getToken: () => ({
					token:          'token',
					tokenExpiresAt: Date.now() + 3000 // expires in 3 seconds
				})
			});

			expect(instance.shouldRenewToken()).to.be(true);

		});

		it(`shouldn't renew token if authorization token won't be expired in configured seconds`, () => {

			instance.config({
				renewTokenBefore: 5
			});

			instance.install('tokenStorage', {
				getToken: () => ({
					token:          'token',
					tokenExpiresAt: Date.now() + 10000 // expires in 10 seconds
				})
			});

			expect(instance.shouldRenewToken()).to.be(false);

		});

	});

	describe(`.extractRequestArguments()`, () => {

		const models = () => ({});

		const credentials = {
			clientId:     'cid',
			clientSecret: 'secret'
		};

		const instance = ClayfulFactory(models, credentials);

		instance.install('tokenStorage', {
			getToken: () => ({
				token:          'token',
				tokenExpiresAt: Date.now() + 10000 // expires in 10 seconds
			})
		});

		['GET', 'DELETE'].forEach(httpMethod => {

			describe(httpMethod, () => {

				it(`(...params, payload, queryHeaders, callback)`, done => {

					const queryHeaders = {
						query:   { hello: 'world' },
						headers: { Hello: 'World' }
					};

					const options = {
						modelName:      'Customer',
						methodName:     'get',
						httpMethod:     httpMethod,
						path:           '/v1/customers/{customerId}',
						params:         ['customerId'],
						args:           ['id', queryHeaders, done]
					};

					const extracted = instance.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/customers/id');
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql(queryHeaders.headers);
					expect(extracted.callback).to.be(done);

					done();

				});

				it(`(...params, queryHeaders)`, done => {

					const queryHeaders = {
						query:   { hello: 'world' },
						headers: { Hello: 'World' }
					};

					const options = {
						modelName:      'Customer',
						methodName:     'get',
						httpMethod:     httpMethod,
						path:           '/v1/customers/{customerId}',
						params:         ['customerId'],
						args:           ['id', queryHeaders]
					};

					const extracted = instance.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/customers/id');
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql(queryHeaders.headers);
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

				it(`(...params)`, done => {

					const options = {
						modelName:      'Customer',
						methodName:     'get',
						httpMethod:     httpMethod,
						path:           '/v1/customers/{customerId}',
						params:         ['customerId'],
						args:           ['id']
					};

					const extracted = instance.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/customers/id');
					expect(extracted.query).to.eql({});
					expect(extracted.headers).to.eql({});
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

			});

		});

		['POST', 'PUT'].forEach(httpMethod => {

			describe(httpMethod, () => {

				it(`(...params, payload, queryHeaders, callback)`, done => {

					const queryHeaders = {
						query:   { hello: 'world' },
						headers: { Hello: 'World' }
					};

					const payload = {
						sku: 'new-sku'
					};

					const options = {
						modelName:      'Product',
						methodName:     'updateVariant',
						httpMethod:     httpMethod,
						path:           '/v1/products/{productId}/variants/{variantId}',
						params:         ['productId', 'variantId'],
						args:           ['pid', 'vid', payload, queryHeaders, done]
					};

					const extracted = instance.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(payload);
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql(queryHeaders.headers);
					expect(extracted.callback).to.be(done);

					done();

				});

				it(`(...params, payload, queryHeaders)`, done => {

					const queryHeaders = {
						query:   { hello: 'world' },
						headers: { Hello: 'World' }
					};

					const payload = {
						sku: 'new-sku'
					};

					const options = {
						modelName:      'Product',
						methodName:     'updateVariant',
						httpMethod:     httpMethod,
						path:           '/v1/products/{productId}/variants/{variantId}',
						params:         ['productId', 'variantId'],
						args:           ['pid', 'vid', payload, queryHeaders]
					};

					const extracted = instance.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(payload);
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql(queryHeaders.headers);
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

				it(`(...params, payload)`, done => {

					const payload = {
						sku: 'new-sku'
					};

					const options = {
						modelName:      'Product',
						methodName:     'updateVariant',
						httpMethod:     httpMethod,
						path:           '/v1/products/{productId}/variants/{variantId}',
						params:         ['productId', 'variantId'],
						args:           ['pid', 'vid', payload]
					};

					const extracted = instance.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(payload);
					expect(extracted.query).to.eql({});
					expect(extracted.headers).to.eql({});
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

				it(`(...params, queryHeaders) - { withoutPayload: true }`, done => {

					const queryHeaders = {
						query:   { hello: 'world' },
						headers: { Hello: 'World' }
					};

					const options = {
						modelName:      'Product',
						methodName:     'updateVariant',
						httpMethod:     httpMethod,
						path:           '/v1/products/{productId}/variants/{variantId}',
						params:         ['productId', 'variantId'],
						args:           ['pid', 'vid', queryHeaders],
						withoutPayload: true
					};

					const extracted = instance.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(undefined);
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql(queryHeaders.headers);
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

				it(`(...params)`, done => {

					const options = {
						modelName:      'Product',
						methodName:     'updateVariant',
						httpMethod:     httpMethod,
						path:           '/v1/products/{productId}/variants/{variantId}',
						params:         ['productId', 'variantId'],
						args:           ['pid', 'vid']
					};

					const extracted = instance.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.be(undefined);
					expect(extracted.query).to.eql({});
					expect(extracted.headers).to.eql({});
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

			});

		});

		it(`should extract and set customer token to headers`, done => {

			const queryHeaders = {
				query:   { hello: 'world' },
				headers: { Hello: 'World' },
				customer: 'implicitly-set-customer-token'
			};

			const options = {
				modelName:      'Customer',
				methodName:     'get',
				httpMethod:     'GET',
				path:           '/v1/customers/{customerId}',
				params:         ['customerId'],
				args:           ['id', queryHeaders, done]
			};

			const extracted = instance.extractRequestArguments(options);

			expect(extracted.httpMethod).to.be('GET');
			expect(extracted.requestUrl).to.be('/v1/customers/id');
			expect(extracted.query).to.eql(queryHeaders.query);
			expect(extracted.headers.Hello).to.be(queryHeaders.headers.Hello);
			expect(extracted.headers['X-Clayful-Customer-Authorization']).to.be('implicitly-set-customer-token');
			expect(extracted.callback).to.be(done);

			done();

		});

	});

	describe(`.callAPI()`, () => {

		const models = () => ({});

		const credentials = {
			clientId:     'cid',
			clientSecret: 'secret'
		};

		const mockStorage = {
			token: null,
			setToken: token => mockStorage.token = token,
			getToken: () => mockStorage.token
		};

		const instance = ClayfulFactory(models, credentials);

		instance.install('tokenStorage', mockStorage);

		it(`should first authenticate and make an API request`, done => {

			const details = [];

			const mockRequest = (detail, ClayfulError, callback) => {

				details.push(detail);

				return callback(null, detail);

			};

			instance.install('request', mockRequest);

			instance.authenticate = callback => {

				return callback(null, {
					access_token: 'fake-token',
					expires_in:   1 // expires in one second
				});
			};

			instance.callAPI({
				modelName:  'Customer',
				methodName: 'query',
				httpMethod: 'GET',
				path:       '/v1/customers',
				params:     [],
				args:       [(err, result) => {

					expect(details.length).to.be(1);
					expect(details[0]).to.be(result);
					// Token details should be saved
					expect(mockStorage.token.token).to.be('fake-token');
					expect(mockStorage.token.tokenExpiresAt).to.be.a('number');
					done();

				}]
			});

		});

		it(`should make an API request without pre-flight authentication`, done => {

			const details = [];

			const mockRequest = (detail, ClayfulError, callback) => {

				details.push(detail);

				return callback(null, detail);

			};

			instance.install('request', mockRequest);

			// Extend token expiration
			mockStorage.token.tokenExpiresAt = Date.now() + (1000 * 60 * 60);

			instance.authenticate = callback => {

				// If authenticate() is called, this test will fail
				expect(1).to.be(2);
			};

			instance.callAPI({
				modelName:  'Customer',
				methodName: 'query',
				httpMethod: 'GET',
				path:       '/v1/customers',
				params:     [],
				args:       [(err, result) => {

					expect(details.length).to.be(1);
					expect(details[0]).to.be(result);
					// Token details should be saved
					expect(mockStorage.token.token).to.be('fake-token');
					expect(mockStorage.token.tokenExpiresAt).to.be.a('number');
					done();

				}]
			});

		});

	});

});

