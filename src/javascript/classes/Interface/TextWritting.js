import anime from 'animejs'
import map from 'lodash/map'
import compact from 'lodash/compact'
import sample from 'lodash/sample'
import { throttle } from 'lodash'
import Inrtia from 'inrtia'
import raf from 'raf'

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this

		this.init()
    this.initInertia()
    this.bindScroll()

    this.state = {
      target: [],
      current: [],
      tabIndex: 0,
      moduloIndex: 0,
      interval: 30,
      pass: false,
      baseHeight: this.wrapper.getBoundingClientRect().height,
      infoHeight: 0,
      infoHSupToBaseH: false,
      transformSaved: 0,
      transform: 0,
      isWritting: false,
      queue: [],
      animeNewRow: 34,
      animeNewInfo: 46,
      marginTopOfFirstToRemove: 20
    }
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
      y: new Inrtia(inrtiaOptions)
    }
  }

	init = () => {
    this.panel = document.querySelector('.panelContainer')
    this.wrapper = this.panel.querySelector('.infoContainerWrapper')
		this.infoContainer = this.panel.querySelector('.infoContainer')
    this.titleContainer = this.panel.querySelector('.title')
	}

  bindScroll = () => {
    this.infoContainer.addEventListener('mousewheel', this.handleScroll, { passive: true })
    raf.add(this.updateInertia)
  }

  unbindScroll = () => {
    this.infoContainer.removeEventListener('mousewheel', this.handleScroll)
    raf.remove(this.updateInertia)
  }

  bindInterval () {
    this.interval = window.setInterval(this.updateIndex, this.state.interval)
  }

	unbindInterval = () => {
    clearInterval(this.interval)
    clearInterval(this.randomInterval)
    this.state.pass = false
    this.state.current = []
    this.state.current = []
	}

  addTitle = (text, duration) => {
    this.titleContainer.innerText = text
    setTimeout(() => { this.titleContainer.classList.add('is-visible') }, duration)
  }

  updateIndex = () => {
    const { current, target } = this.state

    const tabIndex = this.state.tabIndex + 1
    let moduloIndex = this.state.moduloIndex + 1

    current[tabIndex] = target[tabIndex] || ''

    if (tabIndex > target.length && target.length < current.length) {
      if (this.state.queue.length > 0) return this.manageQueue()
      this.state.isWritting = false
      this.unbindInterval()
      this.bindScroll()
      return
    }
    
    if (moduloIndex%24 === 23) this.state.pass = true
    if (this.state.pass && (current[tabIndex] === ' ' || current[tabIndex] === '') ) {
      moduloIndex = -1
      this.createRow()
      this.state.pass = false
    }

    this.writeSpan(current[tabIndex])
    this.state.tabIndex = tabIndex
    this.state.moduloIndex = moduloIndex
  }

  manageQueue = () => {
    const text = this.state.queue[0]
    this.state.queue.shift()
    this.writeInfo(text, true)
  }

	writeInfo = (text, writeQueue) => {
    if(this.state.isWritting && !writeQueue) return this.state.queue.push(text)

    this.state.isWritting = true
    this.unbindInterval()
    this.unbindScroll()
    this.resetToBottom()

    let current = compact(this.state.current)
    const target = text.text.split('')
    const length = target.length

    current = map(Array(length), (v, i) => current[i] || '')

    this.state.current = current
    this.state.target = target
    this.state.tabIndex = -1
    this.state.moduloIndex = -1

    this.newDiv = document.createElement('div')
    this.newDiv.classList.add('info')
    this.infoContainer.appendChild(this.newDiv)

    setTimeout(() => {
      this.createRow(true)
      this.bindInterval()
    }, 600)
	}

  createRow = (bool) => {
    this.actualRow = document.createElement('div')
    this.actualRow.classList.add('row')
    this.newDiv.appendChild(this.actualRow)
    bool ? this.animeContainer(this.state.animeNewInfo) : this.animeContainer(this.state.animeNewRow)
    setTimeout(() => { this.actualRow.classList.add('fill') }, 30)

    this.state.infoHeight = this.infoContainer.getBoundingClientRect().height

    if (!this.state.infoHSupToBaseH) {
      if (this.state.infoHeight > this.state.baseHeight - 20) this.state.infoHSupToBaseH = true
    }
  }

  writeSpan = (text) => {
    const newSpan = document.createElement('span')
    newSpan.innerText = text
    this.actualRow.appendChild(newSpan)
  }

  animeContainer = (Y) => {
    anime.remove(this.infoContainer)
    const formatedY = '-='+Y+'px'
    anime({
      targets: this.infoContainer,
      translateY: formatedY,
      duration: 500,
      easing: 'easeOutQuad'
    })

    this.state.transformSaved -= Y
    this.state.transform = this.state.transformSaved
    this.inrtia.y.value = this.state.transformSaved
  }

  resetToBottom = () => {
    anime.remove(this.infoContainer)
    anime({
      targets: this.infoContainer,
      translateY: this.state.transformSaved,
      duration: 500,
      easing: 'easeOutQuad'
    })
  }

  handleScroll = (event) =>  {
    if (!this.state.infoHSupToBaseH) return
    const evolution = event.deltaY < 0 ? 50 : -50
    const end = Math.max(Math.min(this.state.transform + evolution , -this.state.baseHeight -this.state.marginTopOfFirstToRemove), this.state.transformSaved)
		this.inrtia.y.to(end)
  }

  updateInertia = () => {
    if (!this.inrtia.y.stopped) {
      this.inrtia.y.update()
      this.state.transform = this.inrtia.y.value
      this.infoContainer.style.transform = 'translateY('+ this.inrtia.y.value +'px)'
    }
  }

  hidePanel = () => {
    this.panel.classList.add('is-hidden')
  }

  showPanel = () => {
    this.panel.classList.remove('is-hidden')
  }

}

export default TextWriting
