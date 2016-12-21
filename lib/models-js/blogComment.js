module.exports = request => {

	const BlogComment = { name: 'BlogComment' };

	BlogComment.query = BlogComment._query = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/blog/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogComment.list = BlogComment._list = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/blog/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogComment.count = BlogComment._count = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/blog/posts/comments/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogComment.get = BlogComment._get = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/blog/posts/comments/{blogCommentId}',
			params:         ['blogCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogComment.queryByPost = BlogComment._queryByPost = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'queryByPost',
			httpMethod:     'GET',
			path:           '/v1/blog/posts/{blogPostId}/comments',
			params:         ['blogPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogComment.listByPost = BlogComment._listByPost = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'listByPost',
			httpMethod:     'GET',
			path:           '/v1/blog/posts/{blogPostId}/comments',
			params:         ['blogPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogComment.queryByOwner = BlogComment._queryByOwner = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'queryByOwner',
			httpMethod:     'GET',
			path:           '/v1/{ownerModel}/{ownerId}/blog/posts/comments',
			params:         ['ownerModel', 'ownerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogComment.listByOwner = BlogComment._listByOwner = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'listByOwner',
			httpMethod:     'GET',
			path:           '/v1/{ownerModel}/{ownerId}/blog/posts/comments',
			params:         ['ownerModel', 'ownerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogComment.createAsMe = BlogComment._createAsMe = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/blog/posts/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogComment.updateAsMe = BlogComment._updateAsMe = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/blog/posts/comments/{blogCommentId}',
			params:         ['blogCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogComment.flagAsMe = BlogComment._flagAsMe = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'flagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/blog/posts/comments/{blogCommentId}/flag',
			params:         ['blogCommentId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogComment.cancelFlagAsMe = BlogComment._cancelFlagAsMe = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/blog/posts/comments/{blogCommentId}/flag/cancel',
			params:         ['blogCommentId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogComment.deleteAsMe = BlogComment._deleteAsMe = function() {

		return request({
			modelName:      BlogComment.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/blog/posts/comments/{blogCommentId}',
			params:         ['blogCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return BlogComment;

};