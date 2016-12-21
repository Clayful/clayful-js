const axiosRequestMiddleware = axios => (detail, ClayfulError, callback) => {

	const options = {
		method:  detail.httpMethod.toLowerCase(),
		url:     detail.requestUrl,
		params:  detail.query,
		headers: detail.headers
	};

	if (detail.payload) {

		options.data = detail.payload;

	}

	axios(options)
		.then(response => callback(null, response.data))
		.catch(err => {

			const error = new ClayfulError(
				detail.modelName,
				detail.methodName,
				err.response.status,
				err.response.data.errorCode,
				err.response.data.message || err.response.data.error
			);

			return callback(error);
		});

};

module.exports = axiosRequestMiddleware;

if (typeof window !== 'undefined') {
	window.axiosRequestMiddleware = axiosRequestMiddleware;
}