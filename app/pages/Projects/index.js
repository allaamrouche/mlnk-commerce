import Page from '../../classes/Page';  

export default class Projects extends Page {
    constructor() {
       super({
        id: 'projects',
        element: '.projects',
        elements: {
            wrapper: '.projects__wrapper',
            navigation: '.navigation'
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