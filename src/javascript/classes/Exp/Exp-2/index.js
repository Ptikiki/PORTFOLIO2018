import Scene from '../Common/Scene.js'
import Camera from '../Common/Camera.js'
import Spline from '../Common/Spline.js'

import Sphere from '../Common/Sphere.js'

import Ambiance from './Ambiance.js'

class Experience2 {
    constructor(options) {
			Storage.Experience2Class = this
			this.initPreview()
    }

    initPreview = () => {
      this.camera = new Camera({ name: 'exp2', lookAround: true, movementRange: .05  })
      this.scene = new Scene({ name: 'exp2'  })

			this.ambiance = new Ambiance()
      this.sphere = new Sphere({ relatedScene: this.scene.scene, color: 0x3B5D9C })
		}

		init = () => {
			this.spline = new Spline({
				spline: new THREE.SplineCurve3([
					new THREE.Vector3(0, 400, 1500),
          new THREE.Vector3(0, 400, 800),
					new THREE.Vector3( 700, 600, 0),
					new THREE.Vector3( -200, 400, 0),
					new THREE.Vector3( -800,  700, 1400),
					new THREE.Vector3( -650,  680, 1300)
				]),
        relatedCamera: this.camera,
        step: .12
			})
			this.spline.placeCameraAtFirstPoint()
			this.camera.updateMovementRange(.5, 1900)
		}
}

export default Experience2
