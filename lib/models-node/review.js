const assign = require('../util/assign');

module.exports = request => {

	const Review = {
		name: 'Review',
		path: 'products/reviews',
		list: function() {
			return request(assign(Review._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Review._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		listPublished: function() {
			return request(assign(Review._listPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Review._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		countPublished: function() {
			return request(assign(Review._countPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		getPublished: function() {
			return request(assign(Review._getPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(Review._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(Review._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flag: function() {
			return request(assign(Review._flag(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagForMe: function() {
			return request(assign(Review._flagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		helped: function() {
			return request(assign(Review._helped(), { args: Array.prototype.slice.call(arguments) }));
		},
		helpedForMe: function() {
			return request(assign(Review._helpedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Review._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Review._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Review._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Review._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(Review._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Review._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(Review._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagForMe: function() {
			return request(assign(Review._cancelFlagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlag: function() {
			return request(assign(Review._cancelFlag(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Review._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelHelpedForMe: function() {
			return request(assign(Review._cancelHelpedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelHelped: function() {
			return request(assign(Review._cancelHelped(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Review._list = function() {

		return {
			modelName:      Review.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/reviews',
			params:         [],
		};

	};

	Review._count = function() {

		return {
			modelName:      Review.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/count',
			params:         [],
		};

	};

	Review._listPublished = function() {

		return {
			modelName:      Review.name,
			methodName:     'listPublished',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/published',
			params:         [],
		};

	};

	Review._get = function() {

		return {
			modelName:      Review.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId', ],
		};

	};

	Review._countPublished = function() {

		return {
			modelName:      Review.name,
			methodName:     'countPublished',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/published/count',
			params:         [],
		};

	};

	Review._getPublished = function() {

		return {
			modelName:      Review.name,
			methodName:     'getPublished',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/published/{reviewId}',
			params:         ['reviewId', ],
		};

	};

	Review._create = function() {

		return {
			modelName:      Review.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products/reviews',
			params:         [],
		};

	};

	Review._createForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'createForMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews',
			params:         [],
		};

	};

	Review._flag = function() {

		return {
			modelName:      Review.name,
			methodName:     'flag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/flags',
			params:         ['reviewId', ],
		};

	};

	Review._flagForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'flagForMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/flags',
			params:         ['reviewId', ],
			withoutPayload: true,
		};

	};

	Review._helped = function() {

		return {
			modelName:      Review.name,
			methodName:     'helped',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown', ],
		};

	};

	Review._helpedForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'helpedForMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown', ],
			withoutPayload: true,
		};

	};

	Review._increaseMetafield = function() {

		return {
			modelName:      Review.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}/inc',
			params:         ['reviewId', 'field', ],
		};

	};

	Review._pullFromMetafield = function() {

		return {
			modelName:      Review.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}/pull',
			params:         ['reviewId', 'field', ],
		};

	};

	Review._pushToMetafield = function() {

		return {
			modelName:      Review.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}/push',
			params:         ['reviewId', 'field', ],
		};

	};

	Review._update = function() {

		return {
			modelName:      Review.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId', ],
		};

	};

	Review._updateForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}',
			params:         ['reviewId', ],
		};

	};

	Review._delete = function() {

		return {
			modelName:      Review.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId', ],
		};

	};

	Review._deleteForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'deleteForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}',
			params:         ['reviewId', ],
		};

	};

	Review._cancelFlagForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelFlagForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}/flags',
			params:         ['reviewId', ],
		};

	};

	Review._cancelFlag = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelFlag',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/{reviewId}/flags/{customerId}',
			params:         ['reviewId', 'customerId', ],
		};

	};

	Review._deleteMetafield = function() {

		return {
			modelName:      Review.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}',
			params:         ['reviewId', 'field', ],
		};

	};

	Review._cancelHelpedForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelHelpedForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown', ],
		};

	};

	Review._cancelHelped = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelHelped',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/{reviewId}/helped/{upDown}/{customerId}',
			params:         ['reviewId', 'upDown', 'customerId', ],
		};

	};

	return Review;

};