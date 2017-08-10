module.exports = request => {

	const Downloadable = {
		name: 'Downloadable',
		path: 'downloadables'
	};

	Downloadable.query = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/downloadables',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Downloadable.list = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/downloadables',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Downloadable.count = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/downloadables/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Downloadable.get = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/downloadables/{downloadableId}',
			params:         ['downloadableId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Downloadable.createDownloadUrl = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'createDownloadUrl',
			httpMethod:     'POST',
			path:           '/v1/downloadables/{downloadableId}/url',
			params:         ['downloadableId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Downloadable;

};