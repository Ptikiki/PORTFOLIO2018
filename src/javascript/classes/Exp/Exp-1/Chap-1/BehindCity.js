import anime from 'animejs'
import { throttle } from 'lodash'

import datas from '../../../../datas/Experience1.js'

class BehindCity {
	constructor(options) {
		this.state = options
		this.nextStepLaunched = false
		this.lights = []
		this.bugAnimated = false
	}

	checkRaycaster = (raycaster) => {
		const firstShutters1 = this.state.objectsGroup.children[5].children
		const firstShutters2 = this.state.objectsGroup.children[6].children
		const firstShuttersRight1 = this.state.objectsGroup.children[7].children
		const firstShuttersRight2 = this.state.objectsGroup.children[8].children
		const secondShuttersLeft1 = this.state.objectsGroup.children[9].children
		const secondShuttersLeft2 = this.state.objectsGroup.children[10].children
		const firstDoor = this.state.objectsGroup.children[11].children
		const secondDoor = this.state.objectsGroup.children[12].children
		const firstWindow1 = this.state.objectsGroup.children[13].children
		const firstWindow2 = this.state.objectsGroup.children[14].children
		const secondWindow = this.state.objectsGroup.children[15].children

		let intersectsFirstShutters1 = raycaster.intersectObjects(firstShutters1, false)
		let intersectsFirstShutters2 = raycaster.intersectObjects(firstShutters2, false)
		let intersectsFirstShuttersRight1 = raycaster.intersectObjects(firstShuttersRight1, false)
		let intersectsFirstShuttersRight2 = raycaster.intersectObjects(firstShuttersRight2, false)
		let intersectsSecondShuttersLeft1 = raycaster.intersectObjects(secondShuttersLeft1, false)
		let intersectsSecondShuttersLeft2 = raycaster.intersectObjects(secondShuttersLeft2, false)
		let intersectsFirstDoor = raycaster.intersectObjects(firstDoor, false)
		let intersectsSecondDoor = raycaster.intersectObjects(secondDoor, false)
		let intersectsFirstWindow1 = raycaster.intersectObjects(firstWindow1, false)
		let intersectsFirstWindow2 = raycaster.intersectObjects(firstWindow2, false)
		let intersectsSecondWindow = raycaster.intersectObjects(secondWindow, false)

		if (intersectsFirstShutters1[0] && intersectsFirstShutters1[0].distance < 1000) {
			this.openVerticalPosition(intersectsFirstShutters1[0].object, 50)
			this.animeLight(intersectsFirstShutters1[0].object.parent.children[1], 0.42)
		}
		else if (intersectsFirstShutters2[0] && intersectsFirstShutters2[0].distance < 1000) {
			this.openVerticalPosition(intersectsFirstShutters2[0].object, 50)
			this.animeLight(intersectsFirstShutters2[0].object.parent.children[1], 0.42)
			setTimeout(() => {
				this.flashlight(intersectsFirstShutters2[0].object.parent.children[1], 0.42)
			}, 2000)
		}
		else if (intersectsFirstShuttersRight1[0] && intersectsFirstShuttersRight1[0].distance < 1000) {
			this.openHorizontalPosition(intersectsFirstShuttersRight1[0].object, -15)
		}
		else if (intersectsFirstShuttersRight2[0] && intersectsFirstShuttersRight2[0].distance < 1000) {
			this.openHorizontalPosition(intersectsFirstShuttersRight2[0].object, -15)
		}
		else if (intersectsSecondShuttersLeft1[0] && intersectsSecondShuttersLeft1[0].distance < 1000) {
			this.openHorizontalPosition(intersectsSecondShuttersLeft1[0].object, 15)
		}
		else if (intersectsSecondShuttersLeft2[0] && intersectsSecondShuttersLeft2[0].distance < 1000) {
			this.openHorizontalPosition(intersectsSecondShuttersLeft2[0].object, 15)
		}
		else if (intersectsFirstDoor[0] && intersectsFirstDoor[0].distance < 1000) {
			this.openVerticalPosition(intersectsFirstDoor[0].object, 90)
			this.animeLight(intersectsFirstDoor[0].object.parent.children[1], 0.42)
			setTimeout(() => {
				this.flashlight(intersectsFirstDoor[0].object.parent.children[1], 0.42)
			}, 2000)
		}
		else if (intersectsSecondDoor[0] && intersectsSecondDoor[0].distance < 1000) {
			this.openVerticalPosition(intersectsSecondDoor[0].object, 70)
			this.animeLight(intersectsSecondDoor[0].object.parent.children[1], 0.42)
			setTimeout(() => {
				this.flashlight(intersectsSecondDoor[0].object.parent.children[1], 0.42)
			}, 2000)
		}
		else if (intersectsFirstWindow1[0] && intersectsFirstWindow1[0].distance < 1000) {
			this.openHorizontalRotation(intersectsFirstWindow1[0].object, -Math.PI/4 * 3)
		}
		else if (intersectsFirstWindow2[0] && intersectsFirstWindow2[0].distance < 1000) {
			if (this.fliesSoundLaunched != true) {
				this.fliesSoundLaunched = true
				Storage.SoundManagerClass.launchNoisySound("assets/sound/mouches.mp3")
			}

			this.openHorizontalRotation(intersectsFirstWindow2[0].object, -Math.PI/4 * 3)

			if (this.bugAnimated) return
			this.animateBugs(intersectsFirstWindow2[0].object.parent.children[1])
			setTimeout(() => { this.animateBugs(intersectsFirstWindow2[0].object.parent.children[2]) }, 250 )
			setTimeout(() => { this.animateBugs(intersectsFirstWindow2[0].object.parent.children[3]) }, 700 )
		}
		else if (intersectsSecondWindow[0] && intersectsSecondWindow[0].distance < 1000) {
			this.openHorizontalRotation(intersectsSecondWindow[0].object, -Math.PI/4 * 3)
		}

		if (Storage.ChaptersConclusionClass.binded) return

		if (intersectsFirstShutters1[0] || intersectsFirstShutters2[0] || intersectsFirstShuttersRight1[0] || intersectsFirstShuttersRight2[0]
			|| intersectsSecondShuttersLeft1[0] || intersectsSecondShuttersLeft2[0] || intersectsFirstDoor[0]
			|| intersectsSecondDoor[0] || intersectsFirstWindow1[0] || intersectsFirstWindow2[0] || intersectsSecondWindow[0] ) {
			Storage.InterfaceClass.cursor.reveal()
		} else {
			Storage.InterfaceClass.cursor.reset()
		}
	}

	animateBugs = (sphere) =>{
		this.bugAnimated = true
		anime({
			targets: sphere.position,
			x: [
				Math.random() * (80 - -10) + -10,
				Math.random() * (80 - -10) + -10,
				Math.random() * (80 - -10) + -10,
				Math.random() * (80 - -10) + -10,
				Math.random() * (80 - -10) + -10
			],
			y: [
				Math.random() * (40 - -50) + -50,
				Math.random() * (40 - -50) + -50,
				Math.random() * (40 - -50) + -50,
				Math.random() * (40 - -50) + -50,
				Math.random() * (40 - -50) + -50
			],
			z: [
				Math.random() * (80 - 0) + 0,
				Math.random() * (80 - 0) + 0,
				Math.random() * (80 - 0) + 0,
				Math.random() * (80 - 0) + 0,
				Math.random() * (80 - 0) + 0
			],
			duration: 2200,
			easing: 'linear',
			direction: 'alternate',
	  	loop: true
		})

	}

	animeLight = (light, intensity) => {
		if (light.intensity !== 0) return
		anime.remove(light)
		anime({
			targets: light,
			intensity,
			duration: 800,
			delay: 400,
			easing: 'easeOutQuad'
		})
	}

	flashlight = throttle((light, intensity) => {
		anime.remove(light)
		anime({
			targets: light,
			intensity: [0, intensity],
			duration: 300,
			easing: 'linear',
			loop: 5
		})
		Storage.SoundManagerClass.launchNoisySound("assets/sound/lumiere.mp3")
	}, 2000, { leading: true, trailing: false })

	openHorizontalRotation = throttle((object, rotationValue) => {
		if (object.rotation.y === rotationValue) return
		anime.remove(object.rotation)
		anime({
	      targets: object.rotation,
	      y: rotationValue,
	      duration: 800,
				easing: 'easeOutQuad'
	    })
	}, 800, { leading: true, trailing: false })

	openVerticalPosition = throttle((object, heighValue) => {
		if (object.position.y === heighValue) return
		anime.remove(object.position)
		anime({
	      targets: object.position,
	      y: heighValue,
	      duration: 800,
				easing: 'easeInOutQuad'
	    })
	}, 800, { leading: true, trailing: false })

	openHorizontalPosition = throttle((object, widthValue) => {
		if (object.position.z === widthValue) return
		anime.remove(object.position)
		anime({
	      targets: object.position,
	      z: widthValue,
	      duration: 800,
				easing: 'easeOutQuad'
	    })
	}, 800, { leading: true, trailing: false })
}

export default BehindCity
