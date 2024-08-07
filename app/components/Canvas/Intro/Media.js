import { Texture, Program, Mesh } from 'ogl';
import GSAP from 'gsap'

import fragment from '../../shaders/intro-fragment.glsl'
import vertex from '../../shaders/intro-vertex.glsl'

export default class Media {    
    constructor({ element, gl, geometry, scene, sizes, index}) {
        this.element = element
        this.index = index
        this.gl = gl
        this.geometry = geometry
        this.scene = scene  
        this.sizes = sizes

        this.extra = {
          x: 0,   
          y:  0
      }

        this.createTexture()
        this.createProgram()
        this.createMesh()
        this.createBounds({ sizes: this.sizes })
        this.onResize({ sizes: this.sizes })

    }

    createTexture() {
        this.texture = new Texture(this.gl)

        const image = this.element.querySelector('.intro__gallery__media__image')

        this.image = new window.Image()
        this.image.crossOrigin = 'anonymous'
        this.image.src = image.getAttribute('data-src')
        this.image.onload = _ => (this.texture.image = this.image)
      
    }

    createProgram() {
        this.program = new Program(this.gl, {
            vertex,
            fragment, 
            uniforms: {
              tMap: { value: this.texture },
              uSpeed: { value: 0 },
              uViewportSizes: { value: [this.sizes.width, this.sizes.height] },
              uAlpha: { value: 0 }
            }
        })
    }

    createMesh() {
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        })

        this.mesh.setParent(this.scene)
        this.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.01, Math.PI * 0.01) 
    }

    createBounds({ sizes }) {
        this.sizes = sizes
        this.bounds = this.element.getBoundingClientRect()
        
        this.updateScale()
        this.updateX()
        this.updateY()
    }

    show () {
      console.log(this.mesh.position)
        const delay =  5
    
        this.timelineIn = GSAP.timeline({
          delay: GSAP.utils.random(delay, delay + 1.5)
        })
    
        this.timelineIn.fromTo(this.program.uniforms.uAlpha, {
          value: 0
        }, {
          duration: 2,
          ease: 'expo.inOut',
          value: 0.4
        }, 'start')
    
        this.timelineIn.fromTo(this.mesh.position, {
        
          z: GSAP.utils.random(2, 6)
        }, {
          duration: 2,
          ease: 'expo.inOut',
          z: 0
        }, 'start')
      }
    
      hide () {
    
      }
    

    // show() {
    //     GSAP.fromTo(this.program.uniforms.uAlpha, {
    //        value: 0
    //     }, {
    //         value: 1
    //     })
    // }

    // hide() {
    //     GSAP.to(this.program.uniforms.uAlpha, {
    //         value: 0
    //     })  
    // } 
    
    onResize(sizes) {
        this.createBounds(sizes)
     }

    updateScale() {
        this.height = this.bounds.height / window.innerHeight
        this.width = this.bounds.width / window.innerWidth

        this.mesh.scale.x = this.sizes.width * this.width 
        this.mesh.scale.y = this.sizes.height * this.height
    }

    updateX(x = 0) {
        this.x = (this.bounds.left + x) / window.innerWidth 
        this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width) + this.extra.x
    }

    updateY(y = 0) {
        this.y = (this.bounds.top + y) / window.innerHeight  
        this.mesh.position.y = (this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height) + this.extra.y
    }

    update(scroll, speed) {
        // if (!this.bounds) return
        this.updateX(scroll.x)
        this.updateY(scroll.y)

        this.program.uniforms.uSpeed.value = speed
    }
}