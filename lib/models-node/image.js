const assign = require('../util/assign');

module.exports = request => {

	const Image = {
		name: 'Image',
		path: 'images',
		count: function() {
			return request(assign(Image._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function() {
			return request(assign(Image._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(Image._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsCustomer: function() {
			return request(assign(Image._createAsCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(Image._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Image._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsCustomer: function() {
			return request(assign(Image._deleteAsCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(Image._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Image._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Image._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Image._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		listForMe: function() {
			return request(assign(Image._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Image._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsCustomer: function() {
			return request(assign(Image._updateAsCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(Image._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Image._countForMe = function() {

		return {
			modelName:      Image.name,
			methodName:     'countForMe',
			httpMethod:     'GET',
			path:           '/v1/me/images/count',
			params:         [],
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

	Image._createAsCustomer = function() {

		return {
			modelName:      Image.name,
			methodName:     'createAsCustomer',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/images',
			params:         ['customerId', ],
			usesFormData:   true,
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

	Image._delete = function() {

		return {
			modelName:      Image.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/images/{imageId}',
			params:         ['imageId', ],
		};

	};

	Image._deleteAsCustomer = function() {

		return {
			modelName:      Image.name,
			methodName:     'deleteAsCustomer',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/images/{imageId}',
			params:         ['customerId', 'imageId', ],
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

	Image._get = function() {

		return {
			modelName:      Image.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/images/{imageId}',
			params:         ['imageId', ],
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

	Image._list = function() {

		return {
			modelName:      Image.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/images',
			params:         [],
		};

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

	Image._updateAsCustomer = function() {

		return {
			modelName:      Image.name,
			methodName:     'updateAsCustomer',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/images/{imageId}',
			params:         ['customerId', 'imageId', ],
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

	return Image;

};