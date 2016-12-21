module.exports = request => {

	const Image = { name: 'Image' };

	Image.query = Image._query = function() {

		return request({
			modelName:      Image.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/images',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.list = Image._list = function() {

		return request({
			modelName:      Image.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/images',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.count = Image._count = function() {

		return request({
			modelName:      Image.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/images/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Image.get = Image._get = function() {

		return request({
			modelName:      Image.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/images/{imageId}',
			params:         ['imageId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Image.create = Image._create = function() {

		return request({
			modelName:      Image.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/images',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Image.addToReviewAsMe = Image._addToReviewAsMe = function() {

		return request({
			modelName:      Image.name,
			methodName:     'addToReviewAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/images',
			params:         ['reviewId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Image.update = Image._update = function() {

		return request({
			modelName:      Image.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/images/{imageId}',
			params:         ['imageId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Image.delete = Image._delete = function() {

		return request({
			modelName:      Image.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/images/{imageId}',
			params:         ['imageId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Image.deleteFromReviewAsMe = Image._deleteFromReviewAsMe = function() {

		return request({
			modelName:      Image.name,
			methodName:     'deleteFromReviewAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}/images/{imageId}',
			params:         ['reviewId', 'imageId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Image;

};