module.exports = request => {

	const Discount = { name: 'Discount' };

	Discount.query = Discount._query = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/discounts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.list = Discount._list = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/discounts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Discount.count = Discount._count = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/discounts/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Discount.get = Discount._get = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/discounts/{discountId}',
			params:         ['discountId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Discount.create = Discount._create = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/discounts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Discount.update = Discount._update = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/discounts/{discountId}',
			params:         ['discountId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Discount.delete = Discount._delete = function() {

		return request({
			modelName:      Discount.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/discounts/{discountId}',
			params:         ['discountId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Discount;

};