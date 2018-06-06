import BlurVert from 'glsl/Displacement.vert'
import BlurFrag from 'glsl/Displacement.frag'

THREE.Displacement = {
	uniforms: {
		tDiffuse: { type: "t", value: null },
		u_time: { type: 'f', value: 0 },
		u_fade: { type: 'f', value: 0 },
		u_ratio: { type: 'f', value: 0. },
		u_resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
		u_textureResolution: { type: "v2", value: new THREE.Vector2(1366., 768.) },
		videoTexture: {
			type : 't',
			value: null
		}
	},
	vertexShader: BlurVert,
	fragmentShader: BlurFrag
};
