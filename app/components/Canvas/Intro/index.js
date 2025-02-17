import { Plane, Transform } from 'ogl' 
import GSAP from 'gsap'
import map from 'lodash/map'

import Media from './Media'

export default class Home {
    constructor({ gl, scene, sizes }) {
        
        this.gl = gl
        this.sizes = sizes
        this.scene = scene
        this.group = new Transform()

        this.galleryElement = document.querySelector('.intro__gallery')
        this.mediaElements = document.querySelectorAll('.intro__gallery__media')
        
        this.createGeometry()
        this.createGallery()

        this.onResize({ sizes: this.sizes })

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
      
          this.velocity = 2
        
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
                heightSegments: 50
            })
        }   

        createGallery() {
            this.medias = map(this.mediaElements, (element, index) => {
                return new Media({ 
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
            this.galleryBounds = this.galleryElement.getBoundingClientRect()
            
            this.sizes = event.sizes

            this.gallerySizes = {
                width: this.galleryBounds.width / window.innerWidth * this.sizes.width,
                height: this.galleryBounds.height / window.innerHeight * this.sizes.height
            }

            // this.scroll.x = this.x.target = 0
            // this.scroll.y = this.y.target = 0

            map(this.medias, media => media.onResize(event))
        }

        onTouchDown({ x, y }) {
            this.speed.target = 0.8
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
            this.speed.target = 0
        }

        onWheel(event) {
            const pixelX = event.deltaX || 0; // Fallback to 0 if undefined
            const pixelY = event.deltaY || -event.wheelDelta || event.detail || 0; // Fallback to 0 if all are undefined
        
            this.x.target += pixelX;
            this.y.target += pixelY;

            this.velocity = pixelY > 0 ? 2 : -2
         
        }

        update() {
            // if (!this.galleryBounds) return

            this.y.target += this.velocity

            this.speed.target = (this.y.target - this.y.current) * 0.001
            this.speed.current = GSAP.utils.interpolate(this.speed.current, this.speed.target, this.speed.lerp)

            this.x.current = GSAP.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
            this.y.current = GSAP.utils.interpolate(this.y.current, this.y.target, this.y.lerp)
            
           if (this.scroll.x < this.x.current) {
              this.x.direction = 'right'
           } else if (this.scroll.x > this.x.current) {
             this.x.direction = 'left'
           }
  
           if (this.scroll.y < this.y.current) {
                this.y.direction = 'top'
           } else if (this.scroll.y > this.y.current) {
                this.y.direction = 'bottom'
           }

            this.scroll.x = this.x.current
            this.scroll.y = this.y.current

            map(this.medias, (media, index) => {
                const scaleX = media.mesh.scale.x / 2

                if (this.x.direction === 'left') {
                   const x = media.mesh.position.x + scaleX

                   if (x < -this.sizes.width / 2) {
                       media.extra.x += this.gallerySizes.width
                   }
                } else if (this.x.direction === 'right') {
                   const x = media.mesh.position.x - scaleX

                   if (x > this.sizes.width / 2) {
                       media.extra.x -= this.gallerySizes.width
                   }
                }

                const scaleY = media.mesh.scale.y / 2

                if (this.y.direction === 'top') {
                    const y = media.mesh.position.y + scaleY 

                    if (y < -this.sizes.height / 2) {
                        media.extra.y += this.gallerySizes.height
                    }
                } else if (this.y.direction === 'bottom') {
                    const y = media.mesh.position.y - scaleY

                    if (y > this.sizes.height / 2) {
                        media.extra.y -= this.gallerySizes.height
                    }
                }
              
                media.update(this.scroll, this.speed.current)
            }) 
        }  
        
        destroy() {
           this.scene.removeChild(this.group)
        }
    }

