module.exports = request => {

	const WishList = {
		name: 'WishList',
		path: 'wishlists'
	};

	WishList.query = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.list = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/wishlists',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

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

	WishList.count = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/wishlists/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.get = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.queryByCustomer = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/wishlists',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.listByCustomer = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/wishlists',
			params:         ['customerId', ],
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

	WishList.queryProducts = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'queryProducts',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}/products',
			params:         ['wishListId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.listProducts = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'listProducts',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}/products',
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

	WishList.countProducts = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'countProducts',
			httpMethod:     'GET',
			path:           '/v1/wishlists/{wishListId}/products/count',
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

	WishList.create = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/wishlists',
			params:         [],
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

	WishList.addItem = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'addItem',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/items',
			params:         ['wishListId', ],
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

	WishList.increaseMetafield = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/meta/{field}/inc',
			params:         ['wishListId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.pushToMetafield = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/meta/{field}/push',
			params:         ['wishListId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.pullFromMetafield = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/wishlists/{wishListId}/meta/{field}/pull',
			params:         ['wishListId', 'field', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.update = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/wishlists/{wishListId}',
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

	WishList.delete = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}',
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

	WishList.empty = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'empty',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}/items',
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

	WishList.deleteItem = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'deleteItem',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}/items/{productId}',
			params:         ['wishListId', 'productId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	WishList.deleteMetafield = function() {

		return request({
			modelName:      WishList.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/wishlists/{wishListId}/meta/{field}',
			params:         ['wishListId', 'field', ],
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