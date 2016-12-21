module.exports = request => {

	const WishList = { name: 'WishList' };

	WishList.query = WishList._query = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.list = WishList._list = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.queryAsMe = WishList._queryAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'queryAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.listAsMe = WishList._listAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'listAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.count = WishList._count = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/wishlists/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.get = WishList._get = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.queryByCustomer = WishList._queryByCustomer = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/wishlists',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.listByCustomer = WishList._listByCustomer = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/wishlists',
			params:         ['customerId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.countAsMe = WishList._countAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'countAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.getAsMe = WishList._getAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'getAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.create = WishList._create = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.createAsMe = WishList._createAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.addItem = WishList._addItem = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'addItem',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/items',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.addItemAsMe = WishList._addItemAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'addItemAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/wishlists/{wishListId}/items',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.update = WishList._update = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/wishlists/{wishListId}',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.updateAsMe = WishList._updateAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.delete = WishList._delete = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.deleteAsMe = WishList._deleteAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.empty = WishList._empty = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'empty',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}/items',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.emptyAsMe = WishList._emptyAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'emptyAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}/items',
			params:         ['wishListId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.deleteItem = WishList._deleteItem = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'deleteItem',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}/items/{productId}',
			params:         ['wishListId', 'productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	WishList.deleteItemAsMe = WishList._deleteItemAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'deleteItemAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}/items/{productId}',
			params:         ['wishListId', 'productId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return WishList;

};