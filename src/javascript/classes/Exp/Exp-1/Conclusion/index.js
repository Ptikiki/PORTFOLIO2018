import ObjectsLoader from './ObjectsLoader'
import anime from 'animejs'

class Conclusion {
    constructor(options) {
    Storage.ConclusionClass = this
    this.state = options

    this.modelsGroup

    this.loadChapter()
    }

  loadChapter = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      this.modelsGroup = response
    })
    this.loader.loadLights().then((response) => {
      this.lightsGroup = response
    })
  }

  init = () => {
    this.displayChapterObjects()

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
    this.state.relatedBox.add(this.lightsGroup.children[2])
    Storage.SceneClasses.exp1.scene.add(this.lightsGroup.children[2])

    console.log("LIGHTS", this.lightsGroup)
  }

  conclusionEnding = () => {
    setTimeout(() => { this.launchLightOne() }, 1500)
    setTimeout(() => { this.launchLightTwo() }, 5000)
  }

  launchLightOne = () => {
    console.log("light one")
  }

  launchLightTwo = () => {
    console.log("light two")
  }
 
}

export default Conclusion
