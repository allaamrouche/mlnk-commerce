import { Plane, Transform } from 'ogl' 
import GSAP from 'gsap'
import map from 'lodash/map'

import Media from './Media'

export default class Projects {
    constructor({ gl, scene, sizes, camera, renderer }) {
        
        this.gl = gl
        this.viewport = sizes
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.group = new Transform()

        this.images = [...document.querySelectorAll('.media')]
        this.createGeometry()
        this.createMedias()


        this.onResize({ sizes: this.viewport })

        this.group.setParent(scene)

        this.x = {
            current: 0,
            target: 0,
            lerp: 0.1
        }
        
        this.y = {
            current: 0,
            target: 0,
            lerp: 0.1
        }

        this.speed = {
            current: 0,
            target: 0,
            lerp: 0.1
          }
      
        this.scrollCurrent = { 
          x: 0,     
          y: 0
        }

        this.scroll = {
            x: 0,
            y: 0
        }
        this.show()
    }

    show() {
        map(this.medias, media => media.show())
    }

    hide() {
        map(this.medias, media => media.hide())
    }

        createGeometry() {
            this.geometry = new Plane(this.gl, {
                widthSegments: 50,
                heightSegments: 100
            })
        }   

        createMedias () {
            this.medias = this.images.map(item => {
              return new Media({
                gl: this.gl,
                geometry: this.planeGeometry,
                scene: this.scene,
                renderer: this.renderer,
                screen: this.screen,
                viewport: this.viewport,
                $el: item,
                img: item.querySelector('img')
              })
            })
          }

        onResize(event) {
            this.screen = {
                width: window.innerWidth,
                height: window.innerHeight
              }
            
            this.viewport = event.sizes

            map(this.medias, media => media.onResize(event))
        }

        onTouchDown({ x, y }) {
            this.scrollCurrent.x = this.scroll.x
            this.scrollCurrent.y = this.scroll.y
        }

        onTouchMove({ x, y }) {
           const xDistance = x.start - x.end
           const yDistance = y.start - y.end
           
           this.x.target = this.scrollCurrent.x - xDistance
           this.y.target = this.scrollCurrent.y - yDistance
        }

        onTouchUp({ x, y }) {
           
        }

        onWheel(event) {
            const pixelX = event.deltaX || 0; // Fallback to 0 if undefined
            const pixelY = event.deltaY || -event.wheelDelta || event.detail || 0; // Fallback to 0 if all are undefined
        
            this.x.target += pixelX;
            this.y.target += pixelY;

         
         
        }

        

        // update() {
        //     this.x.current = GSAP.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
        //     this.y.current = GSAP.utils.interpolate(this.y.current, this.y.target, this.y.lerp)
            
         
  
        //    if (this.scroll.y < this.y.current) {
        //         this.y.direction = 'top'
        //    } else if (this.scroll.y > this.y.current) {
        //         this.y.direction = 'bottom'
        //    }

        //     this.scroll.x = this.x.current
        //     this.scroll.y = this.y.current

        //     map(this.medias, (media, index) => {
        //         // const scaleX = media.plane.scale.x / 2

        //         // if (this.x.direction === 'left') {
        //         //    const x = media.plane.position.x + scaleX

        //         //    if (x < -this.sizes.width / 2) {
        //         //        media.extra.x += this.gallerySizes.width
        //         //    }
        //         // } else if (this.x.direction === 'right') {
        //         //    const x = media.plane.position.x - scaleX

        //         //    if (x > this.sizes.width / 2) {
        //         //        media.extra.x -= this.gallerySizes.width
        //         //    }
        //         // }

        //         // const scaleY = media.plane.scale.y / 2

        //         // if (this.y.direction === 'top') {
        //         //     const y = media.plane.position.y + scaleY 

        //         //     if (y < -this.sizes.height / 2) {
        //         //         media.extra.y += this.gallerySizes.height
        //         //     }
        //         // } else if (this.y.direction === 'bottom') {
        //         //     const y = media.plane.position.y - scaleY

        //         //     if (y > this.sizes.height / 2) {
        //         //         media.extra.y -= this.gallerySizes.height
        //         //     }
        //         // }
              
        //          media.update(this.scroll)
        //     }) 
        // } 
        
        update() {
            if (this.medias) {
              this.medias.forEach(media => media.update())
            }
        }
        destroy() {
           this.scene.removeChild(this.group)
        }
    }

