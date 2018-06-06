import ObjectsLoader from './ObjectsLoader'
import FrontalCity from './FrontalCity'
import BehindCity from './BehindCity'
//import HeightMap from './HeightMap'

class Chapitre1 {
    constructor(options) {
		Storage.Chapitre1Class = this
    this.state = options

    this.modelsGroup

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.step = 0

		this.loadChapter()
    }

	loadChapter = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      this.modelsGroup = response
      this.init()
    })
	}

  init = () => {
    this.displayChapterObjects()

    this.frontalCity = new FrontalCity({ objectsGroup: this.modelsGroup })
    this.behindCity = new BehindCity({ objectsGroup: this.modelsGroup })
  }

  initInteraction = () => {
    this.bind()
  }

  remove = () => {
    setTimeout(() => {
      this.state.relatedBox.remove(this.modelsGroup)
      this.unbind()
    }, 4000)
  }

  bind = () => {
    document.addEventListener('mousemove', this.onMouseMove, { passive: true })
  }

  unbind = () => {
    document.removeEventListener('mousemove', this.onMouseMove, { passive: true })
  }

  onMouseMove = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouse, this.state.relatedCamera)

    if (this.step === 0) this.frontalCity.checkRaycaster(this.raycaster)
    if (this.step === 1) this.behindCity.checkRaycaster(this.raycaster)
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

}

export default Chapitre1
