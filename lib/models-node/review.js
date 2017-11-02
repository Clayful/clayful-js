const assign = require('../util/assign');

module.exports = request => {

	const Review = {
		name: 'Review',
		path: 'products/reviews',
		query: function() {
			return request(assign(Review._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Review._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Review._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Review._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByProduct: function() {
			return request(assign(Review._queryByProduct(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByProduct: function() {
			return request(assign(Review._listByProduct(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCustomer: function() {
			return request(assign(Review._queryByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCustomer: function() {
			return request(assign(Review._listByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(Review._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsMe: function() {
			return request(assign(Review._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flag: function() {
			return request(assign(Review._flag(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagAsMe: function() {
			return request(assign(Review._flagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		helped: function() {
			return request(assign(Review._helped(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlag: function() {
			return request(assign(Review._cancelFlag(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagAsMe: function() {
			return request(assign(Review._cancelFlagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		helpedAsMe: function() {
			return request(assign(Review._helpedAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Review._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Review._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelHelped: function() {
			return request(assign(Review._cancelHelped(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Review._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelHelpedAsMe: function() {
			return request(assign(Review._cancelHelpedAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Review._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsMe: function() {
			return request(assign(Review._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsCustomer: function() {
			return request(assign(Review._updateAsCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Review._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function() {
			return request(assign(Review._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Review._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Review._query = function() {

		return {
			modelName:      Review.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products/reviews',
			params:         [],
		};

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

	Review._get = function() {

		return {
			modelName:      Review.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId', ],
		};

	};

	Review._queryByProduct = function() {

		return {
			modelName:      Review.name,
			methodName:     'queryByProduct',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}/reviews',
			params:         ['productId', ],
		};

	};

	Review._listByProduct = function() {

		return {
			modelName:      Review.name,
			methodName:     'listByProduct',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}/reviews',
			params:         ['productId', ],
		};

	};

	Review._queryByCustomer = function() {

		return {
			modelName:      Review.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/products/reviews',
			params:         ['customerId', ],
		};

	};

	Review._listByCustomer = function() {

		return {
			modelName:      Review.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/products/reviews',
			params:         ['customerId', ],
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

	Review._createAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'createAsMe',
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
			path:           '/v1/products/reviews/{reviewId}/flag',
			params:         ['reviewId', ],
		};

	};

	Review._flagAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'flagAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/flag',
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

	Review._cancelFlag = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelFlag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/flag/cancel',
			params:         ['reviewId', ],
		};

	};

	Review._cancelFlagAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/flag/cancel',
			params:         ['reviewId', ],
			withoutPayload: true,
		};

	};

	Review._helpedAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'helpedAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown', ],
			withoutPayload: true,
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

	Review._pullFromMetafield = function() {

		return {
			modelName:      Review.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}/pull',
			params:         ['reviewId', 'field', ],
		};

	};

	Review._cancelHelped = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelHelped',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params:         ['reviewId', 'upDown', ],
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

	Review._cancelHelpedAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelHelpedAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params:         ['reviewId', 'upDown', ],
			withoutPayload: true,
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

	Review._updateAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}',
			params:         ['reviewId', ],
		};

	};

	Review._updateAsCustomer = function() {

		return {
			modelName:      Review.name,
			methodName:     'updateAsCustomer',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/products/reviews/{reviewId}',
			params:         ['customerId', 'reviewId', ],
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

	Review._deleteAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}',
			params:         ['reviewId', ],
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

	return Review;

};