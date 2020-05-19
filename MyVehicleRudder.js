class MyVehicleRudder extends CGFobject {
constructor(scene) {
  super(scene);
  this.initBuffers();

  this.myTriangleSmall=new MyTriangleSmall(scene);
  this.myQuad=new MyQuad(scene);


}

display() {


this.myTriangleSmall.display();
this.scene.pushMatrix();
this.scene.translate(0,-1,0);
this.scene.scale(2,2,2);
this.myQuad.display();
this.scene.popMatrix();

}
}
