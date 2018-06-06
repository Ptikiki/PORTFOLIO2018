import anime from 'animejs'
import raf from 'raf'
import { Lethargy } from 'lethargy'
import { throttle, map, delay } from 'lodash'

import SplineTimeManager from './SplineTimeManager.js'

const lethargy = new Lethargy()

class Spline {
    constructor(options) {
			Storage.SplineClass = this

			this.state = options

      if (Storage.SplineTimeManagerClass) Storage.SplineTimeManagerClass = null
      this.timeManager = new SplineTimeManager({ spline: this.state.spline })

			this.initObjects()
    }

    bind() {
			document.querySelector('canvas').addEventListener('mousewheel', this.handleScroll, { passive: true })
		}

		unbind() {
			document.querySelector('canvas').removeEventListener('mousewheel', this.handleScroll,  { passive: true })
		}

		initObjects() {
			this.cameraObj = {
				state: 0
			}
		}

		placeCameraAtFirstPoint = () => {
      this.unbind()
			const point = this.state.spline.points[0]
      console.log('test')
			anime({
				targets: this.state.relatedCamera.camera.position,
				x: point.x,
				y: point.y,
				z: point.z,
				duration: 2500,
				easing: 'easeInOutSine',
        complete: () => { this.bind() }
			})

			if (this.state.forceRotate) {
				anime({
					targets: this.state.relatedCamera.camera.rotation,
					y: 0,
					duration: 2000,
					easing: 'easeInOutQuad'
				})
			}
		}

		handleScroll = (event) => {
			if (lethargy.check(event) !== false) this.onRealScroll(event)
		}

		onRealScroll = throttle((event) => {
			const evolution = event.deltaY < 0 ? this.state.step : -this.state.step
			const end = Math.max(Math.min(this.cameraObj.state + evolution, 0.98), 0.01)
			this.animeSpline(this.cameraObj.state, end)
			this.timeManager.check(this.cameraObj.state, this.state.index)

      Storage.TimelineExpClass.check(this.cameraObj.state, this.state.index)
		}, 200, {leading: true, trailing: false})

		animeSpline(start, end) {
			anime.remove(this.cameraObj)
			this.anime = anime({
				targets: this.cameraObj,
				state: [start, end],
				duration: 1800,
				easing: 'easeOutSine',
				update: this.updateCameraPos
			})
		}

		updateStep = (step) => {
			this.state.step = step
		}

		updateCameraPos = () => {
			const state = this.cameraObj.state
			const point = this.state.spline.getPoint(state)

			this.state.relatedCamera.camera.position.copy(point)
			this.state.relatedCamera.camera.lookAt(this.state.spline.getPoint(this.cameraObj.state + 0.01))

			this.lookAtRotation = this.state.relatedCamera.camera.rotation.clone()
			this.lookAtRotation.reorder('YXZ')

			this.state.relatedCamera.updateWithSpline()
		}
}

export default Spline
