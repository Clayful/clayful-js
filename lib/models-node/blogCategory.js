module.exports = request => {

	const BlogCategory = { name: 'BlogCategory' };

	BlogCategory.query = BlogCategory._query = function() {

		return request({
			modelName:      BlogCategory.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/blog/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogCategory.list = BlogCategory._list = function() {

		return request({
			modelName:      BlogCategory.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/blog/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogCategory.count = BlogCategory._count = function() {

		return request({
			modelName:      BlogCategory.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/blog/categories/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogCategory.get = BlogCategory._get = function() {

		return request({
			modelName:      BlogCategory.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/blog/categories/{blogCategoryId}',
			params:         ['blogCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogCategory.create = BlogCategory._create = function() {

		return request({
			modelName:      BlogCategory.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/blog/categories',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogCategory.update = BlogCategory._update = function() {

		return request({
			modelName:      BlogCategory.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/blog/categories/{blogCategoryId}',
			params:         ['blogCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogCategory.delete = BlogCategory._delete = function() {

		return request({
			modelName:      BlogCategory.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/blog/categories/{blogCategoryId}',
			params:         ['blogCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return BlogCategory;

};