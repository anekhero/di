// Create Item View
// --------------

// The DOM element for a todo item...
var ItemView = BaseView.extend({

    //... is a list tag.
    tagName:  "div",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
        "click .remove-item-button"   : "removeItem"
//        "dblclick .view"  : "edit",
//        "click a.destroy" : "clear"
//        "keypress .edit"  : "updateOnEnter",
//        "blur .edit"      : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        // @TODO use BaseView bind
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
        //this.model.bind('add', this.addOne, this);
    },

    // Re-render the titles of the todo item.
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        /*this.$el.toggleClass('done', this.model.get('done'));
        this.input = this.$('.edit');*/
        return this;
    },


    removeItem: function() {
        console.log('ItemView.removeItem');
        if(this.model.get('draft') || confirm('Actually remove the Item?'))
        {
            this.model.destroy();
        }
    },

    showDetails: function() {
        if(typeof ItemDetails != 'undefined') ItemDetails.dispose();
        ItemDetails = new ItemDetailsView({model: this.model});
        ItemDetails.render();
        /*var view = new ItemDetailsView({model: this.model});
        $("#details").html(view.render().el);*/
    },

    // Remove the item, destroy the model.
    clear: function() {
        this.model.clear();
    }

});