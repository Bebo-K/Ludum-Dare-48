var dive_switch = null;

class DiveSwitch{
    constructor(phaserScene){
        this.bgObject=phaserScene.add.image(80, 200, 'switch_bg').setScale(gameScale);
        this.switchObject=phaserScene.add.image(80, 240, 'switch').setScale(gameScale);
        this.dive=true;

        this.bgObject.setInteractive();
        phaserScene.input.on('gameobjectover',HoverSwitch);
        phaserScene.input.on('gameobjectout',UnhoverSwitch);
        phaserScene.input.on('gameobjectdown',ClickedSwitch);
    }
}


function HoverSwitch(){
    player.shoot_enabled=false;
}

function UnhoverSwitch(){
    player.shoot_enabled=true;
}


function ClickedSwitch() {
    if(player.life > 0){
        dive_switch.dive=!dive_switch.dive;
        if(dive_switch.dive){dive_switch.switchObject.y=240;}
        else{dive_switch.switchObject.y=160;}
    }
}