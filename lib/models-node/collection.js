module.exports = request => {

	const Collection = { name: 'Collection' };

	Collection.query = Collection._query = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/collections',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.list = Collection._list = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/collections',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.count = Collection._count = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/collections/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Collection.get = Collection._get = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}',
			params:         ['collectionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Collection.queryByParent = Collection._queryByParent = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'queryByParent',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/collections',
			params:         ['collectionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.listByParent = Collection._listByParent = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'listByParent',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/collections',
			params:         ['collectionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Collection.create = Collection._create = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/collections',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Collection.update = Collection._update = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/collections/{collectionId}',
			params:         ['collectionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Collection.delete = Collection._delete = function() {

		return request({
			modelName:      Collection.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/collections/{collectionId}',
			params:         ['collectionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Collection;

};