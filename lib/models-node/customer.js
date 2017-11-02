const assign = require('../util/assign');

module.exports = request => {

	const Customer = {
		name: 'Customer',
		path: 'customers',
		query: function() {
			return request(assign(Customer._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Customer._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		getMe: function() {
			return request(assign(Customer._getMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Customer._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Customer._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryCouponsAsMe: function() {
			return request(assign(Customer._queryCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listCouponsAsMe: function() {
			return request(assign(Customer._listCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryCoupons: function() {
			return request(assign(Customer._queryCoupons(), { args: Array.prototype.slice.call(arguments) }));
		},
		listCoupons: function() {
			return request(assign(Customer._listCoupons(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByGroup: function() {
			return request(assign(Customer._queryByGroup(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByGroup: function() {
			return request(assign(Customer._listByGroup(), { args: Array.prototype.slice.call(arguments) }));
		},
		countCouponsAsMe: function() {
			return request(assign(Customer._countCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countCoupons: function() {
			return request(assign(Customer._countCoupons(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByFlagVotes: function() {
			return request(assign(Customer._queryByFlagVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByFlagVotes: function() {
			return request(assign(Customer._listByFlagVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByFlagVotes: function() {
			return request(assign(Customer._queryByFlagVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByFlagVotes: function() {
			return request(assign(Customer._listByFlagVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByHelpVotes: function() {
			return request(assign(Customer._queryByHelpVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByHelpVotes: function() {
			return request(assign(Customer._listByHelpVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByHelpVotes: function() {
			return request(assign(Customer._queryByHelpVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByHelpVotes: function() {
			return request(assign(Customer._listByHelpVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(Customer._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		signup: function() {
			return request(assign(Customer._signup(), { args: Array.prototype.slice.call(arguments) }));
		},
		auth: function() {
			return request(assign(Customer._auth(), { args: Array.prototype.slice.call(arguments) }));
		},
		createVerification: function() {
			return request(assign(Customer._createVerification(), { args: Array.prototype.slice.call(arguments) }));
		},
		addCouponToCustomers: function() {
			return request(assign(Customer._addCouponToCustomers(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestVerificationEmail: function() {
			return request(assign(Customer._requestVerificationEmail(), { args: Array.prototype.slice.call(arguments) }));
		},
		verify: function() {
			return request(assign(Customer._verify(), { args: Array.prototype.slice.call(arguments) }));
		},
		addCoupon: function() {
			return request(assign(Customer._addCoupon(), { args: Array.prototype.slice.call(arguments) }));
		},
		resetPassword: function() {
			return request(assign(Customer._resetPassword(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Customer._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Customer._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Customer._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateMe: function() {
			return request(assign(Customer._updateMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Customer._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCredentialsAsMe: function() {
			return request(assign(Customer._updateCredentialsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCredentials: function() {
			return request(assign(Customer._updateCredentials(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMe: function() {
			return request(assign(Customer._deleteMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Customer._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteCouponAsMe: function() {
			return request(assign(Customer._deleteCouponAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Customer._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteCoupon: function() {
			return request(assign(Customer._deleteCoupon(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Customer._query = function() {

		return {
			modelName:      Customer.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/customers',
			params:         [],
		};

	};

	Customer._list = function() {

		return {
			modelName:      Customer.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/customers',
			params:         [],
		};

	};

	Customer._getMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'getMe',
			httpMethod:     'GET',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._count = function() {

		return {
			modelName:      Customer.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/customers/count',
			params:         [],
		};

	};

	Customer._get = function() {

		return {
			modelName:      Customer.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId', ],
		};

	};

	Customer._queryCouponsAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'queryCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
		};

	};

	Customer._listCouponsAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
		};

	};

	Customer._queryCoupons = function() {

		return {
			modelName:      Customer.name,
			methodName:     'queryCoupons',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/coupons',
			params:         ['customerId', ],
		};

	};

	Customer._listCoupons = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listCoupons',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/coupons',
			params:         ['customerId', ],
		};

	};

	Customer._queryByGroup = function() {

		return {
			modelName:      Customer.name,
			methodName:     'queryByGroup',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}/customers',
			params:         ['groupId', ],
		};

	};

	Customer._listByGroup = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listByGroup',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}/customers',
			params:         ['groupId', ],
		};

	};

	Customer._countCouponsAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'countCouponsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons/count',
			params:         [],
		};

	};

	Customer._countCoupons = function() {

		return {
			modelName:      Customer.name,
			methodName:     'countCoupons',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/coupons/count',
			params:         ['customerId', ],
		};

	};

	Customer._queryByFlagVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'queryByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flagged/customers',
			params:         ['voteModel', 'voteModelId', ],
		};

	};

	Customer._listByFlagVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flagged/customers',
			params:         ['voteModel', 'voteModelId', ],
		};

	};

	Customer._queryByFlagVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'queryByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flagged/customers',
			params:         ['voteModel', 'voteModelId', ],
		};

	};

	Customer._listByFlagVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flagged/customers',
			params:         ['voteModel', 'voteModelId', ],
		};

	};

	Customer._queryByHelpVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'queryByHelpVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/helped/{upDown}/customers',
			params:         ['voteModel', 'voteModelId', 'upDown', ],
		};

	};

	Customer._listByHelpVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listByHelpVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/helped/{upDown}/customers',
			params:         ['voteModel', 'voteModelId', 'upDown', ],
		};

	};

	Customer._queryByHelpVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'queryByHelpVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/helped/{upDown}/customers',
			params:         ['voteModel', 'voteModelId', 'upDown', ],
		};

	};

	Customer._listByHelpVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listByHelpVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/helped/{upDown}/customers',
			params:         ['voteModel', 'voteModelId', 'upDown', ],
		};

	};

	Customer._create = function() {

		return {
			modelName:      Customer.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/customers',
			params:         [],
		};

	};

	Customer._signup = function() {

		return {
			modelName:      Customer.name,
			methodName:     'signup',
			httpMethod:     'POST',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._auth = function() {

		return {
			modelName:      Customer.name,
			methodName:     'auth',
			httpMethod:     'POST',
			path:           '/v1/customers/auth',
			params:         [],
		};

	};

	Customer._createVerification = function() {

		return {
			modelName:      Customer.name,
			methodName:     'createVerification',
			httpMethod:     'POST',
			path:           '/v1/customers/verifications',
			params:         [],
		};

	};

	Customer._addCouponToCustomers = function() {

		return {
			modelName:      Customer.name,
			methodName:     'addCouponToCustomers',
			httpMethod:     'POST',
			path:           '/v1/coupons/{couponId}/customers',
			params:         ['couponId', ],
		};

	};

	Customer._requestVerificationEmail = function() {

		return {
			modelName:      Customer.name,
			methodName:     'requestVerificationEmail',
			httpMethod:     'POST',
			path:           '/v1/customers/verifications/emails',
			params:         [],
		};

	};

	Customer._verify = function() {

		return {
			modelName:      Customer.name,
			methodName:     'verify',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/verify',
			params:         ['customerId', ],
		};

	};

	Customer._addCoupon = function() {

		return {
			modelName:      Customer.name,
			methodName:     'addCoupon',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/coupons',
			params:         ['customerId', ],
		};

	};

	Customer._resetPassword = function() {

		return {
			modelName:      Customer.name,
			methodName:     'resetPassword',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/password/reset',
			params:         ['customerId', ],
		};

	};

	Customer._increaseMetafield = function() {

		return {
			modelName:      Customer.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/meta/{field}/inc',
			params:         ['customerId', 'field', ],
		};

	};

	Customer._pushToMetafield = function() {

		return {
			modelName:      Customer.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/meta/{field}/push',
			params:         ['customerId', 'field', ],
		};

	};

	Customer._pullFromMetafield = function() {

		return {
			modelName:      Customer.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/meta/{field}/pull',
			params:         ['customerId', 'field', ],
		};

	};

	Customer._updateMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'updateMe',
			httpMethod:     'PUT',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._update = function() {

		return {
			modelName:      Customer.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId', ],
		};

	};

	Customer._updateCredentialsAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'updateCredentialsAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/credentials',
			params:         [],
		};

	};

	Customer._updateCredentials = function() {

		return {
			modelName:      Customer.name,
			methodName:     'updateCredentials',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/credentials',
			params:         ['customerId', ],
		};

	};

	Customer._deleteMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteMe',
			httpMethod:     'DELETE',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._delete = function() {

		return {
			modelName:      Customer.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}',
			params:         ['customerId', ],
		};

	};

	Customer._deleteCouponAsMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteCouponAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/coupons/{couponId}',
			params:         ['couponId', ],
		};

	};

	Customer._deleteMetafield = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/meta/{field}',
			params:         ['customerId', 'field', ],
		};

	};

	Customer._deleteCoupon = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteCoupon',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/coupons/{couponId}',
			params:         ['customerId', 'couponId', ],
		};

	};

	return Customer;

};