module.exports = request => {

	const Review = { name: 'Review' };

	Review.query = Review._query = function() {

		return request({
			modelName:      Review.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products/reviews',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.list = Review._list = function() {

		return request({
			modelName:      Review.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/reviews',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.count = Review._count = function() {

		return request({
			modelName:      Review.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.get = Review._get = function() {

		return request({
			modelName:      Review.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.queryByProduct = Review._queryByProduct = function() {

		return request({
			modelName:      Review.name,
			methodName:     'queryByProduct',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}/reviews',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.listByProduct = Review._listByProduct = function() {

		return request({
			modelName:      Review.name,
			methodName:     'listByProduct',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}/reviews',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.queryByCustomer = Review._queryByCustomer = function() {

		return request({
			modelName:      Review.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/products/reviews',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.listByCustomer = Review._listByCustomer = function() {

		return request({
			modelName:      Review.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/products/reviews',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Review.create = Review._create = function() {

		return request({
			modelName:      Review.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products/reviews',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.createAsMe = Review._createAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.update = Review._update = function() {

		return request({
			modelName:      Review.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.updateAsMe = Review._updateAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.flag = Review._flag = function() {

		return request({
			modelName:      Review.name,
			methodName:     'flag',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/{reviewId}/flag',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.updateByCustomer = Review._updateByCustomer = function() {

		return request({
			modelName:      Review.name,
			methodName:     'updateByCustomer',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/products/reviews/{reviewId}',
			params:         ['customerId', 'reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.flagAsMe = Review._flagAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'flagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}/flag',
			params:         ['reviewId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.cancelFlag = Review._cancelFlag = function() {

		return request({
			modelName:      Review.name,
			methodName:     'cancelFlag',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/{reviewId}/flag/cancel',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.helped = Review._helped = function() {

		return request({
			modelName:      Review.name,
			methodName:     'helped',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.helpedAsMe = Review._helpedAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'helpedAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params:         ['reviewId', 'upDown'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.cancelFlagAsMe = Review._cancelFlagAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}/flag/cancel',
			params:         ['reviewId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.cancelHelped = Review._cancelHelped = function() {

		return request({
			modelName:      Review.name,
			methodName:     'cancelHelped',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params:         ['reviewId', 'upDown'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.cancelHelpedAsMe = Review._cancelHelpedAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'cancelHelpedAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params:         ['reviewId', 'upDown'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.delete = Review._delete = function() {

		return request({
			modelName:      Review.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/{reviewId}',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Review.deleteAsMe = Review._deleteAsMe = function() {

		return request({
			modelName:      Review.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Review;

};