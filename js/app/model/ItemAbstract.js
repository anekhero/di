var ItemAbstract = Backbone.Model.extend({
    defaults : {
        title:      'Untitled',
        type:       'none',

        stats : {},

        draft:       true
    },

    statsList : {
        'str' : '',
        'dex' : '',
        'int' : '',
        'vit' : ''
    },

    typesList : {
        'helm':'',
        'spirit_stone':'',
        'voodoo_mask':'',
        'wizard_hat':'',
        'pauldrons':'',
        'chest':'',
        'cloak':'',
        'bracers':'',
        'gloves':'',
        'belt':'',
        'mighty_belt':'',
        'pants':'',
        'boots':'',
        'amulet':'',
        'ring':'',
        'shield':'',
        'mojo':'',
        'orb':'',
        'quiver':'',

        'axe':'',
        'dagger':'',
        'mace':'',
        'spear':'',
        'sword':'',
        'ceremonial_knife':'',
        'fist_weapon':'',
        'mighty_weapon':'',

        'th_axe':'',
        'th_mace':'',
        'polearm':'',
        'staff':'',
        'th_sword':'',
        'daibo':'',
        'th_mighty_weapon':'',

        'bow':'',
        'crossbow':'',
        'h_crossbow':'',
        'wand':''
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
