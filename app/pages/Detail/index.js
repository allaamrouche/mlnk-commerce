import Page from '../../classes/Page';  

export default class Detail extends Page {
    constructor() {
        super({
            id: 'detail',
            element: '.detail',
            elements: {
              button: '.detail__button',
              wrapper: '.detail__wrapper',
              navigation: '.navigation'
            }
    });
    }

    create () {
        super.create();
        // if (this.elements.button) {
        // this.button = new Button({
        //     element: this.elements.button
        // });
    // }
    }

    destroy() {
        super.destroy();
        // this.button.removeEventListeners();
    }
} 
 