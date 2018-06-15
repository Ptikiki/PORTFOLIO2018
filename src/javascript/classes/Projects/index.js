import Datas from '../../datas/Datas.js'

class Projects {
    constructor(options) {
		Storage.ProjectsClass = this

		this.listType = options.type
		this.datas = Datas[""+this.listType+"Projects"]

        this.projectSelection = document.querySelector('.projectSelection')
        this.projectsList = document.querySelector('.projectsList')

        this.projectSelected = document.querySelector('.projectSelected')
        this.projectTitle = document.querySelector('.projectSelected-projectTitle')
        this.projectDate = document.querySelector('.projectSelected-projectDate')
        this.projectRole = document.querySelector('.projectSelected-projectRole')
        this.projectTechno = document.querySelector('.projectSelected-projectTechno')

		this.init()
    }

    init() {
    	this.projectsList.innerHTML = ""
        this.createList()
	}

	createList = () => {
		console.log("ADD PROJECTS")
		let that = this 
		this.listCreated = true

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

      		newProject.addEventListener('click', function(){ that.projectClicked(project) })
      	})
	}

    projectClicked = (project) => {
        this.projectSelection.style.display = "none"
        this.projectSelected.style.display = "block"
        this.projectTitle.innerHTML = project.title
        this.projectDate.innerHTML = project.date
        this.projectRole.innerHTML = project.role
        this.projectTechno.innerHTML = project.techno
    }
}

export default Projects
