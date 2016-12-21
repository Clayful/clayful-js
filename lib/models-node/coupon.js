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


	Coupon.create = Coupon._create = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Coupon.addTotalAmount = Coupon._addTotalAmount = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'addTotalAmount',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/amount/total',
			params:         ['couponId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Coupon.update = Coupon._update = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/coupons/{couponId}',
			params:         ['couponId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Coupon.delete = Coupon._delete = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/coupons/{couponId}',
			params:         ['couponId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Coupon;

};