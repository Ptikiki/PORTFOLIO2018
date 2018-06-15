import Datas from '../../datas/Datas.js'
import Projects from '../Projects/index.js'

class Chapter {
    constructor(options) {
		Storage.ChapterClass = this
        this.chapterNumber = options.index

        console.log(options.index)
        console.log(this.chapterNumber)

        this.datas = Datas["chapter"+this.chapterNumber+""]

        this.title = document.querySelector('.chapter-page-title')
        this.firstLetter = document.querySelector('.firstLetter')
        this.firstTextLeftPart = document.querySelector('.followingLetters')
        this.firstTextRightPart = document.querySelector('.chapter-page-firstText-rightPart')
        this.leftProject = document.querySelector('.chapter-page-leftProject')
        this.subtitle = document.querySelector('.chapter-page-subtitle')
        this.secondText = document.querySelector('.chapter-page-secondText')
        this.rightProject = document.querySelector('.chapter-page-rightProject')
        this.statue = document.querySelector('.statueImg')

		this.init()
    }

    init() {
        this.getContents()
    	this.bind()
	}

    getContents = () => {
        this.title.innerHTML = this.datas.title
        this.firstLetter.innerHTML = this.datas.firstLetter
        this.firstTextLeftPart.innerHTML = this.datas.firstTextLeftPart
        this.firstTextRightPart.innerHTML = this.datas.firstTextRightPart
        //this.leftProject.innerHTML = this.datas.leftProject
        this.subtitle.innerHTML = this.datas.subtitle
        this.secondText.innerHTML = this.datas.secondText
        //this.rightProject.innerHTML = this.datas.rightProject
        this.statue.src = this.datas.statue
    }

    bind = () => {
    	document.querySelector('body').addEventListener('mousewheel', this.handleScroll)
        this.chapterNumber === 1 ? document.querySelector('.chapter-page-leftProject').addEventListener('click', this.handleClick) : ''
    }
    unbind = () => {
        document.querySelector('body').removeEventListener('mousewheel', this.handleScroll)
        document.querySelector('.chapter-page-leftProject').removeEventListener('click', this.handleClick)
    }

    handleClick = (event) => {
        new Projects({ type : "writing" })
    }

	handleScroll = (event) => {
        this.unbind()
		new Chapter({ index: this.chapterNumber+1 })
	}

}

export default Chapter
