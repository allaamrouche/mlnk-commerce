import Page from '../../classes/Page';  

export default class About extends Page {
    constructor() {
       super({
        id: 'about',
        element: '.about',
        elements: {
            wrapper: '.about__wrapper',
            navigation: '.navigation',
            figures: '.about__gallery__media',
            medias: '.about__categories__title__image',
            title: '.about__title'
        }
    });
    }
    create () {
        super.create();
    }

    destroy() {
        super.destroy();
    }
}