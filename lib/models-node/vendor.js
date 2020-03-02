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
		increaseMetafield: function() {
			return request(assign(Vendor._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Vendor._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Vendor._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Vendor._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
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

	Vendor._increaseMetafield = function() {

		return {
			modelName:      Vendor.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/vendors/{vendorId}/meta/{field}/inc',
			params:         ['vendorId', 'field', ],
		};

	};

	Vendor._pushToMetafield = function() {

		return {
			modelName:      Vendor.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/vendors/{vendorId}/meta/{field}/push',
			params:         ['vendorId', 'field', ],
		};

	};

	Vendor._pullFromMetafield = function() {

		return {
			modelName:      Vendor.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/vendors/{vendorId}/meta/{field}/pull',
			params:         ['vendorId', 'field', ],
		};

	};

	Vendor._deleteMetafield = function() {

		return {
			modelName:      Vendor.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/vendors/{vendorId}/meta/{field}',
			params:         ['vendorId', 'field', ],
		};

	};

	return Vendor;

};