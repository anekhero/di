// Create Character View
// --------------

// The DOM element for a todo item...
var CreateCharacterView = BaseView.extend({

    //... is a list tag.
    tagName:  "div",

    // Cache the template function for a single item.
    createTypeTemplate: _.template($('#create-character-template').html()),


    // The DOM events specific to an item.
    events: {
        "click .create-character-button"     : "createCharacter",
        "click .cancel-character-button"     : "cancelCharacter"
/*        "change input[name=title]"    : "changeItem",
        "change select[name=type]"    : "changeItem",
        "change .item-stat select, .item-stat input"    : "changeItem",
        "change .item-stat select"      : "check4NewStat"*/
//        "keypress .edit"  : "updateOnEnter",
//        "blur .edit"      : "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        // @TODO use BaseView bind
/*
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
*/
        //this.model.bind('add', this.addOne, this);

    },

    // Re-render the titles of the todo item.
    render: function() {
        this.$el.html(this.createTypeTemplate({'classes':tools.getClassesList()}));
        return this;
    },


    createCharacter: function() {
        console.log('CreateCharacterView.createCharacter');

        var name = this.$('input').val();
        var heroClass = this.$('select').val();

        var hero = Account.create({name:name,'heroClass':heroClass});
        //this.model.save('draft',false);
        //console.log(JSON.stringify(this.model));
        this.remove();
    },

    cancelCharacter: function() {
        console.log('CreateCharacterView.cancelCharacter');
        this.remove();
    }



});