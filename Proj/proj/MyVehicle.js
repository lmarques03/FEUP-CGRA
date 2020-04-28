class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.sphere = new MySphere(this.scene, 16, 8);

        this.initBuffers();

        this.angY=0;
        this.speed=0;
        this.x=0;
        this.y=0;
        this.z=0;
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

    update(){
        this.x += this.speed*Math.sin(this.angY*Math.PI/180.0);
        this.z += this.speed*Math.cos(this.angY*Math.PI/180.0);
    }

    updateBuffers(complexity){


        //reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    turn(val){
        this.angY += val;
    }

    accelerate(val){
        this.speed = val;
    }

    reset(){
        this.x=0;
        this.y=0;
        this.z=0;
        this.angY=0;
        this.speed=0;
    }

    display(){
      this.scene.setAmbient(0.5, 0.5, 0.5, 1.0);
      this.scene.pushMatrix();

      //orientar a posiçao do veiculo
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(this.angY*Math.PI/180.0, 0, 1, 0);

  

      //super.display();//tipo override o display de scene

      //Balao
      this.scene.pushMatrix();
       this.scene.scale(0.5,0.5,1);
       this.sphere.display();
       this.scene.popMatrix();



      this.scene.popMatrix();

    }
}
