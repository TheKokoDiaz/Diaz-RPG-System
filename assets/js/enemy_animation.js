function enemy_animation(){
    enemy_ctx.clearRect(0, 0, enemy_canvas_width, enemy_canvas_height);
    enemy_ctx.drawImage(enemy_canvas_sprite, enemy_frameX * enemy_sprite_width, enemy_frameY * enemy_sprite_height, enemy_sprite_width, enemy_sprite_height,  0, 0, enemy_canvas_width, enemy_canvas_height);

    if(enemy_game_frame % enemy_straggerFrames == 0){
        if(enemy_frameX < (enemy_animation_limit - 1)){
            enemy_frameX++;
        } else {
            if(enemy_animation_infinite == true){
                enemy_frameX = 0;
            } else {
                //This is when the enemy has a defeat animation
                ////if(enemy_frameY != 5){ChangeEnemyAnimation({animation: 'idle'});}
                ChangeEnemyAnimation({animation: 'idle'});
            }
        }
    }

    enemy_game_frame++;
    requestAnimationFrame(enemy_animation);
}
enemy_animation();