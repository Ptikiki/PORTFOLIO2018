import Home from './classes/Home/index.js'
import Chapter1 from './classes/Chapter1/index.js'

window.Storage = {}
Storage.CameraClasses = {}
Storage.SceneClasses = {}

Storage.expName = 'exp1'

initCanvas()

function initCanvas() {
	new Home()
	new Chapter1()
}
