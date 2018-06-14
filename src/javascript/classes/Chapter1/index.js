import Chapter2 from '../Chapter2/index.js'

class Chapter1 {
    constructor(options) {
		Storage.Chapter1Class = this

		this.init()
    }

    init() {
    	console.log("Chapter1")
    	this.bind()
	}

    bind = () => {
    	document.querySelector('body').addEventListener('mousewheel', this.handleScroll)
    }

	handleScroll = (event) => {
		new Chapter2()
	}

}

export default Chapter1
