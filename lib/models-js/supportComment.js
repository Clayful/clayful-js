module.exports = request => {

	const SupportComment = { name: 'SupportComment' };

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