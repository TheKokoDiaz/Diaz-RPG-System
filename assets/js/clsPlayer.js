class clsPlayer{
    constructor({audioID, health, maxHealth, aura, maxAura, attack, techniques, crit_multiplier, defense}){
        //+ HTML
        this.audioID = document.getElementById(audioID);

        //+ Combat
        this.health = health;
        this.maxHealth = maxHealth;

        this.aura = aura;
        this.maxAura = maxAura;

        this.attack = attack;
        this.crit_multiplier = crit_multiplier;
        this.defense = defense;
        
        this.techniques = techniques;
        this.effects = [];
        this.items = [
            adrenalin,
            bandAid,
            bandage,
            medKit,
            ramen,
            vitamins,
        ];

        this.move = '';
    }

    //! Methods
    //+ SFX
    changeSfx(sfx){
        player_sfx.volume = sfx_volume;
        player_sfx.setAttribute('src', '../assets/sfx/' + sfx + '.mp3');
        player_sfx.play();
    }
}

let Karma = new clsPlayer({
    audioID: 'player_sfx',

    health: 25,
    maxHealth: 100,
    aura: 15,
    maxAura: 100,
    attack: 30,
    techniques: [
        tornado, 
        heal
    ],
    crit_multiplier: 1.5,
    defense: 3
})
