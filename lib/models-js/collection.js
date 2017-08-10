module.exports = request => {

	const Collection = {
		name: 'Collection',
		path: 'collections'
	};

	Collection.query = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/collections',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.list = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/collections',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.count = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/collections/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.get = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}',
			params:         ['collectionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.queryByParent = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'queryByParent',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/collections',
			params:         ['collectionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.listByParent = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'listByParent',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/collections',
			params:         ['collectionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Collection;

};