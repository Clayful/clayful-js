const assign = require('../util/assign');

module.exports = request => {

	const Product = {
		name: 'Product',
		path: 'products',
		list: function() {
			return request(assign(Product._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Product._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Product._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Product._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Product._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Product._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Product._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Product._list = function() {

		return {
			modelName:      Product.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products',
			params:         [],
		};

	};

	Product._count = function() {

		return {
			modelName:      Product.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/count',
			params:         [],
		};

	};

	Product._get = function() {

		return {
			modelName:      Product.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}',
			params:         ['productId', ],
		};

	};

	Product._increaseMetafield = function() {

		return {
			modelName:      Product.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/meta/{field}/inc',
			params:         ['productId', 'field', ],
		};

	};

	Product._pushToMetafield = function() {

		return {
			modelName:      Product.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/meta/{field}/push',
			params:         ['productId', 'field', ],
		};

	};

	Product._pullFromMetafield = function() {

		return {
			modelName:      Product.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/meta/{field}/pull',
			params:         ['productId', 'field', ],
		};

	};

	Product._deleteMetafield = function() {

		return {
			modelName:      Product.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/meta/{field}',
			params:         ['productId', 'field', ],
		};

	};

	return Product;

};