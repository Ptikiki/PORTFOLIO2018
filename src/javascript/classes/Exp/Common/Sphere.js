class Shpere {

    constructor(options) {
      Storage.SphereClass = this

      this.state = options

      this.init()
    }

    init() {
      this.createSphere()
    }

    createSphere = () => {
      const geometry = new THREE.SphereGeometry( 200, 32, 32 )
      const material = new THREE.MeshPhongMaterial({ color: this.state.color, side: THREE.BackSide, shading: THREE.FlatShading })

      // invert normals
      for ( var i = 0; i < geometry.faces.length; i ++ ) {
        var face = geometry.faces[ i ]
        var temp = face.a
        face.a = face.c
        face.c = temp
      }
      geometry.computeFaceNormals()
      geometry.computeVertexNormals()
      var faceVertexUvs = geometry.faceVertexUvs[ 0 ]
      for ( var i = 0; i < faceVertexUvs.length; i ++ ) {
        var temp = faceVertexUvs[ i ][ 0 ]
        faceVertexUvs[ i ][ 0 ] = faceVertexUvs[ i ][ 2 ]
        faceVertexUvs[ i ][ 2 ] = temp
      }

      this.sphere =  new THREE.Mesh(geometry, material)
      this.sphere.position.y = 160
      this.sphere.position.z = this.state.posZ || 0

      this.state.relatedScene.add(this.sphere)
    }

}

export default Shpere
