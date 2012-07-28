// Create Item View
// --------------

// The DOM element for a todo item...
var CreateItemView = BaseView.extend({

    //... is a list tag.
    tagName:  "div",

    // Cache the template function for a single item.
    template: _.template($('#create-item-template').html()),
    itemTypeTemplate: _.template($('#item-type-template').html()),
    itemTypeHTML: '',
    createStatTemplate: _.template($('#create-stat-template').html()),
    createStatHTML: '',

    // The DOM events specific to an item.
    events: {
        "click .create-item-button"     : "createItem",
        "click .cancel-item-button"     : "cancelItem",
        "change input[name=title]"    : "changeItem",
        "change select[name=type]"    : "changeItem",
        "change .item-stat select, .item-stat input"    : "changeItem",
        "change .item-stat select"      : "check4NewStat"
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

        // @TODO move to "once load"
        this.renderItemTypeTemplate();
        this.renderStatTemplate();
    },

    // Re-render the titles of the todo item.
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$('select').html(this.itemTypeHTML).val(this.model.get('type'));
        var o=this;
        _.each(this.model.get('stats'),function(value,name){
            o.createStat(name,value);
        });
        this.check4NewStat();
        /*this.$el.toggleClass('done', this.model.get('done'));
        this.input = this.$('.edit');*/
        return this;
    },


    createItem: function() {
        console.log('CreateItemView.createItem - '+Sha1.hash(JSON.stringify(this.model.get('type'))));

        //Sha1.hash(JSON.stringify(this.model.get('stats')));
        this.model.save('draft',false);
        console.log(JSON.stringify(this.model));
        this.remove();
    },

    changeItem: function() {
        console.log('CreateItemView.changeItem');
        this.model.set('title',this.$('[name=title]').val());
        this.model.set('type',this.$('[name=type]').val());

        var stats = {};
        var t = this.$('.item-stat').map(function(){
            stats[$(this).find('select').val()] = $(this).find('input').val();
        });
        this.model.setStats(stats);
    },

    cancelItem: function() {
        console.log('CreateItemView.cancelItem');
        this.model.destroy();
    },

    check4NewStat: function() {
        console.log('CreateItemView.check4NewStat');
        var mustAddEmptyStat = true;
        this.$('.item-stat select').each(function(){ if(!$(this).val()) mustAddEmptyStat=false; });
        if(mustAddEmptyStat) this.createStat();
    },

    createStat: function(name,value) {
        console.log('CreateItemView.createStat');
        if(typeof(name)=='undefined')name='';
        if(typeof(value)=='undefined')value='';
        this.$('.item-stats').append(this.createStatHTML);
        this.$('.item-stats').find('select').last().val(name);
        this.$('.item-stats').find('input').last().val(value);
    },

    renderStatTemplate: function() {
        var stats = {'':''};
        _.each(this.model.statsList, function(v,k){
            stats[k] = tools.abbr2text(k);
        });
        this.createStatHTML = this.createStatTemplate({'stats':stats});
    },

    renderItemTypeTemplate: function() {
        var types = {'':''};
        _.each(this.model.typesList, function(v,k){
            types[k] = tools.abbr2text(k);
        });
        this.itemTypeHTML = this.itemTypeTemplate({'types':types});
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