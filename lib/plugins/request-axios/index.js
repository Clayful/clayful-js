const axiosRequestMiddleware = axios => (detail, ClayfulError, callback) => {

	// Promise -> regular fn(err, result) format
	const wrappedCallback = (err, result) => setTimeout(() => callback(err, result), 0);

	const options = {
		method:  detail.httpMethod.toLowerCase(),
		url:     detail.requestUrl,
		params:  detail.query,
		headers: detail.headers
	};

	if (detail.payload) {

		options.data = detail.payload;

		if (detail.usesFormData) {

			/**
			 * When using `form-data` module in Node.js environment..
			 * References:
			 * - https://www.npmjs.com/package/form-data
			 * - https://github.com/mzabriskie/axios/issues/318#issuecomment-271703437
			 */

			if (typeof options.data.getHeaders === 'function') {

				const headers = options.data.getHeaders();

				for (const key in headers) {
					options.headers[key] = headers[key];
				}

			}

		}

	}

	axios(options).then(response => wrappedCallback(null, {
		status:  response.status,
		data:    response.data,
		headers: response.headers
	}), err => {

		if (!err.response) {
			return wrappedCallback(err);
		}

		const error = new ClayfulError(
			detail.modelName,
			detail.methodName,
			err.response.status,
			err.response.headers,
			err.response.data.errorCode,
			err.response.data.message || err.response.data.error,
			err.response.data.validation || null
		);

		return wrappedCallback(error);
	});

};

if (typeof module === 'object' && module.exports) {
	module.exports = axiosRequestMiddleware;
}

if (typeof window === 'object') {
	window.axiosRequestMiddleware = axiosRequestMiddleware;
}