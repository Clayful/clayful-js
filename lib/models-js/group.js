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

	return Group;

};