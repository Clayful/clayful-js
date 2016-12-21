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


	return ImageBundle;

};