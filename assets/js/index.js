//* Return to Player's General HUD Menu and hides the other menus
player_hud_moves_return.addEventListener('click', function(){
    player_hud_moves_attack.style.bottom = '-31%';
    player_hud_moves_return.style.bottom = '-31%';

    player_hud_moves_general.style.bottom = '1vh';
});

function ToggleMenus({menu = ''}){
    //Equivalent to a "SWITCH"
    switch(menu){
        case 'attack':
            player_hud_moves_attack.style.bottom = '1vh';
            break;
    }

    player_hud_moves_return.style.bottom = '1vh';
    player_hud_moves_general.style.bottom = '-31%';
}