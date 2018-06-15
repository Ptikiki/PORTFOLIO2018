import Projects from '../Projects/index.js'

class Home {
    constructor(options) {
		Storage.HomeClass = this

        this.cross = document.querySelector('.cross')
        this.projectSelection = document.querySelector('.projectSelection')
        this.projectsList = document.querySelector('.projectsList')
        this.projectSelected = document.querySelector('.projectSelected')

        this.burger = document.querySelector('.burger')
        this.title = document.querySelector('.chapter-page-title')
        this.subtitle = document.querySelector('.chapter-page-subtitle')
        this.firstText = document.querySelector('.chapter-page-firstText')
        this.secondText = document.querySelector('.chapter-page-secondText')
        this.leftProject = document.querySelector('.chapter-page-leftProject')
        this.rightProject = document.querySelector('.chapter-page-rightProject')
        this.nextChapter = document.querySelector('.chapter-page-nextChapter')
        this.statue = document.querySelector('.statueImg')

		this.init()
    }

    init() {
    	this.bind()
	}

    bind = () => {
        let that = this

        document.querySelector('.burger').addEventListener('click', function(){ that.projectsClicked("web") })
        document.querySelector('.chapter-page-leftProject').addEventListener('click', function(){ that.projectsClicked("writing") })
    }

    projectsClicked = (projectType) => {
        let that = this 

        document.querySelector('.cross').addEventListener('click', this.crossClicked)
        document.querySelector('.burger').removeEventListener('click', function(){ that.projectsClicked("web") })
        document.querySelector('.chapter-page-leftProject').removeEventListener('click', function(){ that.projectsClicked("writing") })

        this.burger.style.display = "none"
        this.title.style.display = "none"
        this.subtitle.style.display = "none"
        this.firstText.style.display = "none"
        this.secondText.style.display = "none"
        this.leftProject.style.display = "none"
        this.rightProject.style.display = "none"
        this.nextChapter.style.display = "none"
        this.statue.style.display = "none"

        this.cross.style.display = "block"
        this.projectSelection.style.display = "block"
        this.projectsList.style.display = "block"

        if ( projectType === "web" ) {
            this.webProjectsList != true ? new Projects({ type : "web" }) : ''
            this.webProjectsList = true
            this.writingProjectsClicked = false
        }
		else if ( projectType === "writing" ) {
            this.writingProjectsClicked != true ? new Projects({ type : "writing" }) : ''
            this.writingProjectsClicked = true
            this.webProjectsList = false
        }
	}

    crossClicked = (event) => {
        let that = this

        document.querySelector('.cross').removeEventListener('click', this.crossClicked)
        document.querySelector('.burger').addEventListener('click', function(){ that.projectsClicked("web") })
        document.querySelector('.chapter-page-leftProject').addEventListener('click', function(){ that.projectsClicked("writing") })

        this.cross.style.display = "none"
        this.projectSelection.style.display = "none"
        this.projectsList.style.display = "none"
        this.projectSelected.style.display = "none"

        this.burger.style.display = "block"
        this.title.style.display = "block"
        this.subtitle.style.display = "block"
        this.firstText.style.display = "block"
        this.secondText.style.display = "block"
        this.leftProject.style.display = "block"
        this.rightProject.style.display = "block"
        this.nextChapter.style.display = "block"
        this.statue.style.display = "block"
    }
}

export default Home
