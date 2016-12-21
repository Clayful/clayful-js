module.exports = request => {

	const TaxCategory = { name: 'TaxCategory' };

	TaxCategory.query = TaxCategory._query = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	TaxCategory.list = TaxCategory._list = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	TaxCategory.count = TaxCategory._count = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	TaxCategory.get = TaxCategory._get = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories/{taxCategoryId}',
			params:         ['taxCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return TaxCategory;

};