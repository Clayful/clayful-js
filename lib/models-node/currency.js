const assign = require('../util/assign');

module.exports = request => {

	const Currency = {
		name: 'Currency',
		path: 'currencies',
		list: function() {
			return request(assign(Currency._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Currency._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Currency._get(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Currency._list = function() {

		return {
			modelName:      Currency.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/currencies',
			params:         [],
		};

	};

	Currency._count = function() {

		return {
			modelName:      Currency.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/currencies/count',
			params:         [],
		};

	};

	Currency._get = function() {

		return {
			modelName:      Currency.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/currencies/{currencyId}',
			params:         ['currencyId', ],
		};

	};

	return Currency;

};