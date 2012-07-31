// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
var AppView = BaseView.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#appView"),

    // Our template for the line of statistics at the bottom of the app.
    //statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        "click #createItem":  "createItem",
        "click #createCharacter":  "createCharacter"
        /*"click #clear-completed": "clearCompleted",
        "click #toggle-all": "toggleAllComplete"*/
    },

    initialize: function() {
        this.newItem = this.$("#newItem");
        this.allItems = this.$("#allItems");

        ItemList.bind('add', this.addOne, this);
        ItemList.bind('reset', this.addAll, this);
        ItemList.bind('all', this.render, this);
        ItemList.fetch();

        Account.fetch();
        if(Account.length)
        {
            var view = new CharacterView({model: Account.at(0)});
            this.$("#characterFrame").html(view.render().el);
        }

    },

    render: function() {
/*        var done = ItemList.done().length;
        var remaining = ItemList.remaining().length;*/

/*        if (ItemList.length) {
            this.main.show();
            this.footer.show();
            this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
        } else {
            this.main.hide();
            this.footer.hide();
        }*/

  /*      this.allCheckbox.checked = !remaining;*/
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(item) {
        console.log('addOne d:'+item.get('draft'));
        var view = new ItemView({model: item});
        this.$("#allItems").append(view.render().el);
/*
        var view = new CreateItemView({model: item});
        this.$("#newItem").append(view.render().el);
*/
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
        ItemList.each(this.addOne);
    },

    createItem: function(e) {
        console.log('AppView:createItem');
        var item = ItemList.create({title:'New item'});
        // @todo remove old view
        var view = new CreateItemView({model: item});
        this.$("#newItem").html(view.render().el);
    },

    createCharacter: function(e) {
        console.log('AppView:createCharacter');
        //var item = Account.create({name:'New character'});
        // @todo remove old view
        var view = new CreateCharacterView();
        this.$("#newCharacter").html(view.render().el);
    }

});

$(function(){
// Finally, we kick things off by creating the **App**.
var App = new AppView;

});