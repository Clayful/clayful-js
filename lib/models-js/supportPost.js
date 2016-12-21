module.exports = request => {

	const SupportPost = { name: 'SupportPost' };

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