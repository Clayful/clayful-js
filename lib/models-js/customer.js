const assign = require('../util/assign');

module.exports = request => {

	const Customer = {
		name: 'Customer',
		path: 'customers',
		getMe: function() {
			return request(assign(Customer._getMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryCouponsAsMe: function() {
			return request(assign(Customer._queryCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listCouponsAsMe: function() {
			return request(assign(Customer._listCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countCouponsAsMe: function() {
			return request(assign(Customer._countCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		signup: function() {
			return request(assign(Customer._signup(), { args: Array.prototype.slice.call(arguments) }));
		},
		auth: function() {
			return request(assign(Customer._auth(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestVerificationEmail: function() {
			return request(assign(Customer._requestVerificationEmail(), { args: Array.prototype.slice.call(arguments) }));
		},
		verify: function() {
			return request(assign(Customer._verify(), { args: Array.prototype.slice.call(arguments) }));
		},
		resetPassword: function() {
			return request(assign(Customer._resetPassword(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateMe: function() {
			return request(assign(Customer._updateMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCredentialsAsMe: function() {
			return request(assign(Customer._updateCredentialsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMe: function() {
			return request(assign(Customer._deleteMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteCouponAsMe: function() {
			return request(assign(Customer._deleteCouponAsMe(), { args: Array.prototype.slice.call(arguments) }));
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

	Customer._queryCouponsAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'queryCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
		};

	};

	Customer._listCouponsAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
		};

	};

	Customer._countCouponsAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'countCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons/count',
			params:         [],
		};

	};

	Customer._signup = function() {

		return {
			modelName:      Customer.name,
			methodName:     'signup',
			httpMethod:     'POST',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._auth = function() {

		return {
			modelName:      Customer.name,
			methodName:     'auth',
			httpMethod:     'POST',
			path:           '/v1/customers/auth',
			params:         [],
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
			path:           '/v1/customers/{customerId}/verify',
			params:         ['customerId', ],
		};

	};

	Customer._resetPassword = function() {

		return {
			modelName:      Customer.name,
			methodName:     'resetPassword',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/password/reset',
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

	Customer._updateCredentialsAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'updateCredentialsAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/credentials',
			params:         [],
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

	Customer._deleteCouponAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteCouponAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/coupons/{couponId}',
			params:         ['couponId', ],
		};

	};

	return Customer;

};