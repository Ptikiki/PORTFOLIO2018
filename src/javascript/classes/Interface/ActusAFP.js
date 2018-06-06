import anime from 'animejs'
import datas from '../../datas/Experience1.js'
import { map } from 'lodash'
import Inrtia from 'inrtia'
import raf from 'raf'

const EASE = anime.easings.easeOutQuart

class ActusAFP {
  constructor() {
    this.init()
    this.initInertia()

    this.windowHeight = window.innerHeight
    this.store = []
  }

  initInertia = () => {
    this.inrtia = new Inrtia({
      value: 0,
      friction: 5,
      precision: 5,
      perfectStop: true,
      interpolation: 'linear'
    })
  }

  init = () => {
    this.actusPage = document.querySelector('.actus-page')
    this.intro = this.actusPage.querySelector('.intro')
    this.contentWrapper = this.actusPage.querySelector('.content .wrapper')
  }

  bind = () => {
    document.addEventListener('mousewheel', this.handleScroll)
    raf.add(this.update)
  }

  showActu = () => {
    document.body.classList.add('actus-page-visible')
    this.bind()
  }

  makeActu = () => {
    this.datas = datas.actus
    map(this.datas, this.create)
  }

  create = (actu, index) => {
    const item = document.createElement('div')
    item.classList.add('item')

    const mediaContainer = document.createElement('div')
    mediaContainer.classList.add('media-container')
    const media = document.createElement('div')
    media.classList.add('media')
    media.style.backgroundImage = 'url('+ actu.media +')';

    const titleContainer = document.createElement('div')
    titleContainer.classList.add('title-container')
    const text = document.createElement('div')
    text.classList.add('text')
    text.innerHTML = actu.text

    const img = document.createElement('img')
    img.classList.add('img')
    img.setAttribute('src', 'assets/interface/actusAFP/title.png')
    const title = document.createElement('div')
    title.classList.add('title')
    title.innerHTML = actu.title

    mediaContainer.appendChild(media)
    titleContainer.appendChild(img)
    titleContainer.appendChild(title)
    item.appendChild(mediaContainer)
    item.appendChild(titleContainer)
    item.appendChild(text)
    this.contentWrapper.appendChild(item)

    let top = item.getBoundingClientRect().top
    this.store.push({ item, type: 'item', top, animated: false })

    top = media.getBoundingClientRect().top
    this.store.push({ item: media, type: 'media', top, animated: false })

    top = text.getBoundingClientRect().top
    this.store.push({ item: text, type: 'text', top, animated: false })

    top = titleContainer.getBoundingClientRect().top
    this.store.push({ item: titleContainer, type: 'title', top, animated: false })
  }

  handleScroll = (event) => {
    this.inrtia.to(this.actusPage.scrollTop)
  }

  clamp = value => Math.max(0, Math.min(1, value))

  update = (force) => {
    if (this.inrtia.stopped) return
    const scrollTop = this.inrtia.update()
    const offset = (this.windowHeight / 2) >> 0

    this.store.forEach((item) => {
      const distance = scrollTop - item.top + this.windowHeight
      const ratio = distance / offset

      // opacity opacity
      if (item.type === 'item') {
        if (force || (ratio > 0 && ratio <= 1)) {
          const value = (1 - EASE(this.clamp(ratio)))
          item.item.style.opacity = 1 - value
        }
      }

      // up image
      if (item.type === 'media') {
        if (force || (ratio > 0 && ratio <= 1)) {
          const value = (1 - EASE(this.clamp(ratio)))
          item.item.style.transform = 'translateY(' + -(value * 100) + 'px)'
        }
      }

      // down text
      if (item.type === 'text') {
        if (force || (ratio > 0 && ratio <= 1)) {
          if (distance < -50 && item.animated) this.resetBottom(item)
          else if (distance > 300 && !item.animated) this.animeTop(item)
        }
      }

      // down title
      if (item.type === 'title') {
        if (force || (ratio > 0 && ratio <= 1)) {
          if (distance < -50 && item.animated) this.resetBottom(item)
          else if (distance > 300 && !item.animated) this.animeTop(item)
        }
      }
    })
  }

  resetBottom = (item) => {
    item.item.classList.remove('animated')
    item.animated = false
  }

  animeTop = (item) => {
    item.item.classList.add('animated')
    item.animated = true
  }
}

export default ActusAFP
