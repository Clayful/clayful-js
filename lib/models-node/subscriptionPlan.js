const assign = require('../util/assign');

module.exports = request => {

	const SubscriptionPlan = {
		name: 'SubscriptionPlan',
		path: 'subscriptions/plans',
		count: function() {
			return request(assign(SubscriptionPlan._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(SubscriptionPlan._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(SubscriptionPlan._list(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	SubscriptionPlan._count = function() {

		return {
			modelName:      SubscriptionPlan.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/plans/count',
			params:         [],
		};

	};

	SubscriptionPlan._get = function() {

		return {
			modelName:      SubscriptionPlan.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/plans/{subscriptionPlanId}',
			params:         ['subscriptionPlanId', ],
		};

	};

	SubscriptionPlan._list = function() {

		return {
			modelName:      SubscriptionPlan.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/plans',
			params:         [],
		};

	};

	return SubscriptionPlan;

};