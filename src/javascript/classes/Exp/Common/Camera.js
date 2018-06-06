import Inrtia from 'inrtia'
import raf from 'raf'
import { Lethargy } from 'lethargy'
import { throttle } from 'lodash'

const lethargy = new Lethargy()
// const OrbitControls = require('three-orbit-controls-loader')
// OrbitControls(THREE)

class Camera {
    constructor(options) {
			Storage.CameraClasses[options.name] = this

			this.name = name
			this.lookAround = options.lookAround
			this.movmentRange = options.movementRange

			this.initInertia()
			this.initCamera()
      this.bind()
    }

    bind() {
			this.lookAround && window.addEventListener('mousemove', this.handleMouseMove, false)
		}

		unbind() {
			this.lookAround && window.removeEventListener('mousemove', this.handleMouseMove, false)
			this.lookAround && raf.remove(this.updateInertia)
		}

		initInertia() {
			const inrtiaOptions = {
				value: 0,
				friction: 10,
				precision: 5,
				perfectStop: true,
				interpolation: 'linear'
			}
			this.inrtia = {
				x: new Inrtia(inrtiaOptions),
				y: new Inrtia(inrtiaOptions)
			}
		}

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 90000)
			this.camera.position.set(0, 600, 3200)

			this.lookAround && raf.add(this.updateInertia)
		}

		updateMovementRange = (number, wait = 0) => {
			setTimeout(() => { this.movmentRange = number }, wait )
		}

		handleMouseMove = (event) => {
			const vect = new THREE.Vector2()

			const X = (window.innerWidth - event.clientX) / window.innerWidth
			const angleX = X - .5
			const Y = (window.innerHeight - event.clientY) / window.innerHeight
			const angleY = Y - .5

			vect.x = angleX * Math.PI * this.movmentRange
			vect.y = angleY * Math.PI * this.movmentRange

			this.inrtia.x.to(vect.x)
			this.inrtia.y.to(vect.y)
		}

		update () {
			this.camera.rotation.reorder('YXZ')
			this.camera.rotation.x = this.inrtia.y.value
			this.camera.rotation.y = this.inrtia.x.value
		}

		updateWithSpline () {
      if (!Storage.SplineClass.lookAtRotation) return
			this.camera.rotation.copy(Storage.SplineClass.lookAtRotation)
			this.camera.rotation.x += this.inrtia.y.value
			this.camera.rotation.y += this.inrtia.x.value
		}

		updateInertia = () => {
			if (!this.inrtia.x.stopped || !this.inrtia.y.stopped) {
				this.inrtia.y.update()
				this.inrtia.x.update()

				Storage.SplineClass && Storage.SplineClass.lookAtRotation ? this.updateWithSpline() : this.update()
			}
		}
}

export default Camera
