




#ifdef GL_ES
precision highp float;
#endif


uniform sampler2D uSampler;
varying vec2 vTextureCoord;
uniform float varSlope;

void main() {
  vec4 color = texture2D( uSampler, vTextureCoord );
  if( varSlope > 0.0 ) {
    color = mix( color, vec4(0,0,0,1), varSlope * 50.0 );


  }
  if( varSlope < 0.0 ) {
    color = mix( color, vec4(1,1,1,1), abs(varSlope) * 50.0 );
  }
  gl_FragColor = color;
}
