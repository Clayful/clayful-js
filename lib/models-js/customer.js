module.exports = request => {

	const Customer = {
		name: 'Customer',
		path: 'customers'
	};

	Customer.getMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'getMe',
			httpMethod:     'GET',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.queryCouponsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listCouponsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.countCouponsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'countCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.signup = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'signup',
			httpMethod:     'POST',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.auth = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'auth',
			httpMethod:     'POST',
			path:           '/v1/customers/auth',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.requestVerificationEmail = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'requestVerificationEmail',
			httpMethod:     'POST',
			path:           '/v1/customers/verifications/emails',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.verify = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'verify',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/verify',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.resetPassword = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'resetPassword',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/password/reset',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.updateMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'updateMe',
			httpMethod:     'PUT',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.updateCredentialsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'updateCredentialsAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/credentials',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.deleteMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteMe',
			httpMethod:     'DELETE',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.deleteCouponAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteCouponAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/coupons/{couponId}',
			params:         ['couponId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Customer;

};