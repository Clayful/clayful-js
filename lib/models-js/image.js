const assign = require('../util/assign');

module.exports = request => {

	const Image = {
		name: 'Image',
		path: 'images',
		listForMe: function() {
			return request(assign(Image._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function() {
			return request(assign(Image._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Image._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(Image._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(Image._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(Image._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Image._listForMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'listForMe',
			httpMethod:     'GET',
			path:           '/v1/me/images',
			params:         [],
		};

	};

	Image._countForMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'countForMe',
			httpMethod:     'GET',
			path:           '/v1/me/images/count',
			params:         [],
		};

	};

	Image._getForMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'getForMe',
			httpMethod:     'GET',
			path:           '/v1/me/images/{imageId}',
			params:         ['imageId', ],
		};

	};

	Image._createForMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'createForMe',
			httpMethod:     'POST',
			path:           '/v1/me/images',
			params:         [],
			usesFormData:   true,
		};

	};

	Image._updateForMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/images/{imageId}',
			params:         ['imageId', ],
			usesFormData:   true,
		};

	};

	Image._deleteForMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'deleteForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/images/{imageId}',
			params:         ['imageId', ],
		};

	};

	return Image;

};