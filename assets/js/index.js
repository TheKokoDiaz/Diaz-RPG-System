//#region Toggle (Show / Hide) Menus
//Hide all menus to focus in combat
function HideAllMenus(){
    player_hud_moves_attack.style.bottom = '-31%';
    player_hud_moves_return.style.bottom = '-31%';
    player_hud_moves_general.style.bottom = '-31%';
    player_hud_backpack.style.bottom = '-75%';
    
}

//Show and hides the Player´s HUD Menus
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
//#endregion

//#region Change Animations
//Changes the Player's animation
function ChangePlayerAnimation({animation}){
    //Resets the animation progress to the start
    player_frameX = 0;

    //Changes the animation
    switch(animation){
        case 'sword':
            player_frameY = 1;
            player_straggerFrames = 3;
            break;
        case 'damage':
            player_frameY = 2;
            player_animation_limit = 7;
            break;
    }
}

//Changes the Enemy animation
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
//#endregion

//#region Changes Audio
//Changes the Sound Effects that do the player
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
//#endregion

//#region Backpack
//When the backpack menu is showed, all the list items will be updated
function UpdatePlayerBackpack(){
    player_hud_backpack_items.innerHTML = '';
    
    //Writes a list withe the items that are in the backpack
    for(let n = 0; n < player_backpack_healing_items.length; n++){
        //If there's not an item, will not be written
        if(player_backpack_healing_items[n].quantity != 0){
            player_hud_backpack_items.innerHTML += '<div onmouseover="WriteItemDescription({item: `' + player_backpack_healing_items[n].item + '`})" onclick="SetCombatTurns({category: `backpack`, move: `' + player_backpack_healing_items[n].item + '`})">' + player_backpack_healing_items[n].item + ' x' + player_backpack_healing_items[n].quantity + '<img src="assets/icons/' + player_backpack_healing_items[n].item + '.png"></div>';
        }
    }
}

function WriteItemDescription({item}){
    let item_index = '';
    let item_description = '';

    item_index = player_backpack_healing_items.findIndex(array => array.item === item);
    item_description = player_backpack_healing_items[item_index].description;
    player_hud_backpack_description.innerText = item_description;
}

function EraseItemDescription(){
    player_hud_backpack_description.innerText = '';
}

function UseBackpackItem({item}){
    //Identificar objeto
    let item_index = player_backpack_healing_items.findIndex(array => array.item === item);
    if(player_backpack_healing_items[item_index].category == 'HP'){
        player_stats[0].health += player_backpack_healing_items[item_index].points;
    }

    if(player_backpack_healing_items[item_index].category == 'AR'){
        player_equipment_stats[0].armor += player_backpack_healing_items[item_index].points;
    }
    
    player_backpack_healing_items[item_index].quantity -= 1;
    UpdatePlayerStats();
}
//#endregion

//#region Update Stats
function UpdatePlayerStats(){
    //Prevents hight numbers that the maximum
    if(player_stats[0].health > player_stats[0].max_health){ player_stats[0].health = player_stats[0].max_health; }
    if(player_equipment_stats[0].armor > player_equipment_stats[0].max_armor){ player_equipment_stats[0].armor = player_equipment_stats[0].max_armor; }

    //Prevents negative numbers
    if(player_stats[0].health < 0){ player_stats[0].health = 0; }
    if(player_equipment_stats[0].armor < 0){ player_equipment_stats[0].armor = 0; }

    //Updates the graffic bars and texts of the player's HUD
    player_health_text.innerText = 'HP: ' + player_stats[0].health + ' / ' + player_stats[0].max_health;
    player_health_graffic.style.width = Math.round((player_stats[0].health / player_stats[0].max_health)*100) + '%';
    player_armor_text.innerText = 'AR: ' + player_equipment_stats[0].armor + ' / ' + player_equipment_stats[0].max_armor;
    player_armor_graffic.style.width = Math.round((player_equipment_stats[0].armor / player_equipment_stats[0].max_armor)*100) + '%';
}

function UpdateEnemyStats(){
    //Prevents negative numbers
    if(enemy_stats[0].health < 0){ enemy_stats[0].health = 0; }

    //Updates the graffic bar and the text numbers of the enemy´s HUD
    enemy_health_text.innerText = 'HP: ' + enemy_stats[0].health + '/' + enemy_stats[0].max_health;
    enemy_health_graffic.style.width = Math.round((enemy_stats[0].health / enemy_stats[0].max_health)*100) + '%';
}
//#endregion

//#region Set Turns
//Player's Turn
function PlayerTurn({category, move}){
    //Calculate Crit Attacks
    //? When the bar to measure the time to attack, the crit damage will be not necesary
    let crit_multiplier = 1;
    let crit_chance = Math.round(Math.random() * 10);

    //Find out a critical hit
    if(crit_chance == 0){
        crit_multiplier = player_stats[0].crit_multiplier;
    }

    if(category == 'attack'){
        switch(move){
            case 'sword':
                ChangePlayerSfx({sfx: move});
                ChangePlayerAnimation({animation: move});
                enemy_stats[0].health -= player_equipment_stats[0].sword_damage * crit_multiplier;
                break;
        }
    
        ChangeEnemyAnimation({animation: 'damage'});
        ChangeEnemySfx({sfx:'bone_crush'});
        UpdateEnemyStats();
    }

    if(category == 'backpack'){
        UseBackpackItem({item: move});
    }
}

//Enemy turn
function EnemyTurn(){
    let enemy_damage = enemy_stats[0].damage;
    let player_armor_absortion = 0;
    if(player_equipment_stats[0].armor > 0){
        player_equipment_stats[0].armor -= 1;
        player_armor_absortion = enemy_damage - player_equipment_stats[0].armor_protection;

        player_stats[0].health -= player_armor_absortion;
    } else {
        player_stats[0].health -= enemy_damage;
    }
    
    ChangeEnemyAnimation({animation: 'attack'});
    ChangeEnemySfx({sfx: 'punch'});
    
    ChangePlayerAnimation({animation: 'damage'});
    UpdatePlayerStats();
}

//Delay function to avoid cuts in the animations
function delay(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//Sets the order of the turns in combat
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

    /* if(enemy_stats[0].health == 0){
        //*Change the enemy and player animation
        //*Show earned things, like medicine, weapons and EXP
        //*Sfx of Victory
    } */

    /* if(player_stats[0].health == 0){
        //*Change the Player and enemy animation
        //*Sfx of Defeat
        //*Game Over
    } */
}
//#endregion

//After loading all, the player and enemy stats will be updated
UpdatePlayerStats();
UpdateEnemyStats();