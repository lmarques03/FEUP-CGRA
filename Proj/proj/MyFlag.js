class MyFlag extends CGFobject {

    constructor(scene, width, height) {
        super(scene);

        this.initMaterialsAndTextures();
        this.initShaders();
        this.width = width;
        this.height = height;
        this.flag = new MyPlane(this.scene, 20);
        this.nylon=new MyCylinder(this.scene, 10);

    }

    initShaders() {
        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.flagShaderFront = new CGFshader(this.scene.gl, "shaders/flagFront.vert", "shaders/flagFront.frag");

      }

    initMaterialsAndTextures() {
        this.flagTexture = new CGFtexture(this.scene, "images/goodyear_logo_slogan.png");
        this.flagMaterial = new CGFappearance(this.scene);
        this.flagMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.flagMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.flagMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.flagMaterial.setShininess(10.0);
        this.flagMaterial.setTexture(this.flagTexture);

        this.nylonTexture = new CGFappearance(this.scene);
        this.nylonTexture.setAmbient(1.0, 1.0, 1.0, 1);
        this.nylonTexture.setDiffuse(1.0, 1.0, 1.7, 1);
        this.nylonTexture.setSpecular(0.4, 0.4, 0.4, 1);
        this.nylonTexture.setShininess(100);
        this.nylonTexture.loadTexture( "./images/nylon.jpg");
        this.nylonTexture.setTextureWrap('REPEAT', 'REPEAT');
    }


    update(t) {
    this.flagShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
    }


    display() {
//ambos os suporte da bandeeira
    this.scene.pushMatrix();


    //suporte da bandeira
      this.scene.pushMatrix();
      this.nylonTexture.apply();
      this.scene.translate(0, 0, -6);
      this.scene.rotate(-4.0/9.0*Math.PI,1,0,0);
      this.scene.scale(0.05,2,0.05);
      this.nylon.display();
      this.scene.popMatrix();
    //suporte da bandeira
      this.scene.pushMatrix();
      this.nylonTexture.apply();
      this.scene.translate(0, 0, -6);
      this.scene.rotate(4.0/9.0*Math.PI+Math.PI,1,0,0);
      this.scene.scale(0.05,2,0.05);
      this.nylon.display();
      this.scene.popMatrix();
    this.scene.popMatrix();


      this.scene.pushMatrix();
      this.scene.setActiveShader(this.flagShader);
      this.flagMaterial.apply();
      this.scene.translate(0, 0, -10.75);
      this.scene.rotate(Math.PI/2, 0, 1,0 );
      this.scene.scale(this.width, this.height, 1);
      this.flag.display();
      this.scene.popMatrix();


      this.scene.pushMatrix();
      this.scene.setActiveShader(this.flagShaderFront);
      this.flagMaterial.apply();
      this.scene.translate(0, 0, -10.75);
      this.scene.rotate(Math.PI/2, 0, 1,0 );
      this.scene.scale(this.width, this.height, 1);
      this.flag.display();
      this.scene.popMatrix();


        // restore default shader to draw rest of scene
      this.scene.setActiveShader(this.scene.defaultShader);
    }
}
