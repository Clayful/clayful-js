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
		create: function() {
			return request(assign(ReviewComment._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsMe: function() {
			return request(assign(ReviewComment._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flag: function() {
			return request(assign(ReviewComment._flag(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagAsMe: function() {
			return request(assign(ReviewComment._flagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlag: function() {
			return request(assign(ReviewComment._cancelFlag(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagAsMe: function() {
			return request(assign(ReviewComment._cancelFlagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(ReviewComment._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(ReviewComment._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(ReviewComment._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(ReviewComment._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsMe: function() {
			return request(assign(ReviewComment._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsAuthor: function() {
			return request(assign(ReviewComment._updateAsAuthor(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(ReviewComment._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function() {
			return request(assign(ReviewComment._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(ReviewComment._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
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

	ReviewComment._create = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments',
			params:         [],
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

	ReviewComment._flag = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'flag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/flag',
			params:         ['reviewCommentId', ],
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

	ReviewComment._cancelFlag = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'cancelFlag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params:         ['reviewCommentId', ],
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

	ReviewComment._increaseMetafield = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}/inc',
			params:         ['reviewCommentId', 'field', ],
		};

	};

	ReviewComment._pushToMetafield = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}/push',
			params:         ['reviewCommentId', 'field', ],
		};

	};

	ReviewComment._pullFromMetafield = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}/pull',
			params:         ['reviewCommentId', 'field', ],
		};

	};

	ReviewComment._update = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
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

	ReviewComment._updateAsAuthor = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'updateAsAuthor',
			httpMethod:     'PUT',
			path:           '/v1/{authorModel}/{authorId}/products/reviews/comments/{reviewCommentId}',
			params:         ['authorModel', 'authorId', 'reviewCommentId', ],
		};

	};

	ReviewComment._delete = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
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

	ReviewComment._deleteMetafield = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}',
			params:         ['reviewCommentId', 'field', ],
		};

	};

	return ReviewComment;

};