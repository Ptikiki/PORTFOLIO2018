import Datas from '../../datas/Datas.js'
import anime from 'animejs'

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
        this.projectDescription = document.querySelector('.projectSelected-projectDescription')
        this.projectLink = document.querySelector('.projectSelected-projectLink')

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

      		newProject.addEventListener('mouseover', function(){ that.projectOver(project) })
      	})
	}

    projectOver = (project) => {
      console.log(event.target)

      this.projectSelection.style.display = "none"
      this.projectSelected.style.display = "block"
      project.title != undefined ? this.projectTitle.innerHTML = project.title : this.projectTitle.innerHTML = ''
      project.date != undefined ? this.projectDate.innerHTML = project.date : this.projectDate.innerHTML = ''
      project.role != undefined ? this.projectRole.innerHTML = project.role : this.projectRole.innerHTML = ''
      project.techno != undefined ? this.projectTechno.innerHTML = project.techno : this.projectTechno.innerHTML = ''
      project.description != undefined ? this.projectDescription.innerHTML = project.description : this.projectDescription.innerHTML = ''
      project.link != undefined ? this.projectLink.innerHTML = project.link : this.projectLink.innerHTML = ''

      if ( this.oldProjectSelected != project ) {
        this.oldProjectSelected = project
        anime({
          targets: this.projectSelected,
          opacity: [0, 1],
          duration: 600,
          easing: 'linear'
        })
      }
    }
}

export default Projects
