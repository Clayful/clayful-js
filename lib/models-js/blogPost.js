module.exports = request => {

	const BlogPost = { name: 'BlogPost' };

	BlogPost.query = BlogPost._query = function() {

		return request({
			modelName:      BlogPost.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/blog/posts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogPost.list = BlogPost._list = function() {

		return request({
			modelName:      BlogPost.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/blog/posts',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogPost.count = BlogPost._count = function() {

		return request({
			modelName:      BlogPost.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/blog/posts/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogPost.get = BlogPost._get = function() {

		return request({
			modelName:      BlogPost.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/blog/posts/{blogPostId}',
			params:         ['blogPostId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	BlogPost.queryByCategory = BlogPost._queryByCategory = function() {

		return request({
			modelName:      BlogPost.name,
			methodName:     'queryByCategory',
			httpMethod:     'GET',
			path:           '/v1/blog/categories/{blogCategoryId}/posts',
			params:         ['blogCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogPost.listByCategory = BlogPost._listByCategory = function() {

		return request({
			modelName:      BlogPost.name,
			methodName:     'listByCategory',
			httpMethod:     'GET',
			path:           '/v1/blog/categories/{blogCategoryId}/posts',
			params:         ['blogCategoryId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogPost.queryByCollaborator = BlogPost._queryByCollaborator = function() {

		return request({
			modelName:      BlogPost.name,
			methodName:     'queryByCollaborator',
			httpMethod:     'GET',
			path:           '/v1/collaborators/{collaboratorId}/blog/posts',
			params:         ['collaboratorId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	BlogPost.listByCollaborator = BlogPost._listByCollaborator = function() {

		return request({
			modelName:      BlogPost.name,
			methodName:     'listByCollaborator',
			httpMethod:     'GET',
			path:           '/v1/collaborators/{collaboratorId}/blog/posts',
			params:         ['collaboratorId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return BlogPost;

};