class Shark extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y)
	{
		super(scene, x, y, 'shark',0)
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
        scene.sys.arcadePhysics.world.enableBody(this, 0);
        this.setScale(gameScale);
        this.body.setSize(48, 18);
        this.body.setOffset(4, 4);
        this.life = 2;
        this.frame=0;

        this.flipX=(Math.random() < 0.5);
        this.chase = false;
        this.turn_timer=(Math.random() * 100);
	}

    update()
    {
        super.update();
        this.body.velocity.y=dive_controller.dive_speed;
        this.body.immovable=true;
        
        this.anims.play('swim_l', true);
        this.body.velocity.x = (this.flipX)?100:-100;
        this.turn_timer++;
        if(this.turn_timer >= 100){
            this.turn_timer=0;
            this.flipX = !this.flipX;
        }
        
    }
}
