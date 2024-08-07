import GSAP from 'gsap';
import NavigatonItem  from './navigatonItem';

import { gsap } from 'gsap';

export default class NavigationOverlay {
    constructor() {
        this.navigationOverlay = document.querySelector('.navigation__overlay');
        this.toggleButton = document.getElementById('navigation__overlay--toggle');
        const navigationItems = this.navigationOverlay.querySelectorAll('.navigation__overlay__item');
        
        this.animatableProperties = {
            tx: {previous: 0, current: 0, amt: 0.08},
            ty: {previous: 0, current: 0, amt: 0.08},
            rotation: {previous: 0, current: 0, amt: 0.08},
            brightness: {previous: 1, current: 1, amt: 0.08}
        };

       
        this.navigationItems = [];
        navigationItems.forEach((item, pos) => {
            this.navigationItems.push(new NavigatonItem(item, pos, this.animatableProperties));
        });

        this.initEvents();
        this.shownavigationItems();
        this.prepareMenuAnimations();
    }
    
    initEvents() {
        this.toggleButton.addEventListener('click', () => {
            const isOpen = this.navigationOverlay.classList.contains('active');
            if (isOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        });
    }

    toggleMenu() {
        const isOpen = this.navigationOverlay.classList.contains('active');
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    shownavigationItems() {
        GSAP.to(this.navigationItems.map(item => item.DOM.textInner), {
            duration: 1.2,
            ease: 'Expo.easeOut',
            startAt: {y: '100%'},
            y: 0,
            stagger: 0.06
        });
    }

    prepareMenuAnimations() {
        this.openAnimation = GSAP.timeline({ paused: true })
            .fromTo(this.navigationOverlay, {
                yPercent: -100,
                autoAlpha: 0
            }, {
                yPercent: 0,
                autoAlpha: 1,
                duration: 1.5,
                ease: 'expo.inOut',
                onStart: () => this.navigationOverlay.classList.add('active'),
                onComplete: () => this.toggleButton.textContent = 'Close'
            })
           
            .from(this.navigationItems.map(item => item.DOM.el), {
                y: 20,
                autoAlpha: 0,
                stagger: 0.05, 
                ease: 'expo.out',
                duration: 0.7,
            }, "-=1"); 
    
        this.closeAnimation = GSAP.timeline({ paused: true })
            .to(this.navigationItems.map(item => item.DOM.el), {
                y: -20, 
                autoAlpha: 0,
                stagger: 0.05, 
                ease: 'expo.in',
                duration: 0.7,
            })
            .to(this.navigationOverlay, {
                yPercent: -100,
                autoAlpha: 0,
                duration: 1.5,
                ease: 'expo.inOut',
                onStart: () => this.navigationOverlay.style.transformOrigin = '100% 0%',
                onComplete: () => {
                    this.navigationOverlay.classList.remove('active');
                    this.toggleButton.textContent = 'Menu';
                    this.navigationOverlay.style.transformOrigin = '';
                }
            }, "+=0.5"); 
    }

    openMenu() {
        if (!this.navigationOverlay.classList.contains('active')) {
            this.openAnimation.restart();
        }
    }

    closeMenu() {
        if (this.navigationOverlay.classList.contains('active')) {
            this.closeAnimation.restart();
        }
    }
}

