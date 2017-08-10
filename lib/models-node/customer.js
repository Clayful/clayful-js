module.exports = request => {

	const Customer = {
		name: 'Customer',
		path: 'customers'
	};

	Customer.query = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/customers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.list = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/customers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.getMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'getMe',
			httpMethod:     'GET',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.count = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/customers/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.get = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.queryCouponsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listCouponsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.queryCoupons = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryCoupons',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/coupons',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listCoupons = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listCoupons',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/coupons',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.queryByGroup = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryByGroup',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}/customers',
			params:         ['groupId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listByGroup = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listByGroup',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}/customers',
			params:         ['groupId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.countCouponsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'countCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.countCoupons = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'countCoupons',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/coupons/count',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.queryByFlagVotes = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flagged/customers',
			params:         ['voteModel', 'voteModelId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listByFlagVotes = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flagged/customers',
			params:         ['voteModel', 'voteModelId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.queryByFlagVotes = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flagged/customers',
			params:         ['voteModel', 'voteModelId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listByFlagVotes = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flagged/customers',
			params:         ['voteModel', 'voteModelId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.queryByHelpVotes = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryByHelpVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/helped/{upDown}/customers',
			params:         ['voteModel', 'voteModelId', 'upDown', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listByHelpVotes = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listByHelpVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/helped/{upDown}/customers',
			params:         ['voteModel', 'voteModelId', 'upDown', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.queryByHelpVotes = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'queryByHelpVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/helped/{upDown}/customers',
			params:         ['voteModel', 'voteModelId', 'upDown', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.listByHelpVotes = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'listByHelpVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/helped/{upDown}/customers',
			params:         ['voteModel', 'voteModelId', 'upDown', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.create = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/customers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.signup = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'signup',
			httpMethod:     'POST',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.auth = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'auth',
			httpMethod:     'POST',
			path:           '/v1/customers/auth',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.createVerification = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'createVerification',
			httpMethod:     'POST',
			path:           '/v1/customers/verifications',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.addCouponToCustomers = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'addCouponToCustomers',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/customers',
			params:         ['couponId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.requestVerificationEmail = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'requestVerificationEmail',
			httpMethod:     'POST',
			path:           '/v1/customers/verifications/emails',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.verify = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'verify',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/verify',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.addCoupon = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'addCoupon',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/coupons',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.resetPassword = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'resetPassword',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/password/reset',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.increaseMetafield = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/meta/{field}/inc',
			params:         ['customerId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.pushToMetafield = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/meta/{field}/push',
			params:         ['customerId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.pullFromMetafield = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/meta/{field}/pull',
			params:         ['customerId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.updateMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'updateMe',
			httpMethod:     'PUT',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.update = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.updateCredentialsAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'updateCredentialsAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/credentials',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.updateCredentials = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'updateCredentials',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/credentials',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.deleteMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteMe',
			httpMethod:     'DELETE',
			path:           '/v1/me',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.delete = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.deleteCouponAsMe = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteCouponAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/coupons/{couponId}',
			params:         ['couponId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.deleteMetafield = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/meta/{field}',
			params:         ['customerId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Customer.deleteCoupon = function() {

		return request({
			modelName:      Customer.name,
			methodName:     'deleteCoupon',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/coupons/{couponId}',
			params:         ['customerId', 'couponId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Customer;

};