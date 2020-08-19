const assign = require('../util/assign');

module.exports = request => {

	const Order = {
		name: 'Order',
		path: 'orders',
		listForMe: function() {
			return request(assign(Order._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function() {
			return request(assign(Order._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Order._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listBySubscriptionForMe: function() {
			return request(assign(Order._listBySubscriptionForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function() {
			return request(assign(Order._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestRefundForMe: function() {
			return request(assign(Order._requestRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsReceivedForMe: function() {
			return request(assign(Order._markAsReceivedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelForMe: function() {
			return request(assign(Order._cancelForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelRefundForMe: function() {
			return request(assign(Order._cancelRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createDownloadUrlForMe: function() {
			return request(assign(Order._createDownloadUrlForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(Order._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCancellationForMe: function() {
			return request(assign(Order._updateCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateTransactionsForMe: function() {
			return request(assign(Order._updateTransactionsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundForMe: function() {
			return request(assign(Order._updateRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundCancellationForMe: function() {
			return request(assign(Order._updateRefundCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsNotReceivedForMe: function() {
			return request(assign(Order._markAsNotReceivedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Order._listForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'listForMe',
			httpMethod:     'GET',
			path:           '/v1/me/orders',
			params:         [],
		};

	};

	Order._countForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'countForMe',
			httpMethod:     'GET',
			path:           '/v1/me/orders/count',
			params:         [],
		};

	};

	Order._getForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'getForMe',
			httpMethod:     'GET',
			path:           '/v1/me/orders/{orderId}',
			params:         ['orderId', ],
		};

	};

	Order._listBySubscriptionForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'listBySubscriptionForMe',
			httpMethod:     'GET',
			path:           '/v1/me/subscriptions/{subscriptionId}/orders',
			params:         ['subscriptionId', ],
		};

	};

	Order._authenticate = function() {

		return {
			modelName:      Order.name,
			methodName:     'authenticate',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/auth',
			params:         ['orderId', ],
		};

	};

	Order._requestRefundForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'requestRefundForMe',
			httpMethod:     'POST',
			path:           '/v1/me/orders/{orderId}/refunds',
			params:         ['orderId', ],
		};

	};

	Order._markAsReceivedForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'markAsReceivedForMe',
			httpMethod:     'POST',
			path:           '/v1/me/orders/{orderId}/received',
			params:         ['orderId', ],
			withoutPayload: true,
		};

	};

	Order._cancelForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'cancelForMe',
			httpMethod:     'POST',
			path:           '/v1/me/orders/{orderId}/cancellation',
			params:         ['orderId', ],
		};

	};

	Order._cancelRefundForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'cancelRefundForMe',
			httpMethod:     'POST',
			path:           '/v1/me/orders/{orderId}/refunds/{refundId}/cancellation',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._createDownloadUrlForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'createDownloadUrlForMe',
			httpMethod:     'POST',
			path:           '/v1/me/orders/{orderId}/items/{itemId}/download/url',
			params:         ['orderId', 'itemId', ],
			withoutPayload: true,
		};

	};

	Order._updateForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/orders/{orderId}',
			params:         ['orderId', ],
		};

	};

	Order._updateCancellationForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateCancellationForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/orders/{orderId}/cancellation',
			params:         ['orderId', ],
		};

	};

	Order._updateTransactionsForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateTransactionsForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/orders/{orderId}/transactions',
			params:         ['orderId', ],
			withoutPayload: true,
		};

	};

	Order._updateRefundForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateRefundForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/orders/{orderId}/refunds/{refundId}',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._updateRefundCancellationForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateRefundCancellationForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/orders/{orderId}/refunds/{refundId}/cancellation',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._markAsNotReceivedForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'markAsNotReceivedForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/orders/{orderId}/received',
			params:         ['orderId', ],
		};

	};

	return Order;

};