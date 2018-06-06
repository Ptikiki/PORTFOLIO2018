import Title from './Title.js'
import TextWritting from './TextWritting.js'
import TimelineExp from './TimelineExp.js'
import Subtitles from './Subtitles.js'
import Cursor from './Cursor.js'
import Intro from './Intro.js'
import ActusAFP from './ActusAFP.js'

class Interface {
    constructor(options) {
			Storage.InterfaceClass = this
			this.init()
    }

    init() {
      this.cursor = new Cursor()
      this.intro = new Intro()
		}

    displayExpInterface = () => {
      this.title = new Title()
      this.textWriting = new TextWritting()
      this.timelineExp = new TimelineExp()
      this.subtitles = new Subtitles()
      this.actus = new ActusAFP()

      // this.actus.makeActu()
      // this.actus.showActu()
    }
}

export default Interface
