"use strict";

const expect = require('expect.js');

describe('request-axios', () => {

	const axios = require('axios');
	const Hapi = require('hapi');
	const Boom = require('boom');
	const FormData = require('form-data');

	const request = require('../')(axios);
	const ClayfulError = require('../../../clayful-error');

	const requestUrl = path => 'http://localhost:9999' + path;

	const server = new Hapi.Server();

	server.connection({ port:  9999 });

	server.route([

		{
			method:  'GET',
			path:    '/greeting',
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
			path:    '/greeting/error',
			handler: (request, reply) => {

				const error = Boom.badRequest('bad boy');

				error.output.payload.errorCode = 'e-rror-code';

				reply(error);
			}
		},

		{
			method:  'POST',
			path:    '/greeting',
			handler: (request, reply) => reply({
				method:  request.method,
				url:     request.url,
				params:  request.params,
				headers: request.headers,
				query:   request.query,
				payload: request.payload
			})
		},

		{
			method:  'POST',
			path:    '/greeting/multipart',
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
			})
		},

	]);

	before(done => server.start(err => done(err)));

	it('should return ClayfulError if response error status is equal or greater than 400', done => {

		const detail = {
			modelName:  'Product',
			methodName: 'list',
			httpMethod: 'GET',
			requestUrl: requestUrl('/greeting/error'),
		};

		request(detail, ClayfulError, (err, result) => {

			expect(err.isClayful).to.be(true);
			expect(err.model).to.be('Product');
			expect(err.method).to.be('list');
			expect(err.status).to.be(400);
			expect(err.code).to.be('e-rror-code');
			expect(err.message).to.be('bad boy');

			done();

		});

	});

	it('should should handle GET', done => {

		const detail = {
			httpMethod: 'GET',
			requestUrl: requestUrl('/greeting'),
			query:      {
				hello: 'world'
			},
			headers:    {
				awesome: 'header'
			}
		};

		request(detail, ClayfulError, (err, result) => {

			expect(err).to.be(null);
			expect(result.method).to.be('get');
			expect(result.url.pathname).to.be('/greeting');
			expect(result.query.hello).to.be('world');
			expect(result.headers.awesome).to.be('header');
			done();

		});

	});

	it('should should handle POST (with simple json payload)', done => {

		const detail = {
			httpMethod: 'POST',
			requestUrl: requestUrl('/greeting'),
			query:      {
				hello: 'world'
			},
			headers:    {
				awesome: 'header'
			},
			payload:    {
				some: 'action'
			}

		};

		request(detail, ClayfulError, (err, result) => {

			expect(err).to.be(null);
			expect(result.method).to.be('post');
			expect(result.url.pathname).to.be('/greeting');
			expect(result.query.hello).to.be('world');
			expect(result.headers.awesome).to.be('header');
			expect(result.payload.some).to.be('action');
			done();

		});

	});

	it('should should handle POST (multipart form data)', done => {

		const data = new FormData();

		data.append('hello', 'form');
		data.append('file', new Buffer('Blob'));

		const detail = {
			httpMethod: 'POST',
			requestUrl: requestUrl('/greeting/multipart'),
			payload:    data,
			headers:    data.getHeaders()
		};

		request(detail, ClayfulError, (err, result) => {
			expect(err).to.be(null);
			expect(result.method).to.be('post');
			expect(result.url.pathname).to.be('/greeting/multipart');
			expect(result.headers['content-type'].startsWith('multipart/form-data')).to.be(true);
			expect(result.payload.hello).to.be('form');
			expect(result.payload.file).to.be('Blob');
			done();
		});

	});

});

