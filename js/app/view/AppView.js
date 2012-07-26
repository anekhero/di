// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
var AppView = BaseView.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        "keypress #new-todo":  "createOnEnter"
        /*"click #clear-completed": "clearCompleted",
        "click #toggle-all": "toggleAllComplete"*/
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

        this.input = this.$("#new-todo");
        this.allCheckbox = this.$("#toggle-all")[0];

        ItemList.bind('add', this.addOne, this);
        ItemList.bind('reset', this.addAll, this);
        ItemList.bind('all', this.render, this);

        this.footer = this.$('footer');
        this.main = $('#main');

        ItemList.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
/*        var done = ItemList.done().length;
        var remaining = ItemList.remaining().length;*/

        if (ItemList.length) {
            this.main.show();
/*            this.footer.show();
            this.footer.html(this.statsTemplate({done: done, remaining: remaining}));*/
        } else {
            this.main.hide();
/*            this.footer.hide();*/
        }

  /*      this.allCheckbox.checked = !remaining;*/
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(item) {
        var view = new ItemView({model: item});
        this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
        ItemList.each(this.addOne);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        if (!this.input.val()) return;

        ItemList.create({name: this.input.val(),level:60});
        this.input.val('');
    }

/*    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
        _.each(Todos.done(), function(todo){ todo.clear(); });
        return false;
    },

    toggleAllComplete: function () {
        var done = this.allCheckbox.checked;
        Todos.each(function (todo) { todo.save({'done': done}); });
    }*/

});

$(function(){
// Finally, we kick things off by creating the **App**.
var App = new AppView;

});