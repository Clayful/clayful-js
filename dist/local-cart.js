(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assign = require('../util/assign');

var LocalCart = {
    storage: (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window.localStorage : null,
    storageKey: '__cartItems__',
    items: null
};

// ISO Date String -> Date
LocalCart.parseISOString = function (s) {

    var b = s.split(/\D+/);

    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

// Config LocalCart
LocalCart.config = function (options) {
    return assign(LocalCart, options);
};

// Limit total number of items to 50
LocalCart.limitTotal = function (items) {

    if (!items) return;

    var total = LocalCart.items.reduce(function (all, item) {
        return all.concat(item, item.bundleItems || []);
    }, []).length;

    if (total > 50) {
        LocalCart.items = LocalCart.items.slice(1);
    }
};

// Read items from the storage
LocalCart.loadItems = function () {

    LocalCart.items = (LocalCart.items || JSON.parse(LocalCart.storage.getItem(LocalCart.storageKey) || '[]')).map(function (item) {

        item.addedAt = typeof item.addedAt === 'string' ? LocalCart.parseISOString(item.addedAt) : item.addedAt;

        return item;
    });

    return LocalCart.items;
};

// Save items to the storage
LocalCart.saveItems = function () {
    LocalCart.limitTotal();
    LocalCart.storage.setItem(LocalCart.storageKey, JSON.stringify(LocalCart.items));
};

// Set unique item IDs
LocalCart.setItemDefaults = function (item) {

    [].concat(item, item.bundleItems || []).forEach(function (item) {
        item._id = item._id || (Math.random() + '').slice(2, 17);
        item.shippingMethod = item.shippingMethod || null;
    });

    return item;
};

// Find an item by ID
LocalCart.findItem = function (items, itemId) {

    if (typeof items === 'string' && !itemId) {
        itemId = items;
        items = LocalCart.items;
    }

    items = items || [];

    for (var i = 0; i < items.length; i++) {

        var item = items[i];

        if (item._id === itemId + '') {
            return item;
        }
    }

    return null;
};

// Add an item
LocalCart.addItem = LocalCart.addItemForMe = function (item) {

    if (!item) return;

    LocalCart.setItemDefaults(item);

    item.bundleItems = item.bundleItems || [];
    item.addedAt = new Date();

    LocalCart.items = LocalCart.loadItems().concat(item);
    LocalCart.saveItems();

    return item;
};

// Update an item
LocalCart.updateItem = LocalCart.updateItemForMe = function (itemId, update) {

    if (!update) return;

    LocalCart.loadItems();

    var found = LocalCart.findItem(LocalCart.items, itemId);

    if (!found) return;

    var bundleItems = update.bundleItems;

    delete update.bundleItems;

    assign(found, update);

    if (bundleItems) {

        found.bundleItems = found.bundleItems || [];

        if (bundleItems.length) {

            found.bundleItems = bundleItems;
        } else {
            var _loop = function _loop(bundleId) {

                var bundleItem = LocalCart.findItem(found.bundleItems, bundleId);
                var bundleUpdate = bundleItems[bundleId];

                if (!bundleItem && bundleUpdate) {
                    found.bundleItems.push(bundleUpdate);
                }

                if (bundleItem && bundleUpdate) {
                    assign(bundleItem, bundleUpdate);
                }

                if (bundleUpdate === null) {
                    found.bundleItems = found.bundleItems.filter(function (bundleItem) {
                        return bundleItem._id !== bundleId;
                    });
                }
            };

            for (var bundleId in bundleItems) {
                _loop(bundleId);
            }
        }
    }

    LocalCart.setItemDefaults(found);
    LocalCart.saveItems();

    return found;
};

// Delete an item
LocalCart.deleteItem = LocalCart.deleteItemForMe = function (itemId) {

    LocalCart.items = LocalCart.loadItems().filter(function (item) {
        return item._id !== itemId + '';
    });
    LocalCart.saveItems();
};

// Delete all items
LocalCart.empty = LocalCart.emptyForMe = function () {

    LocalCart.items = [];
    LocalCart.saveItems();
};

// Load all items from the storage when initialized
LocalCart.loadItems();

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
    module.exports = LocalCart;
}

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    if (_typeof(window.Clayful) === 'object') {
        window.Clayful.LocalCart = LocalCart;
    } else {
        window.Clayful = { LocalCart: LocalCart };
    }
}

},{"../util/assign":2}],2:[function(require,module,exports){
"use strict";

module.exports = function (dest, source) {

	for (var key in source) {

		dest[key] = source[key];
	}

	return dest;
};

},{}]},{},[1]);
