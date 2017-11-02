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
		createAsMe: function() {
			return request(assign(Review._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagAsMe: function() {
			return request(assign(Review._flagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagAsMe: function() {
			return request(assign(Review._cancelFlagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		helpedAsMe: function() {
			return request(assign(Review._helpedAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelHelpedAsMe: function() {
			return request(assign(Review._cancelHelpedAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsMe: function() {
			return request(assign(Review._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function() {
			return request(assign(Review._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
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

	Review._createAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews',
			params:         [],
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

	Review._updateAsMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}',
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

	return Review;

};