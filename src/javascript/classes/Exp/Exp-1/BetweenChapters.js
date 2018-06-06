import { throttle } from 'lodash'

import datas from '../../../datas/Experience1.js'

class BetweenChapters {
    constructor(options) {
      Storage.BetweenChaptersClass = this
      this.initFcTable()
    }

    initFcTable = () => {
      this.table = [
        [this.launchVoiceOver(1), this.launchText(0) ],

        [ this.launchText(1), this.launchVoiceOver(3), this.launchText(2), this.launchConclusion(1), this.stopConclusion ],

        [ this.launchText(3), /* this.launchVoiceOver(4), */ this.launchVoiceOver(5) ],

        [ this.launchVoiceOver(6), this.launchText(5), this.faster, this.removePeople, this.stopConclusion ],

        [ /*this.launchVoiceOver(9),*//* this.launchVoiceOver(10), this.launchVoiceOver(11)*/ ]
      ]
    }

    updateScene = (index, step) => {
      if (this.table[index][step]) this.table[index][step]()
    }

    launchText = (index) => () => {
      this.lauchTextDelayed(index)
      if (index == 2) Storage.SplineClass.updateStep(0.025)
      if (index == 4) setTimeout(() => { Storage.ChaptersConclusionClass.allowBind = true }, 9000)
    }

    // litle safety
    lauchTextDelayed = throttle((index) => {
      Storage.TextWriting.writeInfo({ text: datas.textsPanel[index] })
    }, 50, {leading: true, trailing: true})

    launchVoiceOver = (index) => () => {
      Storage.InterfaceClass.subtitles.writeSubtitles(datas.subtitles[index], index)
      Storage.SoundManagerClass.launchVoiceOver(datas.voiceOver[index])
      if (index == 3) Storage.SplineClass.updateStep(0.035)
      if (index == 6) Storage.SplineClass.updateStep(0.03)
      if (index == 5) setTimeout(() => { this.launchText(4)() }, 39500)
    }

    launchMusic = (src) => () => {
      console.log('je lance music', src)
      Storage.SoundManagerClass.createNewAmbiance(src)
    }

    launchConclusion = (index) => () => {
      console.log('je lance conclu')
      Storage.SoundManagerClass.launchNoisySound("assets/sound/son_conclusion.mp3")
      if (index == 3) Storage.SplineClass.updateStep(0.8)
      Storage.ChaptersConclusionClass.bindConclu()
    }

    stopConclusion = () => {
      console.log('je stop conclu')
      Storage.ChaptersConclusionClass.unbindConclu()
    }

    removePeople = () => {
      Storage.Chapitre3Class.removePoeple()
      this.launchVoiceOver(7)()
      setTimeout(() => { this.launchText(6)() }, 21000)
      setTimeout(() => { this.launchConclusion(3)() }, 41000)
    }

    faster = () => {
      Storage.SplineClass.updateStep(0.06)
    }
}

export default BetweenChapters
