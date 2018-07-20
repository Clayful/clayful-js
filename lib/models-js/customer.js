const assign = require('../util/assign');

module.exports = request => {

	const Customer = {
		name: 'Customer',
		path: 'customers',
		getMe: function() {
			return request(assign(Customer._getMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		isAuthenticated: function() {
			return request(assign(Customer._isAuthenticated(), { args: Array.prototype.slice.call(arguments) }));
		},
		listCouponsForMe: function() {
			return request(assign(Customer._listCouponsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countCouponsForMe: function() {
			return request(assign(Customer._countCouponsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createMe: function() {
			return request(assign(Customer._createMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function() {
			return request(assign(Customer._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticateBy3rdParty: function() {
			return request(assign(Customer._authenticateBy3rdParty(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestVerificationEmail: function() {
			return request(assign(Customer._requestVerificationEmail(), { args: Array.prototype.slice.call(arguments) }));
		},
		verify: function() {
			return request(assign(Customer._verify(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateMe: function() {
			return request(assign(Customer._updateMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCredentialsForMe: function() {
			return request(assign(Customer._updateCredentialsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		resetPassword: function() {
			return request(assign(Customer._resetPassword(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMe: function() {
			return request(assign(Customer._deleteMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteCouponForMe: function() {
			return request(assign(Customer._deleteCouponForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Customer._getMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'getMe',
			httpMethod:     'GET',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._isAuthenticated = function() {

		return {
			modelName:      Customer.name,
			methodName:     'isAuthenticated',
			httpMethod:     'GET',
			path:           '/v1/customers/auth',
			params:         [],
		};

	};

	Customer._listCouponsForMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listCouponsForMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
		};

	};

	Customer._countCouponsForMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'countCouponsForMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons/count',
			params:         [],
		};

	};

	Customer._createMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'createMe',
			httpMethod:     'POST',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._authenticate = function() {

		return {
			modelName:      Customer.name,
			methodName:     'authenticate',
			httpMethod:     'POST',
			path:           '/v1/customers/auth',
			params:         [],
		};

	};

	Customer._authenticateBy3rdParty = function() {

		return {
			modelName:      Customer.name,
			methodName:     'authenticateBy3rdParty',
			httpMethod:     'POST',
			path:           '/v1/customers/auth/{vendor}',
			params:         ['vendor', ],
			withoutPayload: true,
		};

	};

	Customer._requestVerificationEmail = function() {

		return {
			modelName:      Customer.name,
			methodName:     'requestVerificationEmail',
			httpMethod:     'POST',
			path:           '/v1/customers/verifications/emails',
			params:         [],
		};

	};

	Customer._verify = function() {

		return {
			modelName:      Customer.name,
			methodName:     'verify',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/verified',
			params:         ['customerId', ],
		};

	};

	Customer._updateMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'updateMe',
			httpMethod:     'PUT',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._updateCredentialsForMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'updateCredentialsForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/credentials',
			params:         [],
		};

	};

	Customer._resetPassword = function() {

		return {
			modelName:      Customer.name,
			methodName:     'resetPassword',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/password',
			params:         ['customerId', ],
		};

	};

	Customer._deleteMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteMe',
			httpMethod:     'DELETE',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._deleteCouponForMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteCouponForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/coupons/{couponId}',
			params:         ['couponId', ],
		};

	};

	return Customer;

};