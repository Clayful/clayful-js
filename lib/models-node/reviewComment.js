module.exports = request => {

	const ReviewComment = { name: 'ReviewComment' };

	ReviewComment.query = ReviewComment._query = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.list = ReviewComment._list = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.count = ReviewComment._count = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.get = ReviewComment._get = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.queryByReview = ReviewComment._queryByReview = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'queryByReview',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}/comments',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.listByReview = ReviewComment._listByReview = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'listByReview',
			httpMethod:     'GET',
			path:           '/v1/products/reviews/{reviewId}/comments',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.queryByOwner = ReviewComment._queryByOwner = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'queryByOwner',
			httpMethod:     'GET',
			path:           '/v1/{ownerModel}/{ownerId}/products/reviews/comments',
			params:         ['ownerModel', 'ownerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.listByOwner = ReviewComment._listByOwner = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'listByOwner',
			httpMethod:     'GET',
			path:           '/v1/{ownerModel}/{ownerId}/products/reviews/comments',
			params:         ['ownerModel', 'ownerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ReviewComment.create = ReviewComment._create = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products/reviews/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.createAsMe = ReviewComment._createAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/comments',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.update = ReviewComment._update = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.updateAsMe = ReviewComment._updateAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.flag = ReviewComment._flag = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'flag',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/flag',
			params:         ['reviewCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.flagAsMe = ReviewComment._flagAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'flagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}/flag',
			params:         ['reviewCommentId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.cancelFlag = ReviewComment._cancelFlag = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'cancelFlag',
			httpMethod:     'PUT',
			path:           '/v1/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params:         ['reviewCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.updateByOwner = ReviewComment._updateByOwner = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'updateByOwner',
			httpMethod:     'PUT',
			path:           '/v1/{ownerModel}/{ownerId}/products/reviews/comments/{reviewCommentId}',
			params:         ['ownerModel', 'ownerId', 'reviewCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.cancelFlagAsMe = ReviewComment._cancelFlagAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params:         ['reviewCommentId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.delete = ReviewComment._delete = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ReviewComment.deleteAsMe = ReviewComment._deleteAsMe = function() {

		return request({
			modelName:      ReviewComment.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/comments/{reviewCommentId}',
			params:         ['reviewCommentId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return ReviewComment;

};