var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
    parent: 'game',
    width: 800,
    height: 600,
    }
};

var game = new Phaser.Game(config);
var controller = {
    left:false,
    right:false,
    //up:false,
    //down:false,
    space:false,
    toggle:false,
    shoot:false
}

var cursor_keys = null;
var wasd_keys = null;
var enemies = [];
var ui = null;
var depth=100;
var max_depth=100;

function preload ()
{
    this.load.image('diver','rsc/sprites/diver.png');
    this.load.spritesheet('shark', 'rsc/sprites/shark.png', { frameWidth: 64, frameHeight: 24 });
    this.load.image('hose','rsc/sprites/hose.png');
    this.load.spritesheet('mine', 'rsc/sprites/mine.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('bubble','rsc/sprites/bubble.png');
    this.load.image('projectile','rsc/sprites/projectile.png');
    this.load.image('switch_bg','rsc/sprites/dive_switch_bg.png');
    this.load.image('switch','rsc/sprites/dive_switch.png');
    this.load.image('restart_button','rsc/sprites/restart_button.png');
    this.load.image('ui_plate','rsc/sprites/ui_plate.png');
    this.load.image('battery_cap','rsc/sprites/battery_cap.png');
    this.load.spritesheet('battery_pip', 'rsc/sprites/battery_pip.png', { frameWidth: 10, frameHeight: 16 });

    background = new Background(this);
    /*
    fg_tex = this.textures.createCanvas('foreground', 800, 600);
    var fg_grd = fg_tex.context.createLinearGradient(0, 0, 0, 600);
        fg_grd.addColorStop(0, '#00000000');
        fg_grd.addColorStop(1, '#00000088');

    fg_tex.context.fillStyle = fg_grd;//'#000000EE';
    fg_tex.context.fillRect(0, 0, 800, 600);
    fg_tex.refresh();
    */
}

function create ()
{
    this.anims.create({key: 'swim_l',frames: this.anims.generateFrameNumbers('shark', {starts:0, ends:2}),frameRate: 3,repeat: -1});
    this.anims.create({key: 'mine_idle',frames: this.anims.generateFrameNumbers('mine', {starts:0, ends:2}),frameRate: 4,repeat: -1});
    console.log(this.anims.generateFrameNumbers('battery_pip', {starts:0, ends:2}));
    //this.anims.create({key: 'mine_idle',frames: }),frameRate: 4,repeat: -1});


    background.Create(this);
    player = new Player(this,400,300);
    CreateEnemyGroup(this);
    CreateProjectileGroup(this);
    CreateBubbles(this);

    /*
    var ui_layer = this.add.layer();    //scene.add.layer() is not a method?
    
    ui_layer.add([dive_switch.bgObject,dive_switch.switchObject]);
    ui_layer.setDepth(2);
    */

    /*
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'shark', frame: 1 } ],
        frameRate: 20
    });
    */


    dive_switch = new DiveSwitch(this);
    dive_switch.bgObject.setDepth(2);
    dive_switch.switchObject.setDepth(2);

    cursor_keys = this.input.keyboard.createCursorKeys();
    wasd_keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

    ui = new UI(this);
    dive_controller = new DiveController();
}

function update(){
    if(cursor_keys.left.isDown || wasd_keys.left.isDown){controller.left=true;}
    else{controller.left=false;}
    if(cursor_keys.right.isDown || wasd_keys.right.isDown){controller.right=true;}
    else{controller.right=false;}


    background.Update(this);
    player.Update(this);
    UpdateEnemies(this)
    dive_controller.Update(this);
    ui.Update(this);
}

function UpdateWaves(){
    grd.addColorStop(0, '#88BEEA');
    grd.addColorStop(1, '#1B226B');

    texture.context.fillStyle = grd;
    texture.context.fillRect(0, 0, 800, 600);

    //  Call this if running under WebGL, or you'll see nothing change
    texture.refresh();
}

function CreateBubbles(phaserScene){


    var bubble_particles = phaserScene.add.particles('bubble');
    var shape1 = new Phaser.Geom.Rectangle(0, 600, 800,10);
    var bubble_emitter = bubble_particles.createEmitter({
        quantity: 1,
        frequency: 800,
        speed: 8,
        gravityY: -100,
        lifespan: { min: 1000, max: 20000 },
        emitZone: { type: 'random', source: shape1 }
    });


}