import anime from 'animejs'
import { Lethargy } from 'lethargy'
import { throttle, forEach, delay } from 'lodash'

import datas from '../../datas/Colors.js'
import datasHome from '../../datas/Home.js'

const lethargy = new Lethargy()

class Carousel {
  constructor(el, options) {
		Storage.HomeCarouselClass = this

    this.numberItems = Object.keys(datasHome.titles).length
		this.index = options.index
		this.carousel = el

    this.init()
    this.updateContent()
    this.createDots()
    this.animeButton()
  }

  init = () => {
    this.infos = document.querySelector('.home__interface')
    this.infosButton = this.infos.querySelector('button')
    this.background = this.infos.querySelector('.background')
    this.paper = this.infos.querySelector('.form-paper')
    this.black = this.infos.querySelector('.form-black')
    this.content = this.paper.querySelector('.content')
    this.title = this.paper.querySelector('.title')
    this.text = this.paper.querySelector('.text')
    this.dotsContainer = this.infos.querySelector('.dots-container')
  }

  bind() {
		window.addEventListener('mousewheel', this.handleScroll, false)
		this.carousel.addEventListener('click', this.handleClick, false)
    this.infosButton.addEventListener('click', this.handleClick, false)
    this.dots.forEach((el) => {
      el.addEventListener('click', this.handleDotClick, false)
    })
	}

	unbind() {
    window.removeEventListener('mousewheel', this.handleScroll, false)
		this.carousel.removeEventListener('click', this.handleClick, false)
    this.infosButton.removeEventListener('click', this.handleClick, false)
    this.dots.forEach((el) => {
      el.removeEventListener('click', this.handleDotClick, false)
    })
	}

	handleScroll = (event) => {
		if(lethargy.check(event) !== false) this.onRealScroll(event)
	}

	onRealScroll = throttle((event) => {
		const update = event.deltaY < 0 ? -1 : 1
    const oldIndex = this.index
    this.index = Math.max(Math.min(this.index + update, this.numberItems - 1), 0)

    if (oldIndex === this.index && this.index == 0) this.index = this.numberItems - 1
    else if (oldIndex === this.index && this.index == this.numberItems - 1) this.index = 0
    this.updateInfo()
	}, 1000, {leading: true, trailing: false})

  handleDotClick = (event) => {
    const index = Number(event.currentTarget.getAttribute('data-index'))
    if (index === this.index) return
    this.index = index
    this.updateInfo()
  }

	handleClick = (event) => {
		this.unbind()
    this.hideInfo()
    setTimeout(() => {
      if (this.index == 0) Storage.Experience1Class.init()
      if (this.index == 1) Storage.Experience2Class.init()
      if (this.index == 2) Storage.Experience3Class.init()
    }, 1000)
	}

	updateExpName = () => {
		Storage.expName = 'exp' + (this.index + 1)
  }

  updateRender = () => {
    Storage.ComposerClass.effectBetweenCarousel(this.index + 1)
    this.updateExpName()
  }

  hideInfo = () => {
    this.updateBackground(stop)
    this.updatePaper(stop)
    this.updateBlack(stop)
    this.hideDots()
  }

  updateInfo = () => {
    this.updateDots()
    this.updateRender()
    this.updateBackground()
    this.updatePaper()
    this.updateBlack()
  }

  updateBlack = (stop) => {
    anime({
      targets: this.black,
      translateX: -600,
      duration: 300,
      delay: 100,
      easing: 'easeInQuad',
      complete: () => {
        if (stop) return
        anime({
          targets: this.black,
          translateX: 0,
          duration: 600,
          delay: 400,
          easing: 'easeOutQuad'
        })
      }
    })
  }

  updateBackground = (stop) => {
    const color = datas.backgrounds[Storage.expName]

    anime({
      targets: this.background,
      translateX: -700,
      duration: 400,
      easing: 'easeInQuad',
      complete: () => {
        if (stop) return
        this.background.style.opacity = 1
        this.background.style.backgroundColor = color
        anime({
          targets: this.background,
          translateX: 0,
          duration: 400,
          delay: 200,
          easing: 'easeOutQuad'
        })
      }
    })
  }

  updateContent = () => {
    this.text.innerHTML = datasHome.texts[Storage.expName]
    this.title.setAttribute('src', datasHome.titles[Storage.expName])
  }

  updatePaper = (stop) => {
    anime({
      targets: this.paper,
      translateY: ['-50%', '-50%'],
      translateX: -700,
      duration: 400,
      easing: 'easeInQuad',
      complete: () => {
        if (stop) return
        this.infosButton.classList.remove('is-animated')
        this.updateContent()
        this.animeButton()
        anime({
          targets: this.paper,
          translateY: ['-50%', '-50%'],
          translateX: 0,
          duration: 400,
          delay: 200,
          easing: 'easeOutQuad'
        })
      }
    })
  }

  animeButton = () => {
    setTimeout(() => { this.infosButton.classList.add('is-animated') }, 800)
  }

  createDots = () => {
    this.dots = []
    for (let i = 0; i < this.numberItems; i++) {
      const dot = document.createElement('div')
      dot.classList.add('dot', 'cursor-reveal')
      dot.setAttribute('data-index', i)
      if (this.index === i) dot.classList.add('is-active')
      const dotOuter = document.createElement('div')
      dotOuter.classList.add('dot-outer')
      const dotInner = document.createElement('div')
      dotInner.classList.add('dot-inner')

      dot.appendChild(dotOuter)
      dot.appendChild(dotInner)
      this.dotsContainer.appendChild(dot)
      this.dots.push(dot)
    }
  }

  updateDots = () => {
    this.dots.forEach((el) => {
      el.classList.remove('is-active')
    })
    this.dots[this.index].classList.add('is-active')
  }

  hideDots = () => {
    this.dotsContainer.classList.add('is-hidden')
  }
}

export default Carousel
