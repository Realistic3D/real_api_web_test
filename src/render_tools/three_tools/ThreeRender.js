import * as THREE from "three";
import * as REAL from "real_api";

export default class ThreeRender{
    constructor(scene) {
        this.scene = scene;
    }
    async start() {
        console.log("Start Three.js");
        this.cube();
        this.sunLight();
        // this.spotLight();
        // this.areaLight();
        // this.pointLight();
        console.log("End Three.js");
    }
    cube() {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshStandardMaterial()
        )
        cube.position.set(0, 0, 0);
        this.scene.add(cube);
    }
    sunLight() {
        const light = new REAL.SunLight(this.scene.scene);
        this.axesHelpers(light);
        light.position.set(4.07625, 5.90386, 1.00545);
        light.intensity = 10;
        this.scene.add(light);
    }
    axesHelpers(parent) {
        const axes = new THREE.AxesHelper(0.5);
        parent.add(axes);
        return axes;
    }
}
