module.exports = request => {

	const Discount = {
		name: 'Discount',
		path: 'discounts'
	};

	Discount.query = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/discounts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.list = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/discounts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.count = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/discounts/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.get = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/discounts/{discountId}',
			params:         ['discountId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.pullFromMetafield = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/discounts/{discountId}/meta/{field}/pull',
			params:         ['discountId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.increaseMetafield = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/discounts/{discountId}/meta/{field}/inc',
			params:         ['discountId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.pushToMetafield = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/discounts/{discountId}/meta/{field}/push',
			params:         ['discountId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.deleteMetafield = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/discounts/{discountId}/meta/{field}',
			params:         ['discountId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Discount;

};