module.exports = request => {

	const Currency = { name: 'Currency' };

	Currency.query = Currency._query = function() {

		return request({
			modelName:      Currency.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/currencies',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Currency.list = Currency._list = function() {

		return request({
			modelName:      Currency.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/currencies',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Currency.count = Currency._count = function() {

		return request({
			modelName:      Currency.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/currencies/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Currency.get = Currency._get = function() {

		return request({
			modelName:      Currency.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/currencies/{currencyId}',
			params:         ['currencyId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Currency;

};