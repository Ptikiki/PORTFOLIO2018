import Projects from '../Projects/index.js'

class Home {
    constructor(options) {
		Storage.HomeClass = this

		this.init()
    }

    init() {
    	this.bind()
	}

    bind = () => {
    	document.querySelector('.burger').addEventListener('click', this.handleClick)
    }

    handleClick = (event) => {
		new Projects({ type : "web" })
	}
}

export default Home
