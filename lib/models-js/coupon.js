const assign = require('../util/assign');

module.exports = request => {

	const Coupon = {
		name: 'Coupon',
		path: 'coupons',
		count: function() {
			return request(assign(Coupon._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Coupon._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Coupon._list(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Coupon._list = function() {

		return {
			modelName:      Coupon.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/coupons',
			params:         [],
		};

	};

	return Coupon;

};