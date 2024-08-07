import { Plane, Transform } from 'ogl' 
import GSAP from 'gsap'
import map from 'lodash/map'


import Gallery from './Gallery'

export default class About {
    constructor({ gl, scene, sizes }) {
        
        this.gl = gl
        this.sizes = sizes

        this.group = new Transform()
        
        
        this.createGeometry()
        this.createGalleries()
        this.onResize({ sizes: this.sizes })
        this.group.setParent(scene)

        this.show()
    }

    show() {
        map(this.galleries, gallery => gallery.show())

    }

    hide() {
        map(this.galleries, gallery => gallery.hide())
    }

        createGeometry() {
            this.geometry = new Plane(this.gl)
        }   

        createGalleries() {
            this.galleriesElements = document.querySelectorAll('.about__gallery')
            this.galleries = map(this.galleriesElements, (element, index) => {
                return new Gallery({ 
                    element,
                    geometry: this.geometry,
                    index,
                    gl: this.gl,
                    scene: this.group, 
                    sizes: this.sizes
                })
            })
        }

        onResize(event) {
            map(this.galleries, gallery => gallery.onResize(event))
        }

        onTouchDown({ x, y }) {
          map(this.galleries, gallery => gallery.onTouchDown({ x, y }))
        }

        onTouchMove({ x, y }) {
          map(this.galleries, gallery => gallery.onTouchMove({ x, y }))
        }

        onTouchUp({ x, y }) {
            map(this.galleries, gallery => gallery.onTouchUp({ x, y }))
        }

        onWheel(event) {
         
        }

        update(scroll) {
           const y = scroll.current / window.innerHeight
           map(this.galleries, gallery => gallery.update(scroll))
            
        }  
        
        destroy() {
            map(this.galleries, gallery => gallery.destroy())
        }
    }

