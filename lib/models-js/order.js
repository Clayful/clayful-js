module.exports = request => {

	const Order = {
		name: 'Order',
		path: 'orders'
	};

	Order.query = function() {

		return request({
			modelName:      Order.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/orders',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.list = function() {

		return request({
			modelName:      Order.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/orders',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.count = function() {

		return request({
			modelName:      Order.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/orders/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.get = function() {

		return request({
			modelName:      Order.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/orders/{orderId}',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.queryByCustomer = function() {

		return request({
			modelName:      Order.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/orders',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.listByCustomer = function() {

		return request({
			modelName:      Order.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/orders',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.getTicketDetails = function() {

		return request({
			modelName:      Order.name,
			methodName:     'getTicketDetails',
			httpMethod:     'GET',
			path:           '/v1/orders/tickets/{code}/details',
			params:         ['code', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.getSyncOperationErrors = function() {

		return request({
			modelName:      Order.name,
			methodName:     'getSyncOperationErrors',
			httpMethod:     'GET',
			path:           '/v1/orders/{orderId}/sync/operations/errors',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createFulfillment = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createFulfillment',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/fulfillments',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.recover = function() {

		return request({
			modelName:      Order.name,
			methodName:     'recover',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/recover',
			params:         ['orderId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.cancel = function() {

		return request({
			modelName:      Order.name,
			methodName:     'cancel',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/cancel',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.reject = function() {

		return request({
			modelName:      Order.name,
			methodName:     'reject',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/reject',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.undone = function() {

		return request({
			modelName:      Order.name,
			methodName:     'undone',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/undone',
			params:         ['orderId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.done = function() {

		return request({
			modelName:      Order.name,
			methodName:     'done',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/done',
			params:         ['orderId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.verifyTicket = function() {

		return request({
			modelName:      Order.name,
			methodName:     'verifyTicket',
			httpMethod:     'POST',
			path:           '/v1/orders/tickets/{code}/verify',
			params:         ['code', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.useTicket = function() {

		return request({
			modelName:      Order.name,
			methodName:     'useTicket',
			httpMethod:     'POST',
			path:           '/v1/orders/tickets/{code}/use',
			params:         ['code', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.recoverTicket = function() {

		return request({
			modelName:      Order.name,
			methodName:     'recoverTicket',
			httpMethod:     'POST',
			path:           '/v1/orders/tickets/{code}/recover',
			params:         ['code', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createFullPaymentTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createFullPaymentTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/transactions/full',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createAllFulfillments = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createAllFulfillments',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/fulfillments/all',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createFullRefund = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createFullRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/full',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createPartialPaymentTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createPartialPaymentTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/transactions/partial',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createPartialRefund = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createPartialRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/partial',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.rejectRefund = function() {

		return request({
			modelName:      Order.name,
			methodName:     'rejectRefund',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/reject',
			params:         ['orderId', 'refundId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.syncPaymentTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'syncPaymentTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/transactions/{transactionId}/sync',
			params:         ['orderId', 'transactionId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.recoverDownload = function() {

		return request({
			modelName:      Order.name,
			methodName:     'recoverDownload',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/items/{itemId}/download/recover',
			params:         ['orderId', 'itemId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.partialRestock = function() {

		return request({
			modelName:      Order.name,
			methodName:     'partialRestock',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/restock/partial',
			params:         ['orderId', 'refundId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createFullRefundTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createFullRefundTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/full',
			params:         ['orderId', 'refundId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.fullRestock = function() {

		return request({
			modelName:      Order.name,
			methodName:     'fullRestock',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/restock/full',
			params:         ['orderId', 'refundId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createDownloadableUrl = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createDownloadableUrl',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/items/{itemId}/download/url',
			params:         ['orderId', 'itemId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.createPartialRefundTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'createPartialRefundTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/partial',
			params:         ['orderId', 'refundId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.syncRefundTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'syncRefundTransaction',
			httpMethod:     'POST',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}/sync',
			params:         ['orderId', 'refundId', 'transactionId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.update = function() {

		return request({
			modelName:      Order.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.updateFulfillment = function() {

		return request({
			modelName:      Order.name,
			methodName:     'updateFulfillment',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/fulfillments/{fulfillmentId}',
			params:         ['orderId', 'fulfillmentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.updateItem = function() {

		return request({
			modelName:      Order.name,
			methodName:     'updateItem',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/items/{itemId}',
			params:         ['orderId', 'itemId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.updatePaymentTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'updatePaymentTransaction',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/transactions/{transactionId}',
			params:         ['orderId', 'transactionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.updateRefund = function() {

		return request({
			modelName:      Order.name,
			methodName:     'updateRefund',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/refunds/{refundId}',
			params:         ['orderId', 'refundId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.updateRefundTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'updateRefundTransaction',
			httpMethod:     'PUT',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}',
			params:         ['orderId', 'refundId', 'transactionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.delete = function() {

		return request({
			modelName:      Order.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}',
			params:         ['orderId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.deletePaymentTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'deletePaymentTransaction',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/transactions/{transactionId}',
			params:         ['orderId', 'transactionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.deleteRefund = function() {

		return request({
			modelName:      Order.name,
			methodName:     'deleteRefund',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/refunds/{refundId}',
			params:         ['orderId', 'refundId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.deleteFulfillment = function() {

		return request({
			modelName:      Order.name,
			methodName:     'deleteFulfillment',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/fulfillments/{fulfillmentId}',
			params:         ['orderId', 'fulfillmentId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.deleteSyncOperation = function() {

		return request({
			modelName:      Order.name,
			methodName:     'deleteSyncOperation',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/sync/operations/{operationId}',
			params:         ['orderId', 'operationId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Order.deleteRefundTransaction = function() {

		return request({
			modelName:      Order.name,
			methodName:     'deleteRefundTransaction',
			httpMethod:     'DELETE',
			path:           '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}',
			params:         ['orderId', 'refundId', 'transactionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Order;

};