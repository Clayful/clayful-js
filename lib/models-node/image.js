module.exports = request => {

	const Image = {
		name: 'Image',
		path: 'images'
	};

	Image.query = function() {

		return request({
			modelName:      Image.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/images',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.list = function() {

		return request({
			modelName:      Image.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/images',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.count = function() {

		return request({
			modelName:      Image.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/images/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.get = function() {

		return request({
			modelName:      Image.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/images/{imageId}',
			params:         ['imageId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.create = function() {

		return request({
			modelName:      Image.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/images',
			params:         [],
			usesFormData:   true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.addToReviewAsMe = function() {

		return request({
			modelName:      Image.name,
			methodName:     'addToReviewAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/images',
			params:         ['reviewId', ],
			usesFormData:   true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.update = function() {

		return request({
			modelName:      Image.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/images/{imageId}',
			params:         ['imageId', ],
			usesFormData:   true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.delete = function() {

		return request({
			modelName:      Image.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/images/{imageId}',
			params:         ['imageId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Image.deleteFromReviewAsMe = function() {

		return request({
			modelName:      Image.name,
			methodName:     'deleteFromReviewAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}/images/{imageId}',
			params:         ['reviewId', 'imageId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Image;

};