import Component from "classes/Component";

export default class Animation extends Component {    
    constructor({ element, elements }) {
        super({
            element,
            elements
        })
       
        this.createObserver()

        this.animateOut()
    }

    createObserver() {
        const options = {
            root: null, 
            rootMargin: '0px', 
            threshold: 0.1
        };
    
        this.observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateIn();
                } else {
                    this.animateOut();
                }
            });
        }, options);
    
        this.observer.observe(this.element);
    }

    animateIn() {
  
    }

    animateOut() {
      
    }

    onResize(){}
}


  // createObserver () {
    //    this.observer = new window.IntersectionObserver(entries => {
    //       entries.forEach(entry => {
    //           if (entry.isIntersecting) {
    //               this.animateIn()
    //           } else {
    //               this.animateOut()
    //           }
    //       })
    //    })

    //    this.observer.observe(this.element)
    // }
