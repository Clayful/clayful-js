module.exports = request => {

	const Tax = { name: 'Tax' };

	Tax.query = Tax._query = function() {

		return request({
			modelName:      Tax.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/taxes',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Tax.list = Tax._list = function() {

		return request({
			modelName:      Tax.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/taxes',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Tax.count = Tax._count = function() {

		return request({
			modelName:      Tax.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/taxes/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Tax.get = Tax._get = function() {

		return request({
			modelName:      Tax.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/taxes/{taxId}',
			params:         ['taxId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Tax.create = Tax._create = function() {

		return request({
			modelName:      Tax.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/taxes',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Tax.update = Tax._update = function() {

		return request({
			modelName:      Tax.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/taxes/{taxId}',
			params:         ['taxId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Tax.delete = Tax._delete = function() {

		return request({
			modelName:      Tax.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/taxes/{taxId}',
			params:         ['taxId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Tax;

};