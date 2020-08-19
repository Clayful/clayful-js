const assign = require('../util/assign');

module.exports = request => {

	const Discount = {
		name: 'Discount',
		path: 'discounts',
		list: function() {
			return request(assign(Discount._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Discount._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Discount._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Discount._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Discount._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Discount._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Discount._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Discount._list = function() {

		return {
			modelName:      Discount.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/discounts',
			params:         [],
		};

	};

	Discount._count = function() {

		return {
			modelName:      Discount.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/discounts/count',
			params:         [],
		};

	};

	Discount._get = function() {

		return {
			modelName:      Discount.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/discounts/{discountId}',
			params:         ['discountId', ],
		};

	};

	Discount._pullFromMetafield = function() {

		return {
			modelName:      Discount.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/discounts/{discountId}/meta/{field}/pull',
			params:         ['discountId', 'field', ],
		};

	};

	Discount._pushToMetafield = function() {

		return {
			modelName:      Discount.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/discounts/{discountId}/meta/{field}/push',
			params:         ['discountId', 'field', ],
		};

	};

	Discount._increaseMetafield = function() {

		return {
			modelName:      Discount.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/discounts/{discountId}/meta/{field}/inc',
			params:         ['discountId', 'field', ],
		};

	};

	Discount._deleteMetafield = function() {

		return {
			modelName:      Discount.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/discounts/{discountId}/meta/{field}',
			params:         ['discountId', 'field', ],
		};

	};

	return Discount;

};