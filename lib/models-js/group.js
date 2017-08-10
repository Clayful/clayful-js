module.exports = request => {

	const Group = {
		name: 'Group',
		path: 'groups'
	};

	Group.query = function() {

		return request({
			modelName:      Group.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/groups',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Group.list = function() {

		return request({
			modelName:      Group.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/groups',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Group.count = function() {

		return request({
			modelName:      Group.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/groups/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Group.get = function() {

		return request({
			modelName:      Group.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/groups/{groupId}',
			params:         ['groupId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Group;

};