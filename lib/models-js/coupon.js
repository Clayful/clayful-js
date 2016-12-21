module.exports = request => {

	const Coupon = { name: 'Coupon' };

	Coupon.query = Coupon._query = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.list = Coupon._list = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.count = Coupon._count = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/coupons/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Coupon.get = Coupon._get = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/coupons/{couponId}',
			params:         ['couponId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Coupon;

};