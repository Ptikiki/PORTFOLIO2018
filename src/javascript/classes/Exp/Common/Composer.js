import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import anime from 'animejs'
import { debounce } from 'lodash'

import '../../../../vendors/DisplacementShader'

class Composer {
    constructor(options) {
      Storage.ComposerClass = this
      this.isActive = false

      this.bind()
      this.initEffectComposer()
    }

    bind = () => {
      window.addEventListener('resize', this.resize)
    }

    initEffectComposer = () => {
      this.composer = new EffectComposer(Storage.RendererClass.renderer)
      this.composer.addPass(new RenderPass(Storage.SceneClasses.exp1.scene, Storage.CameraClasses.exp1.camera))

      // Add shaders
      const displacement = new ShaderPass(THREE.Displacement)
      this.composer.addPass(displacement)

      // And draw to the screen
      const copyPass = new ShaderPass(CopyShader)
      copyPass.renderToScreen = true
      this.composer.addPass(copyPass)
    }

    renderComposer = () => {
      if(this.composer.passes[1]) this.composer.passes[1].uniforms.u_time.value += .02
      this.composer.render()
    }

    activate = (bool) => {
      this.isActive = true
      anime.remove(this.composer.passes[1].uniforms.u_ratio)
      anime.remove(this.composer.passes[1].uniforms.u_fade)
      anime({
        targets: this.composer.passes[1].uniforms.u_ratio,
        value: [0.05],
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          anime({
            targets: this.composer.passes[1].uniforms.u_ratio,
            value: 0.,
            duration: 500,
            easing: 'easeOutQuad'
          })
        }
      })
      anime({
        targets: this.composer.passes[1].uniforms.u_fade,
        value: 1.,
        duration: 500,
        delay: 300,
        easing: 'easeOutQuad',
      })
    }

    unactivate = () => {
      anime.remove(this.composer.passes[1].uniforms.u_ratio)
      anime.remove(this.composer.passes[1].uniforms.u_fade)
      anime({
        targets: this.composer.passes[1].uniforms.u_ratio,
        value: [0.05],
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          anime({
            targets: this.composer.passes[1].uniforms.u_ratio,
            value: 0.,
            duration: 500,
            easing: 'easeOutQuad',
            complete: () => { this.isActive = false }
          })
        }
      })
      anime({
        targets: this.composer.passes[1].uniforms.u_fade,
        value: 0.,
        duration: 500,
        easing: 'easeOutQuad',
      })
    }

    effectBetweenCarousel = (index) => {
      this.isActive = true
      anime.remove(this.composer.passes[1].uniforms.u_ratio)
      anime({
        targets: this.composer.passes[1].uniforms.u_ratio,
        value: [0.2],
        duration: 400,
        easing: 'easeOutQuad',
        complete: () => {
          anime({
            targets: this.composer.passes[1].uniforms.u_ratio,
            value: 0.,
            duration: 500,
            delay: 100,
            easing: 'easeOutQuad',
            complete: () => { this.isActive = false }
          })
        }
      })
      anime({
        targets: this.composer.passes[1].uniforms.u_fade,
        value: 1.,
        duration: 400,
        easing: 'easeOutQuad',
        complete: () => {
          this.composer.passes[0] = new RenderPass(Storage.SceneClasses['exp'+index].scene, Storage.CameraClasses['exp'+index].camera)
          anime({
            targets: this.composer.passes[1].uniforms.u_fade,
            value: 0.,
            duration: 500,
            delay: 100,
            easing: 'easeOutQuad'
          })
        }
      })
    }

    resize = debounce(() => {
  		this.composer.passes[1].uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
  	}, 200, { leading: true, trailing: true })
}

// à mettre juste après l'appel au shader THREE.Displacement'
// if (module.hot) {
//   module.hot.accept('glsl/Hblur.frag', () => {
//     frag = require('glsl/HBlur.frag')
//     displacement.material.fragmentShader = frag
//     displacement.material.needsUpdate = true
//   })
// }

export default Composer
