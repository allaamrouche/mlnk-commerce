import HoverGallery  from './hoverGallery.js';

export default class Hover {
    constructor() {
        this.init();
    }

    init() {
        const element = document.querySelector('.hover__gallery');
        new HoverGallery (element);
    }
}