module.exports = request => {

	const ProductQuestion = { name: 'ProductQuestion' };

	ProductQuestion.query = ProductQuestion._query = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products/questions',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductQuestion.list = ProductQuestion._list = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/questions',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductQuestion.count = ProductQuestion._count = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/questions/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.get = ProductQuestion._get = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/questions/{productQuestionId}',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.queryByProduct = ProductQuestion._queryByProduct = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'queryByProduct',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}/questions',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductQuestion.listByProduct = ProductQuestion._listByProduct = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'listByProduct',
			httpMethod:     'GET',
			path:           '/v1/products/{productId}/questions',
			params:         ['productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductQuestion.queryByCustomer = ProductQuestion._queryByCustomer = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/products/questions',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductQuestion.listByCustomer = ProductQuestion._listByCustomer = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/products/questions',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductQuestion.create = ProductQuestion._create = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products/questions',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.createAsMe = ProductQuestion._createAsMe = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/questions',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.update = ProductQuestion._update = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/{productQuestionId}',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.updateAsMe = ProductQuestion._updateAsMe = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/{productQuestionId}',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.flag = ProductQuestion._flag = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'flag',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/{productQuestionId}/flag',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.updateByCustomer = ProductQuestion._updateByCustomer = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'updateByCustomer',
			httpMethod:     'PUT',
			path:           '/v1/customers/{customerId}/products/questions/{productQuestionId}',
			params:         ['customerId', 'productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.flagAsMe = ProductQuestion._flagAsMe = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'flagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/{productQuestionId}/flag',
			params:         ['productQuestionId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.cancelFlag = ProductQuestion._cancelFlag = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'cancelFlag',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/{productQuestionId}/flag/cancel',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.helped = ProductQuestion._helped = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'helped',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/{productQuestionId}/helped/{upDown}',
			params:         ['productQuestionId', 'upDown'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.cancelFlagAsMe = ProductQuestion._cancelFlagAsMe = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/{productQuestionId}/flag/cancel',
			params:         ['productQuestionId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.helpedAsMe = ProductQuestion._helpedAsMe = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'helpedAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/{productQuestionId}/helped/{upDown}',
			params:         ['productQuestionId', 'upDown'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.cancelHelped = ProductQuestion._cancelHelped = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'cancelHelped',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/{productQuestionId}/helped/{upDown}/cancel',
			params:         ['productQuestionId', 'upDown'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.cancelHelpedAsMe = ProductQuestion._cancelHelpedAsMe = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'cancelHelpedAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/{productQuestionId}/helped/{upDown}/cancel',
			params:         ['productQuestionId', 'upDown'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.delete = ProductQuestion._delete = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/questions/{productQuestionId}',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductQuestion.deleteAsMe = ProductQuestion._deleteAsMe = function() {

		return request({
			modelName:      ProductQuestion.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/questions/{productQuestionId}',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return ProductQuestion;

};