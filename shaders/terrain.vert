
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSamplerHeightMap;
varying vec3 verticalOffset;


void main() {
	verticalOffset = vec3(0.0, 0.0, 0.0);

	vTextureCoord = aTextureCoord;

	vec4 colorMap = texture2D(uSamplerHeightMap, aTextureCoord);
	verticalOffset.z = colorMap.b;

	gl_Position = uPMatrix* uMVMatrix * vec4(aVertexPosition + verticalOffset * 16.0, 1.0);
}
