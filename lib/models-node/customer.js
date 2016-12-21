module.exports = request => {

	const Customer = { name: 'Customer' };

	Customer.query = Customer._query = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/customers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.list = Customer._list = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/customers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

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


	Customer.count = Customer._count = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/customers/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.get = Customer._get = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.queryByGroup = Customer._queryByGroup = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryByGroup',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}/customers',
			params:         ['groupId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listByGroup = Customer._listByGroup = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listByGroup',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}/customers',
			params:         ['groupId'],
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


	Customer.countItems = Customer._countItems = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'countItems',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/cart/items/count',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Customer.create = Customer._create = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/customers',
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


	Customer.createVerification = Customer._createVerification = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'createVerification',
			httpMethod:     'POST',
			path:           '/v1/customers/verifications',
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


	Customer.addCouponToCustomers = Customer._addCouponToCustomers = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'addCouponToCustomers',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/customers',
			params:         ['couponId'],
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


	Customer.addCoupon = Customer._addCoupon = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'addCoupon',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/coupons',
			params:         ['customerId'],
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


	Customer.addItem = Customer._addItem = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'addItem',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/cart/items',
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


	Customer.update = Customer._update = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId'],
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


	Customer.getCart = Customer._getCart = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'getCart',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/cart',
			params:         ['customerId'],
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


	Customer.updateItem = Customer._updateItem = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'updateItem',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/cart/items/{itemId}',
			params:         ['customerId', 'itemId'],
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


	Customer.delete = Customer._delete = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId'],
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


	Customer.deleteCoupon = Customer._deleteCoupon = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteCoupon',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/coupons/{couponId}',
			params:         ['customerId', 'couponId'],
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


	Customer.deleteItem = Customer._deleteItem = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteItem',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/cart/items/{itemId}',
			params:         ['customerId', 'itemId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Customer;

};