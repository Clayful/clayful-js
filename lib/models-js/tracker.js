const assign = require('../util/assign');

module.exports = request => {

	const Tracker = {
		name: 'Tracker',
		path: '',
		getByCustomerForMe: function() {
			return request(assign(Tracker._getByCustomerForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Tracker._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsNonRegisteredForMe: function() {
			return request(assign(Tracker._getAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function() {
			return request(assign(Tracker._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsNonRegisteredForMe: function() {
			return request(assign(Tracker._createAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		changeOwnerForMe: function() {
			return request(assign(Tracker._changeOwnerForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function() {
			return request(assign(Tracker._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsNonRegisteredForMe: function() {
			return request(assign(Tracker._deleteAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Tracker._getByCustomerForMe = function() {

		return {
			modelName:      Tracker.name,
			methodName:     'getByCustomerForMe',
			httpMethod:     'GET',
			path:           '/v1/me/tracker',
			params:         [],
		};

	};

	Tracker._getForMe = function() {

		return {
			modelName:      Tracker.name,
			methodName:     'getForMe',
			httpMethod:     'GET',
			path:           '/v1/me/trackers/{trackerId}',
			params:         ['trackerId', ],
		};

	};

	Tracker._getAsNonRegisteredForMe = function() {

		return {
			modelName:      Tracker.name,
			methodName:     'getAsNonRegisteredForMe',
			httpMethod:     'GET',
			path:           '/v1/me/non-registered/trackers/{trackerId}',
			params:         ['trackerId', ],
		};

	};

	Tracker._createForMe = function() {

		return {
			modelName:      Tracker.name,
			methodName:     'createForMe',
			httpMethod:     'POST',
			path:           '/v1/me/trackers',
			params:         [],
			withoutPayload: true,
		};

	};

	Tracker._createAsNonRegisteredForMe = function() {

		return {
			modelName:      Tracker.name,
			methodName:     'createAsNonRegisteredForMe',
			httpMethod:     'POST',
			path:           '/v1/me/non-registered/trackers',
			params:         [],
			withoutPayload: true,
		};

	};

	Tracker._changeOwnerForMe = function() {

		return {
			modelName:      Tracker.name,
			methodName:     'changeOwnerForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/trackers/{trackerId}/customer',
			params:         ['trackerId', ],
			withoutPayload: true,
		};

	};

	Tracker._deleteForMe = function() {

		return {
			modelName:      Tracker.name,
			methodName:     'deleteForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/trackers/{trackerId}',
			params:         ['trackerId', ],
		};

	};

	Tracker._deleteAsNonRegisteredForMe = function() {

		return {
			modelName:      Tracker.name,
			methodName:     'deleteAsNonRegisteredForMe',
			httpMethod:     'DELETE',
			path:           '/v1/me/non-registered/trackers/{trackerId}',
			params:         ['trackerId', ],
		};

	};

	return Tracker;

};