#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;

uniform float nSuppliesDelivered;

void main() {

  float temp = float( nSuppliesDelivered)/5.0;
	float y=vTextureCoord.x;


  	if(vTextureCoord.x<1.0*temp)
  		gl_FragColor = vec4(cos(y),sin(y),0.0,1.0);
      else
        gl_FragColor =vec4(0.5,0.5,0.5,1.0);


}
