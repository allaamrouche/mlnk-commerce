import { Texture, Program, Mesh, Transform } from 'ogl';
import GSAP from 'gsap'

import Component from 'classes/Component'

import fragment from '../../shaders/collections-fragment.glsl'
import vertex from '../../shaders/collections-vertex.glsl'

export default class Media extends Component  {    
    constructor ({ detail, element, geometry, gl, index, scene, sizes, url, detailUrl}) {
        super({
          element,
          elements: {
            image: '.collections__gallery__media__image'
          }
        })

        this.index = index
        this.gl = gl
        this.geometry = geometry
        this.scene = scene  
        this.sizes = sizes
        this.url = url;
        this.detailUrl = detailUrl;

        this.animation = 0
        this.group = new Transform()
        this.frame = 0

        this.extra = {
            x: 0,   
            y:  0
        }

        this.opacity = {
              current: 0,
              target: 0,
              lerp: 0.1,
              multiplier: 0
            }

            this.createJewelry()
            this.createModel()
        
            this.createBounds({
              sizes: this.sizes
            })
        
            this.original = (-this.sizes.width / 2) + (this.jewelry.scale.x / 2) + (this.x * this.sizes.width)
        
            this.group.setParent(this.scene)

    }

    createTexture(imageElement, attribute) {
            const texture = new Texture(this.gl);
            const image = new window.Image();
            image.crossOrigin = 'anonymous';
            image.src = imageElement.getAttribute(attribute);
            image.onload = () => {
                texture.image = image;
                texture.needsUpdate = true;
            };
            return texture;
        }

    createJewelry () {
            const texture = this.createTexture(this.elements.image, 'data-src'); 
            const program = new Program(this.gl, {
              fragment,
              vertex,
              uniforms: {
                uAlpha: { value: 1 },
                tMap: { value: texture }
              }
            });

            this.jewelry = new Mesh(this.gl, {
              geometry: this.geometry,
              program
            })

            this.jewelry.index = this.index

            this.jewelry.setParent(this.group)
          }

    createModel() {
            const texture = this.createTexture(this.elements.image, 'data-model-src'); 
            const program = new Program(this.gl, {
              fragment,
              vertex,
              uniforms: {
                uAlpha: { value: 1 },
                tMap: { value: texture }
              }
            });

            this.model = new Mesh(this.gl, {
              geometry: this.geometry,
              program
            });

            this.model.rotation.y = Math.PI;
            this.model.setParent(this.group);
        }

    createBounds({ sizes }) {
        this.sizes = sizes
        this.bounds = this.element.getBoundingClientRect()
        
        this.updateScale()
        this.updateX()
        this.updateY()
    }

    show() {
        GSAP.fromTo(this.opacity, {
            multiplier: 0
        }, {
          multiplier: 1
        })
    }

    hide() {
        GSAP.to(this.opacity, {
          multiplier: 0
        })  
    } 
    
    onResize(sizes) {
        this.createBounds(sizes)
     }

    updateScale() {
        this.height = this.bounds.height / window.innerHeight
        this.width = this.bounds.width / window.innerWidth


            this.jewelry.scale.x = this.sizes.width * this.width
            this.jewelry.scale.y = this.sizes.height * this.height

            this.model.scale.x = this.sizes.width * this.width
            this.model.scale.y = this.sizes.height * this.height

        // this.mesh.scale.x = this.sizes.width * this.width 
        // this.mesh.scale.y = this.sizes.height * this.height
    }

    updateX(x = 0) {
        this.x = (this.bounds.left + x) / window.innerWidth 
        // this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width) + this.extra.x
    
        this.group.position.x = (-this.sizes.width / 2) + (this.jewelry.scale.x / 2) + (this.x * this.sizes.width)
        this.group.position.z = GSAP.utils.interpolate(0, 0.1, this.animation)
    
        this.group.rotation.y = GSAP.utils.interpolate(0, 2 * Math.PI, this.animation)
    }

    updateY(y = 0) {
        this.y = (this.bounds.top + y) / window.innerHeight  
        this.group.position.y = (this.sizes.height / 2) - (this.jewelry.scale.y / 2) - (this.y * this.sizes.height)
    }

    update(scroll, index) {
        // if (!this.bounds) return
        this.updateScale()
        this.updateX(scroll)
        // this.updateY()

        const amplitude = 0.5
        const frequency = 1
        this.group.rotation.z = -0.02 * Math.PI * Math.sin(this.index / frequency)
        this.group.position.y = amplitude * Math.sin(this.index / frequency)
        // this.mesh.rotation.z = -0.02 * Math.PI * Math.sin(this.index / frequency)
        // this.mesh.position.y = amplitude * Math.sin(this.index / frequency)

        this.opacity.target = index === this.index ? 1 : 0.4
        this.opacity.current = GSAP.utils.interpolate(this.opacity.current, this.opacity.target, this.opacity.lerp)
        // this.program.uniforms.uAlpha.value = this.opacity.multiplier * this.opacity.current
        this.jewelry.program.uniforms.uAlpha.value = this.opacity.multiplier * this.opacity.current
        this.model.program.uniforms.uAlpha.value = this.opacity.multiplier * this.opacity.current
    
    }
}



// old working code
// import { Texture, Program, Mesh } from 'ogl';
// import GSAP from 'gsap'

// import fragment from '../../shaders/collections-fragment.glsl'
// import vertex from '../../shaders/collections-vertex.glsl'

// export default class Media {    
//     constructor({ element, gl, geometry, scene, sizes, index}) {
//         this.element = element
//         this.index = index
//         this.gl = gl
//         this.geometry = geometry
//         this.scene = scene  
//         this.sizes = sizes

//         this.extra = {
//             x: 0,   
//             y:  0
//         }

//         this.opacity = {
//               current: 0,
//               target: 0,
//               lerp: 0.1,
//               multiplier: 0
//             }

//         this.createTexture()
//         this.createProgram()
//         this.createMesh()
//         this.createBounds({ sizes: this.sizes })

//     }

//     createTexture() {
//         this.texture = new Texture(this.gl)

//         const image = this.element.querySelector('.collections__gallery__media__image')

//         this.image = new window.Image()
//         this.image.crossOrigin = 'anonymous'
//         // this.image.src = image.getAttribute('data-src')
//         this.image.src = image.src
//         this.image.onload = _ => (this.texture.image = this.image) 
//     }

//     createProgram() {
//         this.program = new Program(this.gl, {
//             vertex,
//             fragment, 
//             uniforms: {
//               tMap: { value: this.texture },
//               uAlpha: { value: 0 }
//             }
//         })
//     }

//     createMesh() {
//         this.mesh = new Mesh(this.gl, {
//             geometry: this.geometry,
//             program: this.program
//         })

//         this.mesh.setParent(this.scene)
//     }

//     createBounds({ sizes }) {
//         this.sizes = sizes
//         this.bounds = this.element.getBoundingClientRect()
        
//         this.updateScale()
//         this.updateX()
//         this.updateY()
//     }

//     show() {
//         GSAP.fromTo(this.opacity, {
//             multiplier: 0
//         }, {
//           multiplier: 1
//         })
//     }

//     hide() {
//         GSAP.to(this.opacity, {
//           multiplier: 0
//         })  
//     } 
    
//     onResize(sizes) {
//         this.createBounds(sizes)
//      }

//     updateScale() {
//         this.height = this.bounds.height / window.innerHeight
//         this.width = this.bounds.width / window.innerWidth

//         this.mesh.scale.x = this.sizes.width * this.width 
//         this.mesh.scale.y = this.sizes.height * this.height
//     }

//     updateX(x = 0) {
//         this.x = (this.bounds.left + x) / window.innerWidth 
//         this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width) + this.extra.x
//     }

//     updateY(y = 0) {
//         this.y = (this.bounds.top + y) / window.innerHeight  
//         this.mesh.position.y = (this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height) + this.extra.y
//     }

//     update(scroll, index) {
//         // if (!this.bounds) return
//         this.updateX(scroll)
//         // this.updateY()

//         const amplitude = 0.5
//         const frequency = 1

//         this.mesh.rotation.z = -0.02 * Math.PI * Math.sin(this.index / frequency)
//         this.mesh.position.y = amplitude * Math.sin(this.index / frequency)

//         this.opacity.target = index === this.index ? 1 : 0.4
//         this.opacity.current = GSAP.utils.interpolate(this.opacity.current, this.opacity.target, this.opacity.lerp)
//         this.program.uniforms.uAlpha.value = this.opacity.multiplier * this.opacity.current
//       }
// }

