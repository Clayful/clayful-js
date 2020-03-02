const assign = require('../util/assign');

module.exports = request => {

	const Subscription = {
		name: 'Subscription',
		path: 'subscriptions',
		list: function() {
			return request(assign(Subscription._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		listForMe: function() {
			return request(assign(Subscription._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Subscription._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Subscription._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function() {
			return request(assign(Subscription._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Subscription._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listInventoryOperations: function() {
			return request(assign(Subscription._listInventoryOperations(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancel: function() {
			return request(assign(Subscription._cancel(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function() {
			return request(assign(Subscription._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		schedule: function() {
			return request(assign(Subscription._schedule(), { args: Array.prototype.slice.call(arguments) }));
		},
		syncInventory: function() {
			return request(assign(Subscription._syncInventory(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsDone: function() {
			return request(assign(Subscription._markAsDone(), { args: Array.prototype.slice.call(arguments) }));
		},
		scheduleForMe: function() {
			return request(assign(Subscription._scheduleForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelForMe: function() {
			return request(assign(Subscription._cancelForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		fulfillSchedule: function() {
			return request(assign(Subscription._fulfillSchedule(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Subscription._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Subscription._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Subscription._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Subscription._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(Subscription._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCancellation: function() {
			return request(assign(Subscription._updateCancellation(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCancellationForMe: function() {
			return request(assign(Subscription._updateCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Subscription._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsUndone: function() {
			return request(assign(Subscription._markAsUndone(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Subscription._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteInventoryOperation: function() {
			return request(assign(Subscription._deleteInventoryOperation(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Subscription._list = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/subscriptions',
			params:         [],
		};

	};

	Subscription._listForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'listForMe',
			httpMethod:     'GET',
			path:           '/v1/me/subscriptions',
			params:         [],
		};

	};

	Subscription._count = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/count',
			params:         [],
		};

	};

	Subscription._get = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._countForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'countForMe',
			httpMethod:     'GET',
			path:           '/v1/me/subscriptions/count',
			params:         [],
		};

	};

	Subscription._getForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'getForMe',
			httpMethod:     'GET',
			path:           '/v1/me/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._listInventoryOperations = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'listInventoryOperations',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/{subscriptionId}/inventory/operations',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._cancel = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'cancel',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/cancellation',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._authenticate = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'authenticate',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/auth',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._schedule = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'schedule',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/scheduled',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._syncInventory = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'syncInventory',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/synced',
			params:         ['subscriptionId', ],
			withoutPayload: true,
		};

	};

	Subscription._markAsDone = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'markAsDone',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/done',
			params:         ['subscriptionId', ],
			withoutPayload: true,
		};

	};

	Subscription._scheduleForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'scheduleForMe',
			httpMethod:     'POST',
			path:           '/v1/me/subscriptions/{subscriptionId}/scheduled',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._cancelForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'cancelForMe',
			httpMethod:     'POST',
			path:           '/v1/me/subscriptions/{subscriptionId}/cancellation',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._fulfillSchedule = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'fulfillSchedule',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/schedules/orders',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._increaseMetafield = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/meta/{field}/inc',
			params:         ['subscriptionId', 'field', ],
		};

	};

	Subscription._pushToMetafield = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/meta/{field}/push',
			params:         ['subscriptionId', 'field', ],
		};

	};

	Subscription._pullFromMetafield = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/meta/{field}/pull',
			params:         ['subscriptionId', 'field', ],
		};

	};

	Subscription._update = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._updateForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._updateCancellation = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'updateCancellation',
			httpMethod:     'PUT',
			path:           '/v1/subscriptions/{subscriptionId}/cancellation',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._updateCancellationForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'updateCancellationForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/subscriptions/{subscriptionId}/cancellation',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._delete = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._markAsUndone = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'markAsUndone',
			httpMethod:     'DELETE',
			path:           '/v1/subscriptions/{subscriptionId}/done',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._deleteMetafield = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/subscriptions/{subscriptionId}/meta/{field}',
			params:         ['subscriptionId', 'field', ],
		};

	};

	Subscription._deleteInventoryOperation = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'deleteInventoryOperation',
			httpMethod:     'DELETE',
			path:           '/v1/subscriptions/{subscriptionId}/inventory/operations/{operationId}',
			params:         ['subscriptionId', 'operationId', ],
		};

	};

	return Subscription;

};