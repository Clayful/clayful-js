const assign = require('../util/assign');

module.exports = request => {

	const Customer = {
		name: 'Customer',
		path: 'customers',
		list: function() {
			return request(assign(Customer._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		getMe: function() {
			return request(assign(Customer._getMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		isAuthenticated: function() {
			return request(assign(Customer._isAuthenticated(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Customer._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Customer._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		listCouponsForMe: function() {
			return request(assign(Customer._listCouponsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listCoupons: function() {
			return request(assign(Customer._listCoupons(), { args: Array.prototype.slice.call(arguments) }));
		},
		countCouponsForMe: function() {
			return request(assign(Customer._countCouponsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countCoupons: function() {
			return request(assign(Customer._countCoupons(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByFlagVotes: function() {
			return request(assign(Customer._listByFlagVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByHelpVotes: function() {
			return request(assign(Customer._listByHelpVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByFlagVotes: function() {
			return request(assign(Customer._listByFlagVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByHelpVotes: function() {
			return request(assign(Customer._listByHelpVotes(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(Customer._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createMe: function() {
			return request(assign(Customer._createMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function() {
			return request(assign(Customer._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		createVerification: function() {
			return request(assign(Customer._createVerification(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticateBy3rdParty: function() {
			return request(assign(Customer._authenticateBy3rdParty(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestVerificationEmail: function() {
			return request(assign(Customer._requestVerificationEmail(), { args: Array.prototype.slice.call(arguments) }));
		},
		addCoupon: function() {
			return request(assign(Customer._addCoupon(), { args: Array.prototype.slice.call(arguments) }));
		},
		verify: function() {
			return request(assign(Customer._verify(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Customer._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Customer._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Customer._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateMe: function() {
			return request(assign(Customer._updateMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Customer._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCredentialsForMe: function() {
			return request(assign(Customer._updateCredentialsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		resetPassword: function() {
			return request(assign(Customer._resetPassword(), { args: Array.prototype.slice.call(arguments) }));
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
		deleteCouponForMe: function() {
			return request(assign(Customer._deleteCouponForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteCoupon: function() {
			return request(assign(Customer._deleteCoupon(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Customer._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Customer._isAuthenticated = function() {

		return {
			modelName:      Customer.name,
			methodName:     'isAuthenticated',
			httpMethod:     'GET',
			path:           '/v1/customers/auth',
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

	Customer._listCouponsForMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listCouponsForMe',
			httpMethod:     'GET',
			path:           '/v1/me/coupons',
			params:         [],
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

	Customer._countCouponsForMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'countCouponsForMe',
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

	Customer._listByFlagVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flags/customers',
			params:         ['voteModel', 'voteModelId', ],
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

	Customer._listByFlagVotes = function() {

		return {
			modelName:      Customer.name,
			methodName:     'listByFlagVotes',
			httpMethod:     'GET',
			path:           '/v1/{voteModel}/{voteModelId}/flags/customers',
			params:         ['voteModel', 'voteModelId', ],
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

	Customer._createMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'createMe',
			httpMethod:     'POST',
			path:           '/v1/me',
			params:         [],
		};

	};

	Customer._authenticate = function() {

		return {
			modelName:      Customer.name,
			methodName:     'authenticate',
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

	Customer._authenticateBy3rdParty = function() {

		return {
			modelName:      Customer.name,
			methodName:     'authenticateBy3rdParty',
			httpMethod:     'POST',
			path:           '/v1/customers/auth/{vendor}',
			params:         ['vendor', ],
			withoutPayload: true,
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

	Customer._addCoupon = function() {

		return {
			modelName:      Customer.name,
			methodName:     'addCoupon',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/coupons',
			params:         ['customerId', ],
		};

	};

	Customer._verify = function() {

		return {
			modelName:      Customer.name,
			methodName:     'verify',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/verified',
			params:         ['customerId', ],
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

	Customer._increaseMetafield = function() {

		return {
			modelName:      Customer.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/customers/{customerId}/meta/{field}/inc',
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

	Customer._updateCredentialsForMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'updateCredentialsForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/credentials',
			params:         [],
		};

	};

	Customer._resetPassword = function() {

		return {
			modelName:      Customer.name,
			methodName:     'resetPassword',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/password',
			params:         ['customerId', ],
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

	Customer._deleteCouponForMe = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteCouponForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/coupons/{couponId}',
			params:         ['couponId', ],
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

	Customer._deleteMetafield = function() {

		return {
			modelName:      Customer.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/customers/{customerId}/meta/{field}',
			params:         ['customerId', 'field', ],
		};

	};

	return Customer;

};