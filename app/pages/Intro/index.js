import Page from '../../classes/Page';  

export default class Intro extends Page { 
    constructor() {
     super({
        id: 'intro',
        element: '.intro',
        elements: {
            navigation: '.navigation',
            button: '.intro__link'
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