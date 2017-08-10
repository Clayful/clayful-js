module.exports = request => {

	const WishList = {
		name: 'WishList',
		path: 'wishlists'
	};

	WishList.queryAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'queryAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.listAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'listAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.countAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'countAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.getAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'getAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.queryProductsAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'queryProductsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}/products',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.listProductsAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'listProductsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}/products',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.countProductsAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'countProductsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}/products/count',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.createAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.addItemAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'addItemAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.updateAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.deleteAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.emptyAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'emptyAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.deleteItemAsMe = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'deleteItemAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}/items/{productId}',
			params:         ['wishListId', 'productId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return WishList;

};