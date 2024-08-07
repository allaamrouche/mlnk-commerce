import { gsap } from 'gsap';
import HoverGalleryItem from './hoverGalleryItem';

export default class HoverGallery {
    constructor(el) {
        this.elements = {el: el};
        // the menu item elements (<a>)
        this.elements.menuItems = this.elements.el.querySelectorAll('.hover__gallery__item');
        // menu item properties that will animate as we move the mouse around the menu
        // we will be using interpolation to achieve smooth animations. 
        // the “previous” and “current” values are the values to interpolate. 
        // the value applied to the element, this case the image element (this.elements.reveal) will be a value between these two values at a specific increment. 
        // the amt is the amount to interpolate.
        this.animatableProperties = {
            // translationX
            tx: {previous: 0, current: 0, amt: 0.15},
            // translationY
            ty: {previous: 0, current: 0, amt: 0.15},
            // Rotation angle
            rotation: {previous: 0, current: 0, amt: 0.15},
            // CSS filter (brightness) value
            brightness: {previous: 1, current: 1, amt: 0.06}
        };
        // array of MenuItem instances
        this.menuItems = [];
        // initialize the MenuItems
        [...this.elements.menuItems].forEach((item, pos) => this.menuItems.push(new HoverGalleryItem(item, pos, this.animatableProperties)));
        // show the menu items (initial animation where each menu item gets revealed)
        this.showMenuItems();
    }
    // initial animation for revealing the menu items
    showMenuItems() {
        const innerTexts = this.menuItems.map(item => item.elements.textInner);

        gsap.timeline()
        .set(innerTexts, {x: '20%', opacity: 0})
        .to(innerTexts, {
            duration: 1,
            ease: 'power3',
            x: '0%',
            stagger: 0.05
        })
        .to(innerTexts, {
            duration: 0.4,
            ease: 'power1',
            opacity: 1,
            stagger: 0.05
        }, 0);
    }
}