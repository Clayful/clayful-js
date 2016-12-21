module.exports = request => {

	const Customer = { name: 'Customer' };

	Customer.getMe = Customer._getMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'getMe',
			httpMethod:     'GET',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.countItemsAsMe = Customer._countItemsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'countItemsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/cart/items/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.signup = Customer._signup = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'signup',
			httpMethod:     'POST',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.auth = Customer._auth = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'auth',
			httpMethod:     'POST',
			path:           '/v1/customers/auth',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.signout = Customer._signout = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'signout',
			httpMethod:     'POST',
			path:           '/v1/me/signout',
			params:         [],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.requestVerificationEmail = Customer._requestVerificationEmail = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'requestVerificationEmail',
			httpMethod:     'POST',
			path:           '/v1/customers/verifications/emails',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.verify = Customer._verify = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'verify',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/verify',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.addItemAsMe = Customer._addItemAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'addItemAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart/items',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.resetPassword = Customer._resetPassword = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'resetPassword',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/password/reset',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.getCartByNonRegistered = Customer._getCartByNonRegistered = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'getCartByNonRegistered',
			httpMethod:     'PUT',
			path:           '/v1/cart',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.updateMe = Customer._updateMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'updateMe',
			httpMethod:     'PUT',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.getCartAsMe = Customer._getCartAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'getCartAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/cart',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.updateItemAsMe = Customer._updateItemAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'updateItemAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/cart/items/{itemId}',
			params:         ['itemId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.deleteMe = Customer._deleteMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteMe',
			httpMethod:     'DELETE',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.deleteCouponAsMe = Customer._deleteCouponAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteCouponAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/coupons/{couponId}',
			params:         ['couponId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.deleteItemAsMe = Customer._deleteItemAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteItemAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/cart/items/{itemId}',
			params:         ['itemId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Customer;

};