const jQueryRequestMiddleware = $ => (detail, ClayfulError, callback) => {

	let query = $.param(detail.query);

	query = query ? '?' + query : '';

	const options = {
		method:  detail.httpMethod,
		url:     detail.requestUrl + query,
		headers: detail.headers
	};

	if (detail.payload) {

		options.data = detail.payload;

	}

	$.ajax(options)
		.done(data => callback(null, data))
		.fail(response => {

			const error = new ClayfulError(
				detail.modelName,
				detail.methodName,
				response.status,
				response.responseJSON.errorCode,
				response.responseJSON.message || response.responseJSON.error
			);

			return callback(error);
		});

};

module.exports = window.jQueryRequestMiddleware = jQueryRequestMiddleware;