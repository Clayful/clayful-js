module.exports = request => {

	const Shipping = { name: 'Shipping' };

	Shipping.query = Shipping._query = function() {

		return request({
			modelName:      Shipping.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/shippings',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Shipping.list = Shipping._list = function() {

		return request({
			modelName:      Shipping.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/shippings',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Shipping.count = Shipping._count = function() {

		return request({
			modelName:      Shipping.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/shippings/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Shipping.get = Shipping._get = function() {

		return request({
			modelName:      Shipping.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/shippings/{shippingId}',
			params:         ['shippingId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Shipping.create = Shipping._create = function() {

		return request({
			modelName:      Shipping.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/shippings',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Shipping.update = Shipping._update = function() {

		return request({
			modelName:      Shipping.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/shippings/{shippingId}',
			params:         ['shippingId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Shipping.delete = Shipping._delete = function() {

		return request({
			modelName:      Shipping.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/shippings/{shippingId}',
			params:         ['shippingId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Shipping;

};