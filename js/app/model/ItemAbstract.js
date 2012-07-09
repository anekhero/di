var ItemAbstract = Backbone.Model.extend({
    defaults : {
        title:       'Item Title',
        type:       'unknown'
    },

    initialize : function() {
        this.on('change', this.simulate);

        this.trigger('change');
    }
});
