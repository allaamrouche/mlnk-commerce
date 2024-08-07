import GSAP from 'gsap';
import { map, lerp, clamp, getMousePos } from './utils';


import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

// initialize Splitting
const splitting = Splitting();

import mlnk from '../../../images/mlnk.jpeg';
import mlnk6 from '../../../images/mlnk6.jpeg';
import mlnk7 from '../../../images/mlnk7.jpeg';
import mlnk8 from '../../../images/mlnk8.jpeg';
import mlnk9 from '../../../images/mlnk9.jpeg';
import mlnk11 from '../../../images/mlnk9.jpeg';

const images = [
  mlnk,
  mlnk6,
  mlnk7,
  mlnk8,
  mlnk9,
  mlnk11 
];
// track the mouse position
let mousepos = { x: 0, y: 0};
// cache the mouse position
let mousePosCache = mousepos;
let cursorDirection = {x: mousePosCache.x-mousepos.x, y: mousePosCache.y-mousepos.y};

// update mouse position when moving the mouse
window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

export default class HoverGalleryItem {
    constructor(el, inMenuPosition, animatableProperties) {
        // el is the <a> with class "menu__item"
        this.elements = {el: el};
        console.log(this.elements);
        // position in the Menu
        this.inMenuPosition = inMenuPosition;
        // menu item properties that will animate as we move the mouse around the menu
        this.animatableProperties = animatableProperties;
        // create the image structure and split title texts
        this.layout();
        // initialize some events
        this.initEvents();
    }

    layout() {
        // this is the element that gets its position animated (and perhaps other properties like the rotation etc..)
        this.elements.reveal = document.createElement('div');
        this.elements.reveal.className = 'hover__gallery--reveal';
        this.elements.reveal.style.transformOrigin = '0% 0%';
        // the next two elements could actually be only one, the image element
        // adding an extra wrapper (revealInner) around the image element with overflow hidden, gives us the possibility to scale the image inside
        this.elements.revealInner = document.createElement('div');
        this.elements.revealInner.className = 'hover__gallery--reveal__inner';
        this.elements.revealImage = document.createElement('div');
        this.elements.revealImage.className = 'hover__gallery--reveal__img';
        this.elements.revealImage.style.backgroundImage = `url(${images[this.inMenuPosition]})`;

        this.elements.revealInner.appendChild(this.elements.revealImage);
        this.elements.reveal.appendChild(this.elements.revealInner);
        this.elements.el.appendChild(this.elements.reveal);

        // title text/chars elements
        // text element
        this.elements.textInner = this.elements.el.querySelector('.hover__gallery__item--text');
        this.elements.word = this.elements.textInner.querySelector('.word');
        this.elements.wordClone = this.elements.word.cloneNode(true);
        this.elements.wordClone.classList.add('word--clone');
        this.elements.textInner.appendChild(this.elements.wordClone);
        // all text chars (Splittingjs)
        this.elements.titleChars = [...this.elements.word.querySelectorAll('span.char')];
        this.elements.titleCloneChars = [...this.elements.wordClone.querySelectorAll('span.char')];
    }
    // calculate the position/size of both the menu item and reveal element
    calcBounds() {
        this.bounds = {
            el: this.elements.el.getBoundingClientRect(),
            reveal: this.elements.reveal.getBoundingClientRect(),
            width: this.elements.reveal.offsetWidth,
            height: this.elements.reveal.offsetHeight
        };
    }
    // bind some events
    initEvents() {
        this.mouseenterFn = () => {
            this.hoverTimeout = setTimeout(() => {
                this.hoverEnter = true;
                this.firstRAFCycle = true;
                // calculate position/sizes the first time
                this.calcBounds();

                this.elements.reveal.style.transformOrigin = '100% 0%';
                // animate the title characters
                this.animateCharsIn();
                // show the image element
                this.showImage();

                // start the render loop animation (rAF)
                this.loopRender();
            }, 100);
        }
        this.mouseleaveFn = () => {
            if ( this.hoverTimeout ) {
                clearTimeout(this.hoverTimeout);
            }
            if ( this.hoverEnter ) {
                this.hoverEnter = null;
                // stop the render loop animation (rAF)
                this.stopRendering();
                this.animateCharsOut();
                // hide the image element
                this.hideImage();
            }
        };
        
        this.elements.el.addEventListener('mouseenter', this.mouseenterFn);
        this.elements.el.addEventListener('mouseleave', this.mouseleaveFn);
    }
    animateCharsIn() {
        this.animateCharsTimeline = GSAP.timeline({
            defaults: {duration: 0.5, ease: 'power2', stagger: 0.025}
        })
        .to(this.elements.titleChars, {
            y: '100%',
            rotationX: -90,
            opacity: 0
        })
        .to(this.elements.titleCloneChars, {
            startAt: {y: '-100%', rotationX: 90, opacity: 0},
            y: '0%',
            rotationX: 0,
            opacity: 1
        }, 0);
    }
    animateCharsOut() {
        if ( this.animateCharsTimeline ) this.animateCharsTimeline.kill();
        this.animateCharsTimeline = GSAP.timeline({
            defaults: {duration: 0.5, ease: 'power2', stagger: 0.025}
        })
        .to(this.elements.titleCloneChars, {
            y: '-100%',
            rotationX: 90,
            opacity: 0
        })
        .to(this.elements.titleChars, {
            startAt: {y: '100%', rotationX: -90, opacity: 0},
            y: '0%',
            rotationX: 0,
            opacity: 1
        }, 0);
    }
    // show the image element
    showImage() {
        if (this.tl) {
            this.tl.kill();
        }

        this.tl = GSAP.timeline({
            onStart: () => {
                // show both image and its parent element
                GSAP.set([this.elements.reveal, this.elements.revealInner], {opacity: 1})
                // set a high z-index value so image appears on top of other elements
                GSAP.set(this.elements.el, {zIndex: images.length});
            }
        })
        // animate the image wrap
        .to(this.elements.revealInner, {
            duration: 1.3,
            ease: 'expo',
            startAt: {scale: 0.5},
            scale: 1
        })
        // animate the image element
        .to(this.elements.revealImage, {
            duration: 1.3,
            ease: 'expo',
            startAt: {scaleX: 2},
            scaleX: 1
        }, 0)
        .to(this.elements.reveal, {
            duration: 0.6,
            ease: 'power1.inOut'
        }, 0);
    }
    // hide the image element
    hideImage() {
        if (this.tl) {
            this.tl.kill();
        }

        this.tl = GSAP.timeline({
            defaults: {
                duration: 1.2,
                ease: 'power1',
            },
            onStart: () => {
                GSAP.set(this.elements.el, {zIndex: 1});
            },
            onComplete: () => {
                GSAP.set(this.elements.reveal, {opacity: 0});
            }
        })
        .to(this.elements.revealInner, {
            opacity: 0
        })
        .to(this.elements.revealImage, {
            scaleX: 1.7
        }, 0)
        .to(this.elements.reveal, {
            rotation: cursorDirection.x < 0 ? '+=5' : '-=5',
            y: '200%'
        }, 0);
    }
    // start the render loop animation (rAF)
    loopRender() {
        if ( !this.requestId ) {
            this.requestId = requestAnimationFrame(() => this.render());
        }
    }
    // stop the render loop animation (rAF)
    stopRendering() {
        if ( this.requestId ) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }
    // translate the item as the mouse moves
    render() {
        this.requestId = undefined;

        // calculate the mouse distance (current vs previous cycle)
        const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
        // direction where the mouse is moving
        cursorDirection = {x: mousePosCache.x-mousepos.x, y: mousePosCache.y-mousepos.y};
        // updated cache values
        mousePosCache = {x: mousepos.x, y: mousepos.y};
        
        // new translation values
        this.animatableProperties.tx.current = this.isPositionOdd ? Math.abs(mousepos.x - this.bounds.el.left) : Math.abs(mousepos.x - this.bounds.el.left) - this.bounds.width;
        this.animatableProperties.ty.current = this.firstRAFCycle ? this.bounds.height/1.5 : Math.abs(mousepos.y - this.bounds.el.top);
        // new rotation value
        let startingAngle = -30;  
        // this.animatableProperties.rotation.current = this.firstRAFCycle 
        //                                              ? startingAngle
        //                                              : map(mouseDistanceX, 0, 300, startingAngle, cursorDirection.x < 0 ? startingAngle+100 : startingAngle-100)
        

        // new filter value
        this.animatableProperties.brightness.current = this.firstRAFCycle ? 1 : map(mouseDistanceX,0,100,1,5);

        // set up the interpolated values
        // for the first cycle, both the interpolated values need to be the same so there's no "lerped" animation between the previous and current state
        this.animatableProperties.tx.previous = this.firstRAFCycle ? this.animatableProperties.tx.current : lerp(this.animatableProperties.tx.previous, this.animatableProperties.tx.current, this.animatableProperties.tx.amt);
        this.animatableProperties.ty.previous = this.firstRAFCycle ? this.animatableProperties.ty.current : lerp(this.animatableProperties.ty.previous, this.animatableProperties.ty.current, this.animatableProperties.ty.amt);
        // this.animatableProperties.rotation.previous = this.firstRAFCycle ? this.animatableProperties.rotation.current : lerp(this.animatableProperties.rotation.previous, this.animatableProperties.rotation.current, this.animatableProperties.rotation.amt);
        this.animatableProperties.brightness.previous = this.firstRAFCycle ? this.animatableProperties.brightness.current : lerp(this.animatableProperties.brightness.previous, this.animatableProperties.brightness.current, this.animatableProperties.brightness.amt);
        
        // set styles
        GSAP.set(this.elements.reveal, {
            x: this.animatableProperties.tx.previous,
            y: this.animatableProperties.ty.previous,
            // rotation: this.animatableProperties.rotation.previous,
            //filter: `brightness(${this.animatableProperties.brightness.previous})`
        });

        // loop
        this.firstRAFCycle = false;
        this.loopRender();
    }
}


