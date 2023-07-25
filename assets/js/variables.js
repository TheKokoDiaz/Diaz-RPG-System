//#region Variables
    //#region Game Settings
    let sfx_volume = 15/100;
    //#endregion

    //#region Player
    //Audio
    const player_sfx = document.getElementById('player_sfx');

    //HUDs and menus
    const player_hud_moves_return = document.querySelector('#player_hud_moves_return');
    const player_hud_moves_general = document.querySelector('#player_hud_moves_general');
    const player_hud_moves_attack = document.querySelector('#player_hud_moves_attack');
    const player_hud_backpack = document.querySelector('#player_hud_backpack');
    const player_hud_backpack_description = document.querySelector('.player_hud_backpack_description');
    const player_hud_backpack_items = document.querySelector('#player_hud_backpack_items');

    //Graffics and numbers of the player's status
    const player_health_text = document.getElementById('player_health_text');
    const player_health_graffic = document.getElementById('player_health_graffic');
    const player_armor_text = document.getElementById('player_armor_text');
    const player_armor_graffic = document.getElementById('player_armor_graffic');

    //Stats from the player
    let player_stats = [{
        health: 100,
        max_health: 100,
        stamina: 100,
        max_stamina: 100,
        speed: 5,
        strength: 5,
    }];

    //Stats from the player equipment (armor, shield and weapons)
    let player_equipment_stats = [{
        armor: 5,
        max_armor: 5,
        armor_protection: 1,
        sword_damage: 30,
        bow_damage: 15,
        greatsword_damage: 50,
        lance_damage: 10,
        shield_block: 5,
        shield_weight: 5
    }];

    let player_backpack_healing_items = [
        {
            item: 'bandage',
            quantity: 2,
            description: 'Use it to heal 60 HP',
            category: 'HP',
            points: '60'
        },
        {
            item: 'plate',
            quantity: 3,
            description: 'Use it to repair 20 AR',
            category: 'AR',
            points: '20'
        },
        {
            item: 'med-kit',
            quantity: 1,
            description: 'Use it to heal 150 HP',
            category: 'HP',
            points: '150'
        },
        {
            item: 'adhesive strip',
            quantity: 5,
            description: 'Use it to heal 20 HP',
            category: 'HP',
            points: '20'
        },
    ];

    // Animation
    const spritesheet_width = 911;
    const spritesheet_height = 512;

    let player_frameX = 0;
    let player_frameY = 0;
    let player_animation_limit = 8;

    const player_canvas = document.getElementById('player_sprite');
    const player_ctx = player_canvas.getContext('2d');
    const player_canvas_width = player_canvas.width = spritesheet_width;
    const player_canvas_height = player_canvas.height = spritesheet_height;

    const player_canvas_sprite = new Image();
    player_canvas_sprite.src = 'assets/sprites/Player_Sprite_Sheet.png';
    const player_sprite_width = spritesheet_width;
    const player_sprite_height = spritesheet_height;

    let player_game_frame = 0;
    let player_straggerFrames = 5;

    //Player's Turn
    let player_move = '';
    //#endregion

    //#region Enemy
    //Audio
    const enemy_sfx = document.getElementById('enemy_sfx');

    //Menus
    const enemy_health_graffic = document.getElementById('enemy_health_graffic');
    const enemy_health_text = document.getElementById('enemy_health_text');

    //Stats from the enemy
    let enemy_stats = [{
        health: 500,
        max_health: 500,
        speed: 2,
        strength: 2,
        damage: 12
        //? defense
    }];

    //Animation
    let enemy_frameX = 0;
    let enemy_frameY = 0;
    let enemy_animation_limit = 7;

    const enemy_canvas = document.getElementById('enemy_sprite');
    const enemy_ctx = enemy_canvas.getContext('2d');
    const enemy_canvas_width = enemy_canvas.width = spritesheet_width;
    const enemy_canvas_height = enemy_canvas.height = spritesheet_height;

    const enemy_canvas_sprite = new Image();
    enemy_canvas_sprite.src = 'assets/sprites/Enemy_Sprite_Sheet.png';
    const enemy_sprite_width = spritesheet_width;
    const enemy_sprite_height = spritesheet_height;

    let enemy_game_frame = 0;
    let enemy_straggerFrames = 5;
    //#endregion 
//#endregion