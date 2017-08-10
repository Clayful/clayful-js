module.exports = request => {

	const Review = {
		name: 'Review',
		path: 'products/reviews'
	};

	Review.query = function() {

		return request({
			modelName:      Review.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products/reviews',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.list = function() {

		return request({
			modelName:      Review.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/reviews',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.count = function() {

		return request({
			modelName:      Review.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.get = function() {

		return request({
			modelName:      Review.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.queryByProduct = function() {

		return request({
			modelName:      Review.name,
			methodName:     'queryByProduct',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}/reviews',
			params:         ['productId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.listByProduct = function() {

		return request({
			modelName:      Review.name,
			methodName:     'listByProduct',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}/reviews',
			params:         ['productId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.queryByCustomer = function() {

		return request({
			modelName:      Review.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/products/reviews',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.listByCustomer = function() {

		return request({
			modelName:      Review.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/products/reviews',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.create = function() {

		return request({
			modelName:      Review.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products/reviews',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.createAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.flag = function() {

		return request({
			modelName:      Review.name,
			methodName:     'flag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/flag',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.flagAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'flagAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/flag',
			params:         ['reviewId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.helped = function() {

		return request({
			modelName:      Review.name,
			methodName:     'helped',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.cancelFlag = function() {

		return request({
			modelName:      Review.name,
			methodName:     'cancelFlag',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/flag/cancel',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.cancelFlagAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/flag/cancel',
			params:         ['reviewId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.helpedAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'helpedAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.pushToMetafield = function() {

		return request({
			modelName:      Review.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}/push',
			params:         ['reviewId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.pullFromMetafield = function() {

		return request({
			modelName:      Review.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}/pull',
			params:         ['reviewId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.cancelHelped = function() {

		return request({
			modelName:      Review.name,
			methodName:     'cancelHelped',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params:         ['reviewId', 'upDown', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.increaseMetafield = function() {

		return request({
			modelName:      Review.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}/inc',
			params:         ['reviewId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.cancelHelpedAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'cancelHelpedAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params:         ['reviewId', 'upDown', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.update = function() {

		return request({
			modelName:      Review.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.updateAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.updateAsCustomer = function() {

		return request({
			modelName:      Review.name,
			methodName:     'updateAsCustomer',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/products/reviews/{reviewId}',
			params:         ['customerId', 'reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.delete = function() {

		return request({
			modelName:      Review.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.deleteAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}',
			params:         ['reviewId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.deleteMetafield = function() {

		return request({
			modelName:      Review.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/{reviewId}/meta/{field}',
			params:         ['reviewId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Review;

};