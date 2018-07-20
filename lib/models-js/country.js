const assign = require('../util/assign');

module.exports = request => {

	const Country = {
		name: 'Country',
		path: 'countries',
		list: function() {
			return request(assign(Country._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Country._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Country._get(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Country._list = function() {

		return {
			modelName:      Country.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/countries',
			params:         [],
		};

	};

	Country._count = function() {

		return {
			modelName:      Country.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/countries/count',
			params:         [],
		};

	};

	Country._get = function() {

		return {
			modelName:      Country.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/countries/{countryId}',
			params:         ['countryId', ],
		};

	};

	return Country;

};