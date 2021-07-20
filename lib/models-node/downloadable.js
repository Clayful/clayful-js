const assign = require('../util/assign');

module.exports = request => {

	const Downloadable = {
		name: 'Downloadable',
		path: 'downloadables',
		count: function() {
			return request(assign(Downloadable._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		createDownloadUrl: function() {
			return request(assign(Downloadable._createDownloadUrl(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Downloadable._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Downloadable._list(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Downloadable._count = function() {

		return {
			modelName:      Downloadable.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/downloadables/count',
			params:         [],
		};

	};

	Downloadable._createDownloadUrl = function() {

		return {
			modelName:      Downloadable.name,
			methodName:     'createDownloadUrl',
			httpMethod:     'POST',
			path:           '/v1/downloadables/{downloadableId}/url',
			params:         ['downloadableId', ],
			withoutPayload: true,
		};

	};

	Downloadable._get = function() {

		return {
			modelName:      Downloadable.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/downloadables/{downloadableId}',
			params:         ['downloadableId', ],
		};

	};

	Downloadable._list = function() {

		return {
			modelName:      Downloadable.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/downloadables',
			params:         [],
		};

	};

	return Downloadable;

};