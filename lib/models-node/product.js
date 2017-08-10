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

	Product.create = function() {

		return request({
			modelName:      Product.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.createVariant = function() {

		return request({
			modelName:      Product.name,
			methodName:     'createVariant',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/variants',
			params:         ['productId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.increaseMetafield = function() {

		return request({
			modelName:      Product.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/meta/{field}/inc',
			params:         ['productId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.pullFromMetafield = function() {

		return request({
			modelName:      Product.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/meta/{field}/pull',
			params:         ['productId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.createVariation = function() {

		return request({
			modelName:      Product.name,
			methodName:     'createVariation',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/options/{optionId}/variations',
			params:         ['productId', 'optionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.pushToMetafield = function() {

		return request({
			modelName:      Product.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/meta/{field}/push',
			params:         ['productId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.update = function() {

		return request({
			modelName:      Product.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}',
			params:         ['productId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.updateVariant = function() {

		return request({
			modelName:      Product.name,
			methodName:     'updateVariant',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/variants/{variantId}',
			params:         ['productId', 'variantId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.updateOption = function() {

		return request({
			modelName:      Product.name,
			methodName:     'updateOption',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/options/{optionId}',
			params:         ['productId', 'optionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.updateVariation = function() {

		return request({
			modelName:      Product.name,
			methodName:     'updateVariation',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/options/{optionId}/variations/{variationId}',
			params:         ['productId', 'optionId', 'variationId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.delete = function() {

		return request({
			modelName:      Product.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}',
			params:         ['productId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.deleteVariant = function() {

		return request({
			modelName:      Product.name,
			methodName:     'deleteVariant',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/variants/{variantId}',
			params:         ['productId', 'variantId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.deleteMetafield = function() {

		return request({
			modelName:      Product.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/meta/{field}',
			params:         ['productId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Product.deleteVariation = function() {

		return request({
			modelName:      Product.name,
			methodName:     'deleteVariation',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/options/{optionId}/variations/{variationId}',
			params:         ['productId', 'optionId', 'variationId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Product;

};