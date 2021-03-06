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

/*        $.ajax({
            type: 'GET',
            url: 'http://eu.battle.net/api/d3/profile/ANEKHERo-2990/hero/17608963',
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(r){console.log(r);}
        });*/

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
        //var item = ItemList.create({title:'New item'});
//        var item = ItemList.create();
        //var item = ItemList.get('133e69c4-10f3-3c1f-0c41-1bcb7f1da385');
/*console.log(['AppView:createItem -- ',item]);
        // @todo remove old view
        var view = new CreateItemView({model: item});
        this.$("#newItem").html(view.render().el);*/

        $.ajax({
            type: 'GET',
            url: 'http://eu.battle.net/api/d3/data/item/CkMI1-_wlg8SBwgEFZtFm38dT5fAJB3H0vNlHR4XWqMdO53LyB0SVtXuIgsIARV4QgMAGAAgEDAJOMcEQABIClAOYMcEGLaW2vkPUAJYAA',
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(r){
//console.log(['item',r]);
                var item = ItemList.create(r);
                //var view = new ItemView({model: item});
                //this.$("#selectItem").html(view.render().el);
            }
        });
    },

    loadItem: function(tooltipParams, hero, slot) {
        console.log('AppView:loadItem '+tooltipParams);

        return $.ajax({
            type: 'GET',
            url: 'http://eu.battle.net/api/d3/data/'+tooltipParams,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp'
            ,success: function(r){

                // create item
                var item = ItemList.create(r);

                // link item to hero
                hero.setItemToSlot(item, slot);
            }
        });
    },

    createCharacter: function(e) {
        console.log('AppView:createCharacter');
        //var item = Account.create({name:'New character'});
        // @todo remove old view
/*        var view = new CreateCharacterView();
        this.$("#newCharacter").html(view.render().el);*/
        var o = this;

        $.ajax({
            type: 'GET',
            url: 'http://eu.battle.net/api/d3/profile/ANEKHERo-2990/hero/17608963',
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(r){

                // create hero
                r.heroClass = r.class;
                var hero = Account.create(r);

                // load items
                var dfd = [];
                _.each(r.items, function(v,k){
                    dfd.push(o.loadItem(v.tooltipParams, hero, k));
                });

                // after link item to hero...
                $.when.apply(null, dfd).done(function(){

                    // save item links
                    hero.save();

                    // show hero
                    var view = new CharacterView({model: hero});
                    $("#characterFrame").html(view.render().el);
                });

            }
        });
    }

});

$(function(){
// Finally, we kick things off by creating the **App**.
var App = new AppView;

});