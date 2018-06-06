import anime from 'animejs'
import { delay } from 'lodash'

class ChaptersConclusion {
    constructor(options) {
		Storage.ChaptersConclusionClass = this
    this.mediaType = 'photo'

		this.conclusion
    this.clicked = false
    this.binded = false
    this.allowBind = false

    this.conclusionIndicator = document.querySelector('.conclusion-indicator p')

    // to test
    // this.makePhotoTex('assets/01.jpg')
    // this.bindConclu()
  }

  makeVideoTex = (url) => {
    this.video = document.createElement( 'video' )
    this.video.autoplay = false
    this.video.loop = true
    this.video.src = url

    const texture = new THREE.VideoTexture(this.video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat

    Storage.ComposerClass.composer.passes[1].uniforms.videoTexture.value = texture
    setTimeout(() => {
      Storage.ComposerClass.composer.passes[1].uniforms.u_textureResolution.value = new THREE.Vector2(texture.image.videoWidth, texture.image.videoHeight)
    }, 500)
  }

  makePhotoTex = (url) => {
    const texture = new THREE.TextureLoader().load(url)
    Storage.ComposerClass.composer.passes[1].uniforms.videoTexture.value = texture
    this.video = null
  }

  updateMedia = (url, type) => {
    if (type !== this.mediaType) this.mediaType = type
    if (type === 'photo') this.makePhotoTex(url)
    else this.makeVideoTex(url)
  }

  playConclusion = () => {
    this.video && this.video.play()
    Storage.ComposerClass.activate()
  }

  stopConclusion = () => {
    this.video && this.video.pause()
    Storage.ComposerClass.unactivate()
  }

  indicateConclusion = () => {
    for (let i = 0; i < this.conclusionIndicator.children.length; i ++) {
      delay(this.writeSpan, i * 50, { span: this.conclusionIndicator.children[i] })
    }
    setTimeout(() => {
      for (let i = 0; i < this.conclusionIndicator.children.length; i ++) {
        delay(this.removeSpan, i * 50, { span: this.conclusionIndicator.children[i] })
      }
    }, 1500)
  }

  writeSpan = (opt) => {
    anime({
      targets: opt.span,
      translateY: ['100%', 0],
      duration: 500,
			easing: 'easeOutQuad'
    })
  }

  removeSpan = (opt) => {
    anime({
      targets: opt.span,
      translateY: '-100%',
      duration: 500,
			easing: 'easeOutQuad',
      complete: () => { opt.span.style.transform = 'translateY(100%)' }
    })
  }

  bindConclu = () => {
    this.binded = true
    document.addEventListener('mousedown', this.onMouseDown, false )
    document.addEventListener('mouseup', this.onMouseUp, false )
    Storage.InterfaceClass.cursor.hold()
    this.indicateConclusion()
  }

  unbindConclu = () => {
    document.removeEventListener('mousedown', this.onMouseDown, false )
    document.removeEventListener('mouseup', this.onMouseUp, false )
    Storage.InterfaceClass.cursor.reset()
    this.binded = false
  }

  onMouseDown = () => {
    if ( this.clicked === false ) {
      Storage.InterfaceClass.cursor.animateHold(this.afterHoldAnime)
      this.clicked = true
    }
  }

  onMouseUp = () => {
    if ( this.clicked === true ) {
      Storage.InterfaceClass.cursor.animateUnhold(this.afterUnholdAnime)
      this.clicked = false
    }
  }

  afterHoldAnime = () => {
    if ( this.clicked === true ) {
      this.playConclusion()
      Storage.InterfaceClass.timelineExp.hideTimeline()
      Storage.InterfaceClass.textWriting.hidePanel()
      Storage.InterfaceClass.subtitles.hideSubtitles()
      Storage.SoundManagerClass.lowAmbiance()
      Storage.SoundManagerClass.lowBackground()
    }
  }

  afterUnholdAnime = () => {
    if ( this.clicked === false ) {
      this.stopConclusion()
      setTimeout(() => {
        Storage.SoundManagerClass.upAmbiance()
        Storage.SoundManagerClass.upBackground()
        Storage.InterfaceClass.subtitles.showSubtitles()
        Storage.InterfaceClass.timelineExp.showTimeline()
        Storage.InterfaceClass.textWriting.showPanel()
      }, 800)
    }
  }
}

export default ChaptersConclusion
