#ifdef GL_ES
precision highp float;
#endif
attribute vec3 aVertexPosition;
uniform float timeFactor;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;
varying float varSlope;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float normScale;
void main() {
  vTextureCoord = aTextureCoord;
  vec3 offset=vec3(0.0,0.0,0.0);
  offset=aVertexNormal*normScale*0.1;

  float x = 1.0-aTextureCoord.x;
  float y = 1.0-aTextureCoord.y;


  float h = cos( timeFactor + x * 10.0 );
 
  varSlope = h;


gl_Position =  uPMatrix * uMVMatrix *vec4(  offset.x -aVertexPosition.x -0.2,
                        aVertexPosition.y + offset.y ,
                        aVertexPosition.z + offset.z+h*0.5*x, 1.0 );
}
