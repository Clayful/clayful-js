module.exports = request => {

	const OrderTag = { name: 'OrderTag' };

	OrderTag.query = OrderTag._query = function() {

		return request({
			modelName:      OrderTag.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/orders/tags',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	OrderTag.list = OrderTag._list = function() {

		return request({
			modelName:      OrderTag.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/orders/tags',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	OrderTag.count = OrderTag._count = function() {

		return request({
			modelName:      OrderTag.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/orders/tags/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	OrderTag.get = OrderTag._get = function() {

		return request({
			modelName:      OrderTag.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/orders/tags/{orderTagId}',
			params:         ['orderTagId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return OrderTag;

};