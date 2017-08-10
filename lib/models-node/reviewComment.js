module.exports = request => {

	const ReviewComment = {
		name: 'ReviewComment',
		path: 'products/reviews/comments'
	};

	ReviewComment.query = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.list = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.count = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.get = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.queryByReview = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'queryByReview',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}/comments',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.listByReview = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'listByReview',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}/comments',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.queryByAuthor = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'queryByAuthor',
			httpMethod:     'GET',
			path:           '/v1/{authorModel}/{authorId}/products/reviews/comments',
			params:         ['authorModel', 'authorId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.listByAuthor = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'listByAuthor',
			httpMethod:     'GET',
			path:           '/v1/{authorModel}/{authorId}/products/reviews/comments',
			params:         ['authorModel', 'authorId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.create = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.createAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.flag = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'flag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/flag',
			params:         ['reviewCommentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.flagAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'flagAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}/flag',
			params:         ['reviewCommentId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.cancelFlag = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'cancelFlag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params:         ['reviewCommentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.cancelFlagAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params:         ['reviewCommentId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.increaseMetafield = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}/inc',
			params:         ['reviewCommentId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.pushToMetafield = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}/push',
			params:         ['reviewCommentId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.pullFromMetafield = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}/pull',
			params:         ['reviewCommentId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.update = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.updateAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.updateAsAuthor = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'updateAsAuthor',
			httpMethod:     'PUT',
			path:           '/v1/{authorModel}/{authorId}/products/reviews/comments/{reviewCommentId}',
			params:         ['authorModel', 'authorId', 'reviewCommentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.delete = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.deleteAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.deleteMetafield = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}',
			params:         ['reviewCommentId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return ReviewComment;

};