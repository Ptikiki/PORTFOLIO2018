const MTLLoader = require('three-mtl-loader')

let SHADOW_MAP_WIDTH = 1024, SHADOW_MAP_HEIGHT = 1024

class ObjectsLoader {
	constructor(options) {
		this.mtlLoader = new MTLLoader()
	  	this.objLoader = new THREE.OBJLoader()
	  	this.textureLoader = new THREE.TextureLoader()
		this.mtlLoader.manager = new THREE.LoadingManager()
		this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
	    this.vertex_loader.setResponseType('text')
	    this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
	    this.fragment_loader.setResponseType('text')

		this.init()
	}

	init = () => {
	    this.group = new THREE.Group()

	    this.group.position.y = -790
	    this.group.position.z = -300
	}

	createLight = (color) => {
		const light = new THREE.PointLight(color, 0, 500, 2)
		light.position.set(0, 0, 0)
		light.shadow.mapSize.width = SHADOW_MAP_WIDTH
    light.shadow.mapSize.height = SHADOW_MAP_HEIGHT
		light.shadow.camera.far = 1000

		// var sphereSize = 100;
		// var pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
		// Storage.SceneClasses.exp1.scene.add( pointLightHelper );

		return light
	}

	createBug = () => {
		var geometry = new THREE.SphereGeometry( 1, 32, 32 )
		var material = new THREE.MeshBasicMaterial( {color: 0x000000} )
		var sphere = new THREE.Mesh( geometry, material )
		sphere.position.z = 40
		sphere.position.x = 40

		return sphere
	}

	load = () => {
    return new Promise((resolve, reject) => {
    	this.loadFrontalCity().then((response)=> {
	    	this.loadWindowLeft().then((response)=> {
		    	this.loadWindowRight().then((response)=> {
			    	this.loadDoor().then((response)=> {
							this.loadRealCity().then((response)=> {
								this.loadFristShutters().then((response)=> {
									this.loadSecondShuttersRight().then((response)=> {
										this.loadSecondShuttersLeft().then((response)=> {
											this.loadFirstDoor().then((response)=> {
												this.loadSecondDoor().then((response)=> {
													this.loadFirstWindow().then((response)=> {
														this.loadSecondWindow().then((response)=> {
											  			this.loadShader("glsl/testVert.vert", "glsl/testFrag.frag").then((response)=> {
									    		    	console.log('Chapter 1 objects loaded')
									    		    	resolve(this.group)
										    			}).catch((error)=> { console.warn(error) })
														}).catch((error)=> { console.warn(error) })
													}).catch((error)=> { console.warn(error) })
												}).catch((error)=> { console.warn(error) })
											}).catch((error)=> { console.warn(error) })
										}).catch((error)=> { console.warn(error) })
									}).catch((error)=> { console.warn(error) })
								}).catch((error)=> { console.warn(error) })
							}).catch((error)=> { console.warn(error) })
				  	}).catch((error)=> { console.warn(error) })
			  	}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
	  	}).catch((error)=> { console.warn(error) })
    })
	}


	loadShader = (vertex_url, fragment_url) => {
		let that = this

		return new Promise((resolve, reject) => {
		    this.uniforms = THREE.UniformsUtils.merge([
	        THREE.ShaderLib.lambert.uniforms,
					{ diffuse: { value: new THREE.Color(0xf7f7f7) } },
	    		{ texture: { type: "t", value: THREE.ImageUtils.loadTexture( 'assets/shaders/heightmap/texture.jpg' ) } }
		    ]);
		    this.vertex_loader.load(vertex_url, function (vertex_text) {
	        that.fragment_loader.load(fragment_url, function (fragment_text) {
	          	that.loadHeightMap(vertex_text, fragment_text )
	        })
		    })
	  	 	resolve()
			})
    }

    loadHeightMap = (vertex, fragment) => {
    	return new Promise((resolve, reject) => {

			let geometry = new THREE.PlaneBufferGeometry(12000, 15500, 150, 150)

		    let material = new THREE.ShaderMaterial( {
		    	uniforms: Object.assign({u_amplitude:{ type: "f", value: 4. }, u_frequence:{ type: "f", value: 0.0005 } }, this.uniforms),
		        vertexShader: vertex,
		        fragmentShader: fragment,
		        lights: true,
		        fog: true,
		        side: THREE.BackSide
		    } )

		    material.transparent = true
		    material.uniforms.texture.value = THREE.ImageUtils.loadTexture( 'assets/shaders/heightmap/texture.jpg' )

		    let plane = new THREE.Mesh( geometry, material )

		    plane.position.y = 300
		    plane.position.z = 10500
				plane.rotation.x = Math.PI / 2

				plane.castShadow = true
				plane.receiveShadow = true

				this.group.add(plane)
				resolve()
			})
    }


	loadFrontalCity = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/fausse-ville/fausse-ville.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/fausse-ville/fausse-ville.obj', (object) => {
					object.position.x = 4000
					object.position.z = 1500
					object.scale.set( 5, 5, 2 )
					object.name = 'wall'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          resolve()
				})
			})
		})
	}

	loadWindowLeft = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/fausse-ville/fenetre-gauche.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/fausse-ville/fenetre-gauche.obj', (object) => {
					object.position.x = -800
					object.position.y = 450
					object.position.z = 2600
					object.scale.set( 5, 5, 5 )
					object.name = 'windowLeft'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          			resolve()
				})
			})
		})
	}

	loadWindowRight = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/fausse-ville/fenetre-droite.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/fausse-ville/fenetre-droite.obj', (object) => {
					object.position.x = 850
					object.position.y = 450
					object.position.z = 2600
					object.scale.set( 5, 5, 5 )
					object.name = 'windowRight'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          			resolve()
				})
			})
		})
	}

	loadDoor = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/fausse-ville/porte.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/fausse-ville/porte.obj', (object) => {
					object.position.x = -230
					object.position.y = 255
					object.position.z = 2550
					object.scale.set( 4.8, 5, 5 )
					object.name = 'door'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          resolve()
				})
			})
		})
	}

	loadRealCity = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/vraieville.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/vraieville.obj', (object) => {
					object.position.x = 1700
					object.position.z = 400
					object.scale.set( 2, 2, 2)
					object.name = 'realCity'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          resolve()
				})
			})
		})
	}

	loadFristShutters = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/interaction_volethaut.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/interaction_volethaut.obj', (object) => {

					for (let i = 0; i < 2; i++ ) {
						let obj = object.clone()
						obj.position.x = -405
						obj.position.y = 300
						if (i === 0 ) obj.position.z = 190
						else obj.position.z = 90
						obj.scale.set( 1, 1.8, 0.75)
						obj.name = 'firstShutters'
						obj.children[0].material.color = new THREE.Color(0xcccccc)

						let light
						if (i === 0 ) light = this.createLight(0xC40202)
						else light = this.createLight(0xffffff)
						obj.add(light)

						this.group.add(obj)
					}

					resolve()
				})
			})
		})
	}

	loadSecondShuttersRight = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/4.interaction_volet_droit.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/4.interaction_volet_droit.obj', (object) => {
					for (let i = 0; i < 2; i++ ) {
						let obj = object.clone()
						obj.position.x = -460
						obj.position.y = 242
						if (i === 0 ) obj.position.z = -1413
						else obj.position.z =  -1738
						obj.scale.set( 2, 1.8, 1.4)
						obj.name = 'firstShuttersRight'
						obj.children[0].material.color = new THREE.Color(0xcccccc)
						this.group.add(obj)
					}

					resolve()
				})
			})
		})
	}

	loadSecondShuttersLeft = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/4.interaction_volet_gauche.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/4.interaction_volet_gauche.obj', (object) => {

					for (let i = 0; i < 2; i++ ) {
						let obj = object.clone()
						obj.position.x = -460
						obj.position.y = 242
						if (i === 0 ) obj.position.z = -1387
						else obj.position.z =  -1712
						obj.scale.set( 2, 1.8, 1.4)
						obj.name = 'secondShuttersLeft'
						obj.children[0].material.color = new THREE.Color(0xcccccc)

						this.group.add(obj)
					}

					resolve()
				})
			})
		})
	}

	loadFirstDoor = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/1bis.interaction_porte.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/1bis.interaction_porte.obj', (object) => {
					object.position.x = 580
					object.position.y = 140
					object.position.z = 172
					object.scale.set( 2, 1.9, 1)
					object.children[0].material.color = new THREE.Color(0xcccccc)
					object.name = 'firstDoor'
					this.group.add(object)

					const light = this.createLight(0xC40202)
					object.add(light)

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					resolve()
				})
			})
		})
	}

	loadSecondDoor = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/5.interaction_porte.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/5.interaction_porte.obj', (object) => {
					object.position.x = -460
					object.position.y = 110
					object.position.z =  -2600
					object.scale.set( 2, 1.9, 1.8)
					object.children[0].material.color = new THREE.Color(0xcccccc)
					object.name = 'secondDoor'

					const light = this.createLight(0xC40202)
					object.add(light)

					this.group.add(object)
					resolve()
				})
			})
		})
	}

	loadFirstWindow = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/2bis.interaction_fenetre.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/2bis.interaction_fenetre.obj', (object) => {

					for (let i = 0; i < 2; i++ ) {
						let obj = object.clone()
						obj.position.x = 540
						obj.position.y = 240
						if (i === 0 ) obj.position.z = -1390
						else obj.position.z =  -1190
						obj.scale.set( 2, 2, 2.2)
						obj.name = 'firstWindow'
						obj.children[0].material.color = new THREE.Color(0xcccccc)

						if (i === 1) {
							const bug = this.createBug()
							obj.add(bug)
							const bug2 = this.createBug()
							obj.add(bug2)
							const bug3 = this.createBug()
							obj.add(bug3)
						}

						this.group.add(obj)
					}

					resolve()
				})
			})
		})
	}

	loadSecondWindow = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/5bis.interaction_fenetre.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/5bis.interaction_fenetre.obj', (object) => {

					object.position.x = 625
					object.position.y = 220
					object.position.z =  -3290
					object.scale.set( 2, 2, 2.2)
					object.name = 'secondWindow'
					object.children[0].material.color = new THREE.Color(0xcccccc)
					this.group.add(object)

					resolve()
				})
			})
		})
	}

	loadDeadMan = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/models/chapitre1/vrai-ville/dead.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				this.objLoader.load( 'assets/models/chapitre1/vrai-ville/dead.obj', (object) => {

					object.position.x = -490
					object.position.y = 10
					object.position.z =  -2250
					object.scale.set( 1.2, 1.2, 1.2)
					object.rotation.y = Math.PI * 1.5
					object.name = 'deadMan'
					object.children[0].material.color = new THREE.Color(0xcccccc)
					this.group.add(object)

					resolve()
				})
			})
		})
	}

}

export default ObjectsLoader
