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

		this.material = new CGFappearance(this.scene);
        this.material.setSpecular(1, 1, 1, 1.0);
        this.material.setShininess(10.0);

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
			this.material.setAmbient(0.5, 248/255, 0.5, 1.0);
				this.material.setDiffuse(0, 248/255, 0, 1.0);
        this.material.apply();
		 	this.diamond.display();
		 	this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,-Math.sqrt(8)/2,0)
		 	this.scene.rotate(-Math.PI+Math.PI/4,0,0,1);
		 	this.scene.rotate(Math.PI/2,0,0,1);
			this.material.setAmbient(0.5, 72/255, 103/255, 1.0);
        this.material.setDiffuse(1, 155/255, 207/255, 1.0);
        this.material.apply();
		 	this.triangle.display();
			this.scene.popMatrix();


			this.scene.pushMatrix();
			this.scene.translate(0,Math.sqrt(8)/2-Math.sqrt(8)/2,0);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(Math.PI/4,0,0,1)
			this.material.setAmbient(0.5, 0.5, 0, 1.0);
        this.material.setDiffuse(255/255, 255/255, 0, 1);
        this.material.apply();
			this.parallelogram.display();
			this.scene.popMatrix();


			this.scene.pushMatrix();
			this.scene.translate(0,Math.sqrt(8)/2-Math.sqrt(8)/2,0);
			this.scene.rotate(Math.PI/4,0,0,1);
			this.material.setAmbient(0.5, 72/255, 0, 1.0);
        this.material.setDiffuse(1, 155/255, 0, 1.0);

        this.material.apply();
			this.triangleBig.display();
			this.scene.popMatrix()


			this.scene.pushMatrix();
			this.scene.translate(0,Math.sqrt(8)+Math.sqrt(8)/2-Math.sqrt(8)/2,0);
			this.scene.rotate(-3*Math.PI/4,0,0,1);
			this.material.setAmbient(0.5, 72/255, 0.5, 1.0);
				this.material.setDiffuse(0, 155/255, 1, 1.0);
        this.material.apply();
			this.triangleBig.display();
			this.scene.popMatrix()

			//pé esquerdo
			this.scene.pushMatrix();
			this.scene.translate(Math.sqrt(2)/4,-Math.sqrt(8)/2-Math.sqrt(2)/4-Math.sqrt(8)/2,0);
			this.scene.rotate(3*Math.PI/4,0,0,1);
			this.material.setAmbient(0.5, 13/255, 13/255, 1.0);
        this.material.setDiffuse(1, 27/255, 27/255, 1.0);

        this.material.apply();
			this.triangleSmall.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(Math.sqrt(3)+Math.sqrt(2)/4,-Math.sqrt(8)/2-Math.sqrt(2)/4-Math.sqrt(8)/2,0);
			this.scene.rotate(3*Math.PI/4,0,0,1);
			this.material.setAmbient(75/255, 40/255, 95/255, 1.0);
        this.material.setDiffuse(150/255, 80/255, 190/255, 1.0);
        this.material.apply();
			this.triangleSmall.display();
			this.scene.popMatrix();

		}

		updateBuffers(complexity) {

    }

		enableNormalViz() {
	        this.diamond.enableNormalViz();
	        this.parallelogram.enableNormalViz();
	        this.triangle.enableNormalViz();
	        this.triangleSmall.enableNormalViz();
	        this.triangleBig.enableNormalViz();
	    }

}
