import * as THREE from 'three'
import Experience from '../Experience.js'

export default class WorldMap
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('worldMap')
        }

        // Resource
        this.resource = this.resources.items.worldMapModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(-0.1, 0.1, -0.1)
        this.model.position.set(0, 0, 0.5)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                this.assignRandomColors(child)
            }
        })
    }

    assignRandomColors(_child)
    {
        // Clone the shared material and apply a random color
        const clonedMaterial = _child.material.clone();

        // Generate random RGB values within the range of high saturation colors
        const minSaturation = 0.6; // Minimum saturation value for high saturation colors
        const maxSaturation = 1.0; // Maximum saturation value for high saturation colors
        const randomColor = new THREE.Color().setHSL(Math.random(), Math.random() * (maxSaturation - minSaturation) + minSaturation, 0.5);
        clonedMaterial.color.set(randomColor);
        
        _child.material = clonedMaterial;
    }

}