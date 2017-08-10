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

	Store.pushToMetafield = function() {

		return request({
			modelName:      Store.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/store/meta/{field}/push',
			params:         ['field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Store.increaseMetafield = function() {

		return request({
			modelName:      Store.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/store/meta/{field}/inc',
			params:         ['field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Store.pullFromMetafield = function() {

		return request({
			modelName:      Store.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/store/meta/{field}/pull',
			params:         ['field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Store.deleteMetafield = function() {

		return request({
			modelName:      Store.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/store/meta/{field}',
			params:         ['field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Store;

};