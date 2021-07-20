const assign = require('../util/assign');

module.exports = request => {

	const OrderTag = {
		name: 'OrderTag',
		path: 'orders/tags',
		count: function() {
			return request(assign(OrderTag._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(OrderTag._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(OrderTag._list(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	OrderTag._count = function() {

		return {
			modelName:      OrderTag.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/orders/tags/count',
			params:         [],
		};

	};

	OrderTag._get = function() {

		return {
			modelName:      OrderTag.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/orders/tags/{orderTagId}',
			params:         ['orderTagId', ],
		};

	};

	OrderTag._list = function() {

		return {
			modelName:      OrderTag.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/orders/tags',
			params:         [],
		};

	};

	return OrderTag;

};