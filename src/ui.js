

class UI {

    constructor(phaserScene)
	{
        
        this.group = phaserScene.physics.add.group();
        this.ui_plate =  phaserScene.add.image(260, 36, 'ui_plate').setScale(gameScale);
        this.group.add(this.ui_plate);

        this.battery_cap =  phaserScene.add.image(32, 36, 'battery_cap').setScale(gameScale);
        this.group.add(this.battery_cap);
        this.battery_pips = [];

        this.dive_speed_text = phaserScene.add.text(10, 550, 'Dive Speed');
        this.group.add(this.dive_speed_text);
        this.depth_text = phaserScene.add.text(10, 565, 'Depth');
        this.group.add(this.depth_text);
        this.max_depth_test = phaserScene.add.text(10, 580, 'Max Depth');
        this.group.add(this.max_depth_test);
        //this.debug_text = phaserScene.add.text(10, 400, 'Switch:');
        //this.group.add(this.debug_text);
        this.restart_button=null;
        this.group.setDepth(2);

	}

    Update(phaserScene)
    {
        while(this.battery_pips.length < player.max_battery){
            var new_pip =  phaserScene.add.image(52+20*this.battery_pips.length, 36, 'battery_pip',1).setScale(gameScale);
            new_pip.setDepth(2);
            this.battery_pips.push(new_pip);
            this.group.add(new_pip);
            console.log("pip up");
        }

        for(var i=0;i< player.max_battery;i++){
            if(i < player.battery){this.battery_pips[i].setFrame(0);}
            else{this.battery_pips[i].setFrame(1);}

        }
        

        this.dive_speed_text.setText("Dive Speed:   "+dive_controller.dive_speed.toFixed(2));
        this.depth_text.setText("Depth:        "+dive_controller.depth.toFixed(2));
        this.max_depth_test.setText("Max Depth:    "+dive_controller.max_depth.toFixed(2));
        //this.debug_text.setText("Switch:    "+dive_switch.dive);

        if(player.life <= 0 && this.restart_button ==null){
            this.restart_button = phaserScene.add.image(400, 650, 'restart_button').setScale(gameScale);
            this.group.add(this.restart_button);
            this.restart_button.setInteractive();
            phaserScene.input.on('gameobjectdown',ClickedRestartButton,phaserScene);
            phaserScene.tweens.add({
                targets: this.restart_button,
                y: 584,
                duration: 1600,
                ease: 'Linear',
                delay: 5000
            });
        }

    }
}


function ClickedRestartButton() {
    this.registry.destroy();
    this.events.off();
    background.texture.destroy();
    this.scene.restart();
}