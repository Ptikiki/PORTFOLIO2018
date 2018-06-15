import Home from './classes/Home/index.js'
import Chapter from './classes/Chapter/index.js'

window.Storage = {}
initCanvas()

function initCanvas() {
	new Home()
	new Chapter({ index : 1 })
}
