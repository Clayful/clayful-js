var expect = chai.expect;

var LocalCart = Clayful.LocalCart;

LocalCart.storage.removeItem(LocalCart.storageKey);

var readFromStorage = function() {

    var saved = LocalCart.storage.getItem(LocalCart.storageKey);

    return JSON.parse(saved).map(function(item) {
        item.addedAt = new Date(item.addedAt);
        return item;
    });

};

var cloneItem = function(item) {

    var cloned = JSON.parse(JSON.stringify(item));

    cloned.addedAt = LocalCart.parseISOString(cloned.addedAt);

    return cloned;
};

describe('LocalCart', function() {

    describe('#config()', function() {

        it('should config LocalCart', function() {

            expect(LocalCart.storage).to.eql(localStorage);
            expect(LocalCart.storageKey).to.eql('__cartItems__');

            LocalCart.config({
                storage: sessionStorage,
                storageKey: '____',
            });

            expect(LocalCart.storage).to.eql(sessionStorage);
            expect(LocalCart.storageKey).to.eql('____');

            LocalCart.config({
                storage: localStorage,
                storageKey: '__cartItems__',
            });
            
        });

    });

    describe('#addItem()', function() {
        
        it('should have default fields for an added item', function() {

            expect(LocalCart.items).to.eql([]);
        
            LocalCart.addItem({
                product: 'A-P',
                variant: 'A-V',
                quantity: 1,
                shippingMethod: 'A-S',
            });

            var added = LocalCart.items[0];

            expect(added._id).to.be.a('string');
            expect(added.product).to.eql('A-P');
            expect(added.variant).to.eql('A-V');
            expect(added.quantity).to.eql(1);
            expect(added.shippingMethod).to.eql('A-S');
            expect(added.bundleItems).to.eql([]);
            expect(added.addedAt).to.be.a('date');

            expect(LocalCart.items).to.eql(readFromStorage());

        });

        it('should have an item to an existing cart', function() {

            expect(LocalCart.items).to.have.length(1);
        
            LocalCart.addItem({
                product: 'B-P',
                variant: 'B-V',
                quantity: 3,
                shippingMethod: 'B-S',
                bundleItems: [
                    {
                        product: 'BB-P',
                        variant: 'BB-V',
                        quantity: 1,
                        shippingMethod: 'BB-S',
                    }
                ]
            });

            var added = LocalCart.items[1];
            var addedBundle = added.bundleItems[0];

            expect(added._id).to.be.a('string');
            expect(added.product).to.eql('B-P');
            expect(added.variant).to.eql('B-V');
            expect(added.quantity).to.eql(3);
            expect(added.shippingMethod).to.eql('B-S');
            expect(added.addedAt).to.be.a('date');

            expect(addedBundle._id).to.be.a('string');
            expect(addedBundle.product).to.eql('BB-P');
            expect(addedBundle.variant).to.eql('BB-V');
            expect(addedBundle.quantity).to.eql(1);
            expect(addedBundle.shippingMethod).to.eql('BB-S');

            expect(LocalCart.items).to.eql(readFromStorage());

        });

    });

    describe('#updateItem()', function() {

        it('should ignore not existing items', function() {

            var items = JSON.stringify(LocalCart.items);

            LocalCart.updateItem('asd', {});

            expect(items).to.eql(JSON.stringify(LocalCart.items));

            expect(LocalCart.items).to.eql(readFromStorage());

        });

        it('should update an item (without bundleItems)', function() {

            var item = cloneItem(LocalCart.items[0]);

            LocalCart.updateItem(item._id, {
                variant: 'A-V2',
                quantity: 2,
            });

            var updated = LocalCart.findItem(item._id);

            item.variant = 'A-V2';
            item.quantity = 2;
            expect(updated).to.eql(item);

            expect(LocalCart.items).to.eql(readFromStorage());

        });

        it('should override bundle items array (and generate ids if necessary)', function() {
            
            var item = cloneItem(LocalCart.items[1]);

            LocalCart.updateItem(item._id, {
                bundleItems: [
                    {
                        product: 'BB-P2',
                        variant: 'BB-V2',
                        quantity: 5,
                        shippingMethod: 'BB-S2',
                    },
                    {
                        _id: 'ABC',
                        product: 'BB-P3',
                        variant: 'BB-V3',
                        quantity: 2,
                        shippingMethod: 'BB-S3',
                    }
                ]
            });

            var updated = LocalCart.findItem(item._id);

            expect(updated.bundleItems[0]._id).to.be.a('string'); // auto generated
            expect(updated.bundleItems[0].product).to.eql('BB-P2');
            expect(updated.bundleItems[0].variant).to.eql('BB-V2');
            expect(updated.bundleItems[0].quantity).to.eql(5);
            expect(updated.bundleItems[0].shippingMethod).to.eql('BB-S2');

            expect(updated.bundleItems[1]._id).to.eql('ABC');
            expect(updated.bundleItems[1].product).to.eql('BB-P3');
            expect(updated.bundleItems[1].variant).to.eql('BB-V3');
            expect(updated.bundleItems[1].quantity).to.eql(2);
            expect(updated.bundleItems[1].shippingMethod).to.eql('BB-S3');

            expect(LocalCart.items).to.eql(readFromStorage());

        });

        it('should add a bundle item (and generate ids if necessary)', function() {
  
            var item = cloneItem(LocalCart.items[1]);
            var originalLength = item.bundleItems.length;

            LocalCart.updateItem(item._id, {
                bundleItems: {
                    'NEW-1': {
                        product: 'BB-P3',
                        variant: 'BB-V3',
                        quantity: 3,
                        shippingMethod: 'BB-S3',
                    },
                    'NEW-2': {
                        _id: 'NEW-2',
                        product: 'BB-P4',
                        variant: 'BB-V4',
                        quantity: 2,
                        shippingMethod: 'BB-S4',
                    }
                }
            });

            var updated = LocalCart.findItem(item._id);
            var updatedLength = updated.bundleItems.length;

            expect(originalLength + 2).to.eql(updatedLength);

            var addedBundleItems = updated.bundleItems.slice(-2);

            expect(addedBundleItems[0]._id).to.be.a('string'); // auto generated
            expect(addedBundleItems[0].product).to.eql('BB-P3');
            expect(addedBundleItems[0].variant).to.eql('BB-V3');
            expect(addedBundleItems[0].quantity).to.eql(3);
            expect(addedBundleItems[0].shippingMethod).to.eql('BB-S3');

            expect(addedBundleItems[1]._id).to.eql('NEW-2');
            expect(addedBundleItems[1].product).to.eql('BB-P4');
            expect(addedBundleItems[1].variant).to.eql('BB-V4');
            expect(addedBundleItems[1].quantity).to.eql(2);
            expect(addedBundleItems[1].shippingMethod).to.eql('BB-S4');

            expect(LocalCart.items).to.eql(readFromStorage());

        });

        it('should update a bundle item', function() {

            var item = cloneItem(LocalCart.items[1]);

            LocalCart.updateItem(item._id, {
                bundleItems: {
                    ABC: {
                        quantity: 10
                    }
                }
            });

            var updated = LocalCart.findItem(LocalCart.findItem(item._id).bundleItems, 'ABC');
        
            expect(updated.quantity).to.eql(10);

            expect(LocalCart.items).to.eql(readFromStorage());

        });

        it('should delete a bundle item', function() {

            var item = cloneItem(LocalCart.items[1]);

            var beforeDelete = LocalCart.findItem(item.bundleItems, 'ABC');
            
            expect(beforeDelete._id).to.eql('ABC');

            LocalCart.updateItem(item._id, {
                bundleItems: {
                    ABC: null
                }
            });

            var updated = LocalCart.findItem(item._id);
            var deleted = LocalCart.findItem(updated.bundleItems, 'ABC');
        
            expect(deleted).to.eql(null);

            expect(LocalCart.items).to.eql(readFromStorage());


        });

    });

    describe('#deleteItem', function() {

        it('should delete an item', function() {

            var id = LocalCart.items[1]._id;

            LocalCart.deleteItem(id);

            var deleted = LocalCart.items.filter(function(item) {
                return item._id === id;
            })[0];

            expect(deleted).to.eql(undefined);
            expect(LocalCart.items).to.eql(readFromStorage());

        });

    });

    describe('#empty', function() {

        it('should empty all items', function() {

            expect(LocalCart.items.length).to.be.above(0);

            LocalCart.empty();

            expect(LocalCart.items.length).to.eql(0);

            expect(LocalCart.items).to.eql(readFromStorage());

        });

    });

});