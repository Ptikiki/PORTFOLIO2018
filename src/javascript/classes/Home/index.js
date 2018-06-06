import Carousel from './Carousel.js'
import Renderer from '../Exp/Common/Renderer.js'
import Composer from '../Exp/Common/Composer.js'

class Home {
    constructor(options) {
			Storage.HomeClass = this

			this.carousel = document.querySelector('.home__carousel')
      this.canvasContainer = this.carousel.querySelector('#container')

			this.init()
    }

    init() {
			this.carousel = new Carousel(this.carousel, { index: 0 })
      new Renderer({ container: this.canvasContainer })

      // will have to be better initiated
      setTimeout( () => { new Composer() }, 500)
		}

    bind = () => {
      this.carousel.bind()
    }
}

export default Home
