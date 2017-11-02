const assign = require('../util/assign');

module.exports = request => {

	const WishList = {
		name: 'WishList',
		path: 'wishlists',
		query: function() {
			return request(assign(WishList._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(WishList._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryAsMe: function() {
			return request(assign(WishList._queryAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listAsMe: function() {
			return request(assign(WishList._listAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(WishList._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(WishList._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCustomer: function() {
			return request(assign(WishList._queryByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCustomer: function() {
			return request(assign(WishList._listByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		countAsMe: function() {
			return request(assign(WishList._countAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsMe: function() {
			return request(assign(WishList._getAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryProducts: function() {
			return request(assign(WishList._queryProducts(), { args: Array.prototype.slice.call(arguments) }));
		},
		listProducts: function() {
			return request(assign(WishList._listProducts(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryProductsAsMe: function() {
			return request(assign(WishList._queryProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listProductsAsMe: function() {
			return request(assign(WishList._listProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countProducts: function() {
			return request(assign(WishList._countProducts(), { args: Array.prototype.slice.call(arguments) }));
		},
		countProductsAsMe: function() {
			return request(assign(WishList._countProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		create: function() {
			return request(assign(WishList._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsMe: function() {
			return request(assign(WishList._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItem: function() {
			return request(assign(WishList._addItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemAsMe: function() {
			return request(assign(WishList._addItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
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
		updateAsMe: function() {
			return request(assign(WishList._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(WishList._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function() {
			return request(assign(WishList._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		empty: function() {
			return request(assign(WishList._empty(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyAsMe: function() {
			return request(assign(WishList._emptyAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItem: function() {
			return request(assign(WishList._deleteItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(WishList._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemAsMe: function() {
			return request(assign(WishList._deleteItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	WishList._query = function() {

		return {
			modelName:      WishList.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/wishlists',
			params:         [],
		};

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

	WishList._queryByCustomer = function() {

		return {
			modelName:      WishList.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/wishlists',
			params:         ['customerId', ],
		};

	};

	WishList._listByCustomer = function() {

		return {
			modelName:      WishList.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/wishlists',
			params:         ['customerId', ],
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

	WishList._queryProducts = function() {

		return {
			modelName:      WishList.name,
			methodName:     'queryProducts',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}/products',
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

	WishList._countProducts = function() {

		return {
			modelName:      WishList.name,
			methodName:     'countProducts',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}/products/count',
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

	WishList._create = function() {

		return {
			modelName:      WishList.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/wishlists',
			params:         [],
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

	WishList._addItem = function() {

		return {
			modelName:      WishList.name,
			methodName:     'addItem',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
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

	WishList._updateAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'updateAsMe',
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

	WishList._deleteAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'deleteAsMe',
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

	WishList._emptyAsMe = function() {

		return {
			modelName:      WishList.name,
			methodName:     'emptyAsMe',
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