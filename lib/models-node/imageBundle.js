module.exports = request => {

	const ImageBundle = { name: 'ImageBundle' };

	ImageBundle.query = ImageBundle._query = function() {

		return request({
			modelName:      ImageBundle.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/images/bundles',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ImageBundle.list = ImageBundle._list = function() {

		return request({
			modelName:      ImageBundle.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/images/bundles',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ImageBundle.count = ImageBundle._count = function() {

		return request({
			modelName:      ImageBundle.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/images/bundles/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ImageBundle.get = ImageBundle._get = function() {

		return request({
			modelName:      ImageBundle.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/images/bundles/{imageBundleId}',
			params:         ['imageBundleId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ImageBundle.create = ImageBundle._create = function() {

		return request({
			modelName:      ImageBundle.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/images/bundles',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ImageBundle.update = ImageBundle._update = function() {

		return request({
			modelName:      ImageBundle.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/images/bundles/{imageBundleId}',
			params:         ['imageBundleId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ImageBundle.delete = ImageBundle._delete = function() {

		return request({
			modelName:      ImageBundle.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/images/bundles/{imageBundleId}',
			params:         ['imageBundleId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return ImageBundle;

};