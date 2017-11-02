const assign = require('../util/assign');

module.exports = request => {

	const Image = {
		name: 'Image',
		path: 'images',
		query: function() {
			return request(assign(Image._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Image._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Image._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Image._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(Image._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		addToReviewAsMe: function() {
			return request(assign(Image._addToReviewAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Image._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Image._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteFromReviewAsMe: function() {
			return request(assign(Image._deleteFromReviewAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Image._query = function() {

		return {
			modelName:      Image.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/images',
			params:         [],
		};

	};

	Image._list = function() {

		return {
			modelName:      Image.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/images',
			params:         [],
		};

	};

	Image._count = function() {

		return {
			modelName:      Image.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/images/count',
			params:         [],
		};

	};

	Image._get = function() {

		return {
			modelName:      Image.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/images/{imageId}',
			params:         ['imageId', ],
		};

	};

	Image._create = function() {

		return {
			modelName:      Image.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/images',
			params:         [],
			usesFormData:   true,
		};

	};

	Image._addToReviewAsMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'addToReviewAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/reviews/{reviewId}/images',
			params:         ['reviewId', ],
			usesFormData:   true,
		};

	};

	Image._update = function() {

		return {
			modelName:      Image.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/images/{imageId}',
			params:         ['imageId', ],
			usesFormData:   true,
		};

	};

	Image._delete = function() {

		return {
			modelName:      Image.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/images/{imageId}',
			params:         ['imageId', ],
		};

	};

	Image._deleteFromReviewAsMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'deleteFromReviewAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/reviews/{reviewId}/images/{imageId}',
			params:         ['reviewId', 'imageId', ],
		};

	};

	return Image;

};