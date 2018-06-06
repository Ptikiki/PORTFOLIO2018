import Home from './classes/Home/index.js'

window.Storage = {}
Storage.CameraClasses = {}
Storage.SceneClasses = {}

Storage.expName = 'exp1'

initCanvas()

function initCanvas() {
	new Home()
}
