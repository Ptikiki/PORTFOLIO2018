import anime from 'animejs'

class Titles {
  constructor() {
    this.title = document.querySelector('.chapters-title span')
  }

  animeTitle = (title) => {
    this.title.innerText = title

    let timeline = anime.timeline();

    timeline
      .add({
        targets: this.title,
        opacity: 1,
        scale: 1,
        duration: 600,
        easing: 'easeOutQuad'
      })
      .add({
        targets: this.title,
        opacity: 0,
        scale: 1.2,
        duration: 300,
        delay: 800,
        easing: 'easeInQuad'
      })
      .add({
        targets: this.title,
        scale: .4,
        duration: 0,
        delay: 500, 
        complete: () => { this.title.innerText = '' }
      })
  }
}

export default Titles
