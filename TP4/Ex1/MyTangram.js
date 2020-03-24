/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

		this.axis = new CGFaxis(scene);
		this.diamond = new MyDiamond(scene);
		this.triangle= new MyTriangle(scene);
		this.parallelogram=new MyParallelogram(scene);
		this.triangleSmall=new MyTriangleSmall(scene);
		this.triangleBig=new MyTriangleBig(scene);
		this.triangleBigBotton=new MyTriangleBig(scene);
		this.triangleBigTop=new MyTriangleBig(scene);
		this.triangleSmallLeft=new MyTriangleSmall(scene);
		this.triangleSmallRight=new MyTriangleSmall(scene);


		this.initMaterials();
		}

		initMaterials(){
		this.tangramMaterial = new CGFappearance(this.scene	);
		this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
		this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.tangramMaterial.setShininess(10.0);
		this.tangramMaterial.loadTexture('images/tangram.png');
		//this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');

		// this.diamond.texCoords = [
		// 	0, 0.5,
		// 	0.25, 0.25,
		// 	0.25, 0.75,
		// 	0.5, 0.5,
		// 	0, 0.5,
		// 	0.25, 0.25,
		// 	0.25, 0.75,
		// 	0.5, 0.5
		// ];
    // this.diamond.updateTexCoordsGLBuffers();


		this.parallelogram.texCoords = [
			0.25, 0.75,
			0.5, 1,
			0.75, 0.75,
			1, 1,

			0.25, 0.75,
			0.5, 1,
			0.75,0.75,
			1, 1
		];
    this.parallelogram.updateTexCoordsGLBuffers();

this.triangleSmallLeft.texCoords = [

		0.25, 0.75,
		0.5, 0.5,
		0.75, 0.75,

		0.25, 0.75,
		0.5, 0.5,
		0.75, 0.75

];
this.triangleSmallLeft.updateTexCoordsGLBuffers();


this.triangleSmallRight.texCoords=[
0,0,
0,0.5,
0.25,0.25,
0,0,
0,0.5,
0.25,0.25
];
this.triangleSmallRight.updateTexCoordsGLBuffers();


this.triangleBigBotton.texCoords=[

	0.5, 0.5,
	1, 0,
	1, 1

];
this.triangleBigBotton.updateTexCoordsGLBuffers();


this.triangleBigTop.texCoords=[
0,0,
0.5,0.5,
1,0
];
this.triangleBigTop.updateTexCoordsGLBuffers();


this.triangle.texCoords=[
0,0.5,
0,1,
0.5,1
];
this.triangle.updateTexCoordsGLBuffers();

	}


		  display(){

			this.tangramMaterial.apply();


			this.scene.pushMatrix();
		  var translateDiamond = [1.0, 0.0, 0.0, 0.0,
														 0.0, 1.0, 0.0, 0.0,
														 0.0, 0.0, 1.0, 0.0,
														 Math.sqrt(2)+Math.sqrt(2)/2, 2*Math.sqrt(8)+Math.sqrt(2)/4-Math.sqrt(8)/2, 0.0, 1];



		  this.scene.multMatrix(translateDiamond);
		  var rotateDiamond = [Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0.0, 0.0,
												-Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0.0, 0.0,
													0.0, 0.0, 1.0, 0.0,
													0, 0, 0.0, 1];
      this.scene.multMatrix(rotateDiamond);
			this.diamond.display();
		 	this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,-Math.sqrt(8)/2,0);
		 	this.scene.rotate(-Math.PI+Math.PI/4,0,0,1);
		 	this.scene.rotate(Math.PI/2,0,0,1);
		 	this.triangle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,Math.sqrt(8)/2-Math.sqrt(8)/2,0);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(Math.PI/4,0,0,1);
			this.parallelogram.display();
			this.scene.popMatrix();



			this.scene.pushMatrix();
			this.scene.translate(0,Math.sqrt(8)/2-Math.sqrt(8)/2,0);
			this.scene.rotate(Math.PI/4,0,0,1);
			this.triangleBigBotton.display();
			this.scene.popMatrix()


			this.scene.pushMatrix();
			this.scene.translate(0,Math.sqrt(8)+Math.sqrt(8)/2-Math.sqrt(8)/2,0);
			this.scene.rotate(-3*Math.PI/4,0,0,1);
			this.triangleBigTop.display();
			this.scene.popMatrix()

			//pé esquerdo
			this.scene.pushMatrix();
			this.scene.translate(Math.sqrt(2)/4,-Math.sqrt(8)/2-Math.sqrt(2)/4-Math.sqrt(8)/2,0);
			this.scene.rotate(3*Math.PI/4,0,0,1);
			this.triangleSmallLeft.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(Math.sqrt(3)+Math.sqrt(2)/4,-Math.sqrt(8)/2-Math.sqrt(2)/4-Math.sqrt(8)/2,0);
			this.scene.rotate(3*Math.PI/4,0,0,1);
			this.triangleSmallRight.display();
			this.scene.popMatrix();

		}



}
