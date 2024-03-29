import * as THREE from 'three'
import Experience from './Experience.js'

export default class Raycaster
{
    constructor()
    {
        this.experience = new Experience()
        this.mouse = this.experience.mouse
        this.camera = this.experience.camera

        this.setInstance()

        // Initialize variables for tracking intersected mesh and original material
        this.lastIntersectedMesh = null;
        this.originalMaterial = null;
        this.model = null;
    }

    setInstance()
    {
        this.instance = new THREE.Raycaster()
        this.rayDirection = new THREE.Vector3(10, 0, 0)
        this.rayDirection.normalize()
    }

    update() 
    {
        this.instance.setFromCamera(this.mouse.instance, this.camera.instance)

        if (this.model)
        {
            const intersects = this.instance.intersectObject(this.model, true);

            if (intersects.length > 0) {
                const intersectedMesh = intersects[0].object;

                if (this.lastIntersectedMesh !== intersectedMesh) {
                    // Reset material and scale of the last intersected mesh if it's not the current one
                    if (this.lastIntersectedMesh && this.originalMaterial) {
                        this.lastIntersectedMesh.material = this.originalMaterial; // Restore the original material
                        this.lastIntersectedMesh.scale.set(1, 1, 1);
                    }

                    // Clone the original material of the new intersected mesh
                    this.originalMaterial = intersectedMesh.material.clone();

                    // Change color to red and scale up the current intersected mesh
                    intersectedMesh.material = this.originalMaterial.clone();
                    intersectedMesh.material.color.set(0xff0000); // Red
                    intersectedMesh.scale.set(1.2, 1.2, 1.2);

                    // Update the lastIntersectedMesh reference
                    this.lastIntersectedMesh = intersectedMesh;
                }
            } else {
                // If no intersections, reset the last intersected mesh
                if (this.lastIntersectedMesh && this.originalMaterial) {
                    this.lastIntersectedMesh.material = this.originalMaterial; // Restore the original material
                    this.lastIntersectedMesh.scale.set(1, 1, 1);
                    this.lastIntersectedMesh = null; // Clear the reference
                    this.originalMaterial = null; // Clear the stored material
                }
            }
        }
    }
}