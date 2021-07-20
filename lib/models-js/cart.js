const assign = require('../util/assign');

module.exports = request => {

	const Cart = {
		name: 'Cart',
		path: '',
		addItemForMe: function() {
			return request(assign(Cart._addItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutAsNonRegisteredForMe: function() {
			return request(assign(Cart._checkoutAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutForMe: function() {
			return request(assign(Cart._checkoutForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countItemsForMe: function() {
			return request(assign(Cart._countItemsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemForMe: function() {
			return request(assign(Cart._deleteItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyForMe: function() {
			return request(assign(Cart._emptyForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsNonRegisteredForMe: function() {
			return request(assign(Cart._getAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Cart._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItemForMe: function() {
			return request(assign(Cart._updateItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Cart._countItemsForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'countItemsForMe',
			httpMethod:     'GET',
			path:           '/v1/me/cart/items/count',
			params:         [],
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

	Cart._emptyForMe = function() {

		return {
			modelName:      Cart.name,
			methodName:     'emptyForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/cart/items',
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