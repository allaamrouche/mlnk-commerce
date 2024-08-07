import Page from '../../classes/Page';  

export default class Collections extends Page {      
    constructor() {
       super({
        id: 'collections',
        element: '.collections',
        elements: {
            navigation: '.navigation',
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