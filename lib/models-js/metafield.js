module.exports = request => {

	const Metafield = { name: 'Metafield' };

	Metafield.queryModelMeta = Metafield._queryModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'queryModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*1}/meta',
			params:         ['model'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Metafield.listModelMeta = Metafield._listModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'listModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*1}/meta',
			params:         ['model'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Metafield.queryModelMeta = Metafield._queryModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'queryModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*2}/meta',
			params:         ['model', 'model'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Metafield.listModelMeta = Metafield._listModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'listModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*2}/meta',
			params:         ['model', 'model'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Metafield.getModelMeta = Metafield._getModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'getModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*1}/meta/{field}',
			params:         ['model', 'field'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Metafield.getModelMeta = Metafield._getModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'getModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*2}/meta/{field}',
			params:         ['model', 'model', 'field'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Metafield.queryModelMeta = Metafield._queryModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'queryModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*3}/meta',
			params:         ['model', 'model', 'model'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Metafield.listModelMeta = Metafield._listModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'listModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*3}/meta',
			params:         ['model', 'model', 'model'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Metafield.getModelMeta = Metafield._getModelMeta = function() {

		return request({
			modelName:      Metafield.name,
			methodName:     'getModelMeta',
			httpMethod:     'GET',
			path:           '/v1/{model*3}/meta/{field}',
			params:         ['model', 'model', 'model', 'field'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Metafield;

};