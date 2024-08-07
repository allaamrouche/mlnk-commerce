import GSAP from 'gsap'

import Animation from 'classes/Animation'
import { calculate, split } from 'utils/text'
import { each } from 'lodash'

export default class Paragraph extends Animation {
  constructor ({element, elements}) {
    super({
        element,
        elements
    })

    this.elementLinesSpans = split({ element: this.element, append: true})
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({
      delay: 0.4
    })

    this.timelineIn.set(this.element, {
    autoAlpha: 1
   })

   each(this.elementsLines, (line, index) => {
    this.timelineIn.fromTo( line,  {
      autoAlpha: 0,
      y: '100%'
   }, {
      autoAlpha: 1,
      duration: 1.5,
      delay: 0.4 + index * 0.2,
      ease: 'expo.out',
      y: '0%'
    }, 0)
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