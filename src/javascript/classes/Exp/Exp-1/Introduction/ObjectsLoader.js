const MTLLoader = require('three-mtl-loader')

class ObjectsLoader {
	constructor(options) {
		this.mtlLoader = new MTLLoader()
	  	this.objLoader = new THREE.OBJLoader()
	  	this.textureLoader = new THREE.TextureLoader()
		this.mtlLoader.manager = new THREE.LoadingManager()

		this.init()
	}

	init = () => {
	    this.group = new THREE.Group()

	    this.group.position.y = -790
	    this.group.position.z = -600
	}


	load = () => {

	    return new Promise((resolve, reject) => {
	    	this.loadDrapeaux().then((response)=> {
	    		this.loadTexte().then((response)=> {
	    			this.loadMissiles().then((response)=> {
	    				this.loadTexte2().then((response)=> {
	    					this.loadTank().then((response)=> {
	    						this.loadBatiment().then((response)=> {
									console.log('Introduction loaded')
									resolve(this.group)
		  						}).catch((error)=> { console.warn(error) })
		  					}).catch((error)=> { console.warn(error) })
		  				}).catch((error)=> { console.warn(error) })
		  			}).catch((error)=> { console.warn(error) })
		  		}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
	    })
	}

	loadDrapeaux = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/models/introduction/drapeaux.mtl', (drapeauxMatl) => {
				drapeauxMatl.preload()
				this.objLoader.setMaterials( drapeauxMatl )

				that.objLoader.load( 'assets/models/introduction/drapeaux.obj', function ( drapeaux ) {
					drapeaux.position.y = 500
					drapeaux.position.z = 2500
					drapeaux.scale.set(2, 2, 2)

					that.group.add( drapeaux )
					resolve()
				})
			})
		})
	}

	loadTexte = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/models/introduction/texte.mtl', (texteMatl) => {
				texteMatl.preload()
				this.objLoader.setMaterials( texteMatl )

				that.objLoader.load( 'assets/models/introduction/texte.obj', function ( texte ) {
					texte.position.y = 300
					texte.position.z = -1500
					texte.position.x = 800
					texte.scale.set(5, 5, 5)

					that.group.add( texte )
					resolve()
				})
			})
		})
	}

	loadMissiles = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/models/introduction/missiles.mtl', (missilesMatl) => {
				missilesMatl.preload()
				this.objLoader.setMaterials( missilesMatl )

				that.objLoader.load( 'assets/models/introduction/missiles.obj', function ( missiles ) {
					missiles.position.y = 250
					missiles.position.z = -1900
					missiles.position.x = 800
					missiles.scale.set(5, 5, 5)

					that.group.add( missiles )
					resolve()
				})
			})
		})
	}

	loadTexte2 = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/models/introduction/texte2.mtl', (texte2Matl) => {
				texte2Matl.preload()
				this.objLoader.setMaterials( texte2Matl )

				that.objLoader.load( 'assets/models/introduction/texte2.obj', function ( texte2 ) {
					texte2.position.y = 500
					texte2.position.z = -3500
					texte2.position.x = -300
					texte2.scale.set(5, 5, 5)

					that.group.add( texte2 )
					resolve()
				})
			})
		})
	}


	loadTank = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/models/introduction/tank.mtl', (tankMatl) => {
				tankMatl.preload()
				this.objLoader.setMaterials( tankMatl )

				that.objLoader.load( 'assets/models/introduction/tank.obj', function ( tank ) {
					tank.position.y = 150
					tank.position.z = -3500
					tank.position.x = -800
					tank.scale.set(5, 5, 5)

					that.group.add( tank )
					resolve()
				})
			})
		})
	}


	loadBatiment = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/models/introduction/batiment.mtl', (batimentMatl) => {
				batimentMatl.preload()
				this.objLoader.setMaterials( batimentMatl )

				that.objLoader.load( 'assets/models/introduction/batiment.obj', function ( batiment ) {
					batiment.position.y = 2500
					batiment.position.z = -5000
					batiment.position.x = -600
					batiment.scale.set(5, 5, 5)

					that.group.add( batiment )
					resolve()
				})
			})
		})
	}

}

export default ObjectsLoader
