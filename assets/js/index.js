////ChangeMusic({theme: "Test_Battle_Theme"});

//! Toggle HUD
function HideAllMenus(){
    player_hud_moves_attack.style.bottom = '-31%';
    player_hud_moves_return.style.bottom = '-31%';
    player_hud_moves_general.style.bottom = '-31%';
    player_hud_backpack.style.bottom = '-75%';
    EraseItemDescription();
}

//+ Show and hides the Player´s HUD Menus
function TogglePlayerMenus({menu = ''}){
    HideAllMenus();

    switch(menu){
        case 'general':
            player_hud_moves_general.style.bottom = '1vh';
            break;

        case 'attack':
            player_hud_moves_attack.style.bottom = '1vh';
            break;
        
        case 'backpack':
            player_hud_backpack.style.bottom = '0';
            UpdatePlayerBackpack();
            break;

        default:
            console.log('ERROR: No recognized argument for TogglePlayerMenus');
            break;
    }

    if(menu != 'general'){ player_hud_moves_return.style.bottom = '1vh'; }
    else{ player_hud_moves_return.style.bottom = '-31%'; }
}

//+ Victory Screen
function ShowVictoryScreen(){
    player_hud_victory.style.display = 'flex';
    
    setTimeout(function(){
        player_hud_victory.style.opacity = '100%';
    }, 450);
    
    setTimeout(function(){
        player_hud_victory.style.top = '0';
        player_hud_victory.style.height = '100%';
        player_hud_victory.style.justifyContent = 'start';
        player_hud_victory_results_box.style.display = 'flex'
    }, 1950);

    //* Stats
    player_hud_victory_stats.innerHTML = '<li> Attacks: ' + battle_stats.attacks + '</li>' + '<li> Criticals: ' + battle_stats.criticals + '</li>' + '<li> Damage Given: ' + battle_stats.damage_given + '</li>' + '<li> Medicine Used: ' + battle_stats.medicine_used + '</li>' + '<li> Hits Taken: ' + battle_stats.hits_taken + '</li>' + '<li> Damage Taken: ' + battle_stats.damage_taken + '</li>';
}

//! Change Animations
//+ Player
function ChangePlayerAnimation({animation}){
    player_frameX = 0;

    switch(animation){
        case 'sword':
            player_frameY = 1;
            break;
        case 'damage':
            player_frameY = 2;
            player_animation_limit = 7;
            break;
        case 'defeated':
            player_frameY = 5;
            player_animation_limit = 9;
            break;
    }
}

//+ Enemy
function ChangeEnemyAnimation({animation}){
    enemy_frameX = 0;

    switch(animation){
        case 'damage':
            enemy_frameY = 1;
            enemy_animation_limit = 10;
            break;
        case 'attack':
            enemy_frameY = 2;
            enemy_animation_limit = 10;
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

//! Backpack
//+ Update & Writing
function UpdatePlayerBackpack(){
    let item_array = '';
    player_hud_backpack_items.innerHTML = '';
    
    for(let n = 0; n < player_backpack_healing_items.length; n++){
        item_array = player_backpack_healing_items[n];
        
        if(item_array.quantity != 0){
            player_hud_backpack_items.innerHTML += '<div onmouseover="WriteItemDescription({item: `' + item_array.item + '`})" onclick="SetCombatTurns({category: `backpack`, move: `' + item_array.item + '`})"><img src="assets/icons/' + item_array.item + '.png"> <p>' + item_array.quantity + '</p></div>';
        }
    }
}

//+ Description
function WriteItemDescription({item}){
    let item_array = '';
    let item_name = '';
    let item_index = '';

    item_index = player_backpack_healing_items.findIndex(array => array.item === item);
    item_array = player_backpack_healing_items[item_index];

    item_name = item_array.item.charAt(0).toUpperCase() + item_array.item.slice(1);
    player_hud_backpack_description.innerHTML = '<b>' + item_name + ':</b> ' + item_array.description;
}

function EraseItemDescription(){ player_hud_backpack_description.innerHTML = ''; }

function UseBackpackItem({item}){
    let item_index = player_backpack_healing_items.findIndex(array => array.item === item);
    let item_array = player_backpack_healing_items[item_index];
    if(item_array.category == 'HP'){
        player_stats[0].health += item_array.points;
    }

    if(item_array.category == 'AR'){
        player_equipment_stats[0].armor += item_array.points;
    }
    
    battle_stats.medicine_used += 1;
    item_array.quantity -= 1;
    UpdatePlayerStats();
}

//! Update Stats
//+ Player
function UpdatePlayerStats(){
    //Prevents hight numbers that the maximum
    if(player_stats[0].health > player_stats[0].max_health){ player_stats[0].health = player_stats[0].max_health; }
    if(player_equipment_stats[0].armor > player_equipment_stats[0].max_armor){ player_equipment_stats[0].armor = player_equipment_stats[0].max_armor; }

    //Prevents negative numbers
    if(player_stats[0].health < 0){ player_stats[0].health = 0; }
    if(player_equipment_stats[0].armor < 0){ player_equipment_stats[0].armor = 0; }

    //Updates the graffic bars and texts of the player's HUD
    player_health_text.innerText = player_stats[0].health + ' / ' + player_stats[0].max_health;
    player_health_graffic.style.width = Math.round((player_stats[0].health / player_stats[0].max_health)*100) + '%';
    player_armor_text.innerText = player_equipment_stats[0].armor + ' / ' + player_equipment_stats[0].max_armor;
    player_armor_graffic.style.width = Math.round((player_equipment_stats[0].armor / player_equipment_stats[0].max_armor)*100) + '%';
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
        //* Crit Attacks
        //? When the bar to measure the time to attack, the crit damage will be not necesary
        let damage = 0;
        let crit_multiplier = 1;
        let crit_chance = Math.round(Math.random() * 10);
    
        if(crit_chance == 0){
            battle_stats.criticals += 1;
            crit_multiplier = player_stats[0].crit_multiplier;
        }
    
        //* Moves
        switch(move){
            case 'sword':
                ChangePlayerSfx({sfx: move});
                ChangePlayerAnimation({animation: move});
                damage = player_equipment_stats[0].sword_damage;
                break;
        }
        
        damage *= crit_multiplier;

        enemy_stats[0].health -= damage;
        battle_stats.damage_given +=  damage;
        battle_stats.attacks += 1;
        
        ChangeEnemyAnimation({animation: 'damage'});
        ChangeEnemySfx({sfx:'bone_crush'});
        UpdateEnemyStats();
    }

    if(category == 'backpack'){
        UseBackpackItem({item: move});
    }
}

//+ Enemy
function EnemyTurn(){
    let enemy_damage = enemy_stats[0].damage;
    let player_armor_absortion = 0;

    if(player_equipment_stats[0].armor > 0){
        player_equipment_stats[0].armor -= 1;
        player_armor_absortion = enemy_damage - player_equipment_stats[0].armor_protection;

        player_stats[0].health -= player_armor_absortion;
        battle_stats.damage_taken += player_armor_absortion;
    } else {
        player_stats[0].health -= enemy_damage;
        battle_stats.damage_taken += enemy_damage;
    }
    
    battle_stats.hits_taken += 1;

    ChangeEnemyAnimation({animation: 'attack'});
    ChangeEnemySfx({sfx: 'punch'});
    
    ChangePlayerAnimation({animation: 'damage'});
    UpdatePlayerStats();
}

//Delay function to avoid cuts in the animations
function delay(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//! Combat turns
async function SetCombatTurns({category, move}){
    HideAllMenus();

    if(player_stats[0].speed > enemy_stats[0].speed){
        PlayerTurn({category, move});
        await delay(900);

        if(enemy_stats[0].health != 0){
            EnemyTurn();
            await delay(900);
        }

        if(enemy_stats[0].health != 0 && player_stats[0].health != 0){
            TogglePlayerMenus({menu: 'general'});
        }
    } else {
        if(player_stats[0].speed < enemy_stats[0].speed){
            /* Enemy's Turn */
            /* Player's Turn */
        } else {
            /* If PLayer Speed = Enemy Speed
            do "Choque" */
        }
    }

    if(enemy_stats[0].health == 0){
        /* + Change the enemy and player animation
        + Sfx of Victory */
        ShowVictoryScreen();
    }

    if(player_stats[0].health == 0){
        //* Change the enemy animation
        ChangePlayerAnimation({animation: 'defeated'})
        //*Sfx of Defeat
        //*Game Over
    }
}

UpdatePlayerStats();
UpdateEnemyStats();