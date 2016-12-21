module.exports = request => {

	const Product = { name: 'Product' };

	Product.query = Product._query = function() {

		return request({
			modelName:      Product.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.list = Product._list = function() {

		return request({
			modelName:      Product.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.count = Product._count = function() {

		return request({
			modelName:      Product.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.get = Product._get = function() {

		return request({
			modelName:      Product.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.queryByBrand = Product._queryByBrand = function() {

		return request({
			modelName:      Product.name,
			methodName:     'queryByBrand',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}/products',
			params:         ['brandId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.listByBrand = Product._listByBrand = function() {

		return request({
			modelName:      Product.name,
			methodName:     'listByBrand',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}/products',
			params:         ['brandId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.queryByCollection = Product._queryByCollection = function() {

		return request({
			modelName:      Product.name,
			methodName:     'queryByCollection',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/products',
			params:         ['collectionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.listByCollection = Product._listByCollection = function() {

		return request({
			modelName:      Product.name,
			methodName:     'listByCollection',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/products',
			params:         ['collectionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Product;

};