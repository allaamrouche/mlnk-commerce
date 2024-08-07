import each from 'lodash/each';
import GSAP from 'gsap';

import { split } from 'utils/text';

import Component from 'classes/Component';


export default class Preloader extends Component{
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        numberText: '.preloader__number__text',
        images: document.querySelectorAll('img')
      }
    })

    this.elements.titleSpans = split({
      element: this.elements.title,
    });

    each(this.elements.titleSpans, element => {
      split({
        append: false,
        element,
        expression: ''
      })
    })

    this.length = 0;
    this.createLoader();  
   
  }

  createLoader() {
    each(this.elements.images, (element) => {
      
      element.onload = (_) => this.onAssetsLoaded(element);
      element.src = element.getAttribute('data-src');
    });

    this.animateIn = GSAP.timeline()

    each(this.elements.titleSpans, (line, index) => {
      const letters = line.querySelectorAll('span');
      if (letters.length > 0) { // Check if there are any spans
          const onStart = _ => {
              GSAP.fromTo(letters, {
                  autoAlpha: 0,
                  display: 'inline-block',
                  y: '100%'
              }, {
                  autoAlpha: 1,
                  delay: 0.2,
                  display: 'inline-block',
                  duration: 1,
                  ease: 'back.inOut',
                  y: '0%'
              });
          };
  
          this.animateIn.fromTo(line, {
              autoAlpha: 0,
              y: '100%'
          }, {
              autoAlpha: 1,
              delay: 0.2 * index,
              duration: 1.5,
              onStart,
              ease: 'expo.inOut',
              y: '0%'
          }, 'start');
      } else {
          console.error("No spans found for line: ", line);
      }
  });
    // each(this.elements.titleSpans, (line, index) => {
    //   const letters = line.querySelectorAll('span')

    //   const onStart = _ => {
    //     GSAP.fromTo(letters, {
    //       autoAlpha: 0,
    //       display: 'inline-block',
    //       y: '100%'
    //     }, {
    //       autoAlpha: 1,
    //       delay: 0.2,
    //       display: 'inline-block',
    //       duration: 1,
    //       ease: 'back.inOut',
    //       // stagger: 0.015,
    //       y: '0%'
    //     })
    //   }

    //   this.animateIn.fromTo(line, {
    //     autoAlpha: 0,
    //     y: '100%'
    //   }, {
    //     autoAlpha: 1,
    //     delay: 0.2 * index,
    //     duration: 1.5,
    //     onStart,
    //     ease: 'expo.inOut',
    //     y: '0%'
    //   }, 'start')
    // })
  }

  onAssetsLoaded() {
      this.length +=1;

    const percent = this.length / this.elements.images.length;
    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`; 
    if (percent === 1) {
      this.onLoaded()
    }
  }
  
  onLoaded() {
    return new Promise(resolve => {
      this.emit('completed')
      this.animateOut = GSAP.timeline({
        delay: 1
      })

      each(this.elements.titleSpans, (line, index) => {
        const letters = line.querySelectorAll('span')
        const onStart = _ => {
          GSAP.to(letters, {
            autoAlpha: 0,
            delay: 0.2,
            display: 'inline-block',
            duration: 2,
            ease: 'back.inOut',
            // stagger: 0.015,
            y: '-100%'
          })
        }

        this.animateOut.to(line, {
          autoAlpha: 0,
          delay: 0.2 * index,
          duration: 2,
          onStart,
          ease: 'expo.inOut',
          y: '-100%'
        }, 'start')
      })

      this.animateOut.to(this.elements.numberText, {
        autoAlpha: 0,
        duration: 1.5
      }, '-=1.4')

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        ease: 'expo.inOut',
        duration: 1
      })

      this.animateOut.call((_) => {
        this.destroy()
      })
    
    })
  }

destroy() {
  this.element.parentNode.removeChild(this.element);
 }
}