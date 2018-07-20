"use strict";

const expect = require('expect.js');
const decache = require('decache');

describe('request-axios', () => {

	// Remove cache for testing
	decache('../../../clayful');

	const fs = require('fs');
	const path = require('path');
	const axios = require('axios');
	const Hapi = require('hapi');
	const Boom = require('boom');
	const FormData = require('form-data');

	const Clayful = require('../../../client-node');

	const { Review, Image } = Clayful;

	Clayful.plugins.request = require('../');

	Clayful.install('request', axios);

	Clayful.baseUrl = 'http://localhost:9999';

	const server = new Hapi.Server();

	server.connection({ port: 9999 });

	server.route([

		{
			method:  'GET',
			path:    '/v1/products/reviews/{reviewId}',
			handler: (request, reply) => reply({
				method:  request.method,
				url:     request.url,
				params:  request.params,
				headers: request.headers,
				query:   request.query
			})
		},

		{
			method:  'GET',
			path:    '/v1/products/reviews',
			handler: (request, reply) => {

				const error = Boom.badRequest('bad boy');

				error.output.payload.errorCode = 'error-code';
				error.output.payload.validation = {};

				reply(error);
			}
		},

		{
			method:  'POST',
			path:    '/v1/products/reviews',
			handler: (request, reply) => reply({
				method:  request.method,
				url:     request.url,
				params:  request.params,
				headers: request.headers,
				query:   request.query,
				payload: request.payload
			}).created('')
		},

		{
			method:  'POST',
			path:    '/v1/images',
			config:  {
				payload: {
					parse: true,
					allow: 'multipart/form-data'
				}
			},
			handler: (request, reply) => reply({
				method:  request.method,
				url:     request.url,
				params:  request.params,
				headers: request.headers,
				query:   request.query,
				payload: request.payload
			}).created('')
		},

	]);

	before(done => server.start(err => done(err)));

	it(`should make a HTTP GET request for the API`, done => {

		const queryHeaders = {
			language: 'en',
			query: {
				raw: true,
			},
		};

		Review.get('rid', queryHeaders, (err, result) => {
			expect(err).to.be(null);
			expect(result.status).to.be(200);
			expect(result.headers).to.be.an('object');
			expect(result.data.method).to.be('get');
			expect(result.data.url.href).to.be('/v1/products/reviews/rid?raw=true');
			expect(result.data.params).to.eql({ reviewId: 'rid' });
			expect(result.data.headers['accept-encoding']).to.be('gzip');
			expect(result.data.headers['accept-language']).to.be('en');
			expect(result.data.query).to.eql({ raw: 'true' });
			done();
		});

	});

	it(`should reply a clayful error when the API errs`, done => {

		Review.list((err, result) => {
			expect(err).to.be.an(Error);
			expect(err.isClayful).to.be(true);
			expect(err.model).to.be('Review');
			expect(err.method).to.be('list');
			expect(err.status).to.be(400);
			expect(err.headers).to.be.an('object');
			expect(err.code).to.be('error-code');
			expect(err.message).to.be.a('string');
			expect(err.validation).to.be.an('object');
			done();
		});

	});

	it(`should make a HTTP POST request for the API`, done => {

		const data = { name: { en: 'Review Name' } };

		const queryHeaders = {
			language: 'en',
			query: {
				raw: true,
			},
		};

		Review.create(data, queryHeaders, (err, result) => {
			expect(err).to.be(null);
			expect(result.status).to.be(201);
			expect(result.headers).to.be.an('object');
			expect(result.data.method).to.be('post');
			expect(result.data.url.href).to.be('/v1/products/reviews?raw=true');
			expect(result.data.params).to.eql({});
			expect(result.data.headers['accept-encoding']).to.be('gzip');
			expect(result.data.headers['accept-language']).to.be('en');
			expect(result.data.query).to.eql({ raw: 'true' });
			expect(result.data.payload).to.eql(data);
			done();
		});

	});

	it('should make a HTTP POST request for the API with multipart/form-data', done => {

		const data = new FormData();

		data.append('model', 'Review');
		data.append('application', 'images');
		data.append('file', fs.createReadStream(path.join(__dirname, 'blob')));

		const queryHeaders = {
			language: 'en',
			query: {
				raw: true,
			}
		};

		Image.create(data, queryHeaders, (err, result) => {
			expect(err).to.be(null);
			expect(result.status).to.be(201);
			expect(result.headers).to.be.an('object');
			expect(result.data.method).to.be('post');
			expect(result.data.url.href).to.be('/v1/images?raw=true');
			expect(result.data.params).to.eql({});
			expect(result.data.headers['accept-encoding']).to.be('gzip');
			expect(result.data.headers['accept-language']).to.be('en');
			expect(result.data.query).to.eql({ raw: 'true' });
			expect(result.data.payload.model).to.be('Review');
			expect(result.data.payload.application).to.be('images');
			expect(result.data.payload.file).to.be.an('object');
			done();
		});

	});

});

