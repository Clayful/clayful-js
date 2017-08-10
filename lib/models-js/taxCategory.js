module.exports = request => {

	const TaxCategory = {
		name: 'TaxCategory',
		path: 'taxes/categories'
	};

	TaxCategory.query = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	TaxCategory.list = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	TaxCategory.count = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	TaxCategory.get = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/taxes/categories/{taxCategoryId}',
			params:         ['taxCategoryId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return TaxCategory;

};