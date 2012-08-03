// Character View
// --------------

// The DOM element for a todo item...
var CharacterView = BaseView.extend({

    //... is a list tag.
    tagName:  "div",

    // Cache the template function for a single item.
    template: _.template($('#character-template').html()),
    slotTemplate: _.template($('#character-slot-template').html()),

    // The DOM events specific to an item.
    events: {
        "click .change-item-button"   : "selectItem"
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
        console.log('CharacterView.render');
        this.$el.html(this.template(this.model.toJSON()));

        // ITEMS
        var o=this;
        _.each(this.model.get('slots'), function(v,k){
            o.$('.character-items').append(o.slotTemplate({'label':tools.abbr2text(k),'name':k,'id':v}));
        });


        /*this.$el.toggleClass('done', this.model.get('done'));
        this.input = this.$('.edit');*/
        return this;
    },


    selectItem: function(e) {
        console.log('CharacterView.selectItem');
        var slot_name = $(e.target).closest('.character-slot').attr('data-slot_name');
        console.log(slot_name);

        var o = this;
         var itemsForSlot = ItemList.filter(function(item) {
            if(o.model.itemTypeInSlot[item.get("type")])
             {
                 console.log(item.get("title"));
                 return true;
             }
         });
//         this.$('.character-items').html(this.template(this.model.toJSON()));

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