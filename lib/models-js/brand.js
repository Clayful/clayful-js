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

	return Brand;

};