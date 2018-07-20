const assign = require('../util/assign');

module.exports = request => {

	const Coupon = {
		name: 'Coupon',
		path: 'coupons',
		list: function() {
			return request(assign(Coupon._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Coupon._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Coupon._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Coupon._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Coupon._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Coupon._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Coupon._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Coupon._list = function() {

		return {
			modelName:      Coupon.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/coupons',
			params:         [],
		};

	};

	Coupon._count = function() {

		return {
			modelName:      Coupon.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/coupons/count',
			params:         [],
		};

	};

	Coupon._get = function() {

		return {
			modelName:      Coupon.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/coupons/{couponId}',
			params:         ['couponId', ],
		};

	};

	Coupon._increaseMetafield = function() {

		return {
			modelName:      Coupon.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/meta/{field}/inc',
			params:         ['couponId', 'field', ],
		};

	};

	Coupon._pullFromMetafield = function() {

		return {
			modelName:      Coupon.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/meta/{field}/pull',
			params:         ['couponId', 'field', ],
		};

	};

	Coupon._pushToMetafield = function() {

		return {
			modelName:      Coupon.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/meta/{field}/push',
			params:         ['couponId', 'field', ],
		};

	};

	Coupon._deleteMetafield = function() {

		return {
			modelName:      Coupon.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/coupons/{couponId}/meta/{field}',
			params:         ['couponId', 'field', ],
		};

	};

	return Coupon;

};