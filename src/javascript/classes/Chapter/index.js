import Datas from '../../datas/Datas.js'
import Projects from '../Projects/index.js'
import anime from 'animejs'


class Chapter {
    constructor(options) {
		Storage.ChapterClass = this
        this.chapterNumber = options.index
        this.nextChapterNumber = options.nextChapter

        this.datas = Datas["chapter"+this.chapterNumber+""]

        this.title = document.querySelector('.chapter-page-title')
        this.firstLetter = document.querySelector('.firstLetter')
        this.firstTextLeftPart = document.querySelector('.followingLetters')
        this.firstTextRightPart = document.querySelector('.chapter-page-firstText-rightPart')
        this.leftProjectTitle = document.querySelector('.chapter-page-leftProject-title')
        this.leftProjectDescription = document.querySelector('.chapter-page-leftProject-description')
        this.leftProjectImg = document.querySelector('.chapter-page-leftProject')
        this.subtitle = document.querySelector('.chapter-page-subtitle')
        this.secondText = document.querySelector('.chapter-page-secondText')
        this.rightProjectTitle = document.querySelector('.chapter-page-rightProject-title')
        this.rightProjectDescription = document.querySelector('.chapter-page-rightProject-description') 
        this.rightProjectImg = document.querySelector('.chapter-page-rightProject')
        this.statue = document.querySelector('.statueImg')
        this.nextChapter = document.querySelector('.chapter-page-nextChapter-text')

		this.init()
        this.animeSubtitles()
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
        this.leftProjectTitle.innerHTML = this.datas.leftProjectTitle
        this.leftProjectDescription.innerHTML = this.datas.leftProjectDescription
        this.leftProjectImg.style.backgroundImage = this.datas.leftProjectImg

        this.subtitle.innerHTML = this.datas.subtitle
        this.secondText.innerHTML = this.datas.secondText
        this.rightProjectTitle.innerHTML = this.datas.rightProjectTitle
        this.rightProjectDescription.innerHTML = this.datas.rightProjectDescription
        this.rightProjectImg.style.backgroundImage = this.datas.rightProjectImg
        this.statue.src = this.datas.statue
        this.nextChapter.innerHTML = this.datas.nextChapter

        this.leftProjectTitle.style.opacity = 0
        this.leftProjectDescription.style.opacity = 0
        this.rightProjectTitle.style.opacity = 0
        this.rightProjectDescription.style.opacity = 0
    }

    bind = () => {
        this.nextChapter.addEventListener('click', this.nextChapterClick)
        document.querySelector(".chapter-page-leftProject").addEventListener('mouseover', this.leftProjectOver)
    	document.querySelector(".chapter-page-rightProject").addEventListener('mouseover', this.rightProjectOver)
    }
    unbind = () => {
        this.nextChapter.removeEventListener('click', this.nextChapterClick)
    }

	nextChapterClick = (event) => {
        this.unbind()
		new Chapter({ index: this.nextChapterNumber, nextChapter: this.chapterNumber })
	}

    leftProjectOver = (event) => {
        document.querySelector(".chapter-page-leftProject").removeEventListener('mouseover', this.leftProjectOver)
        anime({
            targets: this.leftProjectTitle,
            opacity: [0, 1],
            left: ['33%', '28%'],
            duration: 800,
            easing: 'linear'
        })
        anime({
            targets: this.leftProjectDescription,
            opacity: [0, 1],
            left: ['18%', '23%'],
            duration: 800,
            easing: 'linear'
        })
    }
    rightProjectOver = (event) => {
        document.querySelector(".chapter-page-rightProject").removeEventListener('mouseover', this.rightProjectOver)
        if (this.chapterNumber === 1) {
            anime({
                targets: this.rightProjectTitle,
                opacity: [0, 1],
                left: ['55%', '60%'],
                duration: 800,
                easing: 'linear'
            })
        }
        else if (this.chapterNumber === 2) {
            anime({
                targets: this.rightProjectTitle,
                opacity: [0, 1],
                left: ['62%', '67%'],
                duration: 800,
                easing: 'linear'
            })
        }
        anime({
            targets: this.rightProjectDescription,
            opacity: [0, 1],
            left: ['78%', '73%'],
            duration: 800,
            easing: 'linear'
        })
    }

    animeSubtitles = () => {
        let quote = document.querySelector(".biggerSubtitle")
        quote.innerText.replace(/(<([^>]+)>)/ig,"")
        let quotewords = quote.innerText.split(" ")
        let wordCount = quotewords.length
        quote.innerHTML = ""

        for (let i=0; i < wordCount; i++) {
            quote.innerHTML += "<span>"+quotewords[i]+"</span>"
            i < quotewords.length - 1 ? quote.innerHTML += " " : ''
        }

        quotewords = document.querySelectorAll(".biggerSubtitle span")
        
        Array.prototype.forEach.call(quotewords, function(word, index) {
            anime({
                targets: word,
                opacity: [0, 1],
                duration: 500,
                delay: index*300,
                easing: 'linear'
            })
        })
    }



}

export default Chapter
