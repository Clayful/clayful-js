module.exports = request => {

	const WishList = { name: 'WishList' };

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