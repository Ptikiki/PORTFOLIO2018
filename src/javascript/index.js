const THREE = require('three')
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')

import raf from 'raf'

import Home from './classes/Home/index.js'
import Interface from './classes/Interface/index.js'
import Experience1 from './classes/Exp/Exp-1/index.js'
import Experience2 from './classes/Exp/Exp-2/index.js'
import Experience3 from './classes/Exp/Exp-3/index.js'
import SoundManager from './classes/Exp/Common/SoundManager.js'

window.Storage = {}
Storage.CameraClasses = {}
Storage.SceneClasses = {}

Storage.expName = 'exp1'

initCanvas()

function initCanvas() {
	new Home()
	new Interface()
	new Experience1()
	new Experience2()
	new Experience3()
	new SoundManager()

	raf.add(render)
}

function render() {
	if (Storage.HomeCarouselClass && Storage.RendererClass)	Storage.RendererClass.render()
}
