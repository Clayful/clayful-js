const assign = require('../util/assign');

module.exports = request => {

	const Order = {
		name: 'Order',
		path: 'orders',
		list: function() {
			return request(assign(Order._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		listForMe: function() {
			return request(assign(Order._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Order._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Order._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function() {
			return request(assign(Order._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Order._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listBySubscription: function() {
			return request(assign(Order._listBySubscription(), { args: Array.prototype.slice.call(arguments) }));
		},
		listBySubscriptionForMe: function() {
			return request(assign(Order._listBySubscriptionForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listInventoryOperations: function() {
			return request(assign(Order._listInventoryOperations(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsArrived: function() {
			return request(assign(Order._markAsArrived(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsDone: function() {
			return request(assign(Order._markAsDone(), { args: Array.prototype.slice.call(arguments) }));
		},
		syncInventory: function() {
			return request(assign(Order._syncInventory(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFulfillment: function() {
			return request(assign(Order._createFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function() {
			return request(assign(Order._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancel: function() {
			return request(assign(Order._cancel(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestRefund: function() {
			return request(assign(Order._requestRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelForMe: function() {
			return request(assign(Order._cancelForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsArrivedForMe: function() {
			return request(assign(Order._markAsArrivedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestRefundForMe: function() {
			return request(assign(Order._requestRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkTicket: function() {
			return request(assign(Order._checkTicket(), { args: Array.prototype.slice.call(arguments) }));
		},
		useTicket: function() {
			return request(assign(Order._useTicket(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestFullRefund: function() {
			return request(assign(Order._requestFullRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestFullRefundForMe: function() {
			return request(assign(Order._requestFullRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		restockRefundItems: function() {
			return request(assign(Order._restockRefundItems(), { args: Array.prototype.slice.call(arguments) }));
		},
		registerPaymentMethod: function() {
			return request(assign(Order._registerPaymentMethod(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Order._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Order._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelRefund: function() {
			return request(assign(Order._cancelRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		acceptRefund: function() {
			return request(assign(Order._acceptRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Order._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelRefundForMe: function() {
			return request(assign(Order._cancelRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createDownloadUrl: function() {
			return request(assign(Order._createDownloadUrl(), { args: Array.prototype.slice.call(arguments) }));
		},
		restockAllRefundItems: function() {
			return request(assign(Order._restockAllRefundItems(), { args: Array.prototype.slice.call(arguments) }));
		},
		createDownloadUrlForMe: function() {
			return request(assign(Order._createDownloadUrlForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Order._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(Order._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCancellation: function() {
			return request(assign(Order._updateCancellation(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateTransactions: function() {
			return request(assign(Order._updateTransactions(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateTransactionsForMe: function() {
			return request(assign(Order._updateTransactionsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCancellationForMe: function() {
			return request(assign(Order._updateCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefund: function() {
			return request(assign(Order._updateRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateFulfillment: function() {
			return request(assign(Order._updateFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItem: function() {
			return request(assign(Order._updateItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundForMe: function() {
			return request(assign(Order._updateRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundCancellation: function() {
			return request(assign(Order._updateRefundCancellation(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundCancellationForMe: function() {
			return request(assign(Order._updateRefundCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Order._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsUndone: function() {
			return request(assign(Order._markAsUndone(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsNotArrived: function() {
			return request(assign(Order._markAsNotArrived(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsNotArrivedForMe: function() {
			return request(assign(Order._markAsNotArrivedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteFulfillment: function() {
			return request(assign(Order._deleteFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Order._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteRefund: function() {
			return request(assign(Order._deleteRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteInventoryOperation: function() {
			return request(assign(Order._deleteInventoryOperation(), { args: Array.prototype.slice.call(arguments) }));
		},
		unacceptRefund: function() {
			return request(assign(Order._unacceptRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		unregisterPaymentMethod: function() {
			return request(assign(Order._unregisterPaymentMethod(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Order._list = function() {

		return {
			modelName:      Order.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/orders',
			params:         [],
		};

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

	Order._count = function() {

		return {
			modelName:      Order.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/orders/count',
			params:         [],
		};

	};

	Order._get = function() {

		return {
			modelName:      Order.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/orders/{orderId}',
			params:         ['orderId', ],
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

	Order._listBySubscription = function() {

		return {
			modelName:      Order.name,
			methodName:     'listBySubscription',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/{subscriptionId}/orders',
			params:         ['subscriptionId', ],
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

	Order._listInventoryOperations = function() {

		return {
			modelName:      Order.name,
			methodName:     'listInventoryOperations',
			httpMethod:     'GET',
			path:           '/v1/orders/{orderId}/inventory/operations',
			params:         ['orderId', ],
		};

	};

	Order._markAsArrived = function() {

		return {
			modelName:      Order.name,
			methodName:     'markAsArrived',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/arrived',
			params:         ['orderId', ],
			withoutPayload: true,
		};

	};

	Order._markAsDone = function() {

		return {
			modelName:      Order.name,
			methodName:     'markAsDone',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/done',
			params:         ['orderId', ],
			withoutPayload: true,
		};

	};

	Order._syncInventory = function() {

		return {
			modelName:      Order.name,
			methodName:     'syncInventory',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/synced',
			params:         ['orderId', ],
			withoutPayload: true,
		};

	};

	Order._createFulfillment = function() {

		return {
			modelName:      Order.name,
			methodName:     'createFulfillment',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/fulfillments',
			params:         ['orderId', ],
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

	Order._cancel = function() {

		return {
			modelName:      Order.name,
			methodName:     'cancel',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/cancellation',
			params:         ['orderId', ],
		};

	};

	Order._requestRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'requestRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds',
			params:         ['orderId', ],
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

	Order._markAsArrivedForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'markAsArrivedForMe',
			httpMethod:     'POST',
			path:           '/v1/me/orders/{orderId}/arrived',
			params:         ['orderId', ],
			withoutPayload: true,
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

	Order._checkTicket = function() {

		return {
			modelName:      Order.name,
			methodName:     'checkTicket',
			httpMethod:     'POST',
			path:           '/v1/orders/tickets/{code}/validity',
			params:         ['code', ],
		};

	};

	Order._useTicket = function() {

		return {
			modelName:      Order.name,
			methodName:     'useTicket',
			httpMethod:     'POST',
			path:           '/v1/orders/tickets/{code}/used',
			params:         ['code', ],
			withoutPayload: true,
		};

	};

	Order._requestFullRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'requestFullRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/full',
			params:         ['orderId', ],
		};

	};

	Order._requestFullRefundForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'requestFullRefundForMe',
			httpMethod:     'POST',
			path:           '/v1/me/orders/{orderId}/refunds/full',
			params:         ['orderId', ],
		};

	};

	Order._restockRefundItems = function() {

		return {
			modelName:      Order.name,
			methodName:     'restockRefundItems',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/restock',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._registerPaymentMethod = function() {

		return {
			modelName:      Order.name,
			methodName:     'registerPaymentMethod',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/transactions/payments/methods',
			params:         ['orderId', ],
		};

	};

	Order._pullFromMetafield = function() {

		return {
			modelName:      Order.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/meta/{field}/pull',
			params:         ['orderId', 'field', ],
		};

	};

	Order._pushToMetafield = function() {

		return {
			modelName:      Order.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/meta/{field}/push',
			params:         ['orderId', 'field', ],
		};

	};

	Order._cancelRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'cancelRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/cancellation',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._acceptRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'acceptRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/accepted',
			params:         ['orderId', 'refundId', ],
			withoutPayload: true,
		};

	};

	Order._increaseMetafield = function() {

		return {
			modelName:      Order.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/meta/{field}/inc',
			params:         ['orderId', 'field', ],
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

	Order._createDownloadUrl = function() {

		return {
			modelName:      Order.name,
			methodName:     'createDownloadUrl',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/items/{itemId}/download/url',
			params:         ['orderId', 'itemId', ],
			withoutPayload: true,
		};

	};

	Order._restockAllRefundItems = function() {

		return {
			modelName:      Order.name,
			methodName:     'restockAllRefundItems',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/restock/all',
			params:         ['orderId', 'refundId', ],
			withoutPayload: true,
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

	Order._update = function() {

		return {
			modelName:      Order.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}',
			params:         ['orderId', ],
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

	Order._updateCancellation = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateCancellation',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/cancellation',
			params:         ['orderId', ],
		};

	};

	Order._updateTransactions = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateTransactions',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/transactions',
			params:         ['orderId', ],
			withoutPayload: true,
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

	Order._updateCancellationForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateCancellationForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/orders/{orderId}/cancellation',
			params:         ['orderId', ],
		};

	};

	Order._updateRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateRefund',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/refunds/{refundId}',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._updateFulfillment = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateFulfillment',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/fulfillments/{fulfillmentId}',
			params:         ['orderId', 'fulfillmentId', ],
		};

	};

	Order._updateItem = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateItem',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/items/{itemId}',
			params:         ['orderId', 'itemId', ],
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

	Order._updateRefundCancellation = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateRefundCancellation',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/cancellation',
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

	Order._delete = function() {

		return {
			modelName:      Order.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}',
			params:         ['orderId', ],
		};

	};

	Order._markAsUndone = function() {

		return {
			modelName:      Order.name,
			methodName:     'markAsUndone',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/done',
			params:         ['orderId', ],
		};

	};

	Order._markAsNotArrived = function() {

		return {
			modelName:      Order.name,
			methodName:     'markAsNotArrived',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/arrived',
			params:         ['orderId', ],
		};

	};

	Order._markAsNotArrivedForMe = function() {

		return {
			modelName:      Order.name,
			methodName:     'markAsNotArrivedForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/orders/{orderId}/arrived',
			params:         ['orderId', ],
		};

	};

	Order._deleteFulfillment = function() {

		return {
			modelName:      Order.name,
			methodName:     'deleteFulfillment',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/fulfillments/{fulfillmentId}',
			params:         ['orderId', 'fulfillmentId', ],
		};

	};

	Order._deleteMetafield = function() {

		return {
			modelName:      Order.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/meta/{field}',
			params:         ['orderId', 'field', ],
		};

	};

	Order._deleteRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'deleteRefund',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/refunds/{refundId}',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._deleteInventoryOperation = function() {

		return {
			modelName:      Order.name,
			methodName:     'deleteInventoryOperation',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/inventory/operations/{operationId}',
			params:         ['orderId', 'operationId', ],
		};

	};

	Order._unacceptRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'unacceptRefund',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/accepted',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._unregisterPaymentMethod = function() {

		return {
			modelName:      Order.name,
			methodName:     'unregisterPaymentMethod',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/transactions/payments/methods/{paymentMethodId}',
			params:         ['orderId', 'paymentMethodId', ],
		};

	};

	return Order;

};