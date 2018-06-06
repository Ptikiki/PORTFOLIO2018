import anime from 'animejs'
import { map, delay } from 'lodash'

class Subtitles {
  constructor() {
    this.container = document.querySelector('.subtitles-container')
    this.subtitle = this.container.querySelector('.subtitles')

    this.globalIndex = 0
    this.actualLength = 0
  }

  writeSubtitles = (options, index) => {
    this.actualLength = options.length - 1
    this.globalIndex = index
    map(options, this.write(index))
  }

  write = (indexOfGlobalSub) => (opt, index) => {
    delay(this.writeOne, opt[1], { text: opt[0], index, indexOfGlobalSub });
  }

  writeOne = (opt) => {
    if (opt.indexOfGlobalSub !== this.globalIndex) return
    this.subtitle.innerHTML = opt.text
    if (opt.index === this.actualLength) delay(this.remove, 2000);
  }

  remove = () => {
    this.subtitle.innerHTML = ''
  }

  hideSubtitles = () => {
    this.container.classList.add('is-hidden')
  }

  showSubtitles = () => {
    this.container.classList.remove('is-hidden')
  }
}

export default Subtitles
