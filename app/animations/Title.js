import GSAP from 'gsap'

import Animation from 'classes/Animation'
import { calculate, split } from 'utils/text'
import { each } from 'lodash'

export default class Title extends Animation {
  constructor ({element, elements}) {
    super({
        element,
        elements
    })

    split({ element: this.element, append: true })

    this.elementLinesSpans = this.element.querySelectorAll('span')

    each(this.elementLinesSpans, element => {
      split({
        append: false,
        element,
        expression: ''
      })
    })

  }

  animateIn() {
    this.timelineIn = GSAP.timeline({
      delay: 0.2
    })

    this.timelineIn.set(this.element, {
    autoAlpha: 1
   })

  each(this.elementLinesSpans, (line, index) => {
    const letters = line.querySelectorAll('span')

    const onStart = _ => {
      GSAP.fromTo(letters, {
        autoAlpha: 0,
        display: 'inline-block',
        y: '100%'
      }, {
        autoAlpha: 1,
        delay: 0.1,
        display: 'inline-block',
        duration: 1,
        ease: 'back.inOut',
        stagger: 0.015,
        y: '0%'
      })
    }

    this.timelineIn.fromTo(line, {
      autoAlpha: 0,
      y: '100%'
    }, {
      autoAlpha: 1,
      delay: 0.1 * index,
      duration: 1.5,
      onStart,
      ease: 'expo.inOut',
      y: '0%'
    }, 'start')
  })
  }

  animateOut() {
    GSAP.set(this.element, {
    autoAlpha: 0
})
}

onResize () {
  this.elementsLines = calculate(this.elementLinesSpans)
}
}