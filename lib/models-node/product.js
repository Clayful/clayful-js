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

	Product.create = Product._create = function() {

		return request({
			modelName:      Product.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.addVariant = Product._addVariant = function() {

		return request({
			modelName:      Product.name,
			methodName:     'addVariant',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/variants',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.addOption = Product._addOption = function() {

		return request({
			modelName:      Product.name,
			methodName:     'addOption',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/options',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.addVariation = Product._addVariation = function() {

		return request({
			modelName:      Product.name,
			methodName:     'addVariation',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/options/{optionId}/variations',
			params:         ['productId', 'optionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.update = Product._update = function() {

		return request({
			modelName:      Product.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.updateVariant = Product._updateVariant = function() {

		return request({
			modelName:      Product.name,
			methodName:     'updateVariant',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/variants/{variantId}',
			params:         ['productId', 'variantId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.updateOption = Product._updateOption = function() {

		return request({
			modelName:      Product.name,
			methodName:     'updateOption',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/options/{optionId}',
			params:         ['productId', 'optionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.updateVariation = Product._updateVariation = function() {

		return request({
			modelName:      Product.name,
			methodName:     'updateVariation',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/options/{optionId}/variations/{variationId}',
			params:         ['productId', 'optionId', 'variationId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.delete = Product._delete = function() {

		return request({
			modelName:      Product.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.deleteVariant = Product._deleteVariant = function() {

		return request({
			modelName:      Product.name,
			methodName:     'deleteVariant',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/variants/{variantId}',
			params:         ['productId', 'variantId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.deleteOption = Product._deleteOption = function() {

		return request({
			modelName:      Product.name,
			methodName:     'deleteOption',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/options/{optionId}',
			params:         ['productId', 'optionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.deleteMeta = Product._deleteMeta = function() {

		return request({
			modelName:      Product.name,
			methodName:     'deleteMeta',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/meta/{field}',
			params:         ['productId', 'field'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Product.deleteVariation = Product._deleteVariation = function() {

		return request({
			modelName:      Product.name,
			methodName:     'deleteVariation',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/options/{optionId}/variations/{variationId}',
			params:         ['productId', 'optionId', 'variationId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Product;

};