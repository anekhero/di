var CharacterAbstract = Backbone.Model.extend({
    defaults : {
        name:       'Untitled',
        heroClass:      'none',
        level:      0,

        slots : {
            'head':'',
            'shoulders':'',
            'torso':'',
            'wrists':'',
            'hands':'',
            'waist':'',
            'legs':'',
            'feet':'',
            'neck':'',
            'finger_right':'',
            'finger_left':'',
            'hand':'',
            'off_hand':''
        },

        stats : {
            'str' : '',
            'dex' : '',
            'int' : '',
            'vit' : ''
        },

        draft:       true
    },

    initialize : function() {
        this.on('change', this.simulate);

        this.trigger('change');
    },

    set: function(attributes, options) {
        Backbone.Model.prototype.set.call(this, attributes, options);
        return this;
    },

    /**
     *
     * @param arg1 mixed        stat name or array of stats
     * arguments[2]             stat value (if arg1 is stat name)
     */
    setStats : function(arg1) {
        var newStats = {};
        var arg2 = (arguments.length>1) ? arguments[1] : '';
        var currentStats = this.get('stats');
        var passedStats = arg1;

        if(typeof arg1 !== 'object')
        {
            passedStats = {};
            passedStats[arg1]=arg2;
        }

        _.each(this.statsList, function(v,k){
            if(passedStats[k]!==undefined) newStats[k] = passedStats[k];
            else if(currentStats[k]) newStats[k] = currentStats[k];
        });

        this.set('stats',newStats);
        this.trigger('change');
    }
});
