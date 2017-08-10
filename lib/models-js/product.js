module.exports = request => {

	const Product = {
		name: 'Product',
		path: 'products'
	};

	Product.query = function() {

		return request({
			modelName:      Product.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.list = function() {

		return request({
			modelName:      Product.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.count = function() {

		return request({
			modelName:      Product.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.get = function() {

		return request({
			modelName:      Product.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}',
			params:         ['productId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.queryByBrand = function() {

		return request({
			modelName:      Product.name,
			methodName:     'queryByBrand',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}/products',
			params:         ['brandId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.listByBrand = function() {

		return request({
			modelName:      Product.name,
			methodName:     'listByBrand',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}/products',
			params:         ['brandId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.queryByCollection = function() {

		return request({
			modelName:      Product.name,
			methodName:     'queryByCollection',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/products',
			params:         ['collectionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.listByCollection = function() {

		return request({
			modelName:      Product.name,
			methodName:     'listByCollection',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/products',
			params:         ['collectionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Product;

};