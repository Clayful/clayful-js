const assign = require('../util/assign');

module.exports = request => {

	const Vendor = {
		name: 'Vendor',
		path: 'vendors',
		list: function() {
			return request(assign(Vendor._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Vendor._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Vendor._get(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Vendor._list = function() {

		return {
			modelName:      Vendor.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/vendors',
			params:         [],
		};

	};

	Vendor._count = function() {

		return {
			modelName:      Vendor.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/vendors/count',
			params:         [],
		};

	};

	Vendor._get = function() {

		return {
			modelName:      Vendor.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/vendors/{vendorId}',
			params:         ['vendorId', ],
		};

	};

	return Vendor;

};