module.exports = request => {

	const Coupon = {
		name: 'Coupon',
		path: 'coupons'
	};

	Coupon.query = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.list = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.count = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/coupons/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.get = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/coupons/{couponId}',
			params:         ['couponId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.increaseMetafield = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/meta/{field}/inc',
			params:         ['couponId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.pushToMetafield = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/meta/{field}/push',
			params:         ['couponId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.pullFromMetafield = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/meta/{field}/pull',
			params:         ['couponId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Coupon.deleteMetafield = function() {

		return request({
			modelName:      Coupon.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/coupons/{couponId}/meta/{field}',
			params:         ['couponId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Coupon;

};