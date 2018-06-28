import anime from 'animejs'

class Viseur {
    constructor(options) {
		Storage.ViseurClass = this

        this.container = document.querySelector( '.viseur_container' )
        this.parallaxBox = document.querySelector( '#box' )

        this.c0left = document.querySelector( '#box' ).offsetLeft
        this.c0top = document.querySelector( '#box' ).offsetTop
        this.c1left = document.querySelector( '#l1' ).offsetLeft
        this.c1top = document.querySelector( '#l1' ).offsetTop
        this.c2left = document.querySelector( '#l2' ).offsetLeft
        this.c2top = document.querySelector( '#l2' ).offsetTop
        this.c3left = document.querySelector( '#l3' ).offsetLeft
        this.c3top = document.querySelector( '#l3' ).offsetTop

        this.centerCircle = document.querySelector( '#center_circle' )
        this.centerCircleLink = document.querySelector( '#center_circle_link' )

        this.fond = document.querySelector( '#fond_tmp' )

		this.bind()
    }

    bind = () => {
        this.parallaxBox.addEventListener('mousemove', this.onMouseMove)
        this.centerCircle.addEventListener('mouseover', this.onMouseOver)
        this.centerCircle.addEventListener('mouseleave', this.onMouseLeave)
        this.centerCircleLink.addEventListener('click', this.onClick)
    }
    unbind = () => {
        this.parallaxBox.removeEventListener('mousemove', this.onMouseMove)
        this.centerCircle.removeEventListener('mouseover', this.onMouseOver)
        this.centerCircle.removeEventListener('mouseleave', this.onMouseLeave)
        this.centerCircleLink.removeEventListener('click', this.onClick)
    }

    onMouseMove = (event) => {
        event = event || window.event
        let x = event.clientX,
        y = event.clientY
        
        this.mouseParallax ( 'box', this.c0left, this.c0top, x, y, 30 )
        this.mouseParallax ( 'l1', this.c1left, this.c1top, x, y, 700 )
        this.mouseParallax ( 'l2', this.c2left, this.c2top, x, y, 350 )
        this.mouseParallax ( 'l3', this.c3left, this.c3top, x, y, 80 )
    }

    mouseParallax = ( id, left, top, mouseX, mouseY, speed ) => {
        let obj = document.getElementById ( id )
        let parentObj = obj.parentNode
        let containerWidth = parseInt( parentObj.offsetWidth )
        let containerHeight = parseInt( parentObj.offsetHeight )

        obj.style.left = left + ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 20+ left ) ) / containerWidth ) * speed ) + 'px'
        obj.style.top = top + ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 20 + top ) ) / containerHeight ) * speed ) + 'px'
    }

    onMouseOver = (event) => {
        this.centerCircle.style.opacity = 0.5
        this.fond.style.opacity = 0
    }
    onMouseLeave = (event) => {
        this.centerCircle.style.opacity = 0
        this.fond.style.opacity = 1
    }
    onClick = (event) => {
        let that = this
        this.unbind()

        anime({
            targets: this.container,
            opacity: ['1', '0'],
            duration: 1000,
            easing: 'linear',
            complete: function() { that.container.style.display = "none" }
        })
    }

}

export default Viseur
