const assign = require('../util/assign');

module.exports = request => {

	const Store = {
		name: 'Store',
		path: 'store',
		get: function() {
			return request(assign(Store._get(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Store._get = function() {

		return {
			modelName:      Store.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/store',
			params:         [],
		};

	};

	return Store;

};