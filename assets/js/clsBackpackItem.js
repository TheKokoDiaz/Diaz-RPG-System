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
    description: 'It fills you with EP and a lot of energy',
    hp: 10,
    ep: 200,
    buff: 'hyperEnergized'
});

let bandAid = new backpackItem({
    item: 'band-aid',
    quantity: 3,
    description: 'It heals a tiny amount of HP, but using it makes fell you better',
    hp: 5,
    ep: 0,
    buff: 'regeneration'
});

let bandage = new backpackItem({
    item: 'bandage',
    quantity: 2,
    description: 'Fast to apply, it heals a decent amount of HP',
    hp: 60,
    ep: 0,
    buff: null
});

let medKit = new backpackItem({
    item: 'med-kit',
    quantity: 1,
    description: 'Hard to use but it can restore all your HP',
    hp: 150,
    ep: 0,
    buff: null
});

let ramen = new backpackItem({
    item: 'ramen',
    quantity: 1,
    description: 'Delicious and with a lot of protein, it fills you with HP slowly',
    hp: 30,
    ep: 10,
    buff: 'regeneration'
});

let vitamins = new backpackItem({
    item: 'vitamins',
    quantity: 1,
    description: 'Increases energy',
    hp: 0,
    ep: 20,
    buff: 'energized'
});