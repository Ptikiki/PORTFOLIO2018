import Home from './classes/Home/index.js'
import Chapter from './classes/Chapter/index.js'

window.Storage = {}
initCanvas()

function initCanvas() {
	new Chapter({ index : 1, nextChapter : 2 })
	new Home()
}
