var Characters = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: function(attributes, options) {
        heroModel = tools.getClassByName(attributes.heroClass)

        return new heroModel(attributes, options);
    },

    localStorage: new Store("bz-d3-characters")

});

var Account = new Characters;