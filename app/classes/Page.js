
import GSAP from 'gsap';
import each from 'lodash/each'; 
import map from 'lodash/map';

import Prefix from 'prefix'; 


import AsyncLoad from 'classes/AsyncLoad'

import { ColorsManager } from 'classes/Colors';
import { mapEach } from 'utils/dom'

import Title from '../animations/Title';
import Paragraph from '../animations/Paragraph';
import Parallax from '../animations/Parallax'
import Marquee from '../animations/Marquee';
import Translate from '../animations/Translate';
import Heading from '../animations/Heading';
import Magnetic from '../animations/Magnetic';
import Reveal from '../animations/Reveal';

export default class Page {
  constructor({
    element,
    elements,
    id
}) {
    this.selector = element;
    
    this.selectorChildren = { 
      ...elements,
      animationsTitles: '[data-animation="title"]',
      animationsHeadings: '[data-animation="heading"]',
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsParallaxes: '[data-animation="parallax"]',
      animationsMarquees: '[data-animation="marquee"]',
      animationsTranslate: '[data-animation="translate"]',
      animationsRotations: '[data-animation="rotation"]',
      animationsMagnetics: '[data-animation="magnetic"]',
      animationsReveals: '[data-animation="reveal"]',
      preloaders: '[data-src]'
    };  
   
    this.id = id;
    
    this.transformPrefix = Prefix('transform'); 
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }

  
    this.transformPrefix = Prefix('transform');
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

      this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }
  
    Object.entries(this.selectorChildren).forEach(([key, selector]) => {
      if (typeof selector === 'string') {
        const foundElements = document.querySelectorAll(selector);
        // Assign directly if it is known there should only be one element, otherwise as an array
        this.elements[key] = foundElements.length === 1 && key === 'wrapper' ? foundElements[0] : Array.from(foundElements);
      } else {
        console.error('Invalid selector type for:', key, selector);
      }
    });
  
    this.createAnimations();
    this.createPreloaders();
  }

 

  createAnimations() {
    this.animations = []; 
  
    // Animation for Titles
    if (this.elements.animationsTitles) {
      this.animationsTitles = this.elements.animationsTitles.map(element => {
        return new Title({ element });
      });
      this.animations.push(...this.animationsTitles);
    }
  
    // Animation for Headings
    if (this.elements.animationsHeadings) {
      this.animationsHeadings = this.elements.animationsHeadings.map(element => {
        return new Heading({ element });
      });
      this.animations.push(...this.animationsHeadings);
    }
  
    // Animation for Paragraphs
    if (this.elements.animationsParagraphs) {
      this.animationsParagraphs = this.elements.animationsParagraphs.map(element => {
        return new Paragraph({ element });
      });
      this.animations.push(...this.animationsParagraphs);
    }
  
    // Animation for Reveals
    // if (this.elements.animationsReveals) {
    //   this.animationsReveals = this.elements.animationsReveals.map(element => {
    //     return new Reveal({ element });
    //   });
    //   this.animations.push(...this.animationsReveals);
    // }
    if (this.elements.animationsReveals) {
      this.animationsReveals = this.elements.animationsReveals.map(element => {
          // Example to ensure correct passing of element and elements
          return new Reveal({
              element,
              elements: { // Pass additional child elements if needed
               
                revealInner: element.querySelector('.element__reveal__inner'),
                  revealImage: element.querySelector('.element__reveal__img')
              }
          });
      });
      this.animations.push(...this.animationsReveals);
  }
  
    // Animation for Parallaxes
    if (this.elements.animationsParallaxes) {
      this.animationsParallaxes = this.elements.animationsParallaxes.map(element => {
        return new Parallax({ element });
      });
      this.animations.push(...this.animationsParallaxes);
    }
  
    // Animation for Marquees
    if (this.elements.animationsMarquees) {
      this.animationsMarquees = this.elements.animationsMarquees.map(element => {
        const elements = { items: Array.from(element.querySelectorAll('.booking__content--title')) };
        const marquee = new Marquee({ element, elements });
        marquee.enable();
        return marquee;
      });
      this.animations.push(...this.animationsMarquees);
    }
  
    // Animation for Translations
    if (this.elements.animationsTranslate) {
      this.animationsTranslate = this.elements.animationsTranslate.map(element => {
        return new Translate({ element });
      });
      this.animations.push(...this.animationsTranslate);
    }
  
    // Animation for Magnetics
    if (this.elements.animationsMagnetics) {
      this.animationsMagnetics = this.elements.animationsMagnetics.map(element => {
        const elements = {
          text: element.querySelector('span'),
        };
        return new Magnetic({ element, elements });
      });
      this.animations.push(...this.animationsMagnetics);
    }
  }
  

  createPreloaders () {
    this.preloaders = map(this.elements.preloaders, element => {
      return new AsyncLoad({
        element
      })
    })
  }

  show() {
  return new Promise(resolve => {    
    ColorsManager.change({
      backgroundColor: this.element.getAttribute('data-background'),
      color: this.element.getAttribute('data-color')
    })
    this.animationIn = GSAP.timeline();

    this.animationIn.fromTo(this.element, {
      autoAlpha: 0
    }, {
      autoAlpha: 1
    })

    this.animationIn.call(_ => {
      this.addEventListeners(); 
      resolve();
    })
   })
  
  }

  hide() {
    return new Promise(resolve => {    
      this.destroy();
      this.animateOut = GSAP.timeline();

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
     })
  } 

  onWheel (event) {
    const { deltaY } = event;

    this.scroll.target += deltaY;
    
    each(this.animations, animation => {
      if (animation.onWheel) {
        animation.onWheel(event);
      }
    });
  }

   onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight;
    }

    each(this.animations, animation => {
      if (animation.onResize) {
        animation.onResize();
      }
    });
}

//   update() {
//     this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target);
//     this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1);
//     if(this.scroll.current < 0.01) {
//       this.scroll.current = 0;
//   }
    
//     if(this.elements.wrapper ) {
//       this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`;
//     }

//     each(this.animations, animation => {
//       animation.update && animation.update(this.scroll);
//     });
// }

update() {
  this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target);
  this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1);
  if (this.scroll.current < 0.01) {
    this.scroll.current = 0;
  }

  // Check if wrapper is defined and is an HTMLElement
  if (this.elements.wrapper instanceof HTMLElement) {
    this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`;
  } 
  // Assuming 'each' is a function similar to Array.forEach
  this.animations.forEach(animation => {
    if (animation.update) {
      animation.update(this.scroll);
    }
  });
}

  addEventListeners() {
   
  }

  removeEventListeners() {
    
  } 

  destroy() {
    this.removeEventListeners();
  }
}