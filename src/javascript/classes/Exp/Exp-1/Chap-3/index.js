import ObjectsLoader from './ObjectsLoader'
import InfosPeople from './InfosPeople'
import raf from 'raf'
import anime from 'animejs'


class Chapitre3 {
    constructor(options) {
    Storage.Chapitre3Class = this
    this.state = options
    this.step = 0

    this.modelsGroup
    this.peopleColor1 = new THREE.Color( 0xffffff )
    this.peopleColor2 = new THREE.Color( 0x000000 )

    this.frustum = new THREE.Frustum()
    this.cameraRotation = false
    this.animationOngoing = false

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.loadChapter()
    }

  loadChapter = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      this.modelsGroup = response[0]
      this.peopleInfosGroup = response[1]
    })
  }

  init = () => {
    this.displayChapterObjects()
    this.infos = new InfosPeople({ objectsGroup: this.modelsGroup, relatedBox: this.state.relatedBox })

    this.bind()
    this.bindInfos()
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  bind = () => {
    raf.add(this.animate)
  }

  bindInfos = () => {
    document.addEventListener('mousemove', this.onMouseMove, { passive: true })
  }

  unbind = () => {
    raf.remove(this.animate)
  }

  unbindInfos = () => {
    document.removeEventListener('mousemove', this.onMouseMove, { passive: true })
  }

  remove = () => {
    setTimeout(() => {
      this.state.relatedBox.remove(this.modelsGroup)
      this.unbind()
    }, 4000)
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  animate = () => {
    this.state.relatedCamera.camera.updateMatrix()
    this.state.relatedCamera.camera.updateMatrixWorld()
    this.frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( this.state.relatedCamera.camera.projectionMatrix, this.state.relatedCamera.camera.matrixWorldInverse ) )

    this.modelsGroup.traverse((o) => {
      if(o.name === "head") {
        let distance = this.state.relatedCamera.camera.position.z - o.getWorldPosition().z

        if (o.isAnimating === false) {
          o.isAnimating = true
          anime.remove(o.rotation)

          if ( this.frustum.containsPoint( o.getWorldPosition()) && distance < 500 ){
            anime({
              targets: o.rotation,
              x: [o.rotation.x, Math.PI/6],
              duration: 700,
              easing: 'linear',
              complete: () => { o.isAnimating = false }
            })
          }
          else {
            anime({
              targets: o.rotation,
              x: [o.rotation.x, 0],
              duration: 400,
              easing: 'linear',
              complete: () => {  o.isAnimating = false }
            })
          }
        }
      }
    })
  }

  onMouseMove = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouse, this.state.relatedCamera.camera)

    if (this.step === 0) this.infos.checkRaycaster(this.raycaster, this.peopleInfosGroup)
  }

  removePoeple = () => {
    this.unbindInfos()
    let test = 0
    this.peopleInfosGroup.children.forEach((el, index) => {
      if (index%2 === 0) test++
      setTimeout(() => {
        anime({
          targets: el.children[0].material,
          opacity: 0,
          duration: 1000,
          easing: 'easeOutQuart'
        })
      }, test * 1800)
    })
  }
}

export default Chapitre3
