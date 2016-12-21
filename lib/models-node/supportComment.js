module.exports = request => {

	const SupportComment = { name: 'SupportComment' };

	SupportComment.query = SupportComment._query = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/support/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportComment.list = SupportComment._list = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/support/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportComment.queryAsMe = SupportComment._queryAsMe = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'queryAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/support/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportComment.listAsMe = SupportComment._listAsMe = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'listAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/support/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportComment.count = SupportComment._count = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/support/posts/comments/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.get = SupportComment._get = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/support/posts/comments/{supportCommentId}',
			params:         ['supportCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.queryByPost = SupportComment._queryByPost = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'queryByPost',
			httpMethod:     'GET',
			path:           '/v1/support/posts/{supportPostId}/comments',
			params:         ['supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportComment.listByPost = SupportComment._listByPost = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'listByPost',
			httpMethod:     'GET',
			path:           '/v1/support/posts/{supportPostId}/comments',
			params:         ['supportPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportComment.countAsMe = SupportComment._countAsMe = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'countAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/support/posts/comments/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.getAsMe = SupportComment._getAsMe = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'getAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/support/posts/comments/{supportCommentId}',
			params:         ['supportCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.queryByOwner = SupportComment._queryByOwner = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'queryByOwner',
			httpMethod:     'GET',
			path:           '/v1/{ownerModel}/{ownerId}/support/posts/comments',
			params:         ['ownerModel', 'ownerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportComment.listByOwner = SupportComment._listByOwner = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'listByOwner',
			httpMethod:     'GET',
			path:           '/v1/{ownerModel}/{ownerId}/support/posts/comments',
			params:         ['ownerModel', 'ownerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	SupportComment.create = SupportComment._create = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/support/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.createAsMe = SupportComment._createAsMe = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/support/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.update = SupportComment._update = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/support/posts/comments/{supportCommentId}',
			params:         ['supportCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.updateAsMe = SupportComment._updateAsMe = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/support/posts/comments/{supportCommentId}',
			params:         ['supportCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.updateByOwner = SupportComment._updateByOwner = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'updateByOwner',
			httpMethod:     'PUT',
			path:           '/v1/{ownerModel}/{ownerId}/support/posts/comments/{supportCommentId}',
			params:         ['ownerModel', 'ownerId', 'supportCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.delete = SupportComment._delete = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/support/posts/comments/{supportCommentId}',
			params:         ['supportCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	SupportComment.deleteAsMe = SupportComment._deleteAsMe = function() {

		return request({
			modelName:      SupportComment.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/support/posts/comments/{supportCommentId}',
			params:         ['supportCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return SupportComment;

};