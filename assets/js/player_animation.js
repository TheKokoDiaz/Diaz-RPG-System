function player_animation(){
    player_ctx.clearRect(0, 0, player_canvas_width, player_canvas_height);
    player_ctx.drawImage(player_canvas_sprite, player_frameX * player_sprite_width, player_frameY * player_sprite_height, player_sprite_width, player_sprite_height,  0, 0, player_canvas_width, player_canvas_height);

    if(player_game_frame % player_straggerFrames == 0){
        //Defines which animations will be infinite
        if(player_frameY == 0 || player_frameY == 3){
            //! Infinite animations
            if(player_frameX < (player_animation_limit - 1)){
                player_frameX++;
            } else {
                player_frameX = 0;
            }
        } else {
            //! Linear animations that returns to the idle animation
            if(player_frameX < (player_animation_limit - 1)){
                player_frameX++;
            } else {
                if(player_frameY != 5){
                    //When the player has low HP, he will change his animation
                    player_frameY = 0;
                    hud_top_warning_bar.style.top = '-30%';
                    hud_bottom_warning_bar.style.bottom = '-30%';

                    player_health_graffic.style.animation = 'none';
                    player_health_border.style.animation = 'none';
                    player_health_border.style.backgroundColor = 'rgba(0, 255, 0, 30%)';

                    if(player_stats.health <= player_stats.max_health/4){
                        player_frameY = 3;
                        hud_top_warning_bar.style.top = '-10%';
                        hud_bottom_warning_bar.style.bottom = '-10%';

                        player_health_graffic.style.animation = 'graphic_health_warning 1s infinite';
                        player_health_border.style.animation = 'border_health_warning 1s infinite';
                        player_health_border.style.backgroundColor = 'rgba(255, 0, 0, 30%)';
                    }
                    player_frameX = 0;
                    player_animation_limit = 8;
                    player_straggerFrames = 5;
                }
            }
        }
    }

    player_game_frame++;
    requestAnimationFrame(player_animation);
}
player_animation();