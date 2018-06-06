import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import TweenLite from 'gsap'

class Renderer {
  constructor(options) {
    Storage.RendererClass = this
    this.container = options.container

    this.renderer = new THREE.WebGLRenderer({ antialias : true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.renderer.setClearColor( 0xfcfcfc, 1)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.container.appendChild( this.renderer.domElement )
    this.renderer.setViewport( 0, 0, window.innerWidth , window.innerHeight )

    this.bind()
  }

  bind() {
    window.addEventListener('resize', this.onWindowResize, false)
  }

  onWindowResize = () => {
    Storage.CameraClasses[Storage.expName].camera.aspect = window.innerWidth / window.innerHeight
    Storage.CameraClasses[Storage.expName].camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    if (Storage.ComposerClass && Storage.ComposerClass.isActive) {
      Storage.ComposerClass.renderComposer()
      return
    }

    if (Storage.SceneClasses['exp2'] && Storage.CameraClasses['exp2'] && Storage.SceneClasses['exp1'] && Storage.CameraClasses['exp1']) {
      this.renderer.render(Storage.SceneClasses[Storage.expName].scene, Storage.CameraClasses[Storage.expName].camera)
    }
  }
}

export default Renderer
