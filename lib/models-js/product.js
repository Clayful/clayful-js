const assign = require('../util/assign');

module.exports = request => {

	const Product = {
		name: 'Product',
		path: 'products',
		count: function() {
			return request(assign(Product._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Product._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Product._list(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Product._list = function() {

		return {
			modelName:      Product.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products',
			params:         [],
		};

	};

	return Product;

};