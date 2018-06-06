import ObjectsLoader from './ObjectsLoader'
import raf from 'raf'
import anime from 'animejs'

import datas from '../../../../datas/Experience1.js'

class InfosPeople {
  constructor(options) {
    this.state = options

    this.fontLoader = new THREE.FontLoader()

    this.createPlane()

    this.status = []
    this.infos = []
    this.tiret
    this.initAllInfos()
  }

  initAllInfos = () => {
    this.writeTiret().then((response)=> {
      this.tiret = response
    }).catch((error)=> { console.warn(error) })

    datas.infosPeople.forEach((obj) => {
      this.writeStatus(obj.status).then((response)=> {
        this.status.push(response)
      }).catch((error)=> { console.warn(error) })
      this.writeDesc(obj.info).then((response)=> {
        this.infos.push(response)
      }).catch((error)=> { console.warn(error) })
    })
  }

  createPlane = () => {
    let geometry = new THREE.PlaneGeometry( 150, 200, 32 )
    let material = new THREE.MeshBasicMaterial( { color: 0xb5b5b5, side: THREE.DoubleSide, transparent: true, opacity: 0 } )
    this.plane = new THREE.Mesh( geometry, material )
    this.plane.scale.y = 0.1
    this.plane.isVisible = false

    this.plane.position.y = -400
    this.state.relatedBox.add( this.plane )
  }

  writeStatus = (status) => {
    return new Promise((resolve, reject) => {
      this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

        const geometry = new THREE.TextGeometry( status, {
          font: font,
          size: 12,
          height: 0,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 1,
          bevelSegments: 1
        } );

        const textMaterial = new THREE.MeshBasicMaterial( { color: 0xC40202, overdraw: true, transparent: true, opacity: 0 } )
        const text = new THREE.Mesh( geometry, textMaterial )
        text.position.set( -60, 50, -20 )
        this.plane.add( text )

        resolve(text)
      })
    })
  }

  writeTiret = () => {
    return new Promise((resolve, reject) => {
      this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

        const geometry = new THREE.TextGeometry( '--', {
          font: font,
          size: 12,
          height: 0,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 1,
          bevelSegments: 1
        } );

        const textMaterial = new THREE.MeshBasicMaterial( { color: 0xC40202, overdraw: true, transparent: true, opacity: 0 } )
        const text = new THREE.Mesh( geometry, textMaterial )
        text.position.set( -60, 20, 10 )
        this.plane.add( text )

        resolve(text)
      })
    })
  }

  writeDesc = (info) => {
    return new Promise((resolve, reject) => {
      this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

        let descTab = ['']
        let index = 0
        let pass = false
        let moduloIndex = -1
        let table = info.split('')

        for (var i = 0; i < table.length; i ++) {
          moduloIndex++
          let test = [descTab[index], table[i]]
          descTab[index] = test.join('')

          if (moduloIndex%15 === 14) pass = true
          if (pass == true & table[i] == ' ') {
            pass = false
            index++
            moduloIndex = -1
            descTab.push('')
          }
        }

        let textTable = []
        let top = -20
        for (var i = 0; i < descTab.length; i ++) {
          const geometry = new THREE.TextGeometry(descTab[i], {
            font: font,
            size: 8,
            height: 0,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
          } );

          const textMaterial = new THREE.MeshBasicMaterial( { color: 0xC40202, overdraw: true, transparent: true, opacity: 0 } )
          const text = new THREE.Mesh( geometry, textMaterial )
          text.position.set( -60, top, -20 )
          top -= 18
          textTable.push(text)
          this.plane.add(text)
        }
        resolve(textTable)
      })
    })
  }

  checkRaycaster = (raycaster, objectsGroup) => {
		const people1body = objectsGroup.children[0]
    const people1head = objectsGroup.children[1]
    const people2body = objectsGroup.children[2]
    const people2head = objectsGroup.children[3]
    const people3body = objectsGroup.children[4]
    const people3head = objectsGroup.children[5]
    const people4body = objectsGroup.children[6]
    const people4head = objectsGroup.children[7]
    const people5body = objectsGroup.children[8]
    const people5head = objectsGroup.children[9]
    const people6body = objectsGroup.children[10]
    const people6head = objectsGroup.children[11]
    const people7body = objectsGroup.children[12]
    const people7head = objectsGroup.children[13]
    const people8body = objectsGroup.children[14]
    const people8head = objectsGroup.children[15]
    const people9body = objectsGroup.children[16]
    const people9head = objectsGroup.children[17]
    const people10body = objectsGroup.children[18]
    const people10head = objectsGroup.children[19]
    const people11body = objectsGroup.children[20]
    const people11head = objectsGroup.children[21]

		let intersectsPeople = raycaster.intersectObjects(people1body.children.concat(people1head.children), false)
    let intersectsPeople2 = raycaster.intersectObjects(people2body.children.concat(people2head.children), false)
    let intersectsPeople3 = raycaster.intersectObjects(people3body.children.concat(people3head.children), false)
    let intersectsPeople4 = raycaster.intersectObjects(people4body.children.concat(people4head.children), false)
    let intersectsPeople5 = raycaster.intersectObjects(people5body.children.concat(people5head.children), false)
    let intersectsPeople6 = raycaster.intersectObjects(people6body.children.concat(people6head.children), false)
    let intersectsPeople7 = raycaster.intersectObjects(people7body.children.concat(people7head.children), false)
    let intersectsPeople8 = raycaster.intersectObjects(people8body.children.concat(people8head.children), false)
    let intersectsPeople9 = raycaster.intersectObjects(people9body.children.concat(people9head.children), false)
    let intersectsPeople10 = raycaster.intersectObjects(people10body.children.concat(people10head.children), false)
    let intersectsPeople11 = raycaster.intersectObjects(people11body.children.concat(people11head.children), false)

		if (intersectsPeople[0] && intersectsPeople[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people1body, 0)
		} else if (intersectsPeople2[0] && intersectsPeople2[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people2body, 1)
		} else if (intersectsPeople3[0] && intersectsPeople3[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people3body, 2)
		} else if (intersectsPeople4[0] && intersectsPeople4[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people4body, 3)
		} else if (intersectsPeople5[0] && intersectsPeople5[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people5body, 4)
		} else if (intersectsPeople6[0] && intersectsPeople6[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people6body, 5)
		} else if (intersectsPeople7[0] && intersectsPeople7[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people7body, 6)
		} else if (intersectsPeople8[0] && intersectsPeople8[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people8body, 7)
		} else if (intersectsPeople9[0] && intersectsPeople9[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people9body, 8)
		} else if (intersectsPeople10[0] && intersectsPeople10[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people10body, 9)
		} else if (intersectsPeople11[0] && intersectsPeople11[0].distance < 2000) {
      if (!this.plane.isVisible) this.showInfos(people11body, 10)
		} else {
      if (this.plane.isVisible && !this.plane.isHidding) this.hideInfos()
    }

    if (Storage.ChaptersConclusionClass.binded) return

		if (intersectsPeople[0] || intersectsPeople2[0]) {
			Storage.InterfaceClass.cursor.reveal()
		} else {
			Storage.InterfaceClass.cursor.reset()
		}
	}

  showInfos = (people, index) => {
    console.log('SHOWWW')
    this.plane.isVisible = true

    this.plane.position.x = people.position.x
    this.plane.position.z = people.position.z - 600

    if (people.isGroup1) this.plane.rotation.y = Math.PI / 8
    else if (people.isGroup2) this.plane.rotation.y = -Math.PI / 8

    anime.remove(this.plane.scale)
    anime.remove(this.plane.material)
    anime({
      targets: this.plane.scale,
      y: 1,
      duration: 500,
      easing: 'easeOutQuad'
    })
    anime({
      targets: this.plane.material,
      opacity: 0.2,
      duration: 100,
      easing: 'easeOutQuad'
    })

    anime.remove(this.tiret.material)
    anime.remove(this.status[index].material)
    this.status[index].position.z = 10
    this.tiret.position.z = 10
    anime({
      targets: [this.tiret.material, this.status[index].material],
      opacity: 0.8,
      duration: 500,
      delay: 500,
      easing: 'easeOutQuad'
    })

    this.infos[index].forEach((el) => {
      anime.remove(el.material)
      el.position.z = 10
      anime({
        targets: el.material,
        opacity: 0.8,
        duration: 500,
        delay: 500,
        easing: 'easeOutQuad'
      })
    })
  }

  hideInfos = () => {
    this.plane.isHidding = true

    this.plane.children.forEach((el) => {
      anime.remove(el.material)
      anime({
        targets: el.material,
        opacity: 0,
        duration: 300,
        easing: 'easeOutQuad',
        complete: () => { el.position.z = -20 }
      })
    })

    anime.remove(this.plane.scale)
    anime.remove(this.plane.material)
    anime({
      targets: this.plane.scale,
      y: 0.002,
      duration: 300,
      delay: 300,
      easing: 'easeOutQuad',
      complete: () => {
        this.plane.isVisible = false
        this.plane.isHidding = false
      }
    })
    anime({
      targets: this.plane.material,
      opacity: 0,
      duration: 100,
      delay: 600,
      easing: 'easeOutQuad'
    })
  }

}

export default InfosPeople
