var projectile_group = null;
var shootable_group = null


function CreateProjectileGroup(phaserScene){    
    projectile_group = phaserScene.physics.add.group();
    shootable_group = phaserScene.physics.add.group();
    phaserScene.physics.add.collider(projectile_group, shootable_group, projectile_hits_shootable, null, phaserScene);
}



function projectile_hits_shootable(projectile,enemy){

    projectile.destroy();
    if(enemy.life == null){enemy.destroy();}
    else{
        enemy.life--;
        if(enemy.life == 0){enemy.destroy();}

    }
}