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
		create: function() {
			return request(assign(Product._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createVariant: function() {
			return request(assign(Product._createVariant(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Product._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Product._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		createVariation: function() {
			return request(assign(Product._createVariation(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Product._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Product._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateOption: function() {
			return request(assign(Product._updateOption(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateVariant: function() {
			return request(assign(Product._updateVariant(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateVariation: function() {
			return request(assign(Product._updateVariation(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Product._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Product._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteVariant: function() {
			return request(assign(Product._deleteVariant(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteVariation: function() {
			return request(assign(Product._deleteVariation(), { args: Array.prototype.slice.call(arguments) }));
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

	Product._create = function() {

		return {
			modelName:      Product.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products',
			params:         [],
		};

	};

	Product._createVariant = function() {

		return {
			modelName:      Product.name,
			methodName:     'createVariant',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/variants',
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

	Product._pullFromMetafield = function() {

		return {
			modelName:      Product.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/meta/{field}/pull',
			params:         ['productId', 'field', ],
		};

	};

	Product._createVariation = function() {

		return {
			modelName:      Product.name,
			methodName:     'createVariation',
			httpMethod:     'POST',
			path:           '/v1/products/{productId}/options/{optionId}/variations',
			params:         ['productId', 'optionId', ],
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

	Product._update = function() {

		return {
			modelName:      Product.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}',
			params:         ['productId', ],
		};

	};

	Product._updateOption = function() {

		return {
			modelName:      Product.name,
			methodName:     'updateOption',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/options/{optionId}',
			params:         ['productId', 'optionId', ],
		};

	};

	Product._updateVariant = function() {

		return {
			modelName:      Product.name,
			methodName:     'updateVariant',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/variants/{variantId}',
			params:         ['productId', 'variantId', ],
		};

	};

	Product._updateVariation = function() {

		return {
			modelName:      Product.name,
			methodName:     'updateVariation',
			httpMethod:     'PUT',
			path:           '/v1/products/{productId}/options/{optionId}/variations/{variationId}',
			params:         ['productId', 'optionId', 'variationId', ],
		};

	};

	Product._delete = function() {

		return {
			modelName:      Product.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}',
			params:         ['productId', ],
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

	Product._deleteVariant = function() {

		return {
			modelName:      Product.name,
			methodName:     'deleteVariant',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/variants/{variantId}',
			params:         ['productId', 'variantId', ],
		};

	};

	Product._deleteVariation = function() {

		return {
			modelName:      Product.name,
			methodName:     'deleteVariation',
			httpMethod:     'DELETE',
			path:           '/v1/products/{productId}/options/{optionId}/variations/{variationId}',
			params:         ['productId', 'optionId', 'variationId', ],
		};

	};

	return Product;

};