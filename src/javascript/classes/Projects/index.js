import Datas from '../../datas/Datas.js'

class Projects {
    constructor(options) {
		Storage.ProjectsClass = this

		this.listType = options.type
		this.datas = Datas[""+this.listType+"Projects"]

		this.title = document.querySelector('.chapter-page-title')
		this.subtitle = document.querySelector('.chapter-page-subtitle')
        this.firstText = document.querySelector('.chapter-page-firstText')
        this.secondText = document.querySelector('.chapter-page-secondText')
        this.leftProject = document.querySelector('.chapter-page-leftProject')
        this.rightProject = document.querySelector('.chapter-page-rightProject')

        this.projectSelection = document.querySelector('.projectSelection')
        this.projectsList = document.querySelector('.projectsList')
        this.statue = document.querySelector('.statueImg')

		this.init()
    }

    init() {
		this.title.style.display = "none"
		this.subtitle.style.display = "none"
        this.firstText.style.display = "none"
        this.secondText.style.display = "none"
        this.leftProject.style.display = "none"
        this.rightProject.style.display = "none"

        this.statue.src = ""
        this.projectSelection.style.display = "block"
        this.projectsList.style.display = "block"

        this.createList()
	}

	createList = () => {
		let that = this 

		this.datas.forEach((project) => {
      		let newProject = document.createElement("div")
      		newProject.classList.add("projectsList-project")

      		let newTitle = document.createElement("div")
      		newTitle.innerHTML = project.title
      		newTitle.classList.add("projectsList-projectTitle")

      		let newDate = document.createElement("div")
      		newDate.innerHTML = project.date
      		newDate.classList.add("projectsList-projectDate")

      		this.projectsList.appendChild(newProject).appendChild(newTitle).appendChild(newDate)  

      		newProject.addEventListener('click', function(){ that.handleClick(project) })
      	})
	}

    bind = () => {
    }

    handleClick = (project) => {
        console.log(project)
    }
}

export default Projects
