var ItemAbstract = Backbone.Model.extend({
    defaults : {
        title:      'Untitled',
        type:       'none',

        //stats : {},
        // all possible stats for item
        // false - empty
        stats : {
            's_str' : false,
            's_dex' : false,
            's_int' : false,
            's_vit' : false
        },

        // stats for visualization
        stats_ : [
            {'code':'s_dex', 'val':0},
            {'code':'s_int', 'val':10}
        ],


        draft:       true,

        key: function(){console.log(['key',arguments,this]);return '555';},
        value: function(){console.log(['value',arguments,this]);return '555';},
        www:function() {
            console.log(['www',arguments,this]);
            return function(text) {
                console.log(['fn',arguments,text]);
                return "<b>" + text + "</b>"
            }
        }
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

    getStats: function(){
        var r=[];
        var s= this.get('stats');
        for(var i in s)
        {
            if(s[i]!==false) r.push({'code':i,'val':s[i]});
        }
        return r;
    },


    getEmptyStats: function(){
        var r=[];
        var s= this.get('stats');
        for(var i in s)
        {
            if(s[i]===false) r.push({'code':i,'val':s[i]});
        }
        return r;
    },


    /**
     *
     * @param arg1 mixed        stat name or array of stats
     * arguments[2]             stat value (if arg1 is stat name)
     */
    setStats : function(arg1) {
        console.log(['ItemAbstract.setStats',arguments]);
        var newStats = {};
        var arg2 = (arguments.length>1) ? arguments[1] : '';
        var currentStats = _.clone(this.get('stats'));
        var passedStats = arg1;
        var options = {};

        if(typeof arg1 !== 'object')
        {
            passedStats = {};
            passedStats[arg1]=arg2;
        }
        else
        {
            if(arguments[2]) options = arguments[2]
        }

        _.each(passedStats, function(v,k){
            if(typeof currentStats[k]!='undefined' && !(currentStats[k]!==false && passedStats[k]=='')) currentStats[k] = passedStats[k];
        });

/*
        _.each(this.statsList, function(v,k){
            if(passedStats[k]!==undefined) newStats[k] = passedStats[k];
            else if(currentStats[k]) newStats[k] = currentStats[k];
        });

*/
        this.set('stats',currentStats);
        this.trigger('change');
    }
});
