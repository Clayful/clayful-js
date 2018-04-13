"use strict";

const expect = require('expect.js');
const decache = require('decache');

describe('Clayful Node.js', () => {

	// Remove cache for testing
	decache('../../clayful');

	const Clayful = require('../');

	it(`should have a default request middleware (axios)`, () => {
		expect(Clayful.plugins.request).to.be.a('function');
	});

	it(`should have default headers`, () => {
		expect(Clayful.defaultHeaders).to.eql({
			'Accept-Encoding': 'gzip',
			'User-Agent':      'clayful-node',
			'Clayful-SDK':     'clayful-node'
		});
	});

	it(`should have extended models`, () => {
		expect(Clayful.Brand).to.be.an('object');
	});

});

