"use strict";

const expect = require('expect.js');
const decache = require('decache');

describe('Clayful', () => {

	// Remove cache for testing
	decache('../');

	const Clayful = require('../');

	afterEach(() => {

		Clayful.listeners.request = [];
		Clayful.listeners.response = [];

	});

	describe(`.optionsToHeaders()`, () => {

		it(`should convert options to request headers`, () => {

			const headers = Clayful.optionsToHeaders({
				language:      'ko',
				currency:      'KRW',
				timeZone:      'Asia/Seoul',
				client:        '<your-api-access-token>',
				customer:      '<customer-auth-token>',
				debugLanguage: 'ko',
				headers:       {
					'X-Extra-Header': 'Value'
				},
				randomValue:   'will be ignored'
			});

			expect(headers).to.eql({
				'Accept-Language':        'ko',
				'Accept-Currency':        'KRW',
				'Accept-Time-Zone':       'Asia/Seoul',
				'Authorization':          'Bearer <your-api-access-token>',
				'Authorization-Customer': '<customer-auth-token>',
				'Accept-Debug-Language':  'ko',
				'X-Extra-Header':         'Value'
			});

		});

	});

	describe(`.getEndpoint()`, () => {

		it(`should get an API endpoint`, () => {

			expect(Clayful.baseUrl).to.be('https://api.clayful.io');
			expect(Clayful.getEndpoint('/products')).to.be(Clayful.baseUrl + '/products');

		});

	});

	describe(`.normalizeQueryValues()`, () => {

		it(`should stringify & encode query string values`, () => {

			const result = Clayful.normalizeQueryValues({
				string:  'string',
				number:  100,
				boolean: true,
				special: ' +&',
			});

			expect(result).to.eql({
				string:  'string',
				number:  '100',
				boolean: 'true',
				special: '%20%2B%26',
			});

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
						query:    { hello: 'world' },
						meta:     { data: 'data' },
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
					expect(extracted.meta).to.eql({ data: 'data' });
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
					expect(extracted.payload).to.eql(null);
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
					expect(extracted.payload).to.eql(null);
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
					expect(extracted.payload).to.eql(null);
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
				return callback(null, { response: true }); // mock response
			};

			Clayful.plugins.request = null;

			Clayful.install('request', mockRequest);

			Clayful.callAPI({
				modelName:  'Customer',
				methodName: 'query',
				httpMethod: 'GET',
				path:       '/v1/customers',
				params:     [],
				args:       [
					{
						query:    { verified: true },
						currency: 'KRW',
					},
					(err, result) => {
						expect(err).to.be(null);
						expect(result).to.eql({ response: true });
						expect(details.length).to.be(1);
						expect(details[0].requestUrl).to.be(Clayful.baseUrl + '/v1/customers');
						expect(details[0].modelName).to.be('Customer');
						expect(details[0].methodName).to.be('query');
						expect(details[0].query).to.eql({ verified: 'true' }); // stringified
						expect(details[0].headers['Accept-Currency']).to.be('KRW');
						expect(details[0].usesFormData).not.to.be.ok();
						expect(details[0].error).to.be(null);
						expect(details[0].response).to.eql({ response: true });
						expect(details[0].meta).to.eql({});
						done();
					}
				]
			});

		});

		it(`should make an API request (using form-data)`, done => {

			const details = [];

			const mockRequest = (detail, ClayfulError, callback) => {
				details.push(detail);
				return callback(null, { response: true }); // mock response
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
				args:         [
					{
						query:    { verified: true },
						currency: 'KRW',
						meta:     { page: 'customer-profile' }
					},
					(err, result) => {
						expect(err).to.be(null);
						expect(result).to.eql({ response: true });
						expect(details.length).to.be(1);
						expect(details[0].requestUrl).to.be(Clayful.baseUrl + '/v1/customers');
						expect(details[0].modelName).to.be('Customer');
						expect(details[0].methodName).to.be('query');
						expect(details[0].query).to.eql({ verified: 'true' });
						expect(details[0].headers['Accept-Currency']).to.be('KRW');
						expect(details[0].usesFormData).to.be(true);
						expect(details[0].error).to.be(null);
						expect(details[0].response).to.eql({ response: true });
						expect(details[0].meta).to.eql({ page: 'customer-profile' });
						done();
					}
				]
			});

		});

		it(`should fire 'request' event`, done => {

			const details = [];
			let fromEvent = null;

			const mockRequest = (detail, ClayfulError, callback) => {
				details.push(detail);
				return callback(null, { response: true }); // mock response
			};

			Clayful.plugins.request = null;

			Clayful.install('request', mockRequest);

			Clayful.on('request', detail => {
				fromEvent = detail;
				expect(detail.meta).to.eql({ page: 'customer-profile' });
				expect(detail.error).to.be(null);
				expect(detail.response).to.be(null);
			});

			Clayful.callAPI({
				modelName:    'Customer',
				methodName:   'query',
				httpMethod:   'GET',
				path:         '/v1/customers',
				params:       [],
				args:         [
					{
						query:    { verified: true },
						currency: 'KRW',
						meta:     { page: 'customer-profile' }
					},
					(err, result) => {
						expect(err).to.be(null);
						expect(result).to.eql({ response: true });
						expect(details[0]).to.be(fromEvent);
						done();
					}
				]
			});

		});

		it(`should fire 'response' event (request success)`, done => {

			const details = [];
			let fromEvent = null;

			const mockRequest = (detail, ClayfulError, callback) => {
				details.push(detail);
				return callback(null, { response: true }); // mock response
			};

			Clayful.plugins.request = null;

			Clayful.install('request', mockRequest);

			Clayful.on('request', detail => {
				expect(detail.meta).to.eql({ page: 'customer-profile' });
				expect(detail.error).to.be(null);
				expect(detail.response).to.be(null);
				// set an additional field to test
				detail.meta.requestEventCalled = true;
			});

			Clayful.on('response', detail => {
				fromEvent = detail;
				expect(detail.meta).to.eql({
					page: 'customer-profile',
					requestEventCalled: true
				});
				expect(detail.error).to.be(null);
				expect(detail.response).to.eql({ response: true }); // with response
			});

			Clayful.callAPI({
				modelName:    'Customer',
				methodName:   'query',
				httpMethod:   'GET',
				path:         '/v1/customers',
				params:       [],
				args:         [
					{
						query:    { verified: true },
						currency: 'KRW',
						meta:     { page: 'customer-profile' }
					},
					(err, result) => {
						expect(err).to.be(null);
						expect(result).to.eql({ response: true });
						expect(details[0]).to.be(fromEvent);
						done();
					}
				]
			});

		});

		it(`should fire 'response' event (request fail, ClayfulError)`, done => {

			const details = [];
			let fromEvent = null;

			const mockRequest = (detail, ClayfulError, callback) => {
				details.push(detail);
				return callback(new ClayfulError());
			};

			Clayful.plugins.request = null;

			Clayful.install('request', mockRequest);

			Clayful.on('request', detail => {
				expect(detail.meta).to.eql({ page: 'customer-profile' });
				expect(detail.error).to.be(null);
				expect(detail.response).to.be(null);
				// set an additional field to test
				detail.meta.requestEventCalled = true;
			});

			Clayful.on('response', detail => {
				fromEvent = detail;
				expect(detail.meta).to.eql({
					page: 'customer-profile',
					requestEventCalled: true
				});
				expect(detail.error.isClayful).to.be(true);
				expect(detail.response).to.be(null);
			});

			Clayful.callAPI({
				modelName:    'Customer',
				methodName:   'query',
				httpMethod:   'GET',
				path:         '/v1/customers',
				params:       [],
				usesFormData: true,
				args:         [
					{
						query:    { verified: true },
						currency: 'KRW',
						meta:     { page: 'customer-profile' }
					},
					(err, result) => {
						expect(err.isClayful).to.be(true);
						expect(result).to.be(null);
						expect(details[0]).to.be(fromEvent);
						done();
					}
				]
			});

		});

		it(`shouldn't fire 'response' event (request fail, not a ClayfulError)`, done => {

			const called = {
				request:  false,
				response: false
			};

			const mockRequest = (detail, ClayfulError, callback) => {
				return callback(new Error('Regular error'));
			};

			Clayful.plugins.request = null;

			Clayful.install('request', mockRequest);

			Clayful.on('request', detail => called.request = true);
			Clayful.on('response', detail => called.response = true);

			Clayful.callAPI({
				modelName:    'Customer',
				methodName:   'query',
				httpMethod:   'GET',
				path:         '/v1/customers',
				params:       [],
				args:         [
					(err, result) => {
						expect(err).to.be.an(Error);
						expect(result).to.be(null);
						expect(called).to.eql({
							request:  true,
							response: false,
						});
						done();
					}
				]
			});

		});

	});

	describe(`.request()`, () => {

		let callAPI = null;

		before(() => {
			// Set mock `callAPI()` for tests.
			callAPI = Clayful.callAPI;
			Clayful.callAPI = detail => detail;
			// Set models
			Clayful.setModels(require('../../models-node'));
		});

		after(() => Clayful.callAPI = callAPI);

		it(`should throw when the API module isn't defined`, () => {

			expect(function() {
				Clayful.request({});
			}).to.throwError();

		});

		it(`should throw when a model for the API module doesn't exist`, () => {

			expect(function() {
				Clayful.request({
					module: 'NotExisting.get'
				});
			}).to.throwError();

		});

		it(`should throw when the API module doesn't exist`, () => {

			expect(function() {
				Clayful.request({
					module: 'Product.notExisting'
				});
			}).to.throwError();

		});

		it(`should have default values for options, params, query, header, payload`, () => {

			const called = Clayful.request({
				module: 'Review.update'
			});

			expect(called.args).to.eql([
				'',              // URL param 1 becomes ''
				null,            // Payload becomes {}
				{                // Options becomes { ... }
					query:   {}, // Query becomes {}
					headers: {}  // Headers becomes {}
				}
			]);

		});

		it(`should build arguments for a GET request`, () => {

			const callback = () => {};

			const called = Clayful.request({
				module: 'Product.get',
				params: {
					productId: 'pid'
				},
				options: {
					customer: 'customer'
				},
				query: {
					raw: true
				},
				headers: {
					Authorization: 'Bearer token'
				}
			}, callback);

			expect(called.httpMethod).to.be('GET');
			expect(called.modelName).to.be('Product');
			expect(called.methodName).to.be('get');
			expect(called.args).to.eql([
				'pid', // URL param
				{      // Query & Headers
					customer: 'customer',
					query: {
						raw: true
					},
					headers: {
						Authorization: 'Bearer token'
					}
				},
				callback
			]);

		});

		it(`should build arguments for a DELETE request`, () => {

			const callback = () => {};

			const called = Clayful.request({
				module: 'Review.delete',
				params: {
					reviewId: 'rid'
				},
				options: {
					customer: 'customer'
				},
				query: {
					raw: true
				},
				headers: {
					Authorization: 'Bearer token'
				}
			}, callback);

			expect(called.httpMethod).to.be('DELETE');
			expect(called.modelName).to.be('Review');
			expect(called.methodName).to.be('delete');
			expect(called.args).to.eql([
				'rid', // URL param
				{      // Query & Headers
					customer: 'customer',
					query: {
						raw: true
					},
					headers: {
						Authorization: 'Bearer token'
					}
				},
				callback
			]);

		});

		it(`should build arguments for a POST request`, () => {

			const callback = () => {};

			const called = Clayful.request({
				module: 'Review.create',
				options: {
					customer: 'customer'
				},
				payload: {
					product: 'productId'
				},
				query: {
					raw: true
				},
				headers: {
					Authorization: 'Bearer token'
				}
			}, callback);

			expect(called.httpMethod).to.be('POST');
			expect(called.modelName).to.be('Review');
			expect(called.methodName).to.be('create');
			expect(called.args).to.eql([
				// Payload
				{ product: 'productId' },
				// Query & Headers
				{
					customer: 'customer',
					query: {
						raw: true
					},
					headers: {
						Authorization: 'Bearer token'
					}
				},
				callback
			]);

		});

		it(`should build arguments for a PUT request`, () => {

			const callback = () => {};

			const called = Clayful.request({
				module: 'Review.update',
				options: {
					customer: 'customer'
				},
				params: {
					reviewId: 'rid'
				},
				payload: {
					title: 'New Title'
				},
				query: {
					raw: true
				},
				headers: {
					Authorization: 'Bearer token'
				}
			}, callback);

			expect(called.httpMethod).to.be('PUT');
			expect(called.modelName).to.be('Review');
			expect(called.methodName).to.be('update');
			expect(called.args).to.eql([
				// URL Param 1
				'rid',
				// Payload
				{ title: 'New Title' },
				// Query & Headers
				{
					customer: 'customer',
					query: {
						raw: true
					},
					headers: {
						Authorization: 'Bearer token'
					}
				},
				callback
			]);

		});

		it(`should omit payload argument when 'withoutPayload' option is true`, () => {

			const callback = () => {};

			const called = Clayful.request({
				module: 'Review.flagForMe',
				options: {
					customer: 'customer'
				},
				params: {
					reviewId: 'rid'
				},
				query: {
					raw: true
				},
				headers: {
					Authorization: 'Bearer token'
				}
			}, callback);

			expect(called.httpMethod).to.be('POST');
			expect(called.modelName).to.be('Review');
			expect(called.methodName).to.be('flagForMe');
			expect(called.args).to.eql([
				// URL Param 1
				'rid',
				// Query & Headers
				{
					customer: 'customer',
					query: {
						raw: true
					},
					headers: {
						Authorization: 'Bearer token'
					}
				},
				callback
			]);

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
				debugLanguage: 'ko',
			});

			expect(Clayful.defaultHeaders).to.eql({
				'Accept-Language':        'ko',
				'Accept-Currency':        'KRW',
				'Accept-Time-Zone':       'Asia/Seoul',
				'Authorization':          'Bearer <your-api-access-token>',
				'Authorization-Customer': '<customer-auth-token>',
				'Accept-Debug-Language':  'ko',
				'X-Random':               1
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

	describe(`.on()`, () => {

		it(`should add an event listener`, () => {

			const request = () => {};
			const response = () => {};

			Clayful.on('request', request);
			Clayful.on('response', response);

			expect(Clayful.listeners.request[0]).to.be(request);
			expect(Clayful.listeners.response[0]).to.be(response);

		});

	});

	describe(`.off()`, () => {

		it(`should remove an event listener`, () => {

			const request = () => {};
			const response = () => {};

			Clayful.on('request', request);
			Clayful.on('response', response);

			expect(Clayful.listeners.request[0]).to.be(request);
			expect(Clayful.listeners.response[0]).to.be(response);

			Clayful.off('request', request);
			Clayful.off('response', response);

			expect(Clayful.listeners.request).to.have.length(0);
			expect(Clayful.listeners.response).to.have.length(0);

		});

	});

	describe(`.trigger()`, () => {

		it(`should trigger an event listener`, done => {

			const request = data => {
				expect(data).to.eql({ data: 'data' });
				done();
			};

			Clayful.on('request', request);

			Clayful.trigger('request', { data: 'data' });

		});

	});

	describe(`.formatImageUrl()`, () => {

		it(`should return the original URL when there are no options`, () => {

			const url = 'http://clayful.io';

			expect(Clayful.formatImageUrl(url)).to.be(url);
			expect(Clayful.formatImageUrl(url, {})).to.be(url);

		});

		it(`should return a formatted url`, () => {

			const url = 'http://clayful.io';

			expect(Clayful.formatImageUrl(url, { width: 120 })).to.be(url + '?width=120');
			expect(Clayful.formatImageUrl(url, { width: 120, height: 120 })).to.be(url + '?width=120&height=120');

		});

	});

	describe(`.formatNumber()`, () => {

		it(`should return an empty string if a number is not provided`, () => {

			expect(Clayful.formatNumber()).to.be('');

		});

		it(`should return the original number as a string`, () => {

			const num = 1234567.25;

			expect(Clayful.formatNumber(num)).to.be('1234567.25');
			expect(Clayful.formatNumber(num, {})).to.be('1234567.25');

		});

		it(`should return a formatted number`, () => {

			const cases = [
				// precision tests
				{
					in:      0.250,
					out:     '0.25'
				},
				{
					options: { precision: 0 },
					in:      0,
					out:     '0'
				},
				{
					options: { precision: 0 },
					in:      1234567.25,
					out:     '1234567'
				},
				{
					options: { precision: 1 },
					in:      1234567.24,
					out:     '1234567.2' // rounded
				},
				{
					options: { precision: 1 },
					in:      1234567.25,
					out:     '1234567.3' // rounded
				},
				{
					options: { precision: 2 },
					in:      1234567.25,
					out:     '1234567.25'
				},
				{
					options: { precision: 3 },
					in:      1234567.25,
					out:     '1234567.250'
				},
				{
					options: { precision: 0 },
					in:      1234567,
					out:     '1234567'
				},
				{
					options: { precision: 3 },
					in:      1234567,
					out:     '1234567.000'
				},
				// delimiter tests
				{
					options: {
						precision: 3
					},
					in:  1234567.25,
					out: '1234567.250'
				},
				{
					options: {
						precision: 3,
						delimiter: {}
					},
					in:  1234567.25,
					out: '1234567.250'
				},
				{
					options: {
						precision: 3,
						delimiter: {
							thousands: ','
						}
					},
					in:  1234567.25,
					out: '1,234,567.250'
				},
				{
					options: {
						precision: 3,
						delimiter: {
							thousands: ' ',
							decimal:   ','
						}
					},
					in:  1234567.25,
					out: '1 234 567,250'
				},
			];

			cases.forEach(c => {
				expect(Clayful.formatNumber(c.in, c.options)).to.be(c.out);
			});

		});

	});

	describe(`.formatPrice()`, () => {

		it(`should return an empty string if a number is not provided`, () => {

			expect(Clayful.formatPrice()).to.be('');

		});

		it(`should return the original number as a string`, () => {


			expect(Clayful.formatPrice(0)).to.be('0');
			expect(Clayful.formatPrice(0, {})).to.be('0');
			expect(Clayful.formatPrice(1234567.25)).to.be('1234567.25');
			expect(Clayful.formatPrice(1234567.25, {})).to.be('1234567.25');

		});

		it(`should return a formatted number`, () => {

			const num = 1234567.25;

			const cases = [
				{
					options: {
						symbol:    '$',
						format:    '{symbol}{price}',
						precision: 2,
						delimiter: {
							thousands: ',',
							decimal:   '.'
						}
					},
					out:     '$1,234,567.25'
				},
				{
					options: {
						symbol:    '원',
						format:    '{price}{symbol}',
						precision: 0,
						delimiter: {
							thousands: ',',
							decimal:   '.'
						}
					},
					out:     '1,234,567원'
				},
			];

			cases.forEach(c => {
				expect(Clayful.formatPrice(num, c.options)).to.be(c.out);
			});

		});

	});

});

