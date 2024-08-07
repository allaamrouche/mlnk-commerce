import Component from "../../classes/Component";
import{ COLOR_BRIGHT_GRAY, COLOR_WHITE, COLOR_CARARRA, COLOR_DUSK} from "../../utils/colors";    


import GSAP from 'gsap';

export default class Navigation extends Component {
    constructor({template}) {
       super({
          element: '.navigation',
          elements: {
             items: '.navigation__list__item',
             links: '.navigation__list__link'
          }
       });
 
       // Only call onChange if there are navigation items present
       if (this.elements.items && this.elements.items.length > 0) {
         this.onChange(template);
       }
    }
 
    onChange(template) {
     // Ensure that there are at least two items to apply specific animations
     if (this.elements.items.length >= 2) {
         if (template === 'about') {
             GSAP.to(this.elements.items[0], {
                 autoAlpha: 1
             });
 
             GSAP.to(this.elements.items[1], {
                 autoAlpha: 0
             });
         } else {
             GSAP.to(this.elements.items[0], {
                 autoAlpha: 0
             });
 
             GSAP.to(this.elements.items[1], {
                 autoAlpha: 1
             });
         }
     }
    }
 }
// export default class Navigation extends Component {
//    constructor({template}) {
//       super({
//          element: '.navigation',
//          elements: {
//             items: '.navigation__list__item',
//             links: '.navigation__list__link'
//          }
//       })
//       this.onChange(template)
//    }

//    onChange(template) {
//     if (template === 'about') {
//         // GSAP.to(this.element, {
//         //     backgroundColor: COLOR_CARARRA,
//         //     color: COLOR_BRIGHT_GRAY,
//         //     duration: 1.5
//         // })

//         GSAP.to(this.elements.items[0], {
//             autoAlpha: 1
//         })

//         GSAP.to(this.elements.items[1], {
//             autoAlpha: 0
//         })

//     } else  {
//         // GSAP.to(this.element, {
//         //     backgroundColor: COLOR_DUSK,
//         //     color: COLOR_WHITE,
//         //     duration: 1.5
//         // })
//         GSAP.to(this.elements.items[0], {
//             autoAlpha: 0
//         })

//         GSAP.to(this.elements.items[1], {
//             autoAlpha: 1
//         })

//     }
  
//    }
// }