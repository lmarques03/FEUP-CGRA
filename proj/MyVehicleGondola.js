class MyVehicleGondola extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene) {
    super(scene);


    this.myCylinder=new MyCylinder(scene,32);
    this.myTopHalfSphere=new MyHalfSphere(scene,32,8);
    this.myBottompHalfSphere=new MyHalfSphere(scene,32,8);

    this.initBuffers();
  }

    display() {

  this.scene.pushMatrix();
  this.scene.scale(1,4,1);
  this.myCylinder.display();
  this.scene.popMatrix();


  this.scene.pushMatrix();
  this.scene.translate(0,4,0);
  this.scene.rotate(Math.PI/2,1,0,0);
  this.myTopHalfSphere.display();
  this.scene.popMatrix();


  this.scene.pushMatrix();
  this.scene.translate(0,0,0);
  this.scene.rotate(-Math.PI/2,1,0,0);
  this.myBottompHalfSphere.display();
  this.scene.popMatrix();

  }


}
