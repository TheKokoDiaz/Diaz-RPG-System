//! Settings
//+ Audio & SFX
let sfx_volume = 60/100;
let music_volume = 80/100;

const music = document.getElementById("music");

//! Battle
//+ End Battle Stats
let battle_stats = {
    attacks: 0,
    criticals: 0,
    damage_given: 0,
    medicine_used: 0,
    hits_taken: 0,
    damage_taken: 0
};

//+ Buffs & Debuffs effects on player
let effect_stats = {
    maxHP: 0,
    damage: 0,
    defense: 0
};

//! Player
//+ SFX
const player_sfx = document.getElementById('player_sfx');

//+ HUD
//* Warnings
const hud_top_warning_bar = document.querySelector('#hud_top_warning_bar')
const hud_bottom_warning_bar = document.querySelector('#hud_bottom_warning_bar')

//* Menus and Buttons
const hud_moves_return = document.querySelector('#hud_moves__return');
const hud_moves_general = document.querySelector('#hud_moves_general');
const hud_moves_attack = document.querySelector('#hud_moves_attack');
const hud_moves_specials = document.querySelector('#hud_moves_specials');

//* Backpack
const hud_backpack = document.querySelector('#hud_backpack');
const hud_backpack_description = document.querySelector('.hud_backpack__description');
const hud_backpack_items = document.querySelector('.hud_backpack__items');

//* Specials
const hud_moves__tornado = document.getElementById('hud_moves__tornado');

//* Victory screen
const hud_victory = document.querySelector('#hud_victory');
const hud_victory_results_box = document.querySelector('.hud_victory__results_box');
const hud_victory_stats = document.querySelector('#victory_stats');

//* Buffs & Debuffs
const hud_effects_box = document.getElementById('hud_effects_box');
const hud_effects_info = document.getElementById('hud_effect--info');

//+ Graphics
const player_health_text = document.getElementById('player_health_text');
const player_health_border = document.querySelector('.hud_status__health')
const player_health_graffic = document.getElementById('player_health_graffic');

const player_energy_text = document.getElementById('player_energy_text');
const player_energy_border = document.querySelector('.hud_status__energy');
const player_energy_graffic = document.getElementById('player_energy_graffic');

//+ Stats
let player_stats = {
    health: 25,
    max_health: 100,
    energy: 15,
    max_energy: 100,
    attack: 30,
    crit_multiplier: 1.5,
    defense: 3
};

//+ Buffs & Debuffs
let player_effects = []

//+ Backpack Items
let player_backpack_items = [
    adrenalin,
    bandAid,
    bandage,
    medKit,
    ramen,
    vitamins,
];

//+ Specials
let player_specials_moves = {
    tornado: {
        name: 'tornado',
        ep: 50
    },
    heal: {
        name: 'heal',
        ep: 60
    }
};

//+ Animation
const spritesheet_width = 911;
const spritesheet_height = 512;

let player_frameX = 0;
let player_frameY = 0;
let player_animation_limit = 8;
let player_animation_infinite = false;

const player_canvas = document.getElementById('player_sprite');
const player_ctx = player_canvas.getContext('2d');
const player_canvas_width = player_canvas.width = spritesheet_width;
const player_canvas_height = player_canvas.height = spritesheet_height;

const player_canvas_sprite = new Image();
player_canvas_sprite.src = 'assets/sprites/Player_Sprite_Sheet.png';
const player_sprite_width = spritesheet_width;
const player_sprite_height = spritesheet_height;

let playerLastTime = 0;
let player_game_frame = 0;
let player_straggerFrames = 6;

//+ Player's Turn
let player_move = '';

//! Enemy
//+ SFX
const enemy_sfx = document.getElementById('enemy_sfx');

//+ Menus
const enemy_health_graffic = document.getElementById('enemy_health_graffic');
const enemy_health_text = document.getElementById('enemy_health_text');

//+ Stats
let enemy_stats = [{
    health: 500,
    max_health: 500,
    damage: 15
    //? defense
}];

//+ Animation
let enemy_frameX = 0;
let enemy_frameY = 0;
let enemy_animation_limit = 7;
let enemy_animation_infinite = false;

const enemy_canvas = document.getElementById('enemy_sprite');
const enemy_ctx = enemy_canvas.getContext('2d');
const enemy_canvas_width = enemy_canvas.width = spritesheet_width;
const enemy_canvas_height = enemy_canvas.height = spritesheet_height;

const enemy_canvas_sprite = new Image();
enemy_canvas_sprite.src = 'assets/sprites/Enemy_Sprite_Sheet.png';
const enemy_sprite_width = spritesheet_width;
const enemy_sprite_height = spritesheet_height;

let enemyLastTime = 0;
let enemy_game_frame = 0;
let enemy_straggerFrames = 6;