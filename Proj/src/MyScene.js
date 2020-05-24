/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    this.texture = null;
		this.appearance = null;

    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.nSuppliesDelivered = 0;
        this.enableTextures(true);
        this.appearance = new CGFappearance(this);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        this.appearance.loadTexture('./images/cubemap.png');
        this.appearance.setTextureWrap('REPEAT','REPEAT');

        this.supplies = [];
                for(var i = 0; i < 5; i++){
                    this.supplies.push(new MySupply(this));
                }

        this.textures=[
            new CGFtexture(this, './images/earth.jpg'),
            new CGFtexture(this, './images/cubemap.png'),

        ];

        this.textureList= {
            'None': -1,
            'Earth': 0,
            'CubeMap': 1,
        };


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.vehicle = new MyVehicle(this, 16, 20);
        this.box = new MyUnitCube(this);
        this.terrain = new MyTerrain(this, 50, 50);
        this.billboard=new MyBillboard(this, 2, 1);

        this.objects=[
            new MySphere(this, 16, 8),
            new MyCylinder(this,6),

        ];

        this.objectList = {
			      'Sphere': 0,
            'Cylinder': 1,
        };


        this.displayAxis = true;
        this.displayVehicle = true;
        this.displayObjects = false;
        this.displayBox = true;
        this.currentObject = 0;
        this.currentTexture = -1;
        this.speedFactor = 1;
        this.scaleFactor = 1;

    }


    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }


    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
    }


    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys(t){
      this.vehicle.update(t);
       var text="Keys pressed: ";
       var keysPressed=false;

       if(this.gui.isKeyPressed("KeyP")){
                text +="P";
                this.vehicle.startAutoPilot();
                keysPressed = true;
        }
       if(this.gui.isKeyPressed("KeyW")){
           text +="W";
           this.vehicle.accelerate(0.2*this.speedFactor);
           keysPressed = true;
       }
       if(this.gui.isKeyPressed("KeyS")){
           text +="S";
           this.vehicle.accelerate(-0.2*this.speedFactor);
           keysPressed = true;
       }
       if(this.gui.isKeyPressed("KeyA")){
           text +="A";
           this.vehicle.turn(5);
           keysPressed = true;
       }
       if(this.gui.isKeyPressed("KeyD")){
           text +="D";
           this.vehicle.turn(-5);
           keysPressed = true;
       }
       if(this.gui.isKeyPressed("KeyR")){
           text +="R";
           this.vehicle.reset();
           this.nSuppliesDelivered = 0;

        for(var i = 0; i < 5; i++){
            this.supplies[i].reset();
        }

        this.billboard.reset();
           keysPressed = true;
       }
       if(this.gui.isKeyPressed("KeyL")){
            text += "L";
            if (this.nSuppliesDelivered != 5){

                if((this.nSuppliesDelivered == 0) || (this.nSuppliesDelivered != 0 && (this.supplies[this.nSuppliesDelivered-1].previousTime == 0))){
                    this.supplies[this.nSuppliesDelivered].drop(this.vehicle.x*0.5, this.vehicle.z*0.5);
                    this.nSuppliesDelivered++;
                    this.billboard.update(t);
                }
            }
            keysPressed = true;
        }
       if(keysPressed){
           console.log(text);
           this.vehicle.update(t);
       }

   }



    update(t){
        this.checkKeys(t);
        this.vehicle.myFlag.update(t);
        for(var i=0; i<5; i++){
                this.supplies[i].update(t);
            }

    }



    selectedObject() {
		    this.objects[this.currentObject];
    }

    selectedTexture() {
          this.appearance.setTexture(this.textures[this.currentTexture]);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        this.appearance.apply();


        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        if(this.currentTexture != -1){
          this.appearance.apply();
        }


        this.setDefaultAppearance();


        if(this.displayObjects){
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.objects[this.currentObject].display();
          }

        if(this.displayVehicle){


            this.pushMatrix();
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            for(var i = 0; i < 5; i++){
                 this.supplies[i].display();
             }

            this.vehicle.display();
            this.popMatrix();
        }

        if(this.displayBox){
          this.pushMatrix();
          this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

          this.popMatrix();
          this.pushMatrix();
          this.translate(0,25,0);
          this.billboard.display();
            this.terrain.display();
          this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

          this.popMatrix();
this.translate(0,25,0);
          this.scale(50,50,50);

          this.appearance.apply();
          this.box.display();

        }

    }
}
