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


	return Brand;

};