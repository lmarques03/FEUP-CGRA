class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.sphere = new MySphere(this.scene, 16, 8);

        this.initBuffers();
        this.initTextures();

        // MyVehicle elements
        this.myVehicleCorpo=new MyVehicleCorpo(scene,16,8);
        this.myVehicleMotorR=new MyVehicleCorpo(scene,16,8);
        this.myVehicleMotorL=new MyVehicleCorpo(scene,16,8);
        this.myVehicleRudderTop=new MyVehicleRudder(scene);
        this.myVehicleRudderBot=new MyVehicleRudder(scene);
        this.myVehicleRudderL=new MyVehicleRudder(scene);
        this.myVehicleRudderR=new MyVehicleRudder(scene);
        this.myVehicleGondola=new MyVehicleGondola(scene);
        this.myVehicleHelice_I=new MyVehicleHelice(scene,16,8);;
        this.myVehicleHelice_II=new MyVehicleHelice(scene,16,8);;
        this.myVehicleHelice_III=new MyVehicleHelice(scene,16,8);;
        this.myVehicleHelice_IV=new MyVehicleHelice(scene,16,8);;

        this.angY=0;
        this.speed=0;
        this.x=0;
        this.y=0;
        this.z=0;
        this.autoPilot = false;
        this.helixAng = 0;
        this.stabilizerAng = 0;


        this.center_x = 0;
        this.center_z = 0;

        this.radius = 5;
        this.pilotAngle = 0;

        this.previousTime = 0; //ms
      this.deltaTime = 0; //seconds
      this.angularSpeed = 360/5.0 * (Math.PI / 180); // formula: 360/animationTime
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    startAutoPilot(){

       this.autoPilot = true;
       this.pilotAngle = (this.angY - 90) * Math.PI / 180.0;
       var perpendicularAngle = (this.angY + 90) * Math.PI / 180.0;
       this.center_x = this.x + Math.sin(perpendicularAngle)*this.radius;
       this.center_z = this.z + Math.cos(perpendicularAngle)*this.radius;
   }

    update(t){

      if(this.previousTime == 0)
            this.previousTime = t;

        this.deltaTime = (t-this.previousTime)/1000;
        this.previousTime = t;

        var cos, sin;

      if(this.autoPilot){

            var deltaAngle = this.deltaTime * this.angularSpeed;

            this.pilotAngle += deltaAngle;

            sin = Math.sin(this.pilotAngle);
            cos = Math.cos(this.pilotAngle);
            this.angY = (this.pilotAngle * 180 / Math.PI) + 90;


            this.x = this.radius * sin + this.center_x;
            this.z = this.radius * cos + this.center_z;

            this.stabilizerAng = (-5*4) * Math.PI /180.0;
            this.helixAng = (5 * t) * Math.PI /180.0;
        }

        else{

        this.x += this.speed*Math.sin(this.angY*Math.PI/180.0);
        this.z += this.speed*Math.cos(this.angY*Math.PI/180.0);

        this.helixAng = (this.speed * t) * Math.PI /180.0;

        }



    }

    updateBuffers(complexity){


        //reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    turn(val){
        this.angY += val;
        this.stabilizerAng = (-val) * 4 * Math.PI /180.0;
    }

    accelerate(val){
        this.speed = this.speed + val;
    }

    reset(){
        this.x=0;
        this.y=0;
        this.z=0;
        this.angY=0;
        this.speed=0;
        this.autoPilot = false;
        this.stabilizerAng = 0;
    }



    initTextures(){
        this.appearanceCorpo = new CGFappearance(this.scene);
        this.appearanceCorpo.setAmbient(1.0, 1.0, 1.0, 1);
        this.appearanceCorpo.setDiffuse(1.0, 1.0, 1.0, 1);
        this.appearanceCorpo.setSpecular(0.4, 0.4, 0.4, 1);
        this.appearanceCorpo.setShininess(100);
        this.textureCorpo=new CGFtexture(this.scene, "./images/gy3.jpg");;
        this.appearanceCorpo.setTexture(this.textureCorpo);
        this.appearanceCorpo.setTextureWrap('REPEAT', 'REPEAT');

        this.appearanceRuder = new CGFappearance(this.scene);
        this.appearanceRuder.setAmbient(1.0, 1.0, 1.0, 1);
        this.appearanceRuder.setDiffuse(1.0, 1.0, 1.7, 1);
        this.appearanceRuder.setSpecular(0.4, 0.4, 0.4, 1);
        this.appearanceRuder.setShininess(100);
        this.appearanceRuder.loadTexture( "./images/Yellow.png");
        this.appearanceRuder.setTextureWrap('REPEAT', 'REPEAT');

        this.appearanceGondola = new CGFappearance(this.scene);
        this.appearanceGondola.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearanceGondola.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearanceGondola.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearanceGondola.setShininess(120);
        this.appearanceGondola.loadTexture( "./images/Blue.png");
        this.appearanceGondola.setTextureWrap('REPEAT', 'REPEAT');

        this.appearanceHelice = new CGFappearance(this.scene);
        this.appearanceHelice.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearanceHelice.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearanceHelice.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearanceHelice.setShininess(120);
        this.appearanceHelice.loadTexture( "./images/metal.jpeg");
        this.appearanceHelice.setTextureWrap('REPEAT', 'REPEAT');

}



    display(){

  //    this.scene.setAmbient(0.5, 0.5, 0.5, 1.0);
      this.scene.pushMatrix();

      //orientar a posiçao do veiculo
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(this.angY*Math.PI/180.0, 0, 1, 0);


//translate all objects
this.scene.scale(0.25,0.25,0.25);
this.scene.translate(0,10,0);

this.scene.pushMatrix();
    this.appearanceCorpo.apply();
    this.scene.pushMatrix();
    this.scene.scale(2,2,3);
    this.myVehicleCorpo.display();
    this.scene.popMatrix();


    //translate all objects(exc corpo)
    this.scene.pushMatrix();
      this.scene.translate(0,0,0-1.5);
    //
        this.appearanceGondola.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.25,0.25,0.4);
        this.scene.translate(0,-8.7,-2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.myVehicleGondola.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.3,-2.25,-1);
        this.scene.scale(0.2,0.1,0.2);
        this.myVehicleMotorL.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.3,-2.25,-1);
        this.scene.scale(0.2,0.1,0.2);
        this.myVehicleMotorR.display();
        this.scene.popMatrix();

//HELICE
        this.appearanceHelice.apply();

        this.scene.pushMatrix();
          this.scene.translate(-0.3,-2.25,-1.4);
          this.scene.rotate(Math.PI/2,0,1,0);
          this.scene.scale(0.15,0.15,0.15);

            this.scene.pushMatrix();
              this.scene.scale(1,0.4,1);
              this.scene.rotate(this.helixAng, 1,0,0);
              this.myVehicleHelice_I.display();
            this.scene.popMatrix();

              this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2,1,0,0);
                this.scene.scale(1,0.4,1);
                this.scene.rotate(this.helixAng, 1,0,0);
                this.myVehicleHelice_II.display();
              this.scene.popMatrix();
        this.scene.popMatrix();



        this.scene.pushMatrix();
          this.scene.translate(+0.3,-2.25,-1.4);
          this.scene.rotate(Math.PI/2,0,1,0);
          this.scene.scale(0.15,0.15,0.15);
            this.scene.pushMatrix();
              this.scene.scale(1,0.4,1);
              this.scene.rotate(this.helixAng, 1,0,0);
             this.myVehicleHelice_III.display();
            this.scene.popMatrix();

              this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2,1,0,0);
                this.scene.scale(1,0.4,1);
                this.scene.rotate(this.helixAng, 1,0,0);

                this.myVehicleHelice_IV.display();
              this.scene.popMatrix();
        this.scene.popMatrix();

//FIM DE HELICE

        this.appearanceRuder.apply();
        this.scene.pushMatrix();
          this.scene.scale(0.75,0.75,1);
          this.scene.pushMatrix();
            this.scene.translate(0,1.75,-2.75);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.scene.rotate(Math.PI/2,0,1,0);
            this.scene.rotate(this.stabilizerAng, 1,0,0);
            this.myVehicleRudderTop.display();
          this.scene.popMatrix();
          this.scene.pushMatrix();
            this.scene.translate(0,-1.75,-2.75);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.scene.rotate(Math.PI/2,0,1,0);
            this.scene.rotate(this.stabilizerAng, 1,0,0);
            this.myVehicleRudderBot.display();
          this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix()
          this.scene.scale(0.75,0.75,1)
          this.scene.pushMatrix();
            this.scene.translate(1.5,0,-3);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.myVehicleRudderR.display();
          this.scene.popMatrix()
          this.scene.pushMatrix();
            this.scene.translate(-1.5,0,-3);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.myVehicleRudderL.display();
          this.scene.popMatrix()
        this.scene.popMatrix();

    this.scene.popMatrix();

this.scene.popMatrix();
    }
}
