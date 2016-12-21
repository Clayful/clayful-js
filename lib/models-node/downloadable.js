module.exports = request => {

	const Downloadable = { name: 'Downloadable' };

	Downloadable.query = Downloadable._query = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/downloadables',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Downloadable.list = Downloadable._list = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/downloadables',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Downloadable.count = Downloadable._count = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/downloadables/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Downloadable.get = Downloadable._get = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/downloadables/{downloadableId}',
			params:         ['downloadableId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Downloadable.createDownloadUrl = Downloadable._createDownloadUrl = function() {

		return request({
			modelName:      Downloadable.name,
			methodName:     'createDownloadUrl',
			httpMethod:     'POST',
			path:           '/v1/downloadables/{downloadableId}/url',
			params:         ['downloadableId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Downloadable;

};