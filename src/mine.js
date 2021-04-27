class Mine extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y)
	{
		super(scene, x, y, 'mine')
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
        scene.sys.arcadePhysics.world.enableBody(this, 0);
        this.body.setSize(24, 24);
        this.body.setOffset(4, 4);
        this.setScale(gameScale);
	}

    update()
    {
        super.update();
        this.body.velocity.y=dive_controller.dive_speed;
        this.body.immovable=true;
        this.anims.play('mine_idle', true);
    }
}
