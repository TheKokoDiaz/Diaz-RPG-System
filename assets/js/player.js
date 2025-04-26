//! Animation
//+ Play animations
function player_animation(){
    player_ctx.clearRect(0, 0, player_canvas_width, player_canvas_height);
    player_ctx.drawImage(player_canvas_sprite, player_frameX * player_sprite_width, player_frameY * player_sprite_height, player_sprite_width, player_sprite_height,  0, 0, player_canvas_width, player_canvas_height);

    if(player_game_frame % player_straggerFrames == 0){
        if(player_frameX < (player_animation_limit - 1)){
            player_frameX++;
        } else {
            if(player_animation_infinite == true){
                player_frameX = 0;
            } else {
                if(player_frameY != 5){ChangePlayerAnimation({animation: 'idle'});}
            }
        }
    }

    player_game_frame++;
    requestAnimationFrame(player_animation);
}
player_animation();

//+ Change Animations
function ChangePlayerAnimation({animation}){
    player_frameX = 0;

    switch(animation){
        case 'idle':
            if(player_stats.health <= player_stats.max_health / 4){
                player_frameY = 3;
            } else {
                player_frameY = 0;
            }
            player_animation_limit = 8;
            player_animation_infinite = true;
            break;

        case 'sword':
            player_frameY = 1;
            player_animation_infinite = false;
            break;

        case 'damage':
            player_frameY = 2;
            player_animation_limit = 7;
            player_animation_infinite = false;
            break;

        case 'defeated':
            player_frameY = 5;
            player_animation_limit = 9;
            player_animation_infinite = false;
            break;
    }
}

//! SFX
function ChangePlayerSfx({sfx}){
    player_sfx.volume = sfx_volume;
    player_sfx.setAttribute('src', '../assets/sfx/' + sfx + '.mp3');
    player_sfx.play();
}

//! Update Stats
function ChangePlayerHealth(HP){
    player_stats.health += HP;
    
    //Prevents hight numbers that the maximum
    if(player_stats.health > player_stats.max_health){ player_stats.health = player_stats.max_health; }

    //Prevents negative numbers
    if(player_stats.health < 0){ player_stats.health = 0; }

    // Activate warnings when the health is low
    if(player_stats.health <= player_stats.max_health/4){
        SwitchWarnings('on');
    } else {
        SwitchWarnings('off');
    }

    //Updates the graffic bars and texts of the player's HUD
    player_health_text.innerText = 'HP = ' + player_stats.health + ' / ' + player_stats.max_health;
    player_health_graffic.style.width = Math.round((player_stats.health / player_stats.max_health)*100) + '%';
}

function ChangePlayerEnergy(EP){
    player_stats.energy += EP;
    
    //Prevents hight numbers that the maximum
    if(player_stats.energy > player_stats.max_energy){ player_stats.energy = player_stats.max_energy; }

    //Prevents negative numbers
    if(player_stats.energy < 0){ player_stats.energy = 0; }

    // Advice when a tech is ready to use
    if(player_stats.energy >= 50){
        HighlightEnergy('on');
    } else {
        HighlightEnergy('off');
    }

    //Updates the graffic bars and texts of the player's HUD
    player_energy_text.innerText = 'EP = ' + Math.round((player_stats.energy / player_stats.max_energy)*100) + '%';;
    player_energy_graffic.style.width = Math.round((player_stats.energy / player_stats.max_energy)*100) + '%';
}

//! Buffs & Debuffs
function AddPlayerEffect(effectName){
    player_effects.unshift(JSON.parse(JSON.stringify(effectName)));

    UpdatePlayerEffects();
}

function UpdatePlayerEffects(){
    hud_effects_box.innerHTML = '';

    player_effects.forEach(effect => {
        hud_effects_box.innerHTML += '<div class="hud_effect hud_effect--' + effect.category + '" onmouseover="ShowEffectDescription(`' + effect.name + '`, `' + effect.description + '`, `' + effect.duration + '`)" onmouseleave="HideEffectDescription()"><img src="assets/icons/effects/' + effect.name + '.png"></div>';
    });
}

function CountPlayerEffects(){
    // Track the duration in turns
    effect_stats.damage = 0;
    effect_stats.defense = 0;

    let auxiliar_effects = [];
    player_effects.forEach(effect => {
        ApplyPlayerEffects(effect.name);
        effect.duration--;

        if(effect.duration > 0){
            auxiliar_effects.push(effect);
        }
    });
    
    player_effects = auxiliar_effects;
}

function ApplyPlayerEffects(effect){
    switch(effect){
        //* Buffs
        case 'Energized':
            ChangePlayerEnergy(7);
            break;
        
        case 'Super-Energized':
            ChangePlayerEnergy(15);
            break;
        
        case 'Hyper-Energized':
            ChangePlayerEnergy(30);
            break;

        case 'Regeneration':
            ChangePlayerHealth(8);
            break;

        case 'Super-Regeneration':
            ChangePlayerHealth(16);
            break;
        
        case 'Hyper-Regeneration':
            ChangePlayerHealth(32);
            break;

        //* Debuffs
        case 'Weakness':
            effect_stats.damage -= 15;
            break;
    }   
}

function ShowEffectDescription(name, description, duration){
    hud_effects_info.innerHTML = '<b>' + name + '</b><br>' + description + '<br><br><i>( ' + duration + ' turns left )</i>'
    hud_effects_info.style.opacity = '100%';
}

function HideEffectDescription(){
    hud_effects_info.innerHTML = ''
    hud_effects_info.style.opacity = '0%';
}

//! Combat Options
//+ Attacks
function PlayerAttack(move){
    //* Crit Attacks
    //? When the bar to measure the time to attack, the crit damage will be not necesary
    let damage = 0;
    let crit_multiplier = 1;
    let crit_chance = Math.round(Math.random() * 10);

    if(crit_chance == 0){
        battle_stats.criticals += 1;
        crit_multiplier = player_stats.crit_multiplier;
    }

    switch(move){
        case 'sword':
            ChangePlayerSfx({sfx: move});
            ChangePlayerAnimation({animation: move});
            damage = player_stats.attack;
            break;
    }
    
    damage = (damage + effect_stats.damage) * crit_multiplier;
    ChangePlayerEnergy(Math.round(damage/3));

    enemy_stats[0].health -= damage;
    battle_stats.damage_given +=  damage;
    battle_stats.attacks += 1;
    
    ChangeEnemyAnimation({animation: 'damage'});
    ChangeEnemySfx({sfx:'bone_crush'});
    UpdateEnemyStats();
}

//+ Techniques
function CheckSpecialMove(special_move){
    let class_name = 'hud_moves__move';
    
    if(player_stats.energy < player_specials_moves[special_move].ep){
        class_name += ' hud_moves__move--disable';
    }

    return class_name;
}

function WriteSpecialMoves(){
    hud_moves_specials.innerHTML = '';

    for (let special_move in player_specials_moves) {
        hud_moves_specials.innerHTML += '<button id="hud_moves__' + player_specials_moves[special_move].name + '" class="' + CheckSpecialMove(player_specials_moves[special_move].name) + '" onclick="SetCombatTurns({category: `specials`, move: `' + player_specials_moves[special_move].name + '`})"><p class="hud_moves__text">' + player_specials_moves[special_move].name.charAt(0).toUpperCase() + player_specials_moves[special_move].name.slice(1) + ' (' + player_specials_moves[special_move].ep + ' %)</p><img src="assets/icons/' + player_specials_moves[special_move].name + '.png" class="hud_moves__img"></button>';
    }
}

// Use a Technique
function PlayerSpecial(move){
    //* Crit Attacks
    let damage = 0;
    let crit_multiplier = 1;
    let crit_chance = Math.round(Math.random() * 10);

    if(crit_chance == 0){
        battle_stats.criticals += 1;
        crit_multiplier = player_stats.crit_multiplier;
    }

    switch(move){
        case 'tornado':
            ChangePlayerSfx({sfx: 'sword'});
            ChangePlayerAnimation({animation: 'sword'});
            damage = player_stats.attack * 3;
            break;
        
        case 'heal':
            /* ChangePlayerSfx({sfx: 'sword'});
            ChangePlayerAnimation({animation: 'sword'}); */

            ChangePlayerHealth(30);
            AddPlayerEffect(buffs.regeneration);
            break;
        }
    
    ChangePlayerEnergy(-player_specials_moves[move].ep);
    
    if(damage != 0){
        damage = (damage + effect_stats.damage) * crit_multiplier;
    
        enemy_stats[0].health -= damage;
        battle_stats.damage_given +=  damage;
        battle_stats.attacks += 1;
        
        ChangeEnemyAnimation({animation: 'damage'});
        ChangeEnemySfx({sfx:'bone_crush'});
        UpdateEnemyStats();
    }
}

//+ Backpack
function UpdatePlayerBackpack(){
    let item_array = '';
    hud_backpack_items.innerHTML = '';
    
    for(let n = 0; n < player_backpack_items.length; n++){
        item_array = player_backpack_items[n];
        
        if(item_array.quantity != 0){
            hud_backpack_items.innerHTML += '<div onmouseover="WriteItemDescription({item: `' + item_array.item + '`})" onclick="SetCombatTurns({category: `backpack`, move: `' + item_array.item + '`})"><img src="assets/icons/items/' + item_array.item + '.png"> <p>' + item_array.quantity + '</p></div>';
        }
    }
}

function WriteItemDescription({item}){
    let item_array = '';
    let item_name = '';
    let item_index = '';

    item_index = player_backpack_items.findIndex(array => array.item === item);
    item_array = player_backpack_items[item_index];

    item_name = item_array.item.charAt(0).toUpperCase() + item_array.item.slice(1);
    hud_backpack_description.innerHTML = '<b>' + item_name + ':</b><br> ' + item_array.description;
}

function EraseItemDescription(){ hud_backpack_description.innerHTML = ''; }

function UseBackpackItem({item}){
    let item_index = player_backpack_items.findIndex(array => array.item === item);
    let item_array = player_backpack_items[item_index];
    
    ChangePlayerHealth(item_array.hp);
    ChangePlayerEnergy(item_array.ep);

    if(item_array.buff != null){
        AddPlayerEffect(buffs[item_array.buff])
    }

    battle_stats.medicine_used += 1;
    item_array.quantity -= 1;
}

//! Combat Turn
function PlayerTurn({category, move}){
    if(category == 'attack'){
        PlayerAttack(move);
    }

    if(category == 'backpack'){
        UseBackpackItem({item: move});
    }
    
    if(category == 'specials'){
        PlayerSpecial(move);
    }
}