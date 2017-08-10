module.exports = request => {

	const Store = {
		name: 'Store',
		path: 'store'
	};

	Store.get = function() {

		return request({
			modelName:      Store.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/store',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Store;

};