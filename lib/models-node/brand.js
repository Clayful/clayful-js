module.exports = request => {

	const Brand = {
		name: 'Brand',
		path: 'brands'
	};

	Brand.query = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/brands',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.list = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/brands',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.count = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/brands/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.get = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.create = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/brands',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.pullFromMetafield = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/brands/{brandId}/meta/{field}/pull',
			params:         ['brandId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.increaseMetafield = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/brands/{brandId}/meta/{field}/inc',
			params:         ['brandId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.pushToMetafield = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/brands/{brandId}/meta/{field}/push',
			params:         ['brandId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.update = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.delete = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.deleteMetafield = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/brands/{brandId}/meta/{field}',
			params:         ['brandId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Brand;

};