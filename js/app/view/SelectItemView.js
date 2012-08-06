// Select Item Dialog
// --------------

var SelectItemView = BaseView.extend({

    //... is a list tag.
    tagName:  "div",

    // Cache the template function for a single item.
    template: _.template($('#select-item-template').html()),
    itemTemplate: _.template($('#item-in-select-template').html()),

    // The DOM events specific to an item.
    events: {
        "click .select-item-button"   : "selectItem"
//        "dblclick .view"  : "edit",
//        "click a.destroy" : "clear"
//        "keypress .edit"  : "updateOnEnter",
//        "blur .edit"      : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        console.log(arguments);
        // @TODO use BaseView bind
/*        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);*/
        //this.model.bind('add', this.addOne, this);
    },

    // Re-render the titles of the todo item.
    render: function() {
        console.log('SelectItemView.render');
        //this.$el.html(this.template(this.model.toJSON()));
        this.$el.html(this.template());

        // ITEMS
/*        var o=this;
        _.each(this.model.get('slots'), function(v,k){
            o.$('.character-items').append(o.slotTemplate({'label':tools.abbr2text(k),'name':k,'id':v}));
        });*/


        /*this.$el.toggleClass('done', this.model.get('done'));
        this.input = this.$('.edit');*/
        return this;
    },


    selectItem: function(e) {
        console.log('CharacterView.selectItem');
        var slot_name = $(e.target).closest('.character-slot').attr('data-slot_name');
        console.log(slot_name);

        var o = this;
        var itemsForSlot = ItemList.filter(function(item){
        if(o.model.itemTypeInSlot[slot_name][item.get("type")]) return true;
        });
        console.log(itemsForSlot);
        var $si = $('#selectItem');
        _.each(itemsForSlot,function(v){
            $si.append('<div><a href="#">'+v.get('title')+'</a></div>');
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