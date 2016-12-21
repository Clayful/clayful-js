module.exports = request => {

	const SupportPost = { name: 'SupportPost' };

	SupportPost.query = SupportPost._query = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/support/posts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportPost.list = SupportPost._list = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/support/posts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportPost.queryAsMe = SupportPost._queryAsMe = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'queryAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/support/posts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportPost.listAsMe = SupportPost._listAsMe = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'listAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/support/posts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportPost.count = SupportPost._count = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/support/posts/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.get = SupportPost._get = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/support/posts/{supportPostId}',
			params:         ['supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.queryByCustomer = SupportPost._queryByCustomer = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/support/posts',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportPost.listByCustomer = SupportPost._listByCustomer = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/support/posts',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportPost.countAsMe = SupportPost._countAsMe = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'countAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/support/posts/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.getAsMe = SupportPost._getAsMe = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'getAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/support/posts/{supportPostId}',
			params:         ['supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.queryByCategory = SupportPost._queryByCategory = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'queryByCategory',
			httpMethod:     'GET',
			path:           '/v1/support/categories/{supportCategoryId}/posts',
			params:         ['supportCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportPost.listByCategory = SupportPost._listByCategory = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'listByCategory',
			httpMethod:     'GET',
			path:           '/v1/support/categories/{supportCategoryId}/posts',
			params:         ['supportCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportPost.create = SupportPost._create = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/support/posts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.createAsMe = SupportPost._createAsMe = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/support/posts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.update = SupportPost._update = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/support/posts/{supportPostId}',
			params:         ['supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.updateAsMe = SupportPost._updateAsMe = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/support/posts/{supportPostId}',
			params:         ['supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.updateByCustomer = SupportPost._updateByCustomer = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'updateByCustomer',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/support/posts/{supportPostId}',
			params:         ['customerId', 'supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.delete = SupportPost._delete = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/support/posts/{supportPostId}',
			params:         ['supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportPost.deleteAsMe = SupportPost._deleteAsMe = function() {

		return request({
			modelName:      SupportPost.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/support/posts/{supportPostId}',
			params:         ['supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return SupportPost;

};