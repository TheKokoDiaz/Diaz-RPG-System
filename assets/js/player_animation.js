//#region Animation
function player_animation(){
    player_ctx.clearRect(0, 0, player_canvas_width, player_canvas_height);
    player_ctx.drawImage(player_canvas_sprite, player_frameX * player_sprite_width, player_frameY * player_sprite_height, player_sprite_width, player_sprite_height,  0, 0, player_canvas_width, player_canvas_height);

    if(player_game_frame % player_straggerFrames == 0){
        if(player_frameY == 0){
            //! To infinite animations
            if(player_frameX < (player_animation_limit - 1)){
                player_frameX++;
            } else {
                player_frameX = 0;
            }
        } else {
            //! To linear animations
            if(player_frameX < (player_animation_limit - 1)){
                player_frameX++;
            } else {
                //When the animation finish, the player will return to his idle animation
                player_frameY = 0;
                player_frameX = 0;
                player_animation_limit = 8;
                player_straggerFrames = 5;
            }
        }
    }

    player_game_frame++;
    requestAnimationFrame(player_animation);
}
player_animation();
//#endregion