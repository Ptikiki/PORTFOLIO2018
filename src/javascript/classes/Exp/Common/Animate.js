import anime from 'animejs'
import { map, delay } from 'lodash'

class Animate {
    constructor(options) {
			Storage.AnimateClass = this
			this.state = options
      this.cb
    }

		animateAtFirstPoint = (pointsArray, rotationsArray, duration, cb) => {
      if (Storage.SplineClass) Storage.SplineClass.unbind()

      this.cb = cb
			this.state.relatedCamera.camera.rotation.set(0, 0, 0)
			const length = pointsArray.length - 1
			map(pointsArray, this.goToPoint(length, rotationsArray, duration))
		}

		goToPoint = (length, rotationsArray, duration) => (point, index) => {
  		delay(this.goToPointAfterDelay, duration*index-100, { duration: duration, point: point, index: index, length: length, rotation: rotationsArray[index] });
		}

  	goToPointAfterDelay = (obj) => {
  		anime.remove(this.state.relatedCamera.camera.rotation)
  		anime.remove(this.state.relatedCamera.camera.position)

      const easing = obj.index === obj.length ? 'easeInOutQuad' : 'linear'

  		if ( obj.rotation ) {
    		anime({
  				targets: this.state.relatedCamera.camera.rotation,
  				x: [this.state.relatedCamera.camera.rotation.x, obj.rotation.x],
  				y: [this.state.relatedCamera.camera.rotation.y, obj.rotation.y],
  				z: [this.state.relatedCamera.camera.rotation.z, obj.rotation.z],
  				duration: obj.duration,
  				easing
  			})
  		}

	  	anime({
    		targets: this.state.relatedCamera.camera.position,
    		x: obj.point.x,
    		y: obj.point.y,
    		z: obj.point.z,
    		duration: obj.duration,
    		easing,
    		complete: () => {
    			if ( obj.index === obj.length ) {
    				this.cb && this.cb()
            this.cb = null
    			}
    		}
  		})
		}

}

export default Animate
