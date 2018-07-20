const assign = require('../util/assign');

module.exports = request => {

	const Impression = {
		name: 'Impression',
		path: '',
		topBrands: function() {
			return request(assign(Impression._topBrands(), { args: Array.prototype.slice.call(arguments) }));
		},
		topProducts: function() {
			return request(assign(Impression._topProducts(), { args: Array.prototype.slice.call(arguments) }));
		},
		topCollections: function() {
			return request(assign(Impression._topCollections(), { args: Array.prototype.slice.call(arguments) }));
		},
		gather: function() {
			return request(assign(Impression._gather(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Impression._topBrands = function() {

		return {
			modelName:      Impression.name,
			methodName:     'topBrands',
			httpMethod:     'GET',
			path:           '/v1/impressions/{scope}/top/brands',
			params:         ['scope', ],
		};

	};

	Impression._topProducts = function() {

		return {
			modelName:      Impression.name,
			methodName:     'topProducts',
			httpMethod:     'GET',
			path:           '/v1/impressions/{scope}/top/products',
			params:         ['scope', ],
		};

	};

	Impression._topCollections = function() {

		return {
			modelName:      Impression.name,
			methodName:     'topCollections',
			httpMethod:     'GET',
			path:           '/v1/impressions/{scope}/top/collections',
			params:         ['scope', ],
		};

	};

	Impression._gather = function() {

		return {
			modelName:      Impression.name,
			methodName:     'gather',
			httpMethod:     'POST',
			path:           '/v1/impressions/{scope}',
			params:         ['scope', ],
		};

	};

	return Impression;

};