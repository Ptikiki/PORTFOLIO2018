import anime from 'animejs'
import Inrtia from 'inrtia'
import raf from 'raf'
import { forEach } from 'lodash'

import datas from '../../datas/Colors.js'

class Cursor {
  constructor() {
    this.cursorContainer = document.querySelector('.cursor-container')

    this.dot = this.cursorContainer.querySelector('.dot')
    this.ring = this.cursorContainer.querySelector('.ring')
    this.innerRing = this.ring.querySelector('.inner')
    this.boundingDot = this.dot.getBoundingClientRect()
    this.boundingRing = this.ring.getBoundingClientRect()

    this.initInertia()
    this.bind()
  }

  bind = () => {
    window.addEventListener('mousemove', this.handleMove, { passive: true })
    raf.add(this.updateInertia)
    setTimeout(() => { this.bindEls() }, 1000)
  }

  bindEls = () => {
    this.domElsConcerned = document.querySelectorAll('.cursor-reveal')
    this.domElsConcerned.forEach((el) => {
      el.addEventListener('mouseenter', this.handleMouseEnter, { passive: true })
      el.addEventListener('mouseleave', this.handleMouseLeave, { passive: true })
    })
  }

  unbind = () => {
    window.removeEventListener('mousemove', this.handleMove, { passive: true })
    this.domElsConcerned.forEach((el) => {
      el.removeEventListener('mouseenter', this.handleMouseEnter, { passive: true })
      el.removeEventListener('mouseleave', this.handleMouseLeave, { passive: true })
    })
    raf.remove(this.updateInertia)
  }

  initInertia() {
    const inrtiaOptions = {
      value: 0,
      friction: 10,
      precision: 5,
      perfectStop: true,
      interpolation: 'linear'
    }
    this.inrtia = {
      x: new Inrtia(inrtiaOptions),
      y: new Inrtia(inrtiaOptions)
    }
  }

  handleMove = (event) => {
    this.dot.style.left = (event.clientX - this.boundingDot.width / 2) + "px"
    this.dot.style.top = (event.clientY - this.boundingDot.height / 2) + "px"

    let val = 26
    if (this.cursorContainer.classList.contains('reveal')) val = 33
    else if (this.cursorContainer.classList.contains('target')) val = 13
    else if (this.cursorContainer.classList.contains('hold')) val = 10

    const x = event.clientX - val
    const y = event.clientY - val
    this.inrtia.x.to(x)
		this.inrtia.y.to(y)
  }

  updateInertia = () => {
    if (!this.inrtia.x.stopped || !this.inrtia.y.stopped) {
      this.inrtia.y.update()
      this.inrtia.x.update()
      this.ring.style.left = this.inrtia.x.value + "px"
      this.ring.style.top = this.inrtia.y.value + "px"
    }
  }

  handleMouseEnter = (event) => {
    this.reveal()
  }

  handleMouseLeave = (event) => {
    this.reset()
  }


  animateHold = (cb) => {
    anime({
      targets: this.dot,
      scale: 0.5,
      backgroundColor: [ {value: '#c8c8c8'}, { value: datas.hold[Storage.expName] } ],
      duration: 400,
      easing: 'easeInQuad',
      complete: () => {
        anime.remove(this.dot)
        anime({
          targets: this.dot,
          scale: 2,
          opacity: .4,
          duration: 300,
          easing: 'easeOutQuad',
          complete: cb
        })
      }
    })
  }

  animateUnhold = (cb) => {
    anime.remove(this.dot)
    anime({
      targets: this.dot,
      backgroundColor: [ { value: datas.hold[Storage.expName] }, {value: '#c8c8c8'} ],
      scale: 1,
      opacity: [.4, .7],
      easing: 'easeInOutQuad',
      duration: 400,
      complete: cb
    })
  }

  reveal = () => {
    this.cursorContainer.classList.add('reveal')
    this.innerRing.style.border = datas.reveal[Storage.expName]
  }

  target = () => {
    this.cursorContainer.classList.add('target')
    this.innerRing.style.border = datas.target[Storage.expName]
  }

  hold = () => {
    this.cursorContainer.classList.remove('reveal', 'target', 'hold')
    this.innerRing.style.removeProperty('border')
    this.cursorContainer.classList.add('hold')
    const x = this.inrtia.x.targetValue + 16
    const y = this.inrtia.y.targetValue + 16
    this.inrtia.x.to(x)
		this.inrtia.y.to(y)
  }

  reset = () => {
    if (this.cursorContainer.classList.contains('hold')) {
      const x = this.inrtia.x.targetValue - 16
      const y = this.inrtia.y.targetValue - 16
      this.inrtia.x.to(x)
      this.inrtia.y.to(y)
    }
    this.cursorContainer.classList.remove('reveal', 'target', 'hold')
    this.innerRing.style.removeProperty('border')
  }
}

export default Cursor
