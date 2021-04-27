
var player = null;


class Player{
    constructor(phaserScene, x, y){
        this.gameObject=phaserScene.physics.add.image(x, y, 'diver').setScale(gameScale);
        this.gameObject.body.setSize(18, 24);
        this.gameObject.body.setOffset(4, 4);
        this.gameObject.body.immovable =true;
        this.life = 2;
        this.max_life = 2;
        this.battery = 4; 
        this.max_battery = 4;
        this.replenish_timer=0;
        this.shots_per_battery=1;
        this.shots_this_battery=1;
        this.invincibility_frames=0;
        this.shoot_timer=0;
        this.shoot_enabled=true;
        this.gameObject.setInteractive();
        phaserScene.input.on('pointerdown', OnMouseClick,phaserScene);
	
        this.hose_bits=Array(18);
        for(var i=0;i<18;i++){
            this.hose_bits[i]= phaserScene.physics.add.image(400-10, 300-(40+16*i), 'hose').setScale(gameScale);
            
            this.hose_bits[i].body.immovable =true;
        }
    }
    
    Update(phaserScene){

        if(this.invincibility_frames > 0){this.invincibility_frames--;
            if(this.invincibility_frames % 10 < 5){
                this.gameObject.visible=true;
            }
            else{
                this.gameObject.visible=false;
            }
        }


        //Player controls
        if(this.life > 0){
            if(this.shoot_timer> 0){this.shoot_timer--;}
        
            if (controller.left && this.gameObject.body.velocity.x < 80 && this.gameObject.body.velocity.x > -80){
                this.gameObject.body.velocity.x-=2;
            }
            else if (controller.right && this.gameObject.body.velocity.x >= -80 && this.gameObject.body.velocity.x < 80){
                this.gameObject.body.velocity.x +=2;
            }
            else{
                this.gameObject.body.velocity.x*=0.95;
            }

            if (controller.left){
                if(!this.gameObject.flipX){this.gameObject.flipX=true;}
            }
            else if (controller.right){
                if(this.gameObject.flipX){this.gameObject.flipX=false;}
            }
                
            if(Phaser.Input.Keyboard.JustDown(cursor_keys.space)){
                if(this.battery > 0){
                    if(this.shots_this_battery > 0){
                        this.gameObject.body.velocity.x=(this.gameObject.flipX)?-400:400;
                        this.shots_this_battery--;
                        if(this.shots_this_battery == 0){
                            this.battery--;
                            this.shots_this_battery=this.shots_per_battery;
                        }
                    }
                }
            }

            if(dive_controller.depth < 100){
                this.gameObject.body.velocity.y=-dive_controller.dive_speed*3;
            }
            
            if(this.gameObject.y > 300){this.gameObject.y = 300;this.gameObject.body.velocity.y=0;}
            else if(this.gameObject.y < -50){this.gameObject.y = -50;this.gameObject.body.velocity.y=0;}
            if(this.gameObject.y  == -50){
                //we are in base. Recharge the battery and health
                this.replenish_timer++;
                if(this.replenish_timer > 30){
                    if(this.battery < this.max_battery){this.battery++;}
                    if(this.max_life < this.max_life){this.max_life ++;}
                    this.replenish_timer=0;
                }
            }
            //else{console.log("y: "+ this.gameObject.y);}
    

        }

        ///////////////Update hose
        var last_hose_x = last_hose_x =this.hose_bits[0].x;
        if(this.life > 0){
            last_hose_x = (this.gameObject.flipX)? this.gameObject.x+12:this.gameObject.x-10;
        }
        for(var i=0;i<18;i++){
            if((this.hose_bits[i].x-2) > last_hose_x){
                this.hose_bits[i].x = last_hose_x+2;
            }
            else if((this.hose_bits[i].x+2) < last_hose_x){
                this.hose_bits[i].x = last_hose_x-2;
            }
            if(this.hose_bits[i].x > last_hose_x){
                this.hose_bits[i].body.velocity.x -= 0.1;
            }
            if(this.hose_bits[i].x < last_hose_x){
                this.hose_bits[i].body.velocity.x += 0.1;
            }
            if(this.life > 0){this.hose_bits[i].y = this.gameObject.y-(40 + 16*i);}
            last_hose_x =this.hose_bits[i].x;
        }
        ////////////////////////////////
    }
}


function OnMouseClick(pointer){
    if(player.shoot_enabled && player.shoot_timer == 0 && player.battery > 0 && player.shots_this_battery > 0){
        player.shots_this_battery--;
        if(player.shots_this_battery == 0){
            player.battery--;
            player.shots_this_battery=player.shots_per_battery;
        }
            
        //var projectile = phaserScene.add.playerProjectile(player.gameObject.x + (-px*30), player.gameObject.y + (-py*30));

        var px = player.gameObject.x - pointer.worldX;
        var py = player.gameObject.y - pointer.worldY;

        var plen = Math.sqrt(px*px + py*py);
        if(plen != 0){
            px /= plen;
            py /= plen;

            var projectile = this.physics.add.image(player.gameObject.x + (-px*30), player.gameObject.y + (-py*30), 'projectile').setScale(gameScale);
            projectile_group.add(projectile);
            var rotation = Math.atan2(px,py);
            projectile.body.velocity.x = -px * 500;
            projectile.body.velocity.y = -py * 500;
        
            projectile.body.immovable =true;
            projectile.angle = 180- (rotation * (180/Math.PI));

            player.shoot_timer = 1;
        }
    }
}




function player_hits_enemy (playerobj, enemy)
{
    if(player.invincibility_frames == 0 && player.life > 0){
        player.life--;
        if(player.life > 0){
            playerobj.body.velocity.x = (playerobj.x > enemy.x)?200:-200;
            player.invincibility_frames = 100;
        }
        else{
            playerobj.body.velocity.x /= 4;
            playerobj.body.velocity.y = 30;
            playerobj.body.acceleration.y = 50;
        }
    }
}

