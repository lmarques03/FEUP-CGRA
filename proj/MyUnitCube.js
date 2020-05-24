
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		this.initMaterials();

	}
	initBuffers() {
		 this.vertices = [
			      // Front Face
			 			-0.5, -0.5,  0.5,
	           0.5, -0.5,  0.5,
	           0.5,  0.5,  0.5,
	          -0.5,  0.5,  0.5,

	          // Back face
	          -0.5, -0.5, -0.5,
	          -0.5,  0.5, -0.5,
	           0.5,  0.5, -0.5,
	           0.5, -0.5, -0.5,

						 // Top face
            -0.5,  0.5, -0.5,
	          -0.5,  0.5,  0.5,
	           0.5,  0.5,  0.5,
	           0.5,  0.5, -0.5,

	          // Bottom face
	          -0.5, -0.5, -0.5,
	           0.5, -0.5, -0.5,
	           0.5, -0.5,  0.5,
	          -0.5, -0.5,  0.5,

	          // Right face
	           0.5, -0.5, -0.5,
	           0.5,  0.5, -0.5,
	           0.5,  0.5,  0.5,
	           0.5, -0.5,  0.5,

	          // Left face
	          -0.5, -0.5, -0.5,
	          -0.5, -0.5,  0.5,
	          -0.5,  0.5,  0.5,
	          -0.5,  0.5, -0.5
		];


		this.normals = ([
            // Front face
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            // Back face
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            // Top face
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,

						// Bottom face
						0, 1, 0,
						0, 1, 0,
						0, 1, 0,
						0, 1, 0,

            // Right face
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,

            // Left face
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0
        ]);


				this.indices = [
									// 0,  1,  2,      0,  2,  3,    // front
				          // 4,  5,  6,      4,  6,  7,    // back
									 6,  5,  4,      7,  6,  4,    // inside back

				          // 8,  9,  10,     8,  10, 11,   // top
				           //12, 13, 14,     12, 14, 15,   // bottom
									 14, 13, 12,     15, 14, 12,   // inside bottom

				           //16, 17, 18,     16, 18, 19,   // right
				           //20, 21, 22,     20, 22, 23,    // left
									 22, 21, 20,     23, 22, 20    // inside left
						];

							this.texCoords =([

					      			// Front face
											3/4, 2/3,
											3/4, 1/3,
											1.0, 1/3,
											1.0, 2/3,

											// Back face
											1/4, 2/3,
											1/4, 1/3,
											2/4, 1/3,
											2/4, 2/3,

											// Top face
											1.0, 2/3,
											3/4, 2/3,
											3/4, 2/3,
											3/4, 1/3,

											// Bottom face
											1/4, 2/3,
											2/4, 2/3,
											2/4, 1.0,
											1/4, 1.0,

											// Right face
											3/4, 2/3,
											3/4, 1/3,
											1.0, 1/3,
											1.0, 1/3,

											// Left face
											1/4, 2/3,
											0.0, 2/3,
											0.0, 1/3,
											1/4, 1/3,



					        ]);



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	initMaterials() {

		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);
		this.appearance.loadTexture( "./images/cubemap.png");
		this.appearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');


			}



}
