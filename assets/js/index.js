//#region Toggle (Show / Hide) Menus
//Hide all menus to focus in combat
function HideAllMenus(){
    player_hud_moves_attack.style.bottom = '-31%';
    player_hud_moves_return.style.bottom = '-31%';
    player_hud_moves_general.style.bottom = '-31%';
}

// Function from Return' Button
player_hud_moves_return.addEventListener('click', function() {
    TogglePlayerMenus({menu: 'general'});
});

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
    frameX = 0;

    //Changes the animation
    switch(animation){
        case 'sword':
            frameY = 1;
            straggerFrames = 3;
            break;
    }
}
//#endregion

function UpdateStats(){
    if(enemy_stats[0].health < 0){ enemy_stats[0].health = 0; }

    enemy_health_text.innerText = 'HP: ' + enemy_stats[0].health + '/' + enemy_stats[0].max_health;
    enemy_health_graffic.style.width = Math.round((enemy_stats[0].health / enemy_stats[0].max_health)*100) + '%';
}

//Player's Turn
function PlayerTurn(move){
    switch(move){
        case 'sword':
            ChangePlayerAnimation({animation: 'sword'});
            enemy_stats[0].health -= player_equipment_stats[0].sword_damage;
            break;
    }

    UpdateStats();
}

//Delay function to avoid cuts in the animations
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function SetCombatTurns({move}){
    HideAllMenus();

    if(player_stats[0].speed > enemy_stats[0].speed){
        PlayerTurn(move);
        await delay(900);
        /* Enemy's Turn */
        TogglePlayerMenus({menu: 'general'});
    } else {
        if(player_stats[0].speed < enemy_stats[0].speed){
            /* Enemy's Turn */
            /* Player's Turn */
        } else {
            /* If PLayer Speed = Enemy Speed
            do "Choque" */
        }
    }
}

/* setInterval(UpdateStats(), 1000); */