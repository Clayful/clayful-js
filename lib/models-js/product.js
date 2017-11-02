const assign = require('../util/assign');

module.exports = request => {

	const Product = {
		name: 'Product',
		path: 'products',
		query: function() {
			return request(assign(Product._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Product._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Product._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Product._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByBrand: function() {
			return request(assign(Product._queryByBrand(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByBrand: function() {
			return request(assign(Product._listByBrand(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCollection: function() {
			return request(assign(Product._queryByCollection(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCollection: function() {
			return request(assign(Product._listByCollection(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Product._query = function() {

		return {
			modelName:      Product.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products',
			params:         [],
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

	Product._queryByBrand = function() {

		return {
			modelName:      Product.name,
			methodName:     'queryByBrand',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}/products',
			params:         ['brandId', ],
		};

	};

	Product._listByBrand = function() {

		return {
			modelName:      Product.name,
			methodName:     'listByBrand',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}/products',
			params:         ['brandId', ],
		};

	};

	Product._queryByCollection = function() {

		return {
			modelName:      Product.name,
			methodName:     'queryByCollection',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/products',
			params:         ['collectionId', ],
		};

	};

	Product._listByCollection = function() {

		return {
			modelName:      Product.name,
			methodName:     'listByCollection',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/products',
			params:         ['collectionId', ],
		};

	};

	return Product;

};