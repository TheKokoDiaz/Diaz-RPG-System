//#region Animation
const spritesheet_width = 911 * 1;
const spritesheet_height = 512 * 1;

const player_canvas = document.getElementById('player_sprite');
const player_ctx = player_canvas.getContext('2d');
const player_canvas_width = player_canvas.width = spritesheet_width;
const player_canvas_height = player_canvas.height = spritesheet_height;

const player_canvas_sprite = new Image();
player_canvas_sprite.src = 'assets/sprites/Player_Sprite_Sheet.png';
const player_sprite_width = spritesheet_width;
const player_sprite_height = spritesheet_height;

let player_game_frame = 0;
let straggerFrames = 5;

function player_animation(){
    player_ctx.clearRect(0, 0, player_canvas_width, player_canvas_height);
    player_ctx.drawImage(player_canvas_sprite, frameX * player_sprite_width, frameY * player_sprite_height, player_sprite_width, player_sprite_height,  0, 0, player_canvas_width, player_canvas_height);

    if(player_game_frame % straggerFrames == 0){
        if(frameX < (player_animation_limit - 1)){
            frameX++;
        } else {
            frameX = 0;
        }
    }

    player_game_frame++;
    requestAnimationFrame(player_animation);
}
player_animation();
//#endregion