import { Texture, Program, Mesh, Plane } from 'ogl';
import GSAP from 'gsap'

import fragment from '../shaders/plane-fragment.glsl'
import vertex from '../shaders/plane-vertex.glsl'

export default class Transition {    
    constructor({ collections,url, gl, scene, sizes }) {
        this.collections = collections
        this.url = url
        this.gl = gl
        this.scene = scene  
        this.sizes = sizes
    
        this.geometry = new Plane(this.gl)

    }

    createProgram(texture) {
        this.program = new Program(this.gl, {
            vertex,
            fragment, 
            uniforms: {
              tMap: { value: texture },
              uAlpha: { value: 1 }
            }
        })
    }

    createMesh(mesh) {
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        })

        this.mesh.scale.x = mesh.scale.x
        this.mesh.scale.y = mesh.scale.y
        this.mesh.scale.z = mesh.scale.z

        this.mesh.position.x = mesh.position.x
        this.mesh.position.y = mesh.position.y
        this.mesh.position.z = mesh.position.z + 0.01

        this.mesh.setParent(this.scene)
    }

    setElement(element) {
        if (element.id === 'collections') {
            const { index, medias } = element
        
            const media = medias[index]

            this.createProgram(media.texture)
            this.createMesh(media.mesh)

            this.transition = 'detail'
        } else {
            this.createProgram(element.texture)
            this.createMesh(element.mesh)

            this.transition = 'collections'
        }
    }

animate(element, onComplete) {
    const timeline = GSAP.timeline();

    timeline.to(this.mesh.scale, {
        duration: 1.5,
        ease: 'expo.inOut',
        x: element.scale.x,
        y: element.scale.y,
        z: element.scale.z
    }, 0)

    timeline.to(this.mesh.position, {
        duration: 1.5,
        ease: 'expo.inOut',
        x: element.position.x,
        y: element.position.y,
        z: element.position.z
    }, 0)

    // Adds a call to remove the mesh from the scene after a delay of 0.2 seconds
    timeline.call(() => {
      this.scene.removeChild(this.mesh);
    }, null, '+=0.2')

    // Optionally, add the onComplete function to be called at the end of the timeline
    timeline.call(_ => {
        onComplete()
    });
}


    transition () {

    }

    onResize(sizes) {
        this.createBounds(sizes)
     }
}

