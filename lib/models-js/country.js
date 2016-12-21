module.exports = request => {

	const Country = { name: 'Country' };

	Country.query = Country._query = function() {

		return request({
			modelName:      Country.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/countries',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Country.list = Country._list = function() {

		return request({
			modelName:      Country.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/countries',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Country.count = Country._count = function() {

		return request({
			modelName:      Country.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/countries/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Country.get = Country._get = function() {

		return request({
			modelName:      Country.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/countries/{countryId}',
			params:         ['countryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Country;

};