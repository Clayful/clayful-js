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

	Collection.create = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/collections',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.increaseMetafield = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/collections/{collectionId}/meta/{field}/inc',
			params:         ['collectionId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.pushToMetafield = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/collections/{collectionId}/meta/{field}/push',
			params:         ['collectionId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.pullFromMetafield = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/collections/{collectionId}/meta/{field}/pull',
			params:         ['collectionId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.update = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/collections/{collectionId}',
			params:         ['collectionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.delete = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/collections/{collectionId}',
			params:         ['collectionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.deleteMetafield = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/collections/{collectionId}/meta/{field}',
			params:         ['collectionId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Collection;

};