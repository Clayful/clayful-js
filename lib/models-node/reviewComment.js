const assign = require('../util/assign');

module.exports = request => {

	const ReviewComment = {
		name: 'ReviewComment',
		path: 'products/reviews/comments',
		cancelFlag: function() {
			return request(assign(ReviewComment._cancelFlag(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagForMe: function() {
			return request(assign(ReviewComment._cancelFlagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(ReviewComment._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(ReviewComment._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(ReviewComment._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(ReviewComment._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(ReviewComment._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(ReviewComment._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		flag: function() {
			return request(assign(ReviewComment._flag(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagForMe: function() {
			return request(assign(ReviewComment._flagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(ReviewComment._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(ReviewComment._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(ReviewComment._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(ReviewComment._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(ReviewComment._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(ReviewComment._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(ReviewComment._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	ReviewComment._cancelFlag = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'cancelFlag',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/flags/{customerId}',
			params:         ['reviewCommentId', 'customerId', ],
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

	ReviewComment._count = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments/count',
			params:         [],
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

	ReviewComment._createForMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'createForMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments',
			params:         [],
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

	ReviewComment._deleteForMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'deleteForMe',
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

	ReviewComment._flag = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'flag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/flags',
			params:         ['reviewCommentId', ],
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

	ReviewComment._get = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
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

	ReviewComment._list = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments',
			params:         [],
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

	ReviewComment._pushToMetafield = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/meta/{field}/push',
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

	ReviewComment._updateForMe = function() {

		return {
			modelName:      ReviewComment.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId', ],
		};

	};

	return ReviewComment;

};