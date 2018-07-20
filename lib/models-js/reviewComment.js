const assign = require('../util/assign');

module.exports = request => {

	const ReviewComment = {
		name: 'ReviewComment',
		path: 'products/reviews/comments',
		list: function() {
			return request(assign(ReviewComment._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(ReviewComment._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(ReviewComment._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(ReviewComment._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagForMe: function() {
			return request(assign(ReviewComment._flagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(ReviewComment._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(ReviewComment._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagForMe: function() {
			return request(assign(ReviewComment._cancelFlagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	ReviewComment._list = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments',
			params:         [],
		};

	};

	ReviewComment._count = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments/count',
			params:         [],
		};

	};

	ReviewComment._get = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
		};

	};

	ReviewComment._createForMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'createForMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments',
			params:         [],
		};

	};

	ReviewComment._flagForMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'flagForMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}/flags',
			params:         ['reviewCommentId', ],
			withoutPayload: true,
		};

	};

	ReviewComment._updateForMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
		};

	};

	ReviewComment._deleteForMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'deleteForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
		};

	};

	ReviewComment._cancelFlagForMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'cancelFlagForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}/flags',
			params:         ['reviewCommentId', ],
		};

	};

	return ReviewComment;

};