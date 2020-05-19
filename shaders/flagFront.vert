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

  float x = aTextureCoord.x;
  float y = aTextureCoord.y;


  float h = cos( timeFactor + x * 10.0 );
  y += h * x * 0.2;

  float x2 = x - 0.001;
  float h2 = cos( timeFactor + x2 * 10.0 );
  varSlope = h - h2;



gl_Position =  uPMatrix * uMVMatrix *vec4( aVertexPosition.x + offset.x -0.2 , aVertexPosition.y + offset.y,aVertexPosition.z + offset.z+h*0.5*x, 1.0 );
}
