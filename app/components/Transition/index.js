import { gsap } from 'gsap';
import { Item } from './item';
import { Preview } from './preview';

export default class Transition {
    constructor() {
        this.init();
    
    }

    init() {
     
        // body element
        this.body = document.body;

       
        this.contentEl = document.querySelector('.transition__content');

        // frame element
        this.frameEl = document.querySelector('.frame');

        // top and bottom overlay elements
        this.overlayRows = [...document.querySelectorAll('.overlay__row')];

        // Preview instances array
        this.previews = [];
        [...document.querySelectorAll('.preview')].forEach(preview => this.previews.push(new Preview(preview)));

        // Item instances array
        this.items = [];
        [...document.querySelectorAll('.item')].forEach((item, pos) => {
            const newItem = new Item(item, this.previews[pos]);
            this.items.push(newItem);
            // Opens the item preview
            newItem.DOM.link.addEventListener('click', () => this.openItem(newItem));
            // Closes the item preview
            newItem.preview.DOM.backCtrl.addEventListener('click', () => this.closeItem(newItem));
        });
    }

    openItem(item) {
        gsap.timeline({
            defaults: {
                duration: 1, 
                ease: 'power3.inOut'
            }
        })
        .add(() => {
            // pointer events none to the content
            this.contentEl.classList.add('transition__content--hidden');
        }, 'start')

        .addLabel('start', 0)
        .set([item.preview.DOM.innerElements, item.preview.DOM.backCtrl], {
            opacity: 0
        }, 'start')
        .to(this.overlayRows, {
            scaleY: 1
        }, 'start')

        .addLabel('content', 'start+=0.6')

        .add(() => {
            this.body.classList.add('preview-visible');

            gsap.set(this.frameEl, {
                opacity: 0
            }, 'start')
            item.preview.DOM.el.classList.add('preview--current');
        }, 'content')
        // Image animation (reveal animation)
        .to([item.preview.DOM.image, item.preview.DOM.imageInner], {
            startAt: {y: pos => pos ? '101%' : '-101%'},
            y: '0%'
        }, 'content')
        
        .add(() => {
            for (const line of item.preview.multiLines) {
                line.in();
            }
            gsap.set(item.preview.DOM.multiLineWrap, {
                opacity: 1,
                delay:0.1
            })
        }, 'content')
        // animate frame element
        .to(this.frameEl, {
            ease: 'expo',
            startAt: {y: '-100%', opacity: 0},
            opacity: 1,
            y: '0%'
        }, 'content+=0.3')
        .to(item.preview.DOM.innerElements, {
            ease: 'expo',
            startAt: {yPercent: 101},
            yPercent: 0,
            opacity: 1
        }, 'content+=0.3')
        .to(item.preview.DOM.backCtrl, {
            opacity: 1
        }, 'content');
    }

    closeItem(item) {
        gsap.timeline({
            defaults: {
                duration: 1, 
                ease: 'power3.inOut'
            }
        })
        .addLabel('start', 0)
        .to(item.preview.DOM.innerElements, {
            yPercent: -101,
            opacity: 0,
        }, 'start')
        .add(() => {
            for (const line of item.preview.multiLines) {
                line.out();
            }
        }, 'start')
        
        .to(item.preview.DOM.backCtrl, {
            opacity: 0
        }, 'start')

        .to(item.preview.DOM.image, {
            y: '101%'
        }, 'start')
        .to(item.preview.DOM.imageInner, {
            y: '-101%'
        }, 'start')
        
        // animate frame element
        .to(this.frameEl, {
            opacity: 0,
            y: '-100%',
            onComplete: () => {
                this.body.classList.remove('preview-visible');
                gsap.set(this.frameEl, {
                    opacity: 1,
                    y: '0%'
                })
            }
        }, 'start')

        .addLabel('grid', 'start+=0.6')

        .to(this.overlayRows, {
            scaleY: 0,
            onComplete: () => {
                item.preview.DOM.el.classList.remove('preview--current');
                this.contentEl.classList.remove('transition__content--hidden');
            }
        }, 'grid');
    }
}
