module.exports = request => {

	const Image = { name: 'Image' };

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