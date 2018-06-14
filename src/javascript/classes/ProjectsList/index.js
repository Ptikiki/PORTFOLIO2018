class ProjectsList {
    constructor(options) {
		Storage.ProjectsListClass = this

		this.init()
    }

    init() {
        document.querySelector('.projects-list').style.display = "block"
	}

    bind = () => {
    }
}

export default ProjectsList
