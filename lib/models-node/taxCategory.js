const assign = require('../util/assign');

module.exports = request => {

	const TaxCategory = {
		name: 'TaxCategory',
		path: 'taxes/categories',
		count: function() {
			return request(assign(TaxCategory._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(TaxCategory._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(TaxCategory._list(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	TaxCategory._list = function() {

		return {
			modelName:      TaxCategory.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories',
			params:         [],
		};

	};

	return TaxCategory;

};