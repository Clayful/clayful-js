const Clayful = require('../clayful');
const models = require('../models-js');

Clayful.defaultHeaders['Clayful-SDK'] = `clayful-js`;

Clayful.setModels(models);

if (typeof module === 'object' && module.exports) {
	module.exports = Clayful;
}

if (typeof window === 'object') {
	window.Clayful = Clayful;
}