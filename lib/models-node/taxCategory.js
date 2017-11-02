const assign = require('../util/assign');

module.exports = request => {

	const TaxCategory = {
		name: 'TaxCategory',
		path: 'taxes/categories',
		query: function() {
			return request(assign(TaxCategory._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(TaxCategory._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(TaxCategory._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(TaxCategory._get(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	TaxCategory._query = function() {

		return {
			modelName:      TaxCategory.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories',
			params:         [],
		};

	};

	TaxCategory._list = function() {

		return {
			modelName:      TaxCategory.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories',
			params:         [],
		};

	};

	TaxCategory._count = function() {

		return {
			modelName:      TaxCategory.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories/count',
			params:         [],
		};

	};

	TaxCategory._get = function() {

		return {
			modelName:      TaxCategory.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories/{taxCategoryId}',
			params:         ['taxCategoryId', ],
		};

	};

	return TaxCategory;

};