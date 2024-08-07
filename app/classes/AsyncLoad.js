// import Component from '../classes/Component'

// export default class AsyncLoad extends Component {
//   constructor ({ element }) {
//     super({ element })

//     this.createObserver()
//   }

//   createObserver() {
//     this.observer = new window.IntersectionObserver( entries => {
//        entries.forEach(entry => {
//            if (entry.isIntersecting) {
//            if(!this.element.src) {
//              this.element.src = this.element.getAttribute('data-src')
//              this.element.classList.add('loaded')        
//           }
//           }
//        })
//     })

//     this.observer.observe(this.element)
//    }
// }

import Component from '../classes/Component';

export default class AsyncLoad extends Component {
    constructor({ element }) {
        super({ element });

        this.createObserver();
    }

    createObserver() {
        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Check for intersection and also if the image hasn't been loaded yet.
                if (entry.isIntersecting) {
                    this.loadImage();
                }
            });
        }, { threshold: 0.01 }); // Consider setting a threshold

        this.observer.observe(this.element);

        // Moved from the constructor to here to ensure observer is set up before checking.
        this.checkAndLoadIfInView();
    }

    loadImage() {
        // Assuming 'data-src' is always present and 'src' is initially empty/unset.
        this.element.src = this.element.getAttribute('data-src');
        this.element.classList.add('loaded');
    }

    checkAndLoadIfInView() {
        const { top, bottom } = this.element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // Directly using 'loadImage' if element is initially in the viewport.
        if (top < viewportHeight && bottom >= 0 && !this.element.src) {
            this.loadImage();
        }
    }
}
