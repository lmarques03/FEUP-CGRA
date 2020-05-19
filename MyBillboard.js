class MyBillboard extends CGFobject {

    constructor(scene, width, height) {
        super(scene);

        this.initMaterialsAndTextures();
       this.initShaders();
        this.width = width;
        this.height = height;
        this.myBillboard = new MyPlane(this.scene, 20);
        this.mySupport=new MyCylinder(this.scene, 10);

    }

    initShaders() {
        this.billboardShader = new CGFshader(this.scene.gl, "shaders/display.vert", "shaders/display.frag");

        // this.billboardShader.setUniformsValues({canvasWidth: this.scene.gl.canvas.width });
        // this.billboardShader.setUniformsValues({canvasHeight:this.scene.gl.canvas.height });

}
    initMaterialsAndTextures() {

        this.mySupportTexture = new CGFappearance(this.scene);
        this.mySupportTexture.setAmbient(1.0, 1.0, 1.0, 1);
        this.mySupportTexture.setDiffuse(1.0, 1.0, 1.7, 1);
        this.mySupportTexture.setSpecular(0.4, 0.4, 0.4, 1);
        this.mySupportTexture.setShininess(100);
        this.mySupportTexture.loadTexture( "./images/BlackTextures.jpg");
        this.mySupportTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.myBillboardTexture = new CGFappearance(this.scene);
        this.myBillboardTexture.setAmbient(1.0, 1.0, 1.0, 1);
        this.myBillboardTexture.setDiffuse(1.0, 1.0, 1.7, 1);
        this.myBillboardTexture.setSpecular(0.4, 0.4, 0.4, 1);
        this.myBillboardTexture.setShininess(100);
        this.myBillboardTexture.loadTexture( "./images/SuppliesDeliveredR.png");
        this.myBillboardTexture.setTextureWrap('REPEAT', 'REPEAT');

    }


    update(t) {
    this.billboardShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
    }


    display() {

  this.scene.pushMatrix();
    this.scene.translate(-2,-5,+18);
    this.scene.rotate(-Math.PI/5, 0, 1,0 );

//ambos os suporte da bandeeira
    this.scene.pushMatrix();
    //suporte do display
        this.scene.pushMatrix();
          this.mySupportTexture.apply();
          this.scene.translate(0, 0, 0);
          this.scene.scale(0.1,5,0.1);
          this.mySupport.display();
        this.scene.popMatrix();
        //suporte da display
        this.scene.pushMatrix();
          this.mySupportTexture.apply();
           this.scene.translate(0, 0, -1.5);
          this.scene.scale(0.1,5,0.1);
          this.mySupport.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.myBillboardTexture.apply();
      this.scene.translate(0.1, 6 , -0.75);
      this.scene.rotate(Math.PI/2, 0, 1,0 );
      this.scene.scale(this.width, this.height, 1);
      this.myBillboard.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
        this.scene.setActiveShader(this.billboardShader);
        this.myBillboardTexture.apply();
        this.scene.translate(0.1, 5 , -0.75);
        this.scene.rotate(Math.PI/2, 0, 1,0 );
        this.scene.scale(this.width, this.height, 1);
        this.myBillboard.display();
      this.scene.popMatrix();

  this.scene.popMatrix();


        // restore default shader to draw rest of scene
      this.scene.setActiveShader(this.scene.defaultShader);
    }
}
