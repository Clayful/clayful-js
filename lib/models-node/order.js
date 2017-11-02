const assign = require('../util/assign');

module.exports = request => {

	const Order = {
		name: 'Order',
		path: 'orders',
		query: function() {
			return request(assign(Order._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Order._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Order._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Order._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCustomer: function() {
			return request(assign(Order._queryByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCustomer: function() {
			return request(assign(Order._listByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		getTicketDetails: function() {
			return request(assign(Order._getTicketDetails(), { args: Array.prototype.slice.call(arguments) }));
		},
		getSyncOperationErrors: function() {
			return request(assign(Order._getSyncOperationErrors(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFulfillment: function() {
			return request(assign(Order._createFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		recover: function() {
			return request(assign(Order._recover(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancel: function() {
			return request(assign(Order._cancel(), { args: Array.prototype.slice.call(arguments) }));
		},
		reject: function() {
			return request(assign(Order._reject(), { args: Array.prototype.slice.call(arguments) }));
		},
		undone: function() {
			return request(assign(Order._undone(), { args: Array.prototype.slice.call(arguments) }));
		},
		done: function() {
			return request(assign(Order._done(), { args: Array.prototype.slice.call(arguments) }));
		},
		verifyTicket: function() {
			return request(assign(Order._verifyTicket(), { args: Array.prototype.slice.call(arguments) }));
		},
		useTicket: function() {
			return request(assign(Order._useTicket(), { args: Array.prototype.slice.call(arguments) }));
		},
		recoverTicket: function() {
			return request(assign(Order._recoverTicket(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFullPaymentTransaction: function() {
			return request(assign(Order._createFullPaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAllFulfillments: function() {
			return request(assign(Order._createAllFulfillments(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFullRefund: function() {
			return request(assign(Order._createFullRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		createPartialPaymentTransaction: function() {
			return request(assign(Order._createPartialPaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		createPartialRefund: function() {
			return request(assign(Order._createPartialRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		rejectRefund: function() {
			return request(assign(Order._rejectRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		syncPaymentTransaction: function() {
			return request(assign(Order._syncPaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Order._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Order._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Order._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		recoverDownload: function() {
			return request(assign(Order._recoverDownload(), { args: Array.prototype.slice.call(arguments) }));
		},
		partialRestock: function() {
			return request(assign(Order._partialRestock(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFullRefundTransaction: function() {
			return request(assign(Order._createFullRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		fullRestock: function() {
			return request(assign(Order._fullRestock(), { args: Array.prototype.slice.call(arguments) }));
		},
		createDownloadableUrl: function() {
			return request(assign(Order._createDownloadableUrl(), { args: Array.prototype.slice.call(arguments) }));
		},
		createPartialRefundTransaction: function() {
			return request(assign(Order._createPartialRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		syncRefundTransaction: function() {
			return request(assign(Order._syncRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Order._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateFulfillment: function() {
			return request(assign(Order._updateFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItem: function() {
			return request(assign(Order._updateItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		updatePaymentTransaction: function() {
			return request(assign(Order._updatePaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefund: function() {
			return request(assign(Order._updateRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundTransaction: function() {
			return request(assign(Order._updateRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Order._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deletePaymentTransaction: function() {
			return request(assign(Order._deletePaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteRefund: function() {
			return request(assign(Order._deleteRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteFulfillment: function() {
			return request(assign(Order._deleteFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Order._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteSyncOperation: function() {
			return request(assign(Order._deleteSyncOperation(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteRefundTransaction: function() {
			return request(assign(Order._deleteRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Order._query = function() {

		return {
			modelName:      Order.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/orders',
			params:         [],
		};

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

	Order._queryByCustomer = function() {

		return {
			modelName:      Order.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/orders',
			params:         ['customerId', ],
		};

	};

	Order._listByCustomer = function() {

		return {
			modelName:      Order.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/orders',
			params:         ['customerId', ],
		};

	};

	Order._getTicketDetails = function() {

		return {
			modelName:      Order.name,
			methodName:     'getTicketDetails',
			httpMethod:     'GET',
			path:           '/v1/orders/tickets/{code}/details',
			params:         ['code', ],
		};

	};

	Order._getSyncOperationErrors = function() {

		return {
			modelName:      Order.name,
			methodName:     'getSyncOperationErrors',
			httpMethod:     'GET',
			path:           '/v1/orders/{orderId}/sync/operations/errors',
			params:         ['orderId', ],
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

	Order._recover = function() {

		return {
			modelName:      Order.name,
			methodName:     'recover',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/recover',
			params:         ['orderId', ],
			withoutPayload: true,
		};

	};

	Order._cancel = function() {

		return {
			modelName:      Order.name,
			methodName:     'cancel',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/cancel',
			params:         ['orderId', ],
		};

	};

	Order._reject = function() {

		return {
			modelName:      Order.name,
			methodName:     'reject',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/reject',
			params:         ['orderId', ],
		};

	};

	Order._undone = function() {

		return {
			modelName:      Order.name,
			methodName:     'undone',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/undone',
			params:         ['orderId', ],
			withoutPayload: true,
		};

	};

	Order._done = function() {

		return {
			modelName:      Order.name,
			methodName:     'done',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/done',
			params:         ['orderId', ],
			withoutPayload: true,
		};

	};

	Order._verifyTicket = function() {

		return {
			modelName:      Order.name,
			methodName:     'verifyTicket',
			httpMethod:     'POST',
			path:           '/v1/orders/tickets/{code}/verify',
			params:         ['code', ],
		};

	};

	Order._useTicket = function() {

		return {
			modelName:      Order.name,
			methodName:     'useTicket',
			httpMethod:     'POST',
			path:           '/v1/orders/tickets/{code}/use',
			params:         ['code', ],
			withoutPayload: true,
		};

	};

	Order._recoverTicket = function() {

		return {
			modelName:      Order.name,
			methodName:     'recoverTicket',
			httpMethod:     'POST',
			path:           '/v1/orders/tickets/{code}/recover',
			params:         ['code', ],
		};

	};

	Order._createFullPaymentTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'createFullPaymentTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/transactions/full',
			params:         ['orderId', ],
		};

	};

	Order._createAllFulfillments = function() {

		return {
			modelName:      Order.name,
			methodName:     'createAllFulfillments',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/fulfillments/all',
			params:         ['orderId', ],
		};

	};

	Order._createFullRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'createFullRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/full',
			params:         ['orderId', ],
		};

	};

	Order._createPartialPaymentTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'createPartialPaymentTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/transactions/partial',
			params:         ['orderId', ],
		};

	};

	Order._createPartialRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'createPartialRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/partial',
			params:         ['orderId', ],
		};

	};

	Order._rejectRefund = function() {

		return {
			modelName:      Order.name,
			methodName:     'rejectRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/reject',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._syncPaymentTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'syncPaymentTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/transactions/{transactionId}/sync',
			params:         ['orderId', 'transactionId', ],
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

	Order._pushToMetafield = function() {

		return {
			modelName:      Order.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/meta/{field}/push',
			params:         ['orderId', 'field', ],
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

	Order._recoverDownload = function() {

		return {
			modelName:      Order.name,
			methodName:     'recoverDownload',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/items/{itemId}/download/recover',
			params:         ['orderId', 'itemId', ],
		};

	};

	Order._partialRestock = function() {

		return {
			modelName:      Order.name,
			methodName:     'partialRestock',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/restock/partial',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._createFullRefundTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'createFullRefundTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/full',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._fullRestock = function() {

		return {
			modelName:      Order.name,
			methodName:     'fullRestock',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/restock/full',
			params:         ['orderId', 'refundId', ],
			withoutPayload: true,
		};

	};

	Order._createDownloadableUrl = function() {

		return {
			modelName:      Order.name,
			methodName:     'createDownloadableUrl',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/items/{itemId}/download/url',
			params:         ['orderId', 'itemId', ],
		};

	};

	Order._createPartialRefundTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'createPartialRefundTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/partial',
			params:         ['orderId', 'refundId', ],
		};

	};

	Order._syncRefundTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'syncRefundTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}/sync',
			params:         ['orderId', 'refundId', 'transactionId', ],
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

	Order._updatePaymentTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'updatePaymentTransaction',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/transactions/{transactionId}',
			params:         ['orderId', 'transactionId', ],
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

	Order._updateRefundTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'updateRefundTransaction',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}',
			params:         ['orderId', 'refundId', 'transactionId', ],
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

	Order._deletePaymentTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'deletePaymentTransaction',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/transactions/{transactionId}',
			params:         ['orderId', 'transactionId', ],
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

	Order._deleteSyncOperation = function() {

		return {
			modelName:      Order.name,
			methodName:     'deleteSyncOperation',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/sync/operations/{operationId}',
			params:         ['orderId', 'operationId', ],
		};

	};

	Order._deleteRefundTransaction = function() {

		return {
			modelName:      Order.name,
			methodName:     'deleteRefundTransaction',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}',
			params:         ['orderId', 'refundId', 'transactionId', ],
		};

	};

	return Order;

};