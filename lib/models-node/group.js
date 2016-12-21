module.exports = request => {

	const Group = { name: 'Group' };

	Group.query = Group._query = function() {

		return request({
			modelName:      Group.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/groups',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Group.list = Group._list = function() {

		return request({
			modelName:      Group.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/groups',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Group.count = Group._count = function() {

		return request({
			modelName:      Group.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/groups/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Group.get = Group._get = function() {

		return request({
			modelName:      Group.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}',
			params:         ['groupId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Group.create = Group._create = function() {

		return request({
			modelName:      Group.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/groups',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Group.update = Group._update = function() {

		return request({
			modelName:      Group.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/groups/{groupId}',
			params:         ['groupId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	Group.delete = Group._delete = function() {

		return request({
			modelName:      Group.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/groups/{groupId}',
			params:         ['groupId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return Group;

};