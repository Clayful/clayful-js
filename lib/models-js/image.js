const assign = require('../util/assign');

module.exports = request => {

	const Image = {
		name: 'Image',
		path: 'images',
		addToReviewAsMe: function() {
			return request(assign(Image._addToReviewAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteFromReviewAsMe: function() {
			return request(assign(Image._deleteFromReviewAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
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