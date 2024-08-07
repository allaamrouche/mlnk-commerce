
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { preloadImages } from './utils';
import { Slide } from './slide';
gsap.registerPlugin(Observer);

export default class Slider {
    constructor() {
        this.DOM = {
            slides: [...document.querySelectorAll('.slide')],
            cursor: document.querySelector('.cursor'),
            backCtrl: document.querySelector('.frame__back'),
            navigationItems: document.querySelectorAll('.frame__nav > .frame__nav-button'),
        };
        console.log(this.DOM);
        this.slidesArr = [];
        this.current = -1;
        this.isAnimating = false;
        this.totalSlides = this.DOM.slides.length;
        this.initSlides();
        this.setCurrentSlide(0);
        this.initEvents();
        preloadImages('.slide__img-inner').then(() => {
            document.body.classList.remove('loading');
        });
    }

    initSlides() {
        this.DOM.slides.forEach(slide => {
            this.slidesArr.push(new Slide(slide));
        });
    }

    setCurrentSlide(position) {
        if (this.current !== -1) {
            this.slidesArr[this.current].DOM.el.classList.remove('slide--current');
        }
        this.current = position;
        this.slidesArr[this.current].DOM.el.classList.add('slide--current');
        this.DOM.navigationItems[this.current].classList.add('frame__nav-button--current');
    }

    navigate(newPosition) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.DOM.navigationItems[this.current].classList.remove('frame__nav-button--current');
        this.DOM.navigationItems[newPosition].classList.add('frame__nav-button--current');
        const direction = this.current < newPosition ? (this.current === 0 && newPosition === this.totalSlides - 1 ? 'prev' : 'next') : (this.current === this.totalSlides - 1 && newPosition === 0 ? 'next' : 'prev');
        const currentSlide = this.slidesArr[this.current];
        this.current = newPosition;
        const upcomingSlide = this.slidesArr[this.current];
        this.animateSlides(currentSlide, upcomingSlide, direction);
    }

    animateSlides(currentSlide, upcomingSlide, direction) {
        gsap.timeline({
            defaults: {
                duration: 1.6,
                ease: 'power3.inOut'
            },
            onComplete: () => {
                currentSlide.DOM.el.classList.remove('slide--current');
                if (currentSlide.isOpen) {
                    this.hideContent(currentSlide);
                }
                this.isAnimating = false;
            }
        })
        .addLabel('start', 0)
        .set([currentSlide.DOM.imgInner, upcomingSlide.DOM.imgInner], { transformOrigin: direction === 'next' ? '50% 0%' : '50% 100%' }, 'start')
        .set(upcomingSlide.DOM.el, { yPercent: direction === 'next' ? 100 : -100 }, 'start')
        .set(upcomingSlide.DOM.inner, { yPercent: direction === 'next' ? -100 : 100 }, 'start')
        .add(() => upcomingSlide.DOM.el.classList.add('slide--current'), 'start')
        .to(currentSlide.DOM.el, { yPercent: direction === 'next' ? -100 : 100 }, 'start')
        .to(currentSlide.DOM.imgInner, { scaleY: 2 }, 'start')
        .to([upcomingSlide.DOM.el, upcomingSlide.DOM.inner], { yPercent: 0 }, 'start')
        .to(upcomingSlide.DOM.imgInner, { ease: 'power2.inOut', startAt: { scaleY: 2 }, scaleY: 1 }, 'start');
    }

    showContent(position) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const slide = this.slidesArr[position];
        slide.isOpen = true;
        gsap.timeline({
            defaults: {
                duration: 1.6,
                ease: 'power3.inOut'
            },
            onStart: () => {
                // Code for onStart
            },
            onComplete: () => {
                this.isAnimating = false;
            }
        })
        .addLabel('start', 0)
        .add(() => {
            // If toggleCursorBackTexts is supposed to be a method of Slider, use this.toggleCursorBackTexts('content');
            // Otherwise, make sure toggleCursorBackTexts is appropriately defined and accessible.
        }, 'start')
        .to(slide.DOM.img, {
            yPercent: -100
        }, 'start')
        .set(slide.DOM.imgInner, {
            transformOrigin: '50% 100%'
        }, 'start')
        .to(slide.DOM.imgInner, {
            yPercent: 100,
            scaleY: 2
        }, 'start')
        .to(slide.DOM.contentImg, {
            startAt: {
                transformOrigin: '50% 0%',
                scaleY: 1.5
            },
            scaleY: 1
        }, 'start');
    }
    
    
    
    hideContent(slide, animate = false) {
        this.isAnimating = true;
    
        const complete = () => {
            slide.isOpen = false;
           
            this.isAnimating = false;
        };
    
        if (animate) {
            gsap.timeline({
                defaults: {
                    duration: 1.6,
                    ease: 'power3.inOut'
                },
                onComplete: complete
            })
            .addLabel('start', 0)
            .to(slide.DOM.img, {
                yPercent: 0
            }, 'start')
            .to(slide.DOM.imgInner, {
                yPercent: 0,
                scaleY: 1
            }, 'start');
        } else {
            gsap.set(slide.DOM.img, {
                yPercent: 0
            });
            gsap.set(slide.DOM.imgInner, {
                yPercent: 0,
                scaleY: 1
            });
            complete();
        }
    }
    

    initEvents() {
        this.DOM.navigationItems.forEach((item, position) => {
            item.addEventListener('click', () => {
                if (this.current === position || this.isAnimating) return;
                this.navigate(position);
            });
        });

        this.DOM.backCtrl.addEventListener('click', () => {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.hideContent(this.slidesArr[this.current], true);
        });

        Observer.create({
            type: 'touch,pointer',
            onDown: () => !this.isAnimating && this.prev(),
            onUp: () => !this.isAnimating && this.next(),
            wheelSpeed: -1,
            tolerance: 10
        });

        this.slidesArr.forEach((slide, position) => {
            slide.DOM.img.addEventListener('click', () => {
                this.showContent(position);
            });
        });
    }

    next() {
        const newPosition = this.current < this.totalSlides - 1 ? this.current + 1 : 0;
        this.navigate(newPosition);
    }

    prev() {
        const newPosition = this.current > 0 ? this.current - 1 : this.totalSlides - 1;
        this.navigate(newPosition);
    }

    
}


