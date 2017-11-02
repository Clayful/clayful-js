const assign = require('../util/assign');

module.exports = request => {

	const ReviewComment = {
		name: 'ReviewComment',
		path: 'products/reviews/comments',
		query: function() {
			return request(assign(ReviewComment._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(ReviewComment._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(ReviewComment._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(ReviewComment._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByReview: function() {
			return request(assign(ReviewComment._queryByReview(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByReview: function() {
			return request(assign(ReviewComment._listByReview(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByAuthor: function() {
			return request(assign(ReviewComment._queryByAuthor(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByAuthor: function() {
			return request(assign(ReviewComment._listByAuthor(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsMe: function() {
			return request(assign(ReviewComment._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagAsMe: function() {
			return request(assign(ReviewComment._flagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagAsMe: function() {
			return request(assign(ReviewComment._cancelFlagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsMe: function() {
			return request(assign(ReviewComment._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function() {
			return request(assign(ReviewComment._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	ReviewComment._query = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments',
			params:         [],
		};

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

	ReviewComment._queryByReview = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'queryByReview',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}/comments',
			params:         ['reviewId', ],
		};

	};

	ReviewComment._listByReview = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'listByReview',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}/comments',
			params:         ['reviewId', ],
		};

	};

	ReviewComment._queryByAuthor = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'queryByAuthor',
			httpMethod:     'GET',
			path:           '/v1/{authorModel}/{authorId}/products/reviews/comments',
			params:         ['authorModel', 'authorId', ],
		};

	};

	ReviewComment._listByAuthor = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'listByAuthor',
			httpMethod:     'GET',
			path:           '/v1/{authorModel}/{authorId}/products/reviews/comments',
			params:         ['authorModel', 'authorId', ],
		};

	};

	ReviewComment._createAsMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments',
			params:         [],
		};

	};

	ReviewComment._flagAsMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'flagAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}/flag',
			params:         ['reviewCommentId', ],
			withoutPayload: true,
		};

	};

	ReviewComment._cancelFlagAsMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params:         ['reviewCommentId', ],
			withoutPayload: true,
		};

	};

	ReviewComment._updateAsMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
		};

	};

	ReviewComment._deleteAsMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
		};

	};

	return ReviewComment;

};