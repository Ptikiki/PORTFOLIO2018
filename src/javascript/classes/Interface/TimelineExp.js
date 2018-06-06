import Inrtia from 'inrtia'
import raf from 'raf'
import anime from 'animejs'

import datas from '../../datas/Experience1.js'

class TimelineExp {
    constructor(options) {
			Storage.TimelineExpClass = this
			this.state = options

      this.beginings = this.getBeginings()
      this.splinesInChapters = this.getSplinesInChapters()
      this.ends = this.getEnds()
      this.totalChapters = datas.timelineIndicators.length
      this.splineIndex = 0
      this.chapterIndex = 0

      this.dots =[]

      this.initObjects()
      this.initInertia()
      this.init()
      this.bind()

      this.createDots()
    }

    bind = () => {
      raf.add(this.updateInertia)
    }

    unbind = () => {
      raf.remove(this.updateInertia)
    }

    init = () => {
      this.timelineWrapper = document.querySelector('.timeline-wrapper')
      this.timeline = this.timelineWrapper.querySelector('.timeline')
      this.time = this.timelineWrapper.querySelector('.current-time')
      this.texts = this.timelineWrapper.querySelector('.texts')
      this.textNumber = this.timelineWrapper.querySelector('.texts .number')
      this.textName = this.timelineWrapper.querySelector('.texts .name')

      setTimeout(this.showTimeline, 5000)
      setTimeout(this.updateText, 5600)
      setTimeout(this.showText, 5650)
    }

    initInertia() {
			const inrtiaOptions = {
				value: 0,
				friction: 20,
				precision: 5,
				perfectStop: true,
				interpolation: 'linear'
			}
			this.inrtia = {
				height: new Inrtia(inrtiaOptions)
			}
		}

    initObjects() {
			this.timelineObj = {
				stateSave: 0,
        state: 0
			}
		}

    getBeginings = () => {
      let tab = []
      let actual = 0
       datas.timelineIndicators.forEach((chapter, index) => {
         tab.push(actual)
         actual+= chapter[2]
       })
       return tab
    }

    getSplinesInChapters = () => {
      let tab = []
       datas.timelineIndicators.forEach((chapter) => {
         tab.push(chapter[2])
       })
       return tab
    }

    getEnds = () => {
      let tab = []
      this.beginings.forEach((number, index) => {
        const num = number + this.splinesInChapters[index] - 1
        tab.push(num)
      })
      return tab
    }

    check = (state, SplineIndex) => {
      let ratio = ( 1 / this.totalChapters ) / this.splinesInChapters[this.chapterIndex]

      if (this.splineIndex !== SplineIndex ) {
        this.splineIndex = SplineIndex
        this.timelineObj.stateSave += ratio

        if (this.beginings.includes(SplineIndex)) this.updateChapter()
        ratio = ( 1 / this.totalChapters ) / this.splinesInChapters[this.chapterIndex]
      }

      const time = this.timelineObj.stateSave + state * ratio
      this.timelineObj.state = Math.max(Math.min(time, 1), 0)

      if (state < .88) {
        this.inrtia.height.to(this.timelineObj.state)
        if (state > .35) this.resetCursor()
        return
      }

      if (this.ends.includes(SplineIndex)) this.transformCursor(ratio)
    }

    transformCursor = (ratio) => {
      if (this.cursorTransformed) return
      this.cursorTransformed = true
      this.time.classList.add('is-round')
      this.inrtia.height.to(this.timelineObj.stateSave + ratio)
      this.hideText()
      setTimeout(() => { this.updateDots(this.chapterIndex) }, 1000)
    }

    resetCursor = () => {
      if (!this.cursorTransformed) return
      this.cursorTransformed = false
      this.time.classList.remove('is-round')
      this.showText()
    }

    updateChapter = () => {
      this.chapterIndex++
      this.updateText()
    }

    updateInertia = () => {
      if (!this.inrtia.height.stopped) {
				this.inrtia.height.update()
        this.time.style.height = this.inrtia.height.value * 100 + '%'
			}
    }

    createDots = () => {
      const height = this.timeline.getBoundingClientRect().height
      for (let i = 0; i < this.totalChapters; i++) {
        const dot = document.createElement('div')
        dot.classList.add('timeline-dot')
        this.timeline.appendChild(dot)
        dot.style.transform = 'translateY(' + height / this.totalChapters * (i + 1) + 'px) translateX(-50%)'
        this.dots.push(dot)
      }
    }

    updateDots = (index) => {
      this.dots[index].classList.add('is-passed')
    }

    hideText = () => {
      this.texts.classList.remove('is-visible')
    }

    showText = () => {
      this.texts.classList.add('is-visible')
    }

    updateText = () => {
      this.textNumber.innerHTML = datas.timelineIndicators[this.chapterIndex][0]
      this.textName.innerHTML = datas.timelineIndicators[this.chapterIndex][1]
    }

    showTimeline = () => {
      this.timelineWrapper.classList.add('is-active')
      setTimeout(() => { 
        this.timelineWrapper.classList.add('not-hidden')
        this.showText()
      }, 500)
    }

    hideTimeline = () => {
      this.hideText()
      this.timelineWrapper.classList.remove('not-hidden')
      setTimeout(() => { this.timelineWrapper.classList.remove('is-active') }, 500)
    }
}

export default TimelineExp
