import datas from '../../../datas/Experience1.js'

class SplineTimeManager {
    constructor(options) {
			Storage.SplineTimeManagerClass = this
			this.state = options
      this.endDone = false

      this.step = 0
      this.actualStepToCheck = 0
    }

    check = (state, index) => {
      if (state > 0.9) {
        // if there are no more keypoints
        if (!datas.keyPointsOnSpline[Object.keys(datas.keyPointsOnSpline)[index]][this.actualStepToCheck]) {
          console.log('end of actual spline')
          !this.endDone && this.end()
          this.endDone = true
          return
        }
      }

      const stepToCheck = datas.keyPointsOnSpline[Object.keys(datas.keyPointsOnSpline)[index]][this.actualStepToCheck]

      if (!stepToCheck) return
      if (state > stepToCheck) this.update(index)
    }

    update = (index) => {
      this.actualStepToCheck += 1
      Storage.BetweenChaptersClass.updateScene(index, this.step)
      this.step += 1
    }

    end = () => {
      Storage.SplineClass.unbind()
      setTimeout(() => {
        Storage.SplineClass.state.cbEnd && Storage.SplineClass.state.cbEnd()
      }, 3000)
    }
}

export default SplineTimeManager
