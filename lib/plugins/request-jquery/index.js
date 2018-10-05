const parseHeaders = headers => {

	return headers
			.split('\n')
			.filter(s => s)
			.map(s => s.match(/^([\w-]+):\s*(.+)/))
			.filter(s => s)
			.reduce((headers, [, key, value]) => {
				headers[key] = value;
				return headers;
			}, {});

};

const jQueryRequestMiddleware = $ => {

	$.support.cors = true;

	return (detail, ClayfulError, callback) => {

		let query = $.param(detail.query);

		query = query ? '?' + query : '';

		const options = {
			crossDomain: true,
			method:      detail.httpMethod,
			url:         detail.requestUrl + query,
			headers:     detail.headers,
			xhrFields:   { withCredentials: true },
			converters:  {
				// Since jQuery's ajax request considers empty response as an error,
				// simply parse empty response as `null`.
				'text json': data => $.parseJSON(data || 'null')
			}
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
			} else {
				options.dataType = 'json';
				options.contentType = 'application/json; charset=utf-8';
				options.data = JSON.stringify(detail.payload);
			}

		}

		$.ajax(options).done((data, textStatus, jqXHR) => callback(null, {
			status:  jqXHR.status,
			data:    data,
			headers: parseHeaders(jqXHR.getAllResponseHeaders()),
		})).fail(jqXHR => {

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
};

if (typeof module === 'object' && module.exports) {
	module.exports = jQueryRequestMiddleware;
}

if (typeof window === 'object') {
	window.jQueryRequestMiddleware = jQueryRequestMiddleware;
}