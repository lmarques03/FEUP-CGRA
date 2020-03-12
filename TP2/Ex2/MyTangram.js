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

		}



		  display(){
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
			this.triangleBig.display();
			this.scene.popMatrix()


			this.scene.pushMatrix();
			this.scene.translate(0,Math.sqrt(8)+Math.sqrt(8)/2-Math.sqrt(8)/2,0);
			this.scene.rotate(-3*Math.PI/4,0,0,1);
			this.triangleBig.display();
			this.scene.popMatrix()

			//pé esquerdo
			this.scene.pushMatrix();
			this.scene.translate(Math.sqrt(2)/4,-Math.sqrt(8)/2-Math.sqrt(2)/4-Math.sqrt(8)/2,0);
			this.scene.rotate(3*Math.PI/4,0,0,1);
			this.triangleSmall.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(Math.sqrt(3)+Math.sqrt(2)/4,-Math.sqrt(8)/2-Math.sqrt(2)/4-Math.sqrt(8)/2,0);
			this.scene.rotate(3*Math.PI/4,0,0,1);
			this.triangleSmall.display();
			this.scene.popMatrix();

		}



}
