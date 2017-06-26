"use strict";

const expect = require('expect.js');
const decache = require('decache');

describe('Clayful', () => {

	// Remove cache for testing
	decache('../');

	const Clayful = require('../');

	describe(`.optionsToHeaders()`, () => {

		it(`should convert options to request headers`, () => {

			const headers = Clayful.optionsToHeaders({
				language:      'ko',
				currency:      'KRW',
				timeZone:      'Asia/Seoul',
				client:        '<your-api-access-token>',
				customer:      '<customer-auth-token>',
				errorLanguage: 'ko',
				headers:       {
					'X-Extra-Header': 'Value'
				},
				randomValue:   'will be ignored'
			});

			expect(headers).to.eql({
				'Accept-Language':                  'ko',
				'Accept-Currency':                  'KRW',
				'Accept-Time-Zone':                 'Asia/Seoul',
				'Authorization':                    'Bearer <your-api-access-token>',
				'X-Clayful-Customer-Authorization': 'Bearer <customer-auth-token>',
				'X-Clayful-Error-Language':         'ko',
				'X-Extra-Header':                   'Value'
			});

		});

	});

	describe(`.getEndpoint()`, () => {

		it(`should get an API endpoint`, () => {

			expect(Clayful.baseUrl).to.be('https://api.clayful.io');
			expect(Clayful.getEndpoint('/products')).to.be(Clayful.baseUrl + '/products');

		});

	});

	describe(`.extractRequestArguments()`, () => {

		['GET', 'DELETE'].forEach(httpMethod => {

			describe(httpMethod, () => {

				it(`(...params, queryHeaders, callback)`, done => {

					const queryHeaders = {
						language: 'ko',
						query:   { hello: 'world' },
					};

					const options = {
						modelName:      'Customer',
						methodName:     'get',
						httpMethod:     httpMethod,
						path:           '/v1/customers/{customerId}',
						params:         ['customerId'],
						args:           ['id', queryHeaders, done]
					};

					const extracted = Clayful.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/customers/id');
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql({ 'Accept-Language': 'ko' });
					expect(extracted.callback).to.be(done);

					done();

				});

				it(`(...params, queryHeaders)`, done => {

					const queryHeaders = {
						language: 'ko',
						query:   { hello: 'world' },
					};

					const options = {
						modelName:      'Customer',
						methodName:     'get',
						httpMethod:     httpMethod,
						path:           '/v1/customers/{customerId}',
						params:         ['customerId'],
						args:           ['id', queryHeaders]
					};

					const extracted = Clayful.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/customers/id');
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql({ 'Accept-Language': 'ko' });
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

				it(`(...params, callback)`, done => {

					const options = {
						modelName:      'Customer',
						methodName:     'get',
						httpMethod:     httpMethod,
						path:           '/v1/customers/{customerId}',
						params:         ['customerId'],
						args:           ['id', done]
					};

					const extracted = Clayful.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/customers/id');
					expect(extracted.query).to.eql({});
					expect(extracted.headers).to.eql({});
					expect(extracted.callback).to.be(done);

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

					const extracted = Clayful.extractRequestArguments(options);

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
						language: 'ko',
						query:   { hello: 'world' },
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

					const extracted = Clayful.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(payload);
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql({ 'Accept-Language': 'ko' });
					expect(extracted.callback).to.be(done);

					done();

				});

				it(`(...params, payload, queryHeaders)`, done => {

					const queryHeaders = {
						language: 'ko',
						query:   { hello: 'world' },
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

					const extracted = Clayful.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(payload);
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql({ 'Accept-Language': 'ko' });
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

				it(`(...params, payload, callback)`, done => {

					const payload = {
						sku: 'new-sku'
					};

					const options = {
						modelName:      'Product',
						methodName:     'updateVariant',
						httpMethod:     httpMethod,
						path:           '/v1/products/{productId}/variants/{variantId}',
						params:         ['productId', 'variantId'],
						args:           ['pid', 'vid', payload, done]
					};

					const extracted = Clayful.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(payload);
					expect(extracted.query).to.eql({});
					expect(extracted.headers).to.eql({});
					expect(extracted.callback).to.be(done);

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

					const extracted = Clayful.extractRequestArguments(options);

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
						language: 'ko',
						query:   { hello: 'world' },
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

					const extracted = Clayful.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(undefined);
					expect(extracted.query).to.eql(queryHeaders.query);
					expect(extracted.headers).to.eql({ 'Accept-Language': 'ko' });
					expect(extracted.callback).to.be.a('function'); // default emptry callback

					done();

				});

				it(`(...params, callback) - { withoutPayload: true }`, done => {

					const options = {
						modelName:      'Product',
						methodName:     'updateVariant',
						httpMethod:     httpMethod,
						path:           '/v1/products/{productId}/variants/{variantId}',
						params:         ['productId', 'variantId'],
						args:           ['pid', 'vid', done],
						withoutPayload: true
					};

					const extracted = Clayful.extractRequestArguments(options);

					expect(extracted.httpMethod).to.be(httpMethod);
					expect(extracted.requestUrl).to.be('/v1/products/pid/variants/vid');
					expect(extracted.payload).to.eql(undefined);
					expect(extracted.query).to.eql({});
					expect(extracted.headers).to.eql({});
					expect(extracted.callback).to.be(done);

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

					const extracted = Clayful.extractRequestArguments(options);

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

	});

	describe(`.callAPI()`, () => {

		it(`should make an API request (not using form-data)`, done => {

			const details = [];

			const mockRequest = (detail, ClayfulError, callback) => {
				details.push(detail);
				return callback(null, detail);
			};

			Clayful.plugins.request = null;

			Clayful.install('request', mockRequest);

			Clayful.callAPI({
				modelName:  'Customer',
				methodName: 'query',
				httpMethod: 'GET',
				path:       '/v1/customers',
				params:     [],
				args:       [ { query: { verified: true }, currency: 'KRW' }, (err, result) => {
					expect(details.length).to.be(1);
					expect(details[0]).to.be(result);
					expect(details[0].requestUrl).to.be(Clayful.baseUrl + '/v1/customers');
					expect(details[0].modelName).to.be('Customer');
					expect(details[0].methodName).to.be('query');
					expect(details[0].query).to.eql({ verified: true });
					expect(details[0].headers['Accept-Currency']).to.be('KRW');
					expect(details[0].usesFormData).not.to.be.ok();
					done();
				}]
			});

		});

		it(`should make an API request (using form-data)`, done => {

			const details = [];

			const mockRequest = (detail, ClayfulError, callback) => {
				details.push(detail);
				return callback(null, detail);
			};

			Clayful.plugins.request = null;

			Clayful.install('request', mockRequest);

			Clayful.callAPI({
				modelName:    'Customer',
				methodName:   'query',
				httpMethod:   'GET',
				path:         '/v1/customers',
				params:       [],
				usesFormData: true,
				args:         [ { query: { verified: true }, currency: 'KRW' }, (err, result) => {
					expect(details.length).to.be(1);
					expect(details[0]).to.be(result);
					expect(details[0].requestUrl).to.be(Clayful.baseUrl + '/v1/customers');
					expect(details[0].modelName).to.be('Customer');
					expect(details[0].methodName).to.be('query');
					expect(details[0].query).to.eql({ verified: true });
					expect(details[0].headers['Accept-Currency']).to.be('KRW');
					expect(details[0].usesFormData).to.be(true);
					done();
				}]
			});

		});


	});

	describe(`.setModels()`, () => {

		it(`should extend with model APIs and add .models() method`, () => {

			const models = () => ({
				Brand:   {},
				Product: {},
			});

			Clayful.setModels(models);

			expect(Clayful.Brand).to.be.an('object');
			expect(Clayful.Product).to.be.an('object');

			expect(Clayful.models().sort()).to.eql(['Brand', 'Product']);

		});

	});

	describe(`.config()`, () => {

		it(`should configure the client and set default headers`, () => {

			Clayful.defaultHeaders = {
				'X-Random': 1
			};

			Clayful.config({
				language:      'ko',
				currency:      'KRW',
				timeZone:      'Asia/Seoul',
				client:        '<your-api-access-token>',
				customer:      '<customer-auth-token>',
				errorLanguage: 'ko',
			});

			expect(Clayful.defaultHeaders).to.eql({
				'Accept-Language':                  'ko',
				'Accept-Currency':                  'KRW',
				'Accept-Time-Zone':                 'Asia/Seoul',
				'Authorization':                    'Bearer <your-api-access-token>',
				'X-Clayful-Customer-Authorization': 'Bearer <customer-auth-token>',
				'X-Clayful-Error-Language':         'ko',
				'X-Random':                         1
			});

		});

	});

	describe(`.install()`, () => {

		it(`should install a plugin`, done => {

			Clayful.plugins.request = null;

			const pluginOption = {};

			const requestMiddleware = options => {
				expect(options).to.be(pluginOption);
				done();
			};

			Clayful.install('request', requestMiddleware);

			// Install the middleware as a factory function
			expect(Clayful.plugins.request).to.be(requestMiddleware);

			// Use the factory function with middleware options
			Clayful.install('request', pluginOption);

		});

	});

});

