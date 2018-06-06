const MTLLoader = require('three-mtl-loader')

class ObjectsLoader {
  constructor(options) {
    this.mtlLoader = new MTLLoader()
    this.objLoader = new THREE.OBJLoader()
    this.textureLoader = new THREE.TextureLoader()
    this.mtlLoader.manager = new THREE.LoadingManager()

    this.init()
  }

  init = () => {
    this.group = new THREE.Group()
    this.group.position.y = -790
    this.group.position.z = -300

    this.peopleGroup = new THREE.Group()
    this.peopleGroup.position.x = -400
    this.peopleGroup.position.z = 200
  }

  load = () => {
    return new Promise((resolve, reject) => {
      this.loadWall().then((response)=> {
        this.loadPeople().then((response)=> {
          this.loadShadow().then((response)=> {
            this.loadSpeaker1().then((response)=> {
              this.loadSpeaker2().then((response)=> {
                //this.loadRadio().then((response)=> {
                  //this.loadRadioTower().then((response)=> {
                    console.log('Chapter 2 objects loaded')
                    resolve(this.group)
                  //}).catch((error)=> { console.warn(error) })
                //}).catch((error)=> { console.warn(error) })
              }).catch((error)=> { console.warn(error) })
            }).catch((error)=> { console.warn(error) })
          }).catch((error)=> { console.warn(error) })
        }).catch((error)=> { console.warn(error) })
      }).catch((error)=> { console.warn(error) })
    })
  }

  loadSpeaker1 = () => {
    return new Promise((resolve, reject) => {
      let that = this
      that.objLoader.load( 'assets/models/beforeChap2/speaker1.obj', function ( speaker ) {
        speaker.scale.set(0.3, 0.3, 0.3)
        speaker.position.z = 10000
        speaker.position.y = 0
        speaker.position.x = 800

        speaker.traverse(function(o) {
          if (o.type === 'Mesh') {
            o.castShadow = true
            o.receiveShadow = true
          }
        })

        that.group.add( speaker )
      })
      resolve()
    })
  }

  loadSpeaker2 = () => {
    return new Promise((resolve, reject) => {
      let that = this
      that.objLoader.load( 'assets/models/beforeChap2/speaker2.obj', function ( speaker ) {
        speaker.scale.set(0.3, 0.3, 0.3)
        speaker.position.z = 7000
        speaker.position.y = 0
        speaker.position.x = -800

        speaker.traverse(function(o) {
          if (o.type === 'Mesh') {
            o.castShadow = true
            o.receiveShadow = true
          }
        })

        that.group.add( speaker )
      })
      resolve()
    })
  }

  // loadRadioTower = () => {
  //   return new Promise((resolve, reject) => {
  //     let that = this
  //     that.objLoader.load( 'assets/models/beforeChap2/RadioTower.obj', function ( tower ) {
  //       tower.scale.set(50, 50, 50)
  //       tower.position.z = 1200
  //       tower.position.y = 0
  //       tower.position.x = 1000

  //       tower.traverse(function(o) {
  //         if (o.type === 'Mesh') {
  //           o.castShadow = true
  //           o.receiveShadow = true
  //         }
  //       })

  //       that.group.add( tower )
  //     })
  //     resolve()
  //   })
  // }

  // loadRadio = () => {
  //   return new Promise((resolve, reject) => {
  //     let that = this
  //     that.objLoader.load( 'assets/models/beforeChap2/model.obj', function ( radio ) {
  //       radio.scale.set(500, 500, 500)
  //       radio.position.z = 2000
  //       radio.position.y = 50
  //       radio.position.x = -500

  //       radio.traverse(function(o) {
  //         if (o.type === 'Mesh') {
  //           o.castShadow = true
  //           o.receiveShadow = true
  //         }
  //       })

  //       that.group.add( radio )
  //     })
  //     resolve()
  //   })
  // }


  loadWall = () => {
    return new Promise((resolve, reject) => {
      let that = this
      that.objLoader.load( 'assets/models/chapitre2/mur_fond.obj', function ( wall ) {
        wall.scale.set(3.5, 3.5, 3.5)
        wall.position.z = -100
        wall.position.y = 750

        wall.traverse(function(o) {
          if (o.type === 'Mesh') {
            o.castShadow = true
            o.receiveShadow = true
          }
        })

        that.group.add( wall )
      })
      resolve()
    })
  }

  loadPeople = () => {
    return new Promise((resolve, reject) => {
      let that = this
      that.objLoader.load( 'assets/models/chapitre2/soldat_amultiplier.obj', function ( body ) {
        for ( let i = 0; i < 5; i ++ ) {
          for ( let j = 0; j < 3; j ++ ) {
            let bodyInstance = body.clone()
            bodyInstance.scale.set(1.5, 1.5, 1.5)
            bodyInstance.position.x = i * 200
            bodyInstance.position.z = j * 200
            bodyInstance.name = "warrior"
            bodyInstance.passed = false
            bodyInstance.castShadow = false
            that.peopleGroup.add( bodyInstance )
          }
        }
        that.group.add( that.peopleGroup )
        resolve()
      })
    })
  }

  loadShadow = () => {
      return new Promise((resolve, reject) => {
        let that = this

        let matl = new THREE.ShadowMaterial({ fog: false })
        matl.opacity = 0

        that.objLoader.load( 'assets/models/chapitre2/ombre_soldats.obj', function ( object ) {
          object.scale.x = 1.7
          object.scale.y = 1.7
          object.scale.z = 1.7
          object.position.z = 30
          object.position.x = -400
          object.position.y = -40


          object.traverse(function(o) {
            if (o.type === 'Mesh') {
              o.castShadow = true
              o.receiveShadow = true
              o.material = matl
            }
          })

          that.group.add(object)
          resolve()
        })
      })
    }
}

export default ObjectsLoader
