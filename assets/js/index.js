////ChangeMusic({theme: "Test_Battle_Theme"});

//! Toggle HUD
function HideAllMenus(){
    hud_moves_general.style.bottom = '-31%';
    hud_moves_return.style.bottom = '-31%';
    hud_moves_attack.style.bottom = '-31%';
    hud_moves_specials.style.bottom = '-31%';
    hud_backpack.style.bottom = '-75%';
    EraseItemDescription();
}

//+ Show and hides the Player´s HUD Menus
function TogglePlayerMenus({menu = ''}){
    HideAllMenus();

    switch(menu){
        case 'general':
            hud_moves_general.style.bottom = '1vh';
            break;

        case 'attack':
            hud_moves_attack.style.bottom = '1vh';
            break;
        
        case 'backpack':
            hud_backpack.style.bottom = '0';
            UpdatePlayerBackpack();
            break;

        case 'specials':
            hud_moves_specials.style.bottom = '1vh';
            WriteSpecialMoves();
            break;
    }

    if(menu != 'general'){ hud_moves_return.style.bottom = '1vh'; }
    else{ hud_moves_return.style.bottom = '-31%'; }
}

//+ Warnings
function SwitchWarnings(action){
    if(action == 'off'){
        hud_top_warning_bar.style.top = '-30%';
        hud_bottom_warning_bar.style.bottom = '-30%';

        player_health_graffic.style.animation = 'none';
        player_health_border.style.animation = 'none';
        player_health_border.style.backgroundColor = 'rgba(0, 255, 0, 30%)';
    }
    
    if(action == 'on'){
        hud_top_warning_bar.style.top = '-10%';
        hud_bottom_warning_bar.style.bottom = '-10%';

        player_health_graffic.style.animation = 'graphic_health_warning 1s infinite';
        player_health_border.style.animation = 'border_health_warning 1s infinite';
        player_health_border.style.backgroundColor = 'rgba(255, 0, 0, 30%)';
    }
}

function HighlightEnergy(action){
    if(action == 'on'){
        player_energy_border.style.animation = 'border_specialMoveReady 1s infinite';
        player_energy_graffic.style.animation = 'graphic_specialMoveReady 1s infinite';
    }
    
    if(action == 'off'){
        player_energy_border.style.animation = 'none';
        player_energy_graffic.style.animation = 'none';
    }
}

//+ Victory Screen
function ShowVictoryScreen(){
    hud_victory.style.display = 'flex';
    
    setTimeout(function(){
        hud_victory.style.opacity = '100%';
    }, 450);
    
    setTimeout(function(){
        hud_victory.style.top = '0';
        hud_victory.style.height = '100%';
        hud_victory.style.justifyContent = 'start';
        hud_victory_results_box.style.display = 'flex'
    }, 1950);

    //* Stats
    hud_victory_stats.innerHTML = '<li> Attacks: ' + battle_stats.attacks + '</li>' + '<li> Criticals: ' + battle_stats.criticals + '</li>' + '<li> Damage Given: ' + battle_stats.damage_given + '</li>' + '<li> Medicine Used: ' + battle_stats.medicine_used + '</li>' + '<li> Hits Taken: ' + battle_stats.hits_taken + '</li>' + '<li> Damage Taken: ' + battle_stats.damage_taken + '</li>';
}

//! Change Animations
//+ Player
function ChangePlayerAnimation({animation}){
    player_frameX = 0;

    switch(animation){
        case 'idle':
            if(player_stats.health <= player_stats.max_health/4){
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

//+ Enemy
function ChangeEnemyAnimation({animation}){
    enemy_frameX = 0;

    switch(animation){
        case 'idle':
            enemy_frameY = 0;
            enemy_animation_limit = 7;
            enemy_animation_infinite = true;
            break;

        case 'damage':
            enemy_frameY = 1;
            enemy_animation_limit = 10;
            enemy_animation_infinite = false;
            break;

        case 'attack':
            enemy_frameY = 2;
            enemy_animation_limit = 10;
            enemy_animation_infinite = false;
            break;
    }
}

//! Audio
function ChangeMusic({theme}){
    music.volume = music_volume;
    music.setAttribute('src', '../assets/music/' + theme + '.mp3');
    music.play();
}

//! SFX
function ChangePlayerSfx({sfx}){
    player_sfx.volume = sfx_volume;
    player_sfx.setAttribute('src', '../assets/sfx/' + sfx + '.mp3');
    player_sfx.play();
}

function ChangeEnemySfx({sfx}){
    enemy_sfx.volume = sfx_volume;
    enemy_sfx.setAttribute('src', '../assets/sfx/' + sfx + '.mp3');
    enemy_sfx.play();
}

//!Damage & Attacks
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

    //* Moves
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

//! Backpack
//+ Update & Writing
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

//+ Description
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

//+ Use Backpack Item
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

//! Specials (Techniques)
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
        hud_moves_specials.innerHTML += '<div id="hud_moves__' + player_specials_moves[special_move].name + '" class="' + CheckSpecialMove(player_specials_moves[special_move].name) + '" onclick="SetCombatTurns({category: `specials`, move: `' + player_specials_moves[special_move].name + '`})"><p class="hud_moves__text">' + player_specials_moves[special_move].name.charAt(0).toUpperCase() + player_specials_moves[special_move].name.slice(1) + ' (' + player_specials_moves[special_move].ep + ' %)</p><img src="assets/icons/' + player_specials_moves[special_move].name + '.png" class="hud_moves__img"></div>';
    }
}

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

//! Update Stats
//+ Player
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

// Buffs & Debuffs
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
    effect_stats.damage = 0;
    effect_stats.defense = 0;

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

//+ Enemy
function UpdateEnemyStats(){
    //Prevents negative numbers
    if(enemy_stats[0].health < 0){ enemy_stats[0].health = 0; }

    //Updates the graffic bar and the text numbers of the enemy´s HUD
    enemy_health_text.innerText = 'HP: ' + enemy_stats[0].health + '/' + enemy_stats[0].max_health;
    enemy_health_graffic.style.width = Math.round((enemy_stats[0].health / enemy_stats[0].max_health)*100) + '%';
}

//! Turns
//+ Player
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

//+ Enemy
function EnemyTurn(){
    /* let enemy_damage = enemy_stats[0].damage; */
    let enemy_damage = enemy_stats[0].damage - player_stats.defense;

    ChangePlayerHealth(- enemy_damage);
    
    battle_stats.damage_taken += enemy_damage;
    battle_stats.hits_taken += 1;

    ChangeEnemyAnimation({animation: 'attack'});
    ChangeEnemySfx({sfx: 'punch'});
    
    ChangePlayerAnimation({animation: 'damage'});
}

//Delay function to avoid cuts in the animations
function delay(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//! Set combat turns
let battleTurns = 0;

async function SetCombatTurns({category, move}){
    HideAllMenus();

    // 1.- Player Turn
    PlayerTurn({category, move});
    await delay(900);

    // 2.- Alterate Stats acording to Buffs & Debuffs
    
    // 3.- Enemy's Turn
    if(enemy_stats[0].health != 0){
        EnemyTurn();
        await delay(900);
    }
    
    // 4.- Regeneration & Poison
    CountPlayerEffects();
    UpdatePlayerEffects();

    // 5.- Check if both can continue fighting to repeat the loop
    if(enemy_stats[0].health != 0 && player_stats.health != 0){
        TogglePlayerMenus({menu: 'general'});
    }

    // Enemy Defeated (Victory)
    if(enemy_stats[0].health == 0){
        /* + Change the enemy and player animation
        + Sfx of Victory */
        ShowVictoryScreen();
    }

    // Player Defeated (Game Over)
    if(player_stats.health == 0){
        //* Change the enemy animation
        ChangePlayerAnimation({animation: 'defeated'})
        //*Sfx of Defeat
        //*Game Over
    }
}

ChangePlayerHealth(0);
ChangePlayerEnergy(0);
UpdatePlayerEffects();
UpdateEnemyStats();