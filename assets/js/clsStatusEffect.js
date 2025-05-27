class statusEffect{
    constructor({name, duration, description, category}){
        this.name = name;
        this.duration = duration;
        this.description = description;
        this.category = category;
    }
}

// Buffs
const energized = new statusEffect({
    name: 'Energized',
    duration: 5,
    description: 'Recover EP through time',
    category: 'buff'
});

const superEnergized = new statusEffect({
    name: 'Super-Energized',
    duration: 4,
    description: 'Recover many EP in some time',
    category: 'buff'
});

const hyperEnergized = new statusEffect({
    name: 'Hyper-Energized',
    duration: 3,
    description: 'Recover a lot of EP in a short time',
    category: 'buff'
});


const regeneration = new statusEffect({
    name: 'Regeneration',
    duration: 6,
    description: 'Heals some HP per turn',
    category: 'buff'
});

const superRegeneration = new statusEffect({
    name: 'Super-Regeneration',
    duration: 5,
    description: 'Heals HP per turn',
    category: 'buff'
});

const hyperRegeneration = new statusEffect({
    name: 'Hyper-Regeneration',
    duration: 4,
    description: 'Heals a lot of HP per turn',
    category: 'buff'
});

// Debuffs
const weakness = new statusEffect({
    name: 'Weakness',
    duration: 3,
    description: 'You deal less damage',
    category: 'debuff'
});