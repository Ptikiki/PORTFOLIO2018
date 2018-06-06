import anime from 'animejs'

import datas from '../../../datas/Experience1.js'

class SoundManager {
    constructor(options) {
			Storage.SoundManagerClass = this
			this.state = options

      let listener = new THREE.AudioListener()
      Storage.CameraClasses[Storage.expName].camera.add( listener )

      this.voiceOver = new THREE.Audio( listener )
      this.ambianceSound = new THREE.Audio( listener )
      this.noisySound = new THREE.Audio( listener )
      this.backgroundMusic = new THREE.Audio( listener )
      this.audioLoader = new THREE.AudioLoader();
    }

    launchVoiceOver = (track) => {
      this.createNewVoiceOver(track)
    }

    createNewVoiceOver = (track) => {
      this.audioLoader.load( track, (buffer) => {
      	this.voiceOver.setBuffer( buffer )
        this.voiceOver.play()
        anime({
          targets: this.voiceOver.gain.gain,
          value: [0, 1],
          duration: 600,
          easing: 'linear'
        })
      })
    }

    launchAmbianceSound = (track) => {
      this.createNewAmbiance(track)
    }

    createNewAmbiance = (track) => {
      this.audioLoader.load( track, (buffer) => {
      	this.ambianceSound.setBuffer( buffer )
        this.ambianceSound.play()
        anime({
          targets: this.ambianceSound.gain.gain,
          value: [0, .7],
          duration: 2000,
          easing: 'linear'
        })
      })
    }

    lowAmbiance = () => {
      anime({
        targets: this.ambianceSound.gain.gain,
        value: [.7, 0],
        duration: 600,
        easing: 'linear'
      })
    }

    upAmbiance = () => {
      anime({
        targets: this.ambianceSound.gain.gain,
        value: [0, .7],
        duration: 600,
        easing: 'linear'
      })
    }

    launchNoisySound = (track) => {
      this.createNoisySound(track)
    }

    createNoisySound = (track) => {
      this.audioLoader.load( track, (buffer) => {
      	this.noisySound.setBuffer( buffer )
        this.noisySound.play()
        anime({
          targets: this.noisySound.gain.gain,
          value: [0, .7],
          duration: 600,
          easing: 'linear'
        })
      })
    }

    launchBackgroundMusic = (track) => {
      this.createNewBackgroundMusic(track)
    }

    createNewBackgroundMusic = (track) => {
      this.audioLoader.load( track, (buffer) => {
      	this.backgroundMusic.setBuffer( buffer )
        this.backgroundMusic.play()
        anime({
          targets: this.backgroundMusic.gain.gain,
          value: [0, .8],
          duration: 600,
          easing: 'linear'
        })
      })
    }

    lowBackground = () => {
      anime({
        targets: this.backgroundMusic.gain.gain,
        value: [.8, 0],
        duration: 600,
        easing: 'linear'
      })
    }

    upBackground = () => {
      anime({
        targets: this.backgroundMusic.gain.gain,
        value: [0, .8],
        duration: 600,
        easing: 'linear'
      })
    }

}

export default SoundManager
