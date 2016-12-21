module.exports = request => {

	const ProductAnswer = { name: 'ProductAnswer' };

	ProductAnswer.query = ProductAnswer._query = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/products/questions/answers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductAnswer.list = ProductAnswer._list = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/products/questions/answers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductAnswer.count = ProductAnswer._count = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/products/questions/answers/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.get = ProductAnswer._get = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/products/questions/answers/{productAnswerId}',
			params:         ['productAnswerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.queryByQuestion = ProductAnswer._queryByQuestion = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'queryByQuestion',
			httpMethod:     'GET',
			path:           '/v1/products/questions/{productQuestionId}/answers',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductAnswer.listByQuestion = ProductAnswer._listByQuestion = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'listByQuestion',
			httpMethod:     'GET',
			path:           '/v1/products/questions/{productQuestionId}/answers',
			params:         ['productQuestionId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductAnswer.queryByOwner = ProductAnswer._queryByOwner = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'queryByOwner',
			httpMethod:     'GET',
			path:           '/v1/{ownerModel}/{ownerId}/products/questions/answers',
			params:         ['ownerModel', 'ownerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductAnswer.listByOwner = ProductAnswer._listByOwner = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'listByOwner',
			httpMethod:     'GET',
			path:           '/v1/{ownerModel}/{ownerId}/products/questions/answers',
			params:         ['ownerModel', 'ownerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ProductAnswer.create = ProductAnswer._create = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/products/questions/answers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.createAsMe = ProductAnswer._createAsMe = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/products/questions/answers',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.update = ProductAnswer._update = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/answers/{productAnswerId}',
			params:         ['productAnswerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.updateAsMe = ProductAnswer._updateAsMe = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/answers/{productAnswerId}',
			params:         ['productAnswerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.flag = ProductAnswer._flag = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'flag',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/answers/{productAnswerId}/flag',
			params:         ['productAnswerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.flagAsMe = ProductAnswer._flagAsMe = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'flagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/answers/{productAnswerId}/flag',
			params:         ['productAnswerId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.helped = ProductAnswer._helped = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'helped',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/answers/{productAnswerId}/helped/{upDown}',
			params:         ['productAnswerId', 'upDown'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.cancelFlag = ProductAnswer._cancelFlag = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'cancelFlag',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/answers/{productAnswerId}/flag/cancel',
			params:         ['productAnswerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.updateByOwner = ProductAnswer._updateByOwner = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'updateByOwner',
			httpMethod:     'PUT',
			path:           '/v1/{ownerModel}/{ownerId}/products/questions/answers/{productAnswerId}',
			params:         ['ownerModel', 'ownerId', 'productAnswerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.helpedAsMe = ProductAnswer._helpedAsMe = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'helpedAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/answers/{productAnswerId}/helped/{upDown}',
			params:         ['productAnswerId', 'upDown'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.cancelFlagAsMe = ProductAnswer._cancelFlagAsMe = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'cancelFlagAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/answers/{productAnswerId}/flag/cancel',
			params:         ['productAnswerId'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.cancelHelped = ProductAnswer._cancelHelped = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'cancelHelped',
			httpMethod:     'PUT',
			path:           '/v1/products/questions/answers/{productAnswerId}/helped/{upDown}/cancel',
			params:         ['productAnswerId', 'upDown'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.cancelHelpedAsMe = ProductAnswer._cancelHelpedAsMe = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'cancelHelpedAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/products/questions/answers/{productAnswerId}/helped/{upDown}/cancel',
			params:         ['productAnswerId', 'upDown'],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.delete = ProductAnswer._delete = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/products/questions/answers/{productAnswerId}',
			params:         ['productAnswerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ProductAnswer.deleteAsMe = ProductAnswer._deleteAsMe = function() {

		return request({
			modelName:      ProductAnswer.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/products/questions/answers/{productAnswerId}',
			params:         ['productAnswerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return ProductAnswer;

};