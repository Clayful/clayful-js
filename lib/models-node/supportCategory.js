module.exports = request => {

	const SupportCategory = { name: 'SupportCategory' };

	SupportCategory.query = SupportCategory._query = function() {

		return request({
			modelName:      SupportCategory.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/support/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportCategory.list = SupportCategory._list = function() {

		return request({
			modelName:      SupportCategory.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/support/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportCategory.count = SupportCategory._count = function() {

		return request({
			modelName:      SupportCategory.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/support/categories/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportCategory.get = SupportCategory._get = function() {

		return request({
			modelName:      SupportCategory.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/support/categories/{supportCategoryId}',
			params:         ['supportCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportCategory.create = SupportCategory._create = function() {

		return request({
			modelName:      SupportCategory.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/support/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportCategory.update = SupportCategory._update = function() {

		return request({
			modelName:      SupportCategory.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/support/categories/{supportCategoryId}',
			params:         ['supportCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportCategory.delete = SupportCategory._delete = function() {

		return request({
			modelName:      SupportCategory.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/support/categories/{supportCategoryId}',
			params:         ['supportCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return SupportCategory;

};