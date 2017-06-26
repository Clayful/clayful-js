const parseHeaders = headers => {

	return headers
			.split('\n')
			.filter(s => s)
			.map(s => s.match(/^([\w-]+):\s*(.+)/))
			.reduce((headers, [, key, value]) => {
				headers[key] = value;
				return headers;
			}, {});

};

const jQueryRequestMiddleware = $ => (detail, ClayfulError, callback) => {

	let query = $.param(detail.query);

	query = query ? '?' + query : '';

	const options = {
		method:  detail.httpMethod,
		url:     detail.requestUrl + query,
		headers: detail.headers,
	};

	if (detail.payload) {

		options.data = detail.payload;

		/**
		 * When using `FormData` to upload files..
		 * References:
		 * - https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
		 */

		if (detail.usesFormData) {

			options.contentType = false;
			options.processData = false;

		}

	}

	$.ajax(options)
		.done((data, textStatus, jqXHR) => callback(null, {
			status:  jqXHR.status,
			data:    data,
			headers: parseHeaders(jqXHR.getAllResponseHeaders()),
		}))
		.fail(jqXHR => {

			if (!jqXHR.responseJSON) {
				return callback(jqXHR);
			}

			const error = new ClayfulError(
				detail.modelName,
				detail.methodName,
				jqXHR.status,
				parseHeaders(jqXHR.getAllResponseHeaders()),
				jqXHR.responseJSON.errorCode,
				jqXHR.responseJSON.message || jqXHR.responseJSON.error,
				jqXHR.responseJSON.validation || null
			);

			return callback(error);
		});

};

module.exports = jQueryRequestMiddleware;

if (typeof window !== 'undefined' &&
	typeof window.Clayful !== 'undefined') {

	window.Clayful.install('request', jQueryRequestMiddleware);
}