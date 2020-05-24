class MyCylinder extends CGFobject {

  constructor(scene, slices) {
    super(scene);
    this.longDivs = slices;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];


    var ang=0;
    var deltaAng = 2*Math.PI/this.longDivs;
    for (let i=0;  i<=this.longDivs;  i++, ang+=deltaAng ) {

          var x = Math.cos(ang);
          var z = Math.sin(ang);

          this.vertices.push(x, 0, z);
          this.vertices.push(x, 1, z);

          var normal = [x, 0, z];
          // Calculate the length of the vector
          var normalSize = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
          // Dividing each element by the length will result in a  unit normal vector.
          normal[0] = normal[0] / normalSize;
          normal[1] = normal[1] / normalSize;
          normal[2] = normal[2] / normalSize;

           this.normals.push(normal[0] ,normal[1] , normal[2]);

           var normal = [x, 1, z];
           // Calculate the length of the vector
           var normalSize = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
           // Dividing each element by the length will result in a  unit normal vector.
           normal[0] = normal[0] / normalSize;
           normal[1] = normal[1] / normalSize;
           normal[2] = normal[2] / normalSize;

           this.normals.push(normal[0] ,normal[1] , normal[2]);

          if (i < this.longDivs) {
              //oustisde faces
               this.indices.push(2*i,(2*i+1),(2*i+3));
               this.indices.push(2*i,(2*i+3),(2*i+2));
             //inside faces
               this.indices.push(2*i,(2*i+3),(2*i+1));
               this.indices.push(2*i,(2*i+2),(2*i+3));
    }

              this.texCoords.push(1-i/this.longDivs,1,
                                  1-i/this.longDivs,0);


  }



    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();


  }


}
