const assign = require('../util/assign');

module.exports = request => {

	const Cart = {
		name: 'Cart',
		path: '',
		addItem: function() {
			return request(assign(Cart._addItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemForMe: function() {
			return request(assign(Cart._addItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkout: function() {
			return request(assign(Cart._checkout(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutAsNonRegistered: function() {
			return request(assign(Cart._checkoutAsNonRegistered(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutAsNonRegisteredForMe: function() {
			return request(assign(Cart._checkoutAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutForMe: function() {
			return request(assign(Cart._checkoutForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countItems: function() {
			return request(assign(Cart._countItems(), { args: Array.prototype.slice.call(arguments) }));
		},
		countItemsForMe: function() {
			return request(assign(Cart._countItemsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItem: function() {
			return request(assign(Cart._deleteItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemForMe: function() {
			return request(assign(Cart._deleteItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		empty: function() {
			return request(assign(Cart._empty(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyForMe: function() {
			return request(assign(Cart._emptyForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Cart._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsNonRegistered: function() {
			return request(assign(Cart._getAsNonRegistered(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsNonRegisteredForMe: function() {
			return request(assign(Cart._getAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Cart._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItem: function() {
			return request(assign(Cart._updateItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItemForMe: function() {
			return request(assign(Cart._updateItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Cart._addItemForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'addItemForMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart/items',
			params:         [],
		};

	};

	Cart._checkout = function() {

		return {
			modelName:      Cart.name,
			methodName:     'checkout',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/cart/checkout/{type}',
			params:         ['customerId', 'type', ],
		};

	};

	Cart._checkoutAsNonRegistered = function() {

		return {
			modelName:      Cart.name,
			methodName:     'checkoutAsNonRegistered',
			httpMethod:     'POST',
			path:           '/v1/customers/non-registered/cart/checkout/{type}',
			params:         ['type', ],
		};

	};

	Cart._checkoutAsNonRegisteredForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'checkoutAsNonRegisteredForMe',
			httpMethod:     'POST',
			path:           '/v1/me/non-registered/cart/checkout/{type}',
			params:         ['type', ],
		};

	};

	Cart._checkoutForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'checkoutForMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart/checkout/{type}',
			params:         ['type', ],
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

	Cart._countItemsForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'countItemsForMe',
			httpMethod:     'GET',
			path:           '/v1/me/cart/items/count',
			params:         [],
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

	Cart._deleteItemForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'deleteItemForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/cart/items/{itemId}',
			params:         ['itemId', ],
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

	Cart._emptyForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'emptyForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/cart/items',
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

	Cart._getAsNonRegistered = function() {

		return {
			modelName:      Cart.name,
			methodName:     'getAsNonRegistered',
			httpMethod:     'POST',
			path:           '/v1/customers/non-registered/cart',
			params:         [],
		};

	};

	Cart._getAsNonRegisteredForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'getAsNonRegisteredForMe',
			httpMethod:     'POST',
			path:           '/v1/me/non-registered/cart',
			params:         [],
		};

	};

	Cart._getForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'getForMe',
			httpMethod:     'POST',
			path:           '/v1/me/cart',
			params:         [],
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

	Cart._updateItemForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'updateItemForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/cart/items/{itemId}',
			params:         ['itemId', ],
		};

	};

	return Cart;

};