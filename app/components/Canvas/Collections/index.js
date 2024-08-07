import { Plane, Raycast, Transform, Vec2 } from 'ogl'
import GSAP from 'gsap'
import map from 'lodash/map'
import { getOffset, mapEach } from 'utils/dom'
import Media from './Media'
import Prefix from 'prefix'

export default class Collections {
    constructor({ camera, gl, renderer, scene, sizes,transition }) {
        this.id = 'collections'
        this.camera = camera
        this.gl = gl
        this.renderer = renderer
        this.scene = scene
        this.sizes = sizes
        this.transition = transition
      
        this.transformPrefix = Prefix('transform')
        this.group = new Transform()

        this.titlesItemsElements = document.querySelectorAll('.collections__titles__wrapper:nth-child(2) .collections__titles__item')
        this.titlesElement = document.querySelector('.collections__titles')
        this.galleryElement = document.querySelector('.collections__gallery')
        this.galleryWrapperElement = document.querySelector('.collections__gallery__wrapper')
        this.collectionsElements = document.querySelectorAll('.collections__article')
        this.collectionsElementsActive  = 'collections__article--active'
        this.mediasElements = document.querySelectorAll('.collections__gallery__media')
        
        // this.detailsElements = document.querySelectorAll('.detail')
        this.mouse = new Vec2()

        this.scroll = {
            start: 0,
            current: 0,
            target: 0,
            lerp: 0.1,
            velocity: 1
        }
        this.createRaycast()
        this.createGeometry()
        this.createGallery()

        this.onResize({ sizes: this.sizes })
        this.group.setParent(scene)
        
        this.show()
    }
    createRaycast () {
        this.raycast = new Raycast(this.gl)
      }
        createGeometry() {
            this.geometry = new Plane(this.gl)
        }   

        createGallery () {
            this.medias = mapEach(this.mediasElements, (element, index) => {
              const media = new Media({
                element,
                geometry: this.geometry,
                index,
                gl: this.gl,
                scene: this.group,
                sizes: this.sizes,
                url: element.getAttribute('data-url'),
                detailUrl: element.getAttribute('data-detail-url')
              })
        console.log('media', media)
              return media
            })
        
            this.mediasMeshes = mapEach(this.medias, media => media.jewlery)
          }

        async show() {
            this.medias.forEach(media => media.show());
            this.group.setParent(this.scene)
        }
        
        hide() {
            map(this.medias, media => media.hide())
        }

        onResize(event) {
            this.sizes = event.sizes
            this.bounds = this.galleryWrapperElement.getBoundingClientRect()
            
            this.scroll.limit = this.bounds.width - this.sizes.width
            map(this.medias, media => media.onResize(event))
        }

        onTouchDown({ x, y }) {
            this.isDown = true;
            this.scroll.last = this.scroll.current
        }

        onTouchMove({ x, y }) {
        this.mouse.set(2.0 * (x.end / this.renderer.width) - 1.0, 2.0 * (1.0 - y.end / this.renderer.height) - 1.0);
        this.raycast.castMouse(this.camera, this.mouse);
        const [hit] = this.raycast.intersectBounds(this.mediasMeshes);
        this.hit = hit ? hit.index : null;
        if (this.hit !== null && this.index === this.hit) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = '';
        }
        if (!this.isDown) return;
           const distance = x.start - x.end
           
           this.scroll.target = this.scroll.last - distance
        }

        onTouchUp({ x, y }) {
        this.isDown = false;
        if (this.hit !== null && this.index === this.hit) {
            const hitMedia = this.medias[this.hit];
            console.log('hitMedia', hitMedia)


            hitMedia.animateIn(); // Start the transition animation

            // Load new content dynamically from detailUrl
            this.loadContent(hitMedia.detailUrl, hitMedia);


        }
        }

        loadContent(url, hitMedia) {
            axios.get(url)
                .then(response => {
                    const div = document.createElement('div');
                    div.innerHTML = response.data;
                    const divContent = div.querySelector('.content');
                    this.template = divContent.getAttribute('data-template');
                    document.querySelector('.content-container').innerHTML = divContent.innerHTML;
                    
                    // Update the application state or UI
                    this.canvas.onChangeEnd(this.template);
        
                    // Sync the mesh position and scale with the new content
                    this.syncMeshWithContent(hitMedia);
                })
                .catch(error => console.error('Failed to load content', error));
        }

        onWheel(event) {
            const pixelY = event.deltaY || -event.wheelDelta || event.detail || 0;
            this.scroll.target += pixelY;
         
        }

        onChange(index) {
            this.index = index

            const selectedCollection = parseInt(this.mediasElements[this.index].getAttribute('data-index'))
            map(this.collectionsElements, (element, elementIndex) => {
          
                if (elementIndex === selectedCollection) {
                    element.classList.add(this.collectionsElementsActive)
                } else {
                    element.classList.remove(this.collectionsElementsActive)
                }
            })

            this.titlesElement.style[this.transformPrefix] = `translateY(-${25 * selectedCollection}%) translate(-50%, -50%) rotate(-90deg)`
        
            this.media = this.medias[this.index]
        }

        update() {
            this.scroll.target = GSAP.utils.clamp(-this.scroll.limit, 0, this.scroll.target)

            this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)
            
            this.galleryWrapperElement.style[this.transformPrefix] = `translateX(${this.scroll.current}px)`
           if (this.scroll.last < this.scroll.current) {
              this.scroll.direction = 'right'
           } else if (this.scroll.last > this.scroll.current) {
             this.scroll.direction = 'left'
           }

           this.scroll.last = this.scroll.current
           const index = Math.floor(Math.abs((this.scroll.current - (this.medias[0].bounds.width / 2)) / this.scroll.limit) * (this.medias.length - 1))
        
           if (this.index !== index) {
              this.onChange(index)
           }

            map(this.medias, (media, index) => {
                media.update(this.scroll.current, this.index)
            })
        }  
        
        destroy() {
           this.scene.removeChild(this.group)
        }
    }


// import { Plane, Transform, Texture } from 'ogl' 
// import GSAP from 'gsap'
// import map from 'lodash/map'

// import Media from './Media'
// import Prefix from 'prefix'

// export default class Collections {
//     constructor({ gl, scene, sizes, transition }) {
//         this.id = 'collections'
//         this.gl = gl
//         this.sizes = sizes
//         this.scene = scene
//         this.transition = transition
      
//         this.group = new Transform()
//         this.transformPrefix = Prefix('transform')
//         this.galleryElement = document.querySelector('.collections__gallery__wrapper')
//         this.mediaElements = document.querySelectorAll('.collections__gallery__media')

//         this.titlesItemsElements = document.querySelectorAll('.collections__titles__wrapper:nth-child(2) .collections__titles__item')
//         this.titlesElement = document.querySelector('.collections__titles')
//         // this.galleryElement = document.querySelector('.collections__gallery')
//         this.galleryWrapperElement = document.querySelector('.collections__gallery__wrapper')
//         this.collectionsElements = document.querySelectorAll('.collections__article')
//         this.collectionsElementsActive  = 'collections__article--active'
//         this.mediasElements = document.querySelectorAll('.collections__gallery__media')
        
//         this.detailsElements = document.querySelectorAll('.detail')
//         this.scroll = {
//             start: 0,
//             current: 0,
//             target: 0,
//             lerp: 0.1,
//             velocity: 1
//         }

//         this.createGeometry()
//         this.createGallery()

//         this.onResize({ sizes: this.sizes })
//         this.group.setParent(scene)
        
//         this.show()
//     }

//         createGeometry() {
//             this.geometry = new Plane(this.gl)
//         }   

//         createGallery() {
//             this.medias = map(this.mediaElements, (element, index) => {
//                 return new Media({ 
//                     element,
//                     geometry: this.geometry,
//                     index,
//                     gl: this.gl,
//                     scene: this.group, 
//                     sizes: this.sizes
//                 })
//             })
       
//         }


//         async show() {
//             this.medias.forEach(media => media.show());
//         }
        
    
//         hide() {
//             map(this.medias, media => media.hide())
//         }

//         onResize(event) {
//             this.sizes = event.sizes
//             this.bounds = this.galleryElement.getBoundingClientRect()
            
//             this.scroll.limit = this.bounds.width - this.sizes.width
//             map(this.medias, media => media.onResize(event))
//         }

//         onTouchDown({ x, y }) {
//             this.scroll.last = this.scroll.current
//         }

//         onTouchMove({ x}) {
//            const distance = x.start - x.end
           
//            this.scroll.target = this.scroll.last - distance
//         }

//         onTouchUp({ x, y }) {
            
//         }

//         onWheel(event) {
//             const pixelY = event.deltaY || -event.wheelDelta || event.detail || 0;
//             this.scroll.target += pixelY;
         
//         }

//         onChange(index) {
//             this.index = index

//             const selectedCollection = parseInt(this.mediasElements[this.index].getAttribute('data-index'))
//             map(this.collectionsElements, (element, elementIndex) => {
          
//                 if (elementIndex === selectedCollection) {
//                     element.classList.add(this.collectionsElementsActive)
//                 } else {
//                     element.classList.remove(this.collectionsElementsActive)
//                 }
//             })

//             this.titlesElement.style[this.transformPrefix] = `translateY(-${25 * selectedCollection}%) translate(-50%, -50%) rotate(-90deg)`
        
//             this.media = this.medias[this.index]
//         }

//         update() {
//             this.scroll.target = GSAP.utils.clamp(-this.scroll.limit, 0, this.scroll.target)

//             this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)
            
//             this.galleryElement.style[this.transformPrefix] = `translateX(${this.scroll.current}px)`
//            if (this.scroll.last < this.scroll.current) {
//               this.scroll.direction = 'right'
//            } else if (this.scroll.last > this.scroll.current) {
//              this.scroll.direction = 'left'
//            }

//            this.scroll.last = this.scroll.current
//            const index = Math.floor(Math.abs((this.scroll.current - (this.medias[0].bounds.width / 2)) / this.scroll.limit) * (this.medias.length - 1))
        
//            if (this.index !== index) {
//               this.onChange(index)
//            }

//             map(this.medias, (media, index) => {
//                 media.update(this.scroll.current, this.index)
//             }) 

           
//         }  
        
//         destroy() {
//            this.scene.removeChild(this.group)
//         }
//     }



