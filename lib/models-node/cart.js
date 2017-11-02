const assign = require('../util/assign');

module.exports = request => {

	const Cart = {
		name: 'Cart',
		path: '',
		countItemsAsMe: function() {
			return request(assign(Cart._countItemsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countItems: function() {
			return request(assign(Cart._countItems(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsNonRegistered: function() {
			return request(assign(Cart._getAsNonRegistered(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutAsNonRegistered: function() {
			return request(assign(Cart._checkoutAsNonRegistered(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsMe: function() {
			return request(assign(Cart._getAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Cart._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutAsMe: function() {
			return request(assign(Cart._checkoutAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemAsMe: function() {
			return request(assign(Cart._addItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItem: function() {
			return request(assign(Cart._addItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkout: function() {
			return request(assign(Cart._checkout(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItemAsMe: function() {
			return request(assign(Cart._updateItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItem: function() {
			return request(assign(Cart._updateItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyAsMe: function() {
			return request(assign(Cart._emptyAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		empty: function() {
			return request(assign(Cart._empty(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemAsMe: function() {
			return request(assign(Cart._deleteItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItem: function() {
			return request(assign(Cart._deleteItem(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Cart._countItemsAsMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'countItemsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/cart/items/count',
			params:         [],
		};

	};

	Cart._countItems = function() {

		return {
			modelName:      Cart.name,
			methodName:     'countItems',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/cart/items/count',
			params:         ['customerId', ],
		};

	};

	Cart._getAsNonRegistered = function() {

		return {
			modelName:      Cart.name,
			methodName:     'getAsNonRegistered',
			httpMethod:     'POST',
			path:           '/v1/cart',
			params:         [],
		};

	};

	Cart._checkoutAsNonRegistered = function() {

		return {
			modelName:      Cart.name,
			methodName:     'checkoutAsNonRegistered',
			httpMethod:     'POST',
			path:           '/v1/cart/checkout',
			params:         [],
		};

	};

	Cart._getAsMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'getAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart',
			params:         [],
		};

	};

	Cart._get = function() {

		return {
			modelName:      Cart.name,
			methodName:     'get',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/cart',
			params:         ['customerId', ],
		};

	};

	Cart._checkoutAsMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'checkoutAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart/checkout',
			params:         [],
		};

	};

	Cart._addItemAsMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'addItemAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart/items',
			params:         [],
		};

	};

	Cart._addItem = function() {

		return {
			modelName:      Cart.name,
			methodName:     'addItem',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/cart/items',
			params:         ['customerId', ],
		};

	};

	Cart._checkout = function() {

		return {
			modelName:      Cart.name,
			methodName:     'checkout',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/cart/checkout',
			params:         ['customerId', ],
		};

	};

	Cart._updateItemAsMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'updateItemAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/cart/items/{itemId}',
			params:         ['itemId', ],
		};

	};

	Cart._updateItem = function() {

		return {
			modelName:      Cart.name,
			methodName:     'updateItem',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/cart/items/{itemId}',
			params:         ['customerId', 'itemId', ],
		};

	};

	Cart._emptyAsMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'emptyAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/cart/items',
			params:         [],
		};

	};

	Cart._empty = function() {

		return {
			modelName:      Cart.name,
			methodName:     'empty',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/cart/items',
			params:         ['customerId', ],
		};

	};

	Cart._deleteItemAsMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'deleteItemAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/cart/items/{itemId}',
			params:         ['itemId', ],
		};

	};

	Cart._deleteItem = function() {

		return {
			modelName:      Cart.name,
			methodName:     'deleteItem',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/cart/items/{itemId}',
			params:         ['customerId', 'itemId', ],
		};

	};

	return Cart;

};