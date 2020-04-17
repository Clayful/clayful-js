const assign = require('../util/assign');

module.exports = request => {

	const WishList = {
		name: 'WishList',
		path: 'wishlists',
		list: function() {
			return request(assign(WishList._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		listForMe: function() {
			return request(assign(WishList._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(WishList._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(WishList._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function() {
			return request(assign(WishList._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(WishList._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listProducts: function() {
			return request(assign(WishList._listProducts(), { args: Array.prototype.slice.call(arguments) }));
		},
		listProductsForMe: function() {
			return request(assign(WishList._listProductsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countProducts: function() {
			return request(assign(WishList._countProducts(), { args: Array.prototype.slice.call(arguments) }));
		},
		countProductsForMe: function() {
			return request(assign(WishList._countProductsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(WishList._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(WishList._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItem: function() {
			return request(assign(WishList._addItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemForMe: function() {
			return request(assign(WishList._addItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(WishList._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(WishList._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(WishList._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(WishList._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(WishList._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(WishList._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(WishList._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		empty: function() {
			return request(assign(WishList._empty(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyForMe: function() {
			return request(assign(WishList._emptyForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItem: function() {
			return request(assign(WishList._deleteItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(WishList._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemForMe: function() {
			return request(assign(WishList._deleteItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	WishList._list = function() {

		return {
			modelName:      WishList.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/wishlists',
			params:         [],
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

	WishList._count = function() {

		return {
			modelName:      WishList.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/wishlists/count',
			params:         [],
		};

	};

	WishList._get = function() {

		return {
			modelName:      WishList.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}',
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

	WishList._getForMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'getForMe',
			httpMethod:     'GET',
			path:           '/v1/me/wishlists/{wishListId}',
			params:         ['wishListId', ],
		};

	};

	WishList._listProducts = function() {

		return {
			modelName:      WishList.name,
			methodName:     'listProducts',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}/products',
			params:         ['wishListId', ],
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

	WishList._countProducts = function() {

		return {
			modelName:      WishList.name,
			methodName:     'countProducts',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}/products/count',
			params:         ['wishListId', ],
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

	WishList._create = function() {

		return {
			modelName:      WishList.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/wishlists',
			params:         [],
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

	WishList._addItem = function() {

		return {
			modelName:      WishList.name,
			methodName:     'addItem',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
		};

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

	WishList._increaseMetafield = function() {

		return {
			modelName:      WishList.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/meta/{field}/inc',
			params:         ['wishListId', 'field', ],
		};

	};

	WishList._pushToMetafield = function() {

		return {
			modelName:      WishList.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/meta/{field}/push',
			params:         ['wishListId', 'field', ],
		};

	};

	WishList._pullFromMetafield = function() {

		return {
			modelName:      WishList.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/meta/{field}/pull',
			params:         ['wishListId', 'field', ],
		};

	};

	WishList._update = function() {

		return {
			modelName:      WishList.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/wishlists/{wishListId}',
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

	WishList._delete = function() {

		return {
			modelName:      WishList.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}',
			params:         ['wishListId', ],
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

	WishList._empty = function() {

		return {
			modelName:      WishList.name,
			methodName:     'empty',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
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

	WishList._deleteItem = function() {

		return {
			modelName:      WishList.name,
			methodName:     'deleteItem',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}/items/{productId}',
			params:         ['wishListId', 'productId', ],
		};

	};

	WishList._deleteMetafield = function() {

		return {
			modelName:      WishList.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}/meta/{field}',
			params:         ['wishListId', 'field', ],
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

	return WishList;

};