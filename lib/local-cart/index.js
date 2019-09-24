const assign = require('../util/assign');

const LocalCart = {
    storage: (typeof window === 'object' ? window.localStorage : null),
    storageKey: '__cartItems__',
    items: null,
};

// ISO Date String -> Date
LocalCart.parseISOString = (s) => {

    const b = s.split(/\D+/);

    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

// Config LocalCart
LocalCart.config = (options) => assign(LocalCart, options);

// Limit total number of items to 50
LocalCart.limitTotal = (items) => {

    if (!items) return;

    const total = LocalCart.items.reduce((all, item) => {
        return all.concat(item, item.bundleItems || []);
    }, []).length;

    if (total > 50) {
        LocalCart.items = LocalCart.items.slice(1);
    }

};

// Read items from the storage
LocalCart.loadItems = () => {

    LocalCart.items = (
        LocalCart.items ||
        JSON.parse(LocalCart.storage.getItem(LocalCart.storageKey) || '[]')
    ).map((item) => {
        
        item.addedAt = (
            typeof item.addedAt === 'string' ?
                LocalCart.parseISOString(item.addedAt) :
                item.addedAt
        );

        return item;
    });

    return LocalCart.items;

};

// Save items to the storage
LocalCart.saveItems = () => {
    LocalCart.limitTotal();
    LocalCart.storage.setItem(LocalCart.storageKey, JSON.stringify(LocalCart.items));
};

// Set unique item IDs
LocalCart.setItemDefaults = (item) => {

    [].concat(item, item.bundleItems || []).forEach((item) => {
        item._id = item._id || (Math.random() + '').slice(2, 17);
        item.shippingMethod = item.shippingMethod || null;
    });

    return item;

};

// Find an item by ID
LocalCart.findItem = (items, itemId) => {

    if (typeof items === 'string' && !itemId) {
        itemId = items;
        items = LocalCart.items;
    }

    items = items || [];

    for (let i = 0; i < items.length; i++) {
        
        const item = items[i];

        if (item._id === (itemId + ''))  {
            return item;
        }
    }

    return null;
};

// Add an item
LocalCart.addItem = LocalCart.addItemForMe = (item) => {

    if (!item) return;

    LocalCart.setItemDefaults(item);
    
    item.bundleItems = item.bundleItems || [];
    item.addedAt = new Date();

    LocalCart.items = LocalCart.loadItems().concat(item);
    LocalCart.saveItems();

    return item;

};

// Update an item
LocalCart.updateItem = LocalCart.updateItemForMe = (itemId, update) => {

    if (!update) return;

    LocalCart.loadItems();
    
    const found = LocalCart.findItem(LocalCart.items, itemId);

    if (!found) return;

    const bundleItems = update.bundleItems;

    delete update.bundleItems;

    assign(found, update);

    if (bundleItems) {

        found.bundleItems = found.bundleItems || [];

        if (bundleItems.length) {

            found.bundleItems = bundleItems;
            
        } else {

            for (const bundleId in bundleItems) {

                const bundleItem = LocalCart.findItem(found.bundleItems, bundleId);
                const bundleUpdate = bundleItems[bundleId];

                if (!bundleItem && bundleUpdate) {
                    found.bundleItems.push(bundleUpdate);
                }

                if (bundleItem && bundleUpdate) {
                    assign(bundleItem, bundleUpdate);
                }

                if (bundleUpdate === null) {
                    found.bundleItems = found.bundleItems.filter((bundleItem) => {
                        return bundleItem._id !== bundleId;
                    });
                }
            }
        }

    }

    LocalCart.setItemDefaults(found);
    LocalCart.saveItems();

    return found;

};

// Delete an item
LocalCart.deleteItem = LocalCart.deleteItemForMe = (itemId) => {

    LocalCart.items = LocalCart.loadItems().filter((item) => {
        return item._id !== (itemId + '');
    });
    LocalCart.saveItems();

};

// Delete all items
LocalCart.empty = LocalCart.emptyForMe = () => {

    LocalCart.items = [];
    LocalCart.saveItems();

};

// Load all items from the storage when initialized
LocalCart.loadItems();

if (typeof module === 'object') {
    module.exports = LocalCart;
}

if (typeof window === 'object') {
    if (typeof window.Clayful === 'object') {
        window.Clayful.LocalCart = LocalCart;
    } else {
        window.Clayful = { LocalCart };
    }
}