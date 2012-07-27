var Items = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Item,

    localStorage: new Store("bz-d3-items"),

    // Filter down the list of all todo items that are finished.
    done: function() {
        return this.filter(function(item){ return item.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
        return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
        return todo.get('order');
    }

});

// Create our global collection of **Todos**.
var ItemList = new Items;