"use strict";

function TokenStorage() {

	this.token = null;
	this.tokenExpiresAt = null;

}

TokenStorage.prototype.setToken = function(tokenDetail) {

	this.token = tokenDetail.token;
	this.tokenExpiresAt = tokenDetail.tokenExpiresAt;

};

TokenStorage.prototype.getToken = function() {

	return {
		token:          this.token,
		tokenExpiresAt: this.tokenExpiresAt
	};

};

module.exports = TokenStorage;