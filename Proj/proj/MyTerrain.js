class MyTerrain extends CGFobject {

    constructor(scene, width, height) {
        super(scene);

        this.initMaterialsAndTextures();
        this.initShaders();

        this.width = width;
        this.height = height;

        this.plane = new MyPlane(this.scene, 20);
    }

    initShaders() {
        this.heightShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
      	this.heightShader.setUniformsValues({uSampler: 0});
      	this.heightShader.setUniformsValues({uSamplerHeightMap: 1});

    }

    initMaterialsAndTextures() {

        this.terrainTexture = new CGFtexture(this.scene, "terrain/terrain.jpg");
        this.heightTexture = new CGFtexture(this.scene, "terrain/heightmap.jpg");


        this.terrainMaterial = new CGFappearance(this.scene);
        this.terrainMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.terrainMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.terrainMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.terrainMaterial.setShininess(10.0);
        this.terrainMaterial.setTexture(this.terrainTexture);
    }

    display() {


	    this.scene.setActiveShader(this.heightShader);
      this.terrainMaterial.apply();
    	this.terrainTexture.bind(0);
    	this.heightTexture.bind(1);


        // display plane
        this.scene.pushMatrix();
        this.scene.translate(0 , -15, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(this.width, this.height, 1);
        this.plane.display();
        this.scene.popMatrix();

        // restore default shader to draw rest of scene
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
