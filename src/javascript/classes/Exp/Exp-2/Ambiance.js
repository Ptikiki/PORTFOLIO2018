class Ambiance {
    constructor(options) {
      Storage.AmbianceClass = this
      this.light1
      this.light2
      this.light3

      this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.vertex_loader.setResponseType('text')
      this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
      this.fragment_loader.setResponseType('text')

      this.createLight()
      this.createBackground()
      this.createFakeShadow()
    }

    createLight() {
      this.light1 = new THREE.PointLight(0x8fffe7, 0.40, 0, 2)
      this.light1.position.set(500, 1800, 800)
      this.light1.rotation.set(0, Math.PI, Math.PI)

      let SHADOW_MAP_WIDTH = 1024, SHADOW_MAP_HEIGHT = 1024

      this.light1.castShadow = true
      this.light1.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light1.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light1.shadow.camera.far = 10000

      Storage.SceneClasses.exp2.scene.add(this.light1)

      this.light2 = new THREE.PointLight(0xffffff, 0.32, 0, 2)

      this.light2.position.set(0, 1000, 0)
      this.light2.rotation.set(0, Math.PI, Math.PI)
      this.light2.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light2.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light2.shadow.camera.far = 10000

      Storage.SceneClasses.exp2.scene.add(this.light2)

      this.light3 = new THREE.PointLight(0xccfaff, 0.25, 0, 2)

      this.light3.position.set(-1300, 1000, 0)
      this.light3.rotation.set(0, Math.PI, Math.PI)
      this.light3.shadow.mapSize.width = SHADOW_MAP_WIDTH
      this.light3.shadow.mapSize.height = SHADOW_MAP_HEIGHT
      this.light3.shadow.camera.far = 10000

      Storage.SceneClasses.exp2.scene.add(this.light3)

      this.lightAmb = new THREE.AmbientLight(0xffffff, 0.20)
      Storage.SceneClasses.exp2.scene.add(this.lightAmb)

      this.spotLight1 = new THREE.SpotLight( 0xffffff, 0, 1000, 0.5, 0.9 );
      this.spotLight1.position.set( 180, 600, -250 );
      this.spotLight1.rotation.y = Math.PI / 5
      Storage.SceneClasses.exp2.scene.add( this.spotLight1 );

      this.spotLight2 = new THREE.SpotLight( 0xe82857, 0, 1000, 0.5, 0.9 );
      this.spotLight2.position.set( -180, 600, -250 );
      this.spotLight2.rotation.y = - Math.PI / 5
      Storage.SceneClasses.exp2.scene.add( this.spotLight2 );
    }

    createBackground() {
      let that = this
      this.vertex_loader.load('glsl/BackgroundVertex.vert', function (vertexGround) {
        that.fragment_loader.load('glsl/BackgroundFragment.frag', function (fragmentGround) {
          const h = 18000;
          const geometry = new THREE.SphereGeometry(h, 32, 32)

          that.backgroundUniforms = THREE.UniformsUtils.merge([
            THREE.ShaderLib.lambert.uniforms,
            { specular: { value: new THREE.Color(0xffffff) } },
            { emissive: { value: new THREE.Color(0x000000) } },
            { shininess : { value: 5 } },
            { hue : { value: 1 } },
            { u_time: { type: "f", value: 1.0 } },
            { u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) } },
            { u_mouse: { type: "v2", value: new THREE.Vector2() } },
            { u_color1: { value: new THREE.Color(0x3B5D9C) } },
            { u_color2: { value: new THREE.Color(0x3B5D9C) } }
          ]);

          let material = new THREE.ShaderMaterial( {
            uniforms: that.backgroundUniforms,
            vertexShader: vertexGround,
            fragmentShader: fragmentGround,
            lights: true,
            fog: true
          } )

          // invert normals
          for ( var i = 0; i < geometry.faces.length; i ++ ) {
            var face = geometry.faces[ i ];
            var temp = face.a;
            face.a = face.c;
            face.c = temp;
          }
          geometry.computeFaceNormals();
          geometry.computeVertexNormals();
          var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
          for ( var i = 0; i < faceVertexUvs.length; i ++ ) {
            var temp = faceVertexUvs[ i ][ 0 ];
            faceVertexUvs[ i ][ 0 ] = faceVertexUvs[ i ][ 2 ];
            faceVertexUvs[ i ][ 2 ] = temp;
          }

          const cube = new THREE.Mesh(geometry, material)
          cube.position.y = h - 15

          Storage.backgroundExp2 = cube
          Storage.SceneClasses.exp2.scene.add(cube)
        })
      })
    }

    createFakeShadow() {
      const h = 8000;
      let geometry = new THREE.SphereGeometry(h, 32, 32)
      let material = new THREE.ShadowMaterial({ side: THREE.DoubleSide, fog: false })
      let fakeShadow = new THREE.Mesh( geometry, material )
      fakeShadow.material.opacity = 0.05
      fakeShadow.position.y = h - 12
      fakeShadow.receiveShadow = true
      Storage.SceneClasses.exp2.scene.add( fakeShadow )
    }

}

export default Ambiance
