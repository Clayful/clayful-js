module.exports = request => {

	const Departure = { name: 'Departure' };

	Departure.query = Departure._query = function() {

		return request({
			modelName:      Departure.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/departures',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Departure.list = Departure._list = function() {

		return request({
			modelName:      Departure.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/departures',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Departure.count = Departure._count = function() {

		return request({
			modelName:      Departure.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/departures/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Departure.get = Departure._get = function() {

		return request({
			modelName:      Departure.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/departures/{departureId}',
			params:         ['departureId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Departure;

};