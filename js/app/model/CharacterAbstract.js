var CharacterAbstract = Backbone.Model.extend({
    idAttribute: "_id",
    defaults : {
        "id" : 0
        ,"name" : ""
        ,"class" : ""
        ,"heroClass": ""
        ,"gender": 0
        ,"level": 0
        ,"paragonLevel": 0
        ,"hardcore": true

        ,"dead": false
        ,"last-updated": 0

        ,items:{
            "head": null
            ,"torso": null
            ,"feet": null
            ,"hands": null
            ,"shoulders": null
            ,"legs": null
            ,"bracers": null
            ,"mainHand": null
            ,"offHand": null
            ,"waist": null
            ,"rightFinger": null
            ,"leftFinger": null
            ,"neck": null
        }

        ,stats:{
            "life" : 0
            ,"damage" : 0.0
            ,"attackSpeed" : 0.0
            ,"armor" : 0
            ,"strength" : 0
            ,"dexterity" : 0
            ,"vitality" : 0
            ,"intelligence" : 0
            ,"physicalResist" : 0
            ,"fireResist" : 0
            ,"coldResist" : 0
            ,"lightningResist" : 0
            ,"poisonResist" : 0
            ,"arcaneResist" : 0
            ,"critDamage" : 0.0
            ,"damageIncrease" : 0.0
            ,"critChance" : 0.0
            ,"damageReduction" : 0.0
            ,"blockChance" : 0.0
            ,"thorns" : 0.0
            ,"lifeSteal" : 0.0
            ,"lifePerKill" : 0.0
            ,"goldFind" : 0.0
            ,"magicFind" : 0.0
            ,"blockAmountMin" : 0
            ,"blockAmountMax" : 0
            ,"lifeOnHit" : 0.0
            ,"primaryResource" : 0
            ,"secondaryResource" : 0
        }
    },
/*
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
*/

    itemTypeInSlot : {
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
        'off_hand':{'shield':true}
    },



    initialize : function() {
        console.log('CharacterAbstract.initialize');
        this.on('change', this.simulate);

        this.trigger('change');
    },

    set: function(attributes, options) {
        Backbone.Model.prototype.set.call(this, attributes, options);
        return this;
    },

    getItemBySlot: function(attributes, options) {
        Backbone.Model.prototype.set.call(this, attributes, options);
        return this;
    },

/*    setItemToSlot: function(attributes, options) {
        Backbone.Model.prototype.set.call(this, attributes, options);
        return this;
    },*/

    setItemToSlot: function(item, slot) {
        var currentItems = this.get('items');
        currentItems[slot] = item.id;
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
