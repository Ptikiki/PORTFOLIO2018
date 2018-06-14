class Chapter2 {
    constructor(options) {
		Storage.Chapter2Class = this

		this.init()
    }

    init() {
    	console.log("Chapter2")
    	document.querySelector('.chapter1-container').style.display = "none"
    	document.querySelector('.chapter2-container').style.display = "block"
	}

    bind = () => {
    }
}

export default Chapter2
