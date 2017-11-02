const assign = require('../util/assign');

module.exports = request => {

	const WishList = {
		name: 'WishList',
		path: 'wishlists',
		queryAsMe: function() {
			return request(assign(WishList._queryAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listAsMe: function() {
			return request(assign(WishList._listAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countAsMe: function() {
			return request(assign(WishList._countAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsMe: function() {
			return request(assign(WishList._getAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryProductsAsMe: function() {
			return request(assign(WishList._queryProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listProductsAsMe: function() {
			return request(assign(WishList._listProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countProductsAsMe: function() {
			return request(assign(WishList._countProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsMe: function() {
			return request(assign(WishList._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemAsMe: function() {
			return request(assign(WishList._addItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsMe: function() {
			return request(assign(WishList._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function() {
			return request(assign(WishList._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyAsMe: function() {
			return request(assign(WishList._emptyAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemAsMe: function() {
			return request(assign(WishList._deleteItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	WishList._queryAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'queryAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists',
			params:         [],
		};

	};

	WishList._listAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'listAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists',
			params:         [],
		};

	};

	WishList._countAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'countAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/count',
			params:         [],
		};

	};

	WishList._getAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'getAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
		};

	};

	WishList._queryProductsAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'queryProductsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}/products',
			params:         ['wishListId', ],
		};

	};

	WishList._listProductsAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'listProductsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}/products',
			params:         ['wishListId', ],
		};

	};

	WishList._countProductsAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'countProductsAsMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}/products/count',
			params:         ['wishListId', ],
		};

	};

	WishList._createAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'createAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/wishlists',
			params:         [],
		};

	};

	WishList._addItemAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'addItemAsMe',
			httpMethod:     'POST',
			path:           '/v1/me/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
		};

	};

	WishList._updateAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'updateAsMe',
			httpMethod:     'PUT',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
		};

	};

	WishList._deleteAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'deleteAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
		};

	};

	WishList._emptyAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'emptyAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
		};

	};

	WishList._deleteItemAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'deleteItemAsMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}/items/{productId}',
			params:         ['wishListId', 'productId', ],
		};

	};

	return WishList;

};