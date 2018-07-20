const assign = require('../util/assign');

module.exports = request => {

	const Group = {
		name: 'Group',
		path: 'groups',
		list: function() {
			return request(assign(Group._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Group._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Group._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Group._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Group._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Group._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Group._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Group._list = function() {

		return {
			modelName:      Group.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/groups',
			params:         [],
		};

	};

	Group._count = function() {

		return {
			modelName:      Group.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/groups/count',
			params:         [],
		};

	};

	Group._get = function() {

		return {
			modelName:      Group.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}',
			params:         ['groupId', ],
		};

	};

	Group._pullFromMetafield = function() {

		return {
			modelName:      Group.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/groups/{groupId}/meta/{field}/pull',
			params:         ['groupId', 'field', ],
		};

	};

	Group._pushToMetafield = function() {

		return {
			modelName:      Group.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/groups/{groupId}/meta/{field}/push',
			params:         ['groupId', 'field', ],
		};

	};

	Group._increaseMetafield = function() {

		return {
			modelName:      Group.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/groups/{groupId}/meta/{field}/inc',
			params:         ['groupId', 'field', ],
		};

	};

	Group._deleteMetafield = function() {

		return {
			modelName:      Group.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/groups/{groupId}/meta/{field}',
			params:         ['groupId', 'field', ],
		};

	};

	return Group;

};