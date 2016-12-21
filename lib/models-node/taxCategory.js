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


	TaxCategory.create = TaxCategory._create = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/taxes/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	TaxCategory.update = TaxCategory._update = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/taxes/categories/{taxCategoryId}',
			params:         ['taxCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	TaxCategory.delete = TaxCategory._delete = function() {

		return request({
			modelName:      TaxCategory.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/taxes/categories/{taxCategoryId}',
			params:         ['taxCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return TaxCategory;

};