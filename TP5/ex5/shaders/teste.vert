#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;
varying float varSlope;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
void main() {
  vTextureCoord = aTextureCoord;

  float x = aTextureCoord.x;
  float y = aTextureCoord.y;

  float h = cos( timeFactor + x * 10.0 );
  h += cos( x * 3.0 - timeFactor * 0.1751 );
  y += h * x * 0.2;

  float x2 = x - 0.001;
  float h2 = cos( timeFactor + x2 * 10.0 );
  h2 += cos( x2 * 3.0 - timeFactor * 0.1751 );
  varSlope = h - h2;

  //gl_Position =  uPMatrix * uMVMatrix *vec4( 2.0 * x - 1.0, 0.5 - y, 0.0, 1.0 );
  gl_Position =  uPMatrix * uMVMatrix *vec4( x, 0.5 - y, 0.0, 1.0 );
}
