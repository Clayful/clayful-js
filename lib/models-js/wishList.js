const assign = require('../util/assign');

module.exports = request => {

	const WishList = {
		name: 'WishList',
		path: 'wishlists',
		addItemForMe: function() {
			return request(assign(WishList._addItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function() {
			return request(assign(WishList._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countProductsForMe: function() {
			return request(assign(WishList._countProductsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(WishList._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(WishList._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemForMe: function() {
			return request(assign(WishList._deleteItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyForMe: function() {
			return request(assign(WishList._emptyForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(WishList._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listForMe: function() {
			return request(assign(WishList._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listProductsForMe: function() {
			return request(assign(WishList._listProductsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(WishList._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	WishList._addItemForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'addItemForMe',
			httpMethod:     'POST',
			path:           '/v1/me/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
		};

	};

	WishList._countForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'countForMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/count',
			params:         [],
		};

	};

	WishList._countProductsForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'countProductsForMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}/products/count',
			params:         ['wishListId', ],
		};

	};

	WishList._createForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'createForMe',
			httpMethod:     'POST',
			path:           '/v1/me/wishlists',
			params:         [],
		};

	};

	WishList._deleteForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'deleteForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
		};

	};

	WishList._deleteItemForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'deleteItemForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}/items/{productId}',
			params:         ['wishListId', 'productId', ],
		};

	};

	WishList._emptyForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'emptyForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
		};

	};

	WishList._getForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'getForMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
		};

	};

	WishList._listForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'listForMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists',
			params:         [],
		};

	};

	WishList._listProductsForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'listProductsForMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}/products',
			params:         ['wishListId', ],
		};

	};

	WishList._updateForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
		};

	};

	return WishList;

};