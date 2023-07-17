//#region Variables
    //#region Player
    const player_hud_moves_return = document.querySelector('#player_hud_moves_return');
    const player_hud_moves_general = document.querySelector('#player_hud_moves_general');
    const player_hud_moves_attack = document.querySelector('#player_hud_moves_attack');

    const player_health_text = document.getElementById('player_health_text');
    const player_health_graffic = document.getElementById('player_health_graffic');

    let player_stats = [{
        health: 100,
        max_health: 100,
        stamina: 100,
        max_stamina: 100,
        speed: 5,
        strength: 5,
    }];

    let player_equipment_stats = [{
        armor: 10,
        max_armor: 10,
        sword_damage: 30,
        bow_damage: 15,
        greatsword_damage: 50,
        lance_damage: 10,
        shield_block: 5,
        shield_weight: 5
    }];

    //* Animation
    let frameX = 0;
    let frameY = 0;
    let player_animation_limit = 8;

    //Player's Turn
    let player_move = '';
    //#endregion

    //#region Enemy
    const enemy_health_graffic = document.getElementById('enemy_health_graffic');
    const enemy_health_text = document.getElementById('enemy_health_text');

    let enemy_stats = [{
        health: 250,
        max_health: 250,
        speed: 2,
        strength: 2,
        damage: 12
    }];
    //#endregion 
//#endregion