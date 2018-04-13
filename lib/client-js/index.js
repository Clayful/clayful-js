const Clayful = require('../clayful');
const models = require('../models-js');

Clayful.defaultHeaders['Clayful-SDK'] = `clayful-js`;

Clayful.setModels(models);

module.exports = window.Clayful = Clayful;