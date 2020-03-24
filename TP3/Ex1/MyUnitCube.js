/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-0.5, -0.5,  0.5,	//0
			 0.5, -0.5,  0.5,	//1
			 0.5,  0.5,  0.5,	//2
			-0.5,  0.5,  0.5, //3
			-0.5, -0.5, -0.5, //4
			 0.5, -0.5, -0.5,	//5
			 0.5,  0.5, -0.5, //6
		  -0.5,  0.5, -0.5,  //7

			-0.5, -0.5,  0.5,	//0
			 0.5, -0.5,  0.5,	//1
			 0.5,  0.5,  0.5,	//2
			-0.5,  0.5,  0.5, //3
			-0.5, -0.5, -0.5, //4
			 0.5, -0.5, -0.5,	//5
			 0.5,  0.5, -0.5, //6
			-0.5,  0.5, -0.5,  //7

			-0.5, -0.5,  0.5,	//0
			 0.5, -0.5,  0.5,	//1
			 0.5,  0.5,  0.5,	//2
			-0.5,  0.5,  0.5, //3
			-0.5, -0.5, -0.5, //4
			 0.5, -0.5, -0.5,	//5
			 0.5,  0.5, -0.5, //6
			-0.5,  0.5, -0.5,  //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3, //frente
			1, 2, 3, //frente
			1, 5, 2, //face dta
			5, 6, 2, //face dta
			3, 2, 7, //topo
			2, 6, 7, //topo
			4, 7, 5, //tras
			7, 6, 5, //tras
			0, 3, 4, //face esq
			3, 7, 4, //face esq
			0, 4, 1, //base
			4, 5, 1,  //base






		];

		this.normals = [
			0,0,1,
		 	0,0,1,
		 	0,0,1,
		 	0,0,1,
		 	0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,

			-1,0,0,
		 	1,0,0,
		 	1,0,0,
		 	-1,0,0,
			-1,0,0,
		 	1,0,0,
		 	1,0,0,
		 	-1,0,0,

			0,-1,0,
		 	0,-1,0,
		 	0,1,0,
		 	0,1,0,
			0,-1,0,
		 	0,-1,0,
		 	0,1,0,
		 	0,1,0,


			 ];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	updateBuffers(complexity) {
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
