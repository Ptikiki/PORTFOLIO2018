import ProjectsList from '../ProjectsList/index.js'

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
		new ProjectsList()
	}
}

export default Home
