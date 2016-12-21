"use strict";

const expect = require('expect.js');

describe('token-memory-storage', () => {

	const TokenStorage = require('../');

	describe(`.setToken()`, () => {

		it(`should set token details`, () => {

			const storage = new TokenStorage();

			expect(storage.token).to.be(null);
			expect(storage.tokenExpiresAt).to.be(null);

			const detail = {
				token: 'token',
				tokenExpiresAt: Date.now() + 1000
			};

			storage.setToken(detail);

			expect(storage.token).to.be(detail.token);
			expect(storage.tokenExpiresAt).to.be(detail.tokenExpiresAt);

		});

	});

	describe(`.getToken()`, () => {

		it(`should get token details`, () => {

			const storage = new TokenStorage();

			expect(storage.token).to.be(null);
			expect(storage.tokenExpiresAt).to.be(null);

			const detail = {
				token: 'token',
				tokenExpiresAt: Date.now() + 1000
			};

			storage.setToken(detail);

			expect(storage.getToken()).to.eql(detail);

		});

	});

});

