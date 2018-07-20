const assign = require('../util/assign');

module.exports = request => {

	const Review = {
		name: 'Review',
		path: 'products/reviews',
		listPublished: function() {
			return request(assign(Review._listPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		countPublished: function() {
			return request(assign(Review._countPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		getPublished: function() {
			return request(assign(Review._getPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(Review._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagForMe: function() {
			return request(assign(Review._flagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		helpedForMe: function() {
			return request(assign(Review._helpedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(Review._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(Review._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagForMe: function() {
			return request(assign(Review._cancelFlagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelHelpedForMe: function() {
			return request(assign(Review._cancelHelpedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Review._createForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'createForMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews',
			params:         [],
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

	Review._updateForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}',
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

	Review._cancelHelpedForMe = function() {

		return {
			modelName:      Review.name,
			methodName:     'cancelHelpedForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown', ],
		};

	};

	return Review;

};