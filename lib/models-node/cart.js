module.exports = request => {

	const Cart = {
		name: 'Cart',
		path: ''
	};

	Cart.countItemsAsMe = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'countItemsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/cart/items/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.countItems = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'countItems',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/cart/items/count',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.getAsNonRegistered = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'getAsNonRegistered',
			httpMethod:     'POST',
			path:           '/v1/cart',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.checkoutAsNonRegistered = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'checkoutAsNonRegistered',
			httpMethod:     'POST',
			path:           '/v1/cart/checkout',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.getAsMe = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'getAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.get = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'get',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/cart',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.checkoutAsMe = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'checkoutAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart/checkout',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.addItemAsMe = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'addItemAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart/items',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.addItem = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'addItem',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/cart/items',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.checkout = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'checkout',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/cart/checkout',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.updateItemAsMe = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'updateItemAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/cart/items/{itemId}',
			params:         ['itemId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.updateItem = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'updateItem',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/cart/items/{itemId}',
			params:         ['customerId', 'itemId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.emptyAsMe = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'emptyAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/cart/items',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.empty = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'empty',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/cart/items',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.deleteItemAsMe = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'deleteItemAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/cart/items/{itemId}',
			params:         ['itemId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Cart.deleteItem = function() {

		return request({
			modelName:      Cart.name,
			methodName:     'deleteItem',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/cart/items/{itemId}',
			params:         ['customerId', 'itemId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Cart;

};