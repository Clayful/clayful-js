module.exports = request => {

	const Image = {
		name: 'Image',
		path: 'images'
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