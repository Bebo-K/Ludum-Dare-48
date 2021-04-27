var start_count= 0;

function Background(phaserScene){
    this.canvasname = 'background_gradient_'+start_count;
    start_count++;
    this.texture = phaserScene.textures.createCanvas(this.canvasname, 400, 300);
    
    var grd = this.texture.context.createLinearGradient(0, 0, 0, 300);
        grd.addColorStop(0, '#88BEEA');
        grd.addColorStop(1, '#1B226B');

    this.texture.context.fillStyle = grd;
    this.texture.context.fillRect(0, 0, 400, 300);
    this.texture.refresh();

    this.gameObject = null;
	
    this.Create= function(phaserScene){
        this.gameObject=phaserScene.add.image(0,0 ,this.canvasname).setScale(gameScale).setOrigin(0,0);




    }

	this.Update= function(phaserScene){
        //TODO: sine wave background
        var grd = this.texture.context.createLinearGradient(0, 0, 0, 300);

            var ocean_top_color = [0x88,0xBE,0xEA]; 
            var ocean_middle_color = [0x1B,0x22,0x6B]; 
            var ocean_floor_color = [0x05,0x07,0x1E]; 
            var black = [0x04,0x04,0x04]; 

            //var depth_factor = Math.sqrt(dive_controller.depth)/100;
            var depth_factor = dive_controller.depth/500;
            var r1,r2,g1,g2,b1,b2;
            if(depth_factor < 1){
                r1 = ocean_top_color[0] * (1-depth_factor) + ocean_middle_color[0]*depth_factor;
                g1 = ocean_top_color[1] * (1-depth_factor) + ocean_middle_color[1]*depth_factor;
                b1 = ocean_top_color[2] * (1-depth_factor) + ocean_middle_color[2]*depth_factor;
    
                r2 = ocean_middle_color[0] * (1-depth_factor) + ocean_floor_color[0]*depth_factor;
                g2 = ocean_middle_color[1] * (1-depth_factor) + ocean_floor_color[1]*depth_factor;
                b2 = ocean_middle_color[2] * (1-depth_factor) + ocean_floor_color[2]*depth_factor;
            }
            else{
                if(depth_factor> 2)depth_factor=2;
                r1 = ocean_middle_color[0] * (2-depth_factor) + ocean_floor_color[0]*(depth_factor-1);
                g1 = ocean_middle_color[1] * (2-depth_factor) + ocean_floor_color[1]*(depth_factor-1);
                b1 = ocean_middle_color[2] * (2-depth_factor) + ocean_floor_color[2]*(depth_factor-1);
                r2 = ocean_floor_color[0];
                g2 = ocean_floor_color[1];
                b2 = ocean_floor_color[2];
            }

            

            grd.addColorStop(0, 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')' );
            grd.addColorStop(1, 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')' );
        
        this.texture.context.fillStyle = grd;
        this.texture.context.fillRect(0, 0, 400, 300);
        this.texture.refresh();
	}
}

var background = null;