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
    this.projectLink = document.querySelector('.projectSelected-projectLink')
    this.projectDescription = document.querySelector('.projectSelected-projectDescription')
    this.projectImg = document.querySelector('.page-leftContainer')

    this.init()
    this.bind()
  }

  init() {
  	this.projectsList.innerHTML = ""
    this.onProjectsResize()
    this.createList()
	}

	createList = () => {
		console.log("ADD PROJECTS")
		let that = this 
		this.listCreated = true

		this.datas.forEach((project) => {
  		let newProject = document.createElement("div")
  		newProject.classList.add("projectsList-project")
      newProject.style.backgroundImage = project.img

  		let newTitle = document.createElement("div")
  		newTitle.innerHTML = project.title
  		newTitle.classList.add("projectsList-projectTitle")

  		let newDate = document.createElement("div")
  		newDate.innerHTML = project.date
  		newDate.classList.add("projectsList-projectDate")

  		this.projectsList.appendChild(newProject).appendChild(newTitle).appendChild(newDate)  

  		newProject.addEventListener('mouseover', function(){ that.projectOver(project) })
      newProject.addEventListener('click', function(){ that.projectClickMobile(project) })
  	})
	}

  projectOver = (project) => {
    this.projectSelection.style.display = "none"
    this.projectSelected.style.display = "block"
    project.title != undefined ? this.projectTitle.innerHTML = project.title : this.projectTitle.innerHTML = ''
    project.date != undefined ? this.projectDate.innerHTML = project.date : this.projectDate.innerHTML = ''
    project.role != undefined ? this.projectRole.innerHTML = project.role : this.projectRole.innerHTML = ''
    project.techno != undefined ? this.projectTechno.innerHTML = project.techno : this.projectTechno.innerHTML = ''
    project.link != undefined ? this.projectLink.innerHTML = project.link : this.projectLink.innerHTML = ''
    project.description != undefined ? this.projectDescription.innerHTML = project.description : this.projectDescription.innerHTML = ''
    project.img != undefined ? this.projectImg.style.backgroundImage = project.img : this.projectImg.style.backgroundImage = ''

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

  projectClickMobile = (project) => {
    if ( window.innerWidth <= 800 || window.innerHeight <= 650 ) {
      document.querySelector('.page-leftContainer').style.display = "block" 
      document.querySelector('.page-rightContainer').style.display = "none" 

      document.querySelector('.cross').removeEventListener('click', Storage.HomeClass.crossClicked)
      document.querySelector('.cross').addEventListener('click', this.crossClickedMobile)
    }
  }

  crossClickedMobile = (event) => {
    document.querySelector('.page-leftContainer').style.display = "none" 
    document.querySelector('.page-rightContainer').style.display = "block" 

    document.querySelector('.cross').addEventListener('click', Storage.HomeClass.crossClicked)
    document.querySelector('.cross').removeEventListener('click', this.crossClickedMobile)
  }

  bind = () => {
    window.addEventListener('resize', this.onProjectsResize)
  }

  onProjectsResize = (event) => {
    if ( window.innerWidth <= 800 || window.innerHeight <= 650 ) {
      document.querySelector('.page-leftContainer').style.display = "none"
    } 
    else { 
      document.querySelector('.page-leftContainer').style.display = "block" 
    }
  }
}

export default Projects
