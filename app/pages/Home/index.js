import Page from '../../classes/Page';  

export default class Home extends Page { 
    constructor() {
     super({
        id: 'home',
        element: '.home',
        elements: {
            navigation: '.navigation',
            button: '.home__link'
        }   
    });
    }

    create() {
        super.create();
    }

    destroy() {
        super.destroy();
    }
}