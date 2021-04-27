var enemy_group = null;

var enemy_timer = 499;
var difficulty = 1;


function CreateEnemyGroup(phaserScene){
    enemy_group = phaserScene.physics.add.group();
    enemy_group.runChildUpdate=true;
    phaserScene.physics.add.collider(player.gameObject, enemy_group, player_hits_enemy, null, phaserScene);
}

function UpdateEnemies(phaserScene){
    if(dive_controller.dive_speed*dive_controller.dive_speed > 1 && dive_controller.depth > 100){
        enemy_timer ++;
        var enemy_timer_max= 500- (difficulty*10);
        var spawn_y = (dive_controller.dive_speed < 0)?650:-50;

        if(enemy_timer > enemy_timer_max){
            enemy_timer =0;
            var rand_x = Math.floor(Math.random() * 800);

            switch(Math.floor(Math.random()*3)){
                case 0:
                    enemy_group.add(new Mine(phaserScene, rand_x,spawn_y));
                    break;
                case 1:
                    var shark_obj = new Shark(phaserScene, rand_x,spawn_y);
                    enemy_group.add(shark_obj);
                    shootable_group.add(shark_obj);
                    break;
                case 2:
                    var shark_obj = new Shark(phaserScene, rand_x,spawn_y);
                    enemy_group.add(shark_obj);
                    shootable_group.add(shark_obj);
                    var shark_obj_2 = new Shark(phaserScene, Math.floor(Math.random() * 800),spawn_y + Math.random()*8);
                    enemy_group.add(shark_obj_2);
                    shootable_group.add(shark_obj_2);
                    break;
            }
        }
        difficulty = dive_controller.depth/100;
    }

    var enemies = enemy_group.getChildren();
    for(var i=0;i< enemies.length;i++){
        if( enemies[i].y < -100){enemies[i].destroy();i--;continue;}
        if( enemies[i].y > 700){enemies[i].destroy();i--;continue;}
    }
}