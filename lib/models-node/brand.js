module.exports = request => {

	const Brand = { name: 'Brand' };

	Brand.query = Brand._query = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/brands',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.list = Brand._list = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/brands',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Brand.count = Brand._count = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/brands/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Brand.get = Brand._get = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Brand.create = Brand._create = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/brands',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Brand.update = Brand._update = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Brand.delete = Brand._delete = function() {

		return request({
			modelName:      Brand.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Brand;

};