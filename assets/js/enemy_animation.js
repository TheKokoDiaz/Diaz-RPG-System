function enemy_animation(){
    enemy_ctx.clearRect(0, 0, enemy_canvas_width, enemy_canvas_height);
    enemy_ctx.drawImage(enemy_canvas_sprite, enemy_frameX * enemy_sprite_width, enemy_frameY * enemy_sprite_height, enemy_sprite_width, enemy_sprite_height,  0, 0, enemy_canvas_width, enemy_canvas_height);

    if(enemy_game_frame % enemy_straggerFrames == 0){
        if(enemy_frameY == 0){
            //! To infinite animations
            if(enemy_frameX < (enemy_animation_limit - 1)){
                enemy_frameX++;
            } else {
                enemy_frameX = 0;
            }
        } else {
            //! To linear animations
            if(enemy_frameX < (enemy_animation_limit - 1)){
                enemy_frameX++;
            } else {
                //When the animation finish, the enemy will return to his idle animation
                enemy_frameY = 0;
                enemy_frameX = 0;
                enemy_animation_limit = 7;
                enemy_straggerFrames = 5;
            }
        }
    }

    enemy_game_frame++;
    requestAnimationFrame(enemy_animation);
}
enemy_animation();