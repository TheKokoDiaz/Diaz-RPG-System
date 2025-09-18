class backpackItem{
    constructor({item, quantity, description, hp, ep, buff}){
        this.item = item;
        this.quantity = quantity;
        this.description = description;
        this.hp = hp;
        this.ep = ep;
        this.buff = buff;
    }
}

// Objects (Items)
let adrenalin = new backpackItem({
    item: 'adrenalin',
    quantity: 1,
    description: 'It fills you with lot of energy',
    hp: 10,
    ep: 200,
    buff: hyperEnergized
});

let regenerationPotion = new backpackItem({
    item: 'Regeneration Potion',
    quantity: 3,
    description: 'Allows you to recover health during some time',
    hp: 0,
    ep: 0,
    buff: superRegeneration
});

let healPotion = new backpackItem({
    item: 'Heal Potion',
    quantity: 2,
    description: 'It heals a decent amount of health',
    hp: 60,
    ep: 0,
    buff: null
});

let superHealPotion = new backpackItem({
    item: 'Super Heal Potion',
    quantity: 1,
    description: 'Restore all your health and a little more through time',
    hp: 200,
    ep: 0,
    buff: regeneration
});

let ramen = new backpackItem({
    item: 'ramen',
    quantity: 1,
    description: 'Delicious! It fills you with energy slowly',
    hp: 50,
    ep: 20,
    buff: superEnergized
});

let vitamins = new backpackItem({
    item: 'vitamins',
    quantity: 1,
    description: 'Increases energy through time',
    hp: 0,
    ep: 20,
    buff: energized
});