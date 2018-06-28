import Viseur from './classes/Viseur/index.js'
import Home from './classes/Home/index.js'
import Chapter from './classes/Chapter/index.js'

window.Storage = {}
initCanvas()

function initCanvas() {
	new Viseur()
	new Home()
	new Chapter({ index : 1, nextChapter : 2 })
}
