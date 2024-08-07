import Animation from 'classes/Animation';
import GSAP from "gsap";

export default class Reveal extends Animation {
    constructor({ element, elements }) {
        super({ element, elements });

        // Initial settings for the image
        GSAP.set(elements.revealImage, {
            opacity: 0,
            scale: 0.5,
            scaleX: 2,
            zIndex: 1
        });

        // Initial settings for the inner div
        GSAP.set(elements.revealInner, {
            opacity: 0,
            scale: 0.5
        });

        // Properties to be animated towards
        this.target = {
            img: {
                opacity: 1,
                scale: 1,
                scaleX: 1
            },
            inner: {
                opacity: 1,
                scale: 1
            }
        };
    }

    animateIn() {
      if (this.tl) {
        this.tl.kill();
    }

    this.tl = GSAP.timeline({
        onStart: () => {
            // show both image and its parent element
            GSAP.set([this.element, this.elements.revealInner], {opacity: 1})
            
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
    .to(this.element, {
        duration: 0.6,
        ease: 'power1.inOut'
    }, 0);
    }

    animateOut() {
      if (this.tl) {
        this.tl.kill();
    }

    this.tl = GSAP.timeline({
        defaults: {
            duration: 1.2,
            ease: 'power1',
        },
        onStart: () => {
            GSAP.set(this.element, {zIndex: 1});
        },
        onComplete: () => {
            GSAP.set(this.element, {opacity: 0});
        }
    })
    .to(this.elements.revealInner, {
        opacity: 0
    })
    .to(this.elements.revealImage, {
        scaleX: 1.7
    }, 0)
    
    }

    update() {
        // Continuously interpolate towards target values for smooth animations for the image
        const currentScale = parseFloat(GSAP.getProperty(this.elements.revealImage, "scale"));
        const currentOpacity = parseFloat(GSAP.getProperty(this.elements.revealImage, "opacity"));
        const currentScaleX = parseFloat(GSAP.getProperty(this.elements.revealImage, "scaleX"));

        GSAP.to(this.elements.revealImage, {
            scale: GSAP.utils.interpolate(currentScale, this.target.img.scale, 0.2),
            opacity: GSAP.utils.interpolate(currentOpacity, this.target.img.opacity, 0.2),
            scaleX: GSAP.utils.interpolate(currentScaleX, this.target.img.scaleX, 0.2),
            ease: "none",
            duration: 0.05
        });

        // Continuously interpolate towards target values for smooth animations for the inner div
        const currentInnerScale = parseFloat(GSAP.getProperty(this.elements.revealInner, "scale"));
        const currentInnerOpacity = parseFloat(GSAP.getProperty(this.elements.revealInner, "opacity"));

        GSAP.to(this.elements.revealInner, {
            scale: GSAP.utils.interpolate(currentInnerScale, this.target.inner.scale, 0.2),
            opacity: GSAP.utils.interpolate(currentInnerOpacity, this.target.inner.opacity, 0.2),
            ease: "none",
            duration: 0.05
        });
    }
}





