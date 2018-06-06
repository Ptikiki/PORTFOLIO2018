uniform sampler2D tDiffuse; // ecran
uniform float u_time;
uniform float u_ratio;
uniform float u_fade;
uniform vec2 u_resolution;
uniform vec2 u_texResolution;
uniform vec2 u_textureResolution;
varying vec2 vUv;

uniform sampler2D videoTexture;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

void main() {

	// change displacement size
	float scale = 2.;
	vec2 noiseUv = vec2(vUv * scale);
	// fait en sorte de faire tourner l'effet
	noiseUv.x += cos(u_time);
	noiseUv.y += sin(u_time);

	float displacement = snoise2(noiseUv);

	// Fait que ça oscille
	//  et que l'animation se fait puis se stop un peu
	// float ratio = sin(u_time) * 0.05;
	float ratio = u_ratio; // no stop

	// 0.5 pour remapper l'espace et que
	// l'animation se fasse partout de la même façon
	vec2 uv = vec2(vUv);
	uv.x += (0.5 - displacement) * ratio * 2.;
	uv.y += (0.5 - displacement) * ratio * 2.;

	vec3 textureEcran = texture2D(tDiffuse, uv).rgb;

	// pour centrer en cover
	vec2 s = u_resolution; // Screen
  vec2 i = u_textureResolution; // Image
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 uvtest = uv * s / new + offset;
	vec3 texturePhoto = texture2D(videoTexture, uvtest).rgb;

	float fade = u_fade;
	// if (vUv.x < .05 || vUv.x > .95 || vUv.y < .05 || vUv.y > .95) {
	// 	fade = 0.;
	// }


	texturePhoto = mix(mix(textureEcran, texturePhoto, fade), vec3(displacement), 0.);

	gl_FragColor = vec4(texturePhoto, 1.);
}
