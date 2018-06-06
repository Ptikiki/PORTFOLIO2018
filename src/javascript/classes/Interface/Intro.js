import anime from 'animejs'
import datas from '../../datas/Home.js'
import { map, delay, throttle } from 'lodash'

class Intro {
  constructor() {
    // this.init()
    // this.writeIntro()
    // this.hideIntro()
    setTimeout(() => { Storage.HomeClass.bind() }, 1500)
  }

  init = () => {
    this.introWrapper = document.querySelector('.introduction-wrapper')
    this.introContainer = document.querySelector('.introduction-container')
    this.text = this.introContainer.querySelector('.text')
  }

  bind = () => {
    this.introContainer.addEventListener('mousewheel', this.handleScroll, { passive: true })
  }

  unbind = () => {
    this.introContainer.removeEventListener('mousewheel', this.handleScroll, { passive: true })
  }

  writeIntro = () => {
    this.length = datas.introTexts.length - 1
    map(datas.introTexts, this.write)
  }

  write = (opt, index) => {
    delay(this.writeOne, opt[1], { text: opt[0], index });
  }

  writeOne = (opt) => {
    anime({
      targets: this.text,
      opacity: 0,
      duration: 300,
      easing: 'easeInQuad',
      complete: () => {
        this.text.innerHTML = opt.text
        anime({
          targets: this.text,
          opacity: 1,
          duration: 300,
          delay: 50,
          easing: 'easeOutQuad',
        })
      }
    })
    if (opt.index === this.length) delay(this.enableScroll, 2000);
  }

  enableScroll = () => {
    // opacity of scroll arrow
    this.bind()
  }

  handleScroll = throttle(() => {
    this.hideIntro()
    this.unbind()
  }, 300, {leading: true, trailing: false})

  hideIntro = () => {
    this.introWrapper.classList.add('is-hide')
    setTimeout(() => { Storage.HomeClass.bind() }, 1500)
  }
}

export default Intro
