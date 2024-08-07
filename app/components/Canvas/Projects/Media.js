import { Texture, Program, Mesh } from 'ogl';
import GSAP from 'gsap'

import fragment from '../../shaders/projects-fragment.glsl'
import vertex from '../../shaders/projects-vertex.glsl'

export default class Media {    
  constructor ({ gl, geometry, scene, renderer, screen, viewport, $el, img }) {
    this.gl = gl
    this.geometry = geometry
    this.scene = scene
    this.renderer = renderer
    this.screen = screen
    this.viewport = viewport
    this.img = img
    this.$el = $el
    this.scroll = 0
    this.blurStrength = 1

    this.createShader()
    this.createMesh()
    
    this.onResize({ sizes: this.viewport })
  console.log('viewport', this.viewport)
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: false
    })

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment,
      vertex,
      uniforms: {
        tMap: { value: texture },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 100 * Math.random() },
        uBlurStrength: { value: this.blurStrength },
      },
      transparent: true
    })

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = this.img.getAttribute('data-src')
    image.onload = _ => {
      texture.image = image

      this.program.uniforms.uImageSize.value = [image.naturalWidth, image.naturalHeight]
    }
    
  }

  createMesh() {
      this.plane = new Mesh(this.gl, {
          geometry: this.geometry,
          program: this.program
      })

      this.plane.setParent(this.scene)
     
  }

  createBounds({ sizes }) {
      this.sizes = sizes
      this.bounds = this.img.getBoundingClientRect()
      
      this.updateScale()
      this.updateX()
      this.updateY()
  }

  

  show() {
      GSAP.fromTo(this.program.uniforms.uAlpha, {
         value: 0
      }, {
          value: 1
      })
  }

  hide() {
      GSAP.to(this.program.uniforms.uAlpha, {
          value: 0
      })  
  } 
  
  onResize(sizes) {
      this.createBounds(sizes)
   }

  updateScale(x, y) {
    x = x || this.$el.offsetWidth
    y = y || this.$el.offsetHeight
    this.plane.scale.x = this.viewport.width * x / window.innerWidth
    this.plane.scale.y = this.viewport.height * y /  window.innerHeight
      // this.height = this.bounds.height / window.innerHeight
      // this.width = this.bounds.width / window.innerWidth

      // this.mesh.scale.x = this.sizes.width * this.width 
      // this.mesh.scale.y = this.sizes.height * this.height
  }

  updateX(x = 0) {
    this.x = x
    this.plane.position.x = -(this.viewport.width / 2) + (this.plane.scale.x / 2) + (this.x / window.innerWidth) * this.viewport.width
      // this.x = (this.bounds.left + x) / window.innerWidth 
      // this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width) + this.extra.x
  }

  updateY(y = 0) {
    this.y = y
    this.plane.position.y = (this.viewport.height / 2) - (this.plane.scale.y / 2) - ((this.y - this.scroll) / window.innerHeight) * this.viewport.height
  
      // this.y = (this.bounds.top + y) / window.innerHeight  
      // this.mesh.position.y = (this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height) + this.extra.y
  }

  update(scroll) {
      // if (!this.bounds) return
      this.updateX(scroll.x)
      this.updateY(scroll.y)

      this.program.uniforms.uTime.value += 0.04
      this.program.uniforms.uBlurStrength.value = this.blurStrength
  }
}