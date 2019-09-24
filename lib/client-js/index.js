const Clayful = require('../clayful');
const models = require('../models-js');
const LocalCart = require('../local-cart');

Clayful.defaultHeaders['Clayful-SDK'] = `clayful-js`;

Clayful.setModels(models);

Clayful.LocalCart = LocalCart;

if (typeof module === 'object' && module.exports) {
	module.exports = Clayful;
}

if (typeof window === 'object') {
	window.Clayful = Clayful;
}