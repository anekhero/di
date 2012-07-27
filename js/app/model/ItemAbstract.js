var ItemAbstract = Backbone.Model.extend({
    defaults : {
        title:       'Item Title',
        type:       'shild',

        stats : {
            int : 10,
            str : 20
        },

        draft:       true
    },

    initialize : function() {
        this.on('change', this.simulate);

        this.trigger('change');
    },

    setStats : function(name,value) {
        var stats = this.get('stats');
        stats[name] = value;
        this.set('stats',stats);
        this.trigger('change');
    }
});
