var ToolBox = Backbone.Model.extend({
    defaults : {
    },



    classList : {
        'barbarian' : Barbarian,
        'demon_hunter' : DemonHunter,
        'monk' : Monk,
        'witch_doctor' : WitchDoctor,
        'wizard' : Wizard
    },

    text4abbr : {

        'barbarian' : 'Barbarian',
        'demon_hunter' : 'Demon Hunter',
        'monk' : 'Monk',
        'witch_doctor' : 'Witch Doctor',
        'wizard' : 'Wizard',

        'head':'Head',
        'shoulders':'Shoulders',
        'torso':'Torso',
        'wrists':'Wrists',
        'hands':'Hands',
        'waist':'Waist',
        'legs':'Legs',
        'feet':'Feet',
        'neck':'Neck',
        'finger_right':'Finger',
        'finger_left':'Finger',
        'hand':'Hand',
        'off_hand':'Off-Hand',



        's_str' : 'Strength',
        's_dex' : 'Dexterity',
        's_int' : 'Intelligence',
        's_vit' : 'Vitality',

        'extraGHFG' : 'Extra Globe Health from globes',


        'helm' : 'Helm',
        'spirit_stone':'Spirit Stone',
        'voodoo_mask':'Voodoo Mask',
        'wizard_hat':'Wizard Hat',
        'pauldrons':'Pauldrons',
        'chest':'Chest Armor',
        'cloak':'Cloak',
        'bracers':'Bracers',
        'gloves':'Gloves',
        'belt':'Belt',
        'mighty_belt':'Mighty Belt',
        'pants':'Pants',
        'boots':'Boots',
        'amulet':'Amulet',
        'ring':'Ring',
        'shield':'Shield',
        'mojo':'Mojo',
        'orb':'Orb',
        'quiver':'Quiver',

        'axe':'Axe',
        'dagger':'Dagger',
        'mace':'Mace',
        'spear':'Spear',
        'sword':'Sword',
        'ceremonial_knife':'Ceremonial Knife',
        'fist_weapon':'Fist Weapon',
        'mighty_weapon':'Mighty Weapon',

        'th_axe':'Two-Handed Axe',
        'th_mace':'Two-Handed Mace',
        'polearm':'Polearm',
        'staff':'Staff',
        'th_sword':'Two-Handed Sword',
        'daibo':'Daibo',
        'th_mighty_weapon':'Two-Handed Mighty Weapon',

        'bow':'Bow',
        'crossbow':'Crossbow',
        'h_crossbow':'Hand Crossbow',
        'wand':'Wand'
    },

    initialize : function() {
    },

    abbr2text : function(abbr) {
        return (this.text4abbr[abbr]) ? this.text4abbr[abbr] : '???';
    },

    getClassesList : function() {
         return {
             'barbarian' : 'Barbarian',
             'demon_hunter' : 'Demon Hunter',
             'monk' : 'Monk',
             'witch_doctor' : 'Witch Doctor',
             'wizard' : 'Wizard'
        };
    },

    getClassByName : function(name) {
        console.log('getClassByName '+name);
        if(this.classList[name]) return this.classList[name];
        else return false;
    }
});

var tools = new ToolBox();