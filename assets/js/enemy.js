//! Animation
//+ Play animation
function enemyDeltaTime(enemyCurrentTime) {
    let deltaTime = (enemyCurrentTime - enemyLastTime) / 1000;
    enemyLastTime = enemyCurrentTime;

    enemyAnimation(deltaTime);

    requestAnimationFrame(enemyDeltaTime);
}

function enemyAnimation(deltaTime) {
    // Canva Properties
    enemy_ctx.clearRect(0, 0, enemy_canvas_width, enemy_canvas_height);
    enemy_ctx.drawImage(enemy_canvas_sprite, enemy_frameX * enemy_sprite_width, enemy_frameY * enemy_sprite_height, enemy_sprite_width, enemy_sprite_height,  0, 0, enemy_canvas_width, enemy_canvas_height);

    // Animation
    enemy_straggerFrames += deltaTime;
    if (enemy_straggerFrames >= 1/12) {
        if(enemy_frameX < (enemy_animation_limit - 1)){
            enemy_frameX++;
        } else {
            if(enemy_animation_infinite == true){
                enemy_frameX = 0;
            } else {
                // This is when the enemy has a defeat animation
                ////if(enemy_frameY != 5){ChangeEnemyAnimation({animation: 'idle'});}
                ChangeEnemyAnimation({animation: 'idle'});
            }
        }

        enemy_straggerFrames = 0;
    }
}

requestAnimationFrame(enemyDeltaTime);

//+ Change animation
function ChangeEnemyAnimation({animation}){
    enemy_frameX = 0;

    switch(animation){
        case 'idle':
            enemy_frameY = 0;
            enemy_animation_limit = 7;
            enemy_animation_infinite = true;
            break;

        case 'damage':
            enemy_frameY = 1;
            enemy_animation_limit = 10;
            enemy_animation_infinite = false;
            break;

        case 'attack':
            enemy_frameY = 2;
            enemy_animation_limit = 10;
            enemy_animation_infinite = false;
            break;
    }
}

//! SFX
function ChangeEnemySfx({sfx}){
    enemy_sfx.volume = sfx_volume;
    enemy_sfx.setAttribute('src', '../assets/sfx/' + sfx + '.mp3');
    enemy_sfx.play();
}

//! Update Stats
function UpdateEnemyStats(){
    //Prevents negative numbers
    if(enemy_stats[0].health < 0){ enemy_stats[0].health = 0; }

    //Updates the graffic bar and the text numbers of the enemy´s HUD
    enemy_health_text.innerText = 'Enemy: ' + enemy_stats[0].health + ' / ' + enemy_stats[0].max_health;
    enemy_health_graffic.style.width = Math.round((enemy_stats[0].health / enemy_stats[0].max_health)*100) + '%';
}

//! Combat Turn
function EnemyTurn(){
    let enemy_damage = enemy_stats[0].damage - player_stats.defense;

    ChangePlayerHealth(- enemy_damage);
    
    battle_stats.damage_taken += enemy_damage;
    battle_stats.hits_taken += 1;

    ChangeEnemyAnimation({animation: 'attack'});
    ChangeEnemySfx({sfx: 'punch'});
    
    ChangePlayerAnimation('damage');
}
