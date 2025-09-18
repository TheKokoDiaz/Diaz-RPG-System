//! HUD
//+ Fullscreen
function enterFullScreen(){
    const html = document.documentElement;
    html.requestFullscreen();
    screen.orientation.lock('landscape');

    fullScreenBtn.style.display = "none";
}

//+ Toggle HUD
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
// Low Health
function SwitchWarnings(action){
    if(action == 'off'){
        HideDramaBars();

        player_health_graffic.style.animation = 'none';
        player_health_border.style.animation = 'none';
        player_health_border.style.backgroundColor = 'rgba(0, 255, 0, 30%)';
    }
    
    if(action == 'on'){
        ShowDramaBars();

        player_health_graffic.style.animation = 'graphic_health_warning 1s infinite';
        player_health_border.style.animation = 'border_health_warning 1s infinite';
        player_health_border.style.backgroundColor = 'rgba(255, 0, 0, 30%)';
    }
}

// "Drama" Bars
function ShowDramaBars(){
    hud_top_warning_bar.style.top = '-10%';
    hud_bottom_warning_bar.style.bottom = '-10%';
}

function HideDramaBars(){
    hud_top_warning_bar.style.top = '-30%';
    hud_bottom_warning_bar.style.bottom = '-30%';
}

// Ready Technique
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

function HighlightTechBtn(action){
    if(action == 'on'){
        hud_moves_techs.style.animation = 'highlight_button 1s infinite';
    }
    
    if(action == 'off'){
        hud_moves_techs.style.animation = 'none';
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
        hud_victory.style.overflowY = 'auto';
    }, 1950);

    //* Stats
    hud_victory_stats.innerHTML = '<li> Attacks: ' + battle_stats.attacks + '</li>' + '<li> Criticals: ' + battle_stats.criticals + '</li>' + '<li> Damage Given: ' + battle_stats.damage_given + '</li>' + '<li> Medicine Used: ' + battle_stats.medicine_used + '</li>' + '<li> Hits Taken: ' + battle_stats.hits_taken + '</li>' + '<li> Damage Taken: ' + battle_stats.damage_taken + '</li>';
}

//! Music
function ChangeMusic(theme){
    music.volume = music_volume;
    music.setAttribute('src', '../assets/music/' + theme);
    music.play();
}

//! Delay
// It's to avoid cuts in the animations
function delay(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//! Combat
async function SetCombatTurns({category, move}){
    HideAllMenus();

    // 1.- Player Turn
    PlayerTurn({category, move});
    await delay(1200);

    // 2.- Alterate Stats acording to Buffs & Debuffs
    
    // 3.- Enemy's Turn
    if(enemy_stats[0].health != 0){
        EnemyTurn();
        await delay(900);
    }
    
    // 4.- Regeneration & Poison
    if(player_stats.health != 0){
        CountPlayerEffects();
        UpdatePlayerEffects();
    }

    // 5.- Check if both can continue fighting to repeat the loop
    if(enemy_stats[0].health != 0 && player_stats.health != 0){
        TogglePlayerMenus({menu: 'general'});
    }

    // 6.- Change the idle animation
    if(player_stats.energy >= cheapestTech){
        ChangePlayerAnimation('aura');
    }
    
    if(player_stats.health <= player_stats.max_health/4){
        ChangePlayerAnimation('weak');
    }

    //+ End of the combat
    // Enemy Defeated (Victory)
    if(enemy_stats[0].health == 0){
        /* + Change the enemy and player animation
        + Sfx of Victory */
        ShowVictoryScreen();
    }

    // Player Defeated (Game Over)
    if(player_stats.health == 0){
        //* Change the enemy animation
        ChangePlayerAnimation({animation: 'defeated'});
        ClearPlayerEffects();
        //*Sfx of Defeat
        //*Game Over
    }
}

// Update when entering to the fight
ChangePlayerHealth(0);
ChangePlayerEnergy(0);
UpdatePlayerEffects();
UpdateEnemyStats();