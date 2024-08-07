import { Texture, Program, Mesh, Plane } from 'ogl';
import GSAP from 'gsap'

import fragment from '../../shaders/plane-fragment.glsl'
import vertex from '../../shaders/plane-vertex.glsl'

export default class Detail {    
    constructor({ gl, scene, sizes, transition }) {
        this.id = 'detail'
        this.element = document.querySelector('.detail__media__image')
        this.gl = gl
        this.scene = scene  
        this.sizes = sizes
        this.transition = transition
        this.geometry = new Plane(this.gl)
        this.createTexture()
        this.createProgram()
        this.createMesh()
        this.createBounds({ sizes: this.sizes })

        this.show()
    }

    createTexture() {
        this.texture = new Texture(this.gl)
        const image = this.element.getAttribute('data-src')
        this.image = new window.Image()
        this.image.crossOrigin = 'anonymous'
        this.image.src = image
        this.image.onload = _ => (this.texture.image = this.image)
      
    }

    createProgram() {
        this.program = new Program(this.gl, {
            vertex,
            fragment, 
            uniforms: {
              tMap: { value: this.texture },
              uAlpha: { value: 0}
            }
        })
    }

    createMesh() {
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        })

        this.mesh.setParent(this.scene)
    }

    createBounds({ sizes }) {
        this.sizes = sizes
        this.bounds = this.element.getBoundingClientRect()

        this.updateScale()
        this.updateX()
        this.updateY()
    }

    show() {
     if (this.transition) {
        this.transition.animate(this.mesh, _ => {
            this.program.uniforms.uAlpha.value = 1 
        })
     } else {
      GSAP.to(this.program.uniforms.uAlpha, {
        value: 1
      })
     }
    }

    hide() {
      GSAP.to(this.program.uniforms.uAlpha, {
        value: 0
      })
    } 
    
    onResize(sizes) {
        this.createBounds(sizes)
        this.updateX()
        this.updateY()
     }

     onTouchDown({ x, y }) {
     }
     onTouchUp({ x, y }) {
        }

    updateScale() {
        this.height = this.bounds.height / window.innerHeight
        this.width = this.bounds.width / window.innerWidth

        this.mesh.scale.x = this.sizes.width * this.width 
        this.mesh.scale.y = this.sizes.height * this.height
    }

    updateX() {
        this.x = (this.bounds.left ) / window.innerWidth 
        this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width)
    }

    updateY() {
        this.y = (this.bounds.top ) / window.innerHeight  
        this.mesh.position.y = (this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height)
    }

    update() {
        // if (!this.bounds) return
        this.updateX()
        this.updateY()
    }

    destroy() {
        this.scene.removeChild(this.mesh)
    }
}

