//! Animation
//+ Play animations
function playerDeltaTime(playerCurrentTime) {
    let deltaTime = (playerCurrentTime - playerLastTime) / 1000;
    playerLastTime = playerCurrentTime;

    playerAnimation(deltaTime);

    requestAnimationFrame(playerDeltaTime);
}

function playerAnimation(deltaTime) {
    // Canva Properties
    player_ctx.clearRect(0, 0, player_canvas_width, player_canvas_height);
    player_ctx.drawImage(player_canvas_sprite, player_frameX * player_sprite_width, player_frameY * player_sprite_height, player_sprite_width, player_sprite_height,  0, 0, player_canvas_width, player_canvas_height);

    // Animation
    player_straggerFrames += deltaTime;
    if (player_straggerFrames >= 1/12) {
        if(player_frameX < (player_animation_limit - 1)){
            player_frameX++;
        } else {
            // Cycling animations
            if(player_animation_infinite == true){
                player_frameX = 0;
            } else {
                if(player_frameY != 5){ChangePlayerAnimation({animation: 'idle'});}
            }
        }

        player_straggerFrames = 0;
    }
}

requestAnimationFrame(playerDeltaTime);

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

    //Updates the graffic bars and texts of the player's HUD
    player_energy_text.innerText = 'EP = ' + Math.round((player_stats.energy / player_stats.max_energy)*100) + ' %';;
    player_energy_graffic.style.width = Math.round((player_stats.energy / player_stats.max_energy)*100) + '%';

    if(player_stats.energy >= cheapestTech){
        HighlightTechBtn('on');
    } else {
        HighlightTechBtn('off');
    }
}

//! Buffs & Debuffs
function AddPlayerEffect(effect){
    player_effects.unshift(structuredClone(effect));

    UpdatePlayerEffects();
}

function UpdatePlayerEffects(){
    hud_effects_box.innerHTML = '';
    HighlightEnergy('off');

    player_effects.forEach(effect => {
        hud_effects_box.innerHTML += '<div class="hud_effect hud_effect--' + effect.category + '" onmouseover="ShowEffectDescription(`' + effect.name + '`, `' + effect.description + '`, `' + effect.duration + '`)" onmouseleave="HideEffectDescription()"><img src="assets/icons/effects/' + effect.name + '.png"></div>';

        if(effect.name == 'Energized' || effect.name == 'Super-Energized' || effect.name == 'Hyper-Energized'){ HighlightEnergy('on'); }
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
function CheckSpecialMove(techCost){
    let class_name = 'hud_moves__move';
    
    if(player_stats.energy < techCost){
        class_name += ' hud_moves__move--disable';
    }

    return class_name;
}

function WriteSpecialMoves(){
    hud_moves_specials.innerHTML = '';

    for(let n in player_specials_moves){
        let indexTech = player_specials_moves[n];
        
        hud_moves_specials.innerHTML += '<button id="hud_moves__' + indexTech.name + '" class="' + CheckSpecialMove(indexTech.cost) + '" onclick="SetCombatTurns({category: `specials`, move: `' + indexTech.name + '`})"><p class="hud_moves__text">' + indexTech.name.charAt(0).toUpperCase() + indexTech.name.slice(1) + ' (' + indexTech.cost + ' %)</p><img src="assets/icons/' + indexTech.name + '.png" class="hud_moves__img"></button>';
    }
}

// Use a technique
function PlayerSpecial(move){
    // Search the technique
    let tech;
    for(let n in player_specials_moves){
        if(player_specials_moves[n].name == move){
            tech = player_specials_moves[n];
            break;
        }
    }

    //* Crit Attacks
    let damage = 0;
    let crit_multiplier = 1;
    let crit_chance = Math.round(Math.random() * 10);

    if(crit_chance == 0){
        battle_stats.criticals += 1;
        crit_multiplier = player_stats.crit_multiplier;
    }

    switch(tech.name){
        case 'tornado':
            ChangePlayerSfx({sfx: 'sword'});
            ChangePlayerAnimation({animation: 'sword'});
            damage = player_stats.attack * 3;
            break;
        
        case 'heal':
            /* ChangePlayerSfx({sfx: 'sword'});
            ChangePlayerAnimation({animation: 'sword'}); */

            ChangePlayerHealth(30);
            AddPlayerEffect(regeneration);
            break;
        }
    
    ChangePlayerEnergy(-tech.cost);
    
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
    hud_backpack_items.innerHTML = '';
    
    for(let n = 0; n < player_backpack_items.length; n++){
        indexItem = player_backpack_items[n];
        
        if(indexItem.quantity != 0){
            hud_backpack_items.innerHTML += '<div onclick="WriteItemDescription(`' + indexItem.item + '`, `' + indexItem.description + '`)" ondblclick="SetCombatTurns({category: `backpack`, move: `' + indexItem.item + '`})"><img src="assets/icons/items/' + indexItem.item + '.png"> <p>' + indexItem.quantity + '</p></div>';
        }
    }
    
}

function WriteItemDescription(item, description){
    indexItemame = item.charAt(0).toUpperCase() + item.slice(1);
    hud_backpack_description.innerHTML = '<b>' + indexItemame + ':</b><br> ' + description;
}

function EraseItemDescription(){ hud_backpack_description.innerHTML = ''; }

function UseBackpackItem(move){
    for(let n = 0; n < player_backpack_items.length; n++){
        let indexItem = player_backpack_items[n];

        if(indexItem.item == move){
            ChangePlayerHealth(indexItem.hp);
            ChangePlayerEnergy(indexItem.ep);
    
            if(indexItem.buff != null){
                AddPlayerEffect(indexItem.buff);
            }
            
            battle_stats.medicine_used += 1;
            indexItem.quantity -= 1;
            break;
        }
    }
}

//! Combat Turn
function PlayerTurn({category, move}){
    if(category == 'attack'){
        PlayerAttack(move);
    }

    if(category == 'backpack'){
        UseBackpackItem(move);
    }
    
    if(category == 'specials'){
        PlayerSpecial(move);
    }
}