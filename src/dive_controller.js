var dive_controller = null;
class DiveController{

    constructor(){
        this.dive_rate =  0;//rate depth increases/decreases
        this.dive_speed = 0;//rate entities move up/down. dive rate change is higher than dive speed when surfacing.
        this.depth = 100;
        this.max_depth = 100;




    }


    Update(phaserScene){
        if(player.life <= 0){
            this.dive_rate=0;
            if(this.dive_speed*this.dive_speed > 1){
                phaserScene.tweens.add({targets: this, dive_speed: 0,duration: 100,ease: 'Quad.easeInOut',delay: 100});
            }
            return;
        }

        if(dive_switch.dive){
            if(this.dive_speed > -30){
                phaserScene.tweens.add({targets: this, dive_speed: -30,duration: 100,ease: 'Quad.easeInOut',delay: 100});
                phaserScene.tweens.add({targets: this, dive_rate: -30,duration: 100,ease: 'Quad.easeInOut',delay: 100});
            }
        }
        else{
            if(this.dive_speed < 30){
                phaserScene.tweens.add({targets: this, dive_speed: 30,duration: 100,ease: 'Quad.easeInOut',delay: 100});
                phaserScene.tweens.add({targets: this, dive_rate: 60,duration: 100,ease: 'Quad.easeInOut',delay: 100});
            }
        }

        this.depth -= this.dive_rate* 0.01;
        if(this.depth >  this.max_depth){this.max_depth = this.depth;}
        if(this.depth < 0){this.depth=0;}
    }



}