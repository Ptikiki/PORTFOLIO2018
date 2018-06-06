import anime from 'animejs'
import { throttle } from 'lodash'

import datas from '../../../../datas/Experience1.js'

class FrontalCity {
	constructor(options) {
		this.state = options
		this.nextStepLaunched = false
		this.windowPassed = false
	}

	checkRaycaster = (raycaster) => {
		const windowLeft = this.state.objectsGroup.children[1].children
		const windowRight = this.state.objectsGroup.children[2].children
		const door = this.state.objectsGroup.children[3].children

		let intersectsDoor = raycaster.intersectObjects(door, false)
		let intersectsWindowLeft = raycaster.intersectObjects(windowLeft, false)
		let intersectsWindowRight = raycaster.intersectObjects(windowRight, false)

		if (this.windowPassed === true && intersectsDoor[0] && intersectsDoor[0].distance < 2500 && intersectsDoor[0].object.name.includes('porte')) {
			this.openAnimation(intersectsDoor[0].object, -Math.PI/4 * 3)
			this.launchNextStep()
		}

		if (intersectsWindowLeft[0] && intersectsWindowLeft[0].distance < 2500 && intersectsWindowLeft[0].object.name.includes('droite')) {
			this.openAnimation(intersectsWindowLeft[0].object, -Math.PI/4 * 3)
		}
		else if (intersectsWindowRight[0] && intersectsWindowRight[0].distance < 2500 && intersectsWindowRight[0].object.name.includes('gauche')) {

			this.openAnimation(intersectsWindowRight[0].object, Math.PI/4 * 3)
		}

		if (intersectsDoor[0] || intersectsWindowLeft[0] || intersectsWindowRight[0]) {
			Storage.InterfaceClass.cursor.reveal()
		} else {
			Storage.InterfaceClass.cursor.reset()
		}
	}

	launchNextStep = () => {
		if (this.nextStepLaunched) return
		this.nextStepLaunched = true
		setTimeout(() => {
			Storage.Chapitre1Class.step++
			Storage.Chapitre1Class.state.cbAfterInteraction()
			Storage.InterfaceClass.cursor.reset()
		}, 2000)
		setTimeout(() => {
			Storage.InterfaceClass.title.animeTitle(datas.chaptersTitle[0])
		}, 5000)
	}

	openAnimation = throttle((object, rotationValue) => {
		object.name.includes('droite') || object.name.includes('gauche') ? this.windowPassed = true : ''

		anime.remove(object.rotation)
		anime({
	      targets: object.rotation,
	      y: rotationValue,
	      duration: 3000,
				easing: 'easeOutQuad',
				complete: this.closeAnimation(object)
	    })
	}, 400, { leading: true, trailing: false })

	closeAnimation = (object) => () => {
		anime.remove(object.rotation)
		anime({
      targets: object.rotation,
      y: 0,
			duration: 2000,
			delay: 2000,
			easing: 'easeInQuad'
		})
	}
}

export default FrontalCity
