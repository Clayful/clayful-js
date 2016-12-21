"use strict";

module.exports = (dest, source) => {

	for (const key in source) {

		dest[key] = source[key];
	}

	return dest;

};