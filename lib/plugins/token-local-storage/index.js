"use strict";

function TokenStorage(key) {

	this.key = key;

}

TokenStorage.prototype.setToken = function(tokenDetail) {

	localStorage.setItem(this.key, JSON.stringify(tokenDetail));
};

TokenStorage.prototype.getToken = function() {

	return JSON.parse(localStorage.getItem(this.key) || null);

};

module.exports = TokenStorage;