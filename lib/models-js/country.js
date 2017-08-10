module.exports = request => {

	const Country = {
		name: 'Country',
		path: 'countries'
	};

	Country.query = function() {

		return request({
			modelName:      Country.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/countries',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Country.list = function() {

		return request({
			modelName:      Country.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/countries',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Country.count = function() {

		return request({
			modelName:      Country.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/countries/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Country.get = function() {

		return request({
			modelName:      Country.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/countries/{countryId}',
			params:         ['countryId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Country;

};