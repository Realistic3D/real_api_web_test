import * as REAL from "real_api_bbl";
import * as BABYLON from "babylonjs";

export default class BblRender {
    constructor(scene) {
        this.scene = scene;
        this.camera = null;
    }
    async start() {
        console.log("Start Babylon.js");
        this.cube();
        // this.addCamera();
        // this.sunLight();
        // this.spotLight();
        this.areaLight();
        // this.pointLight();
        console.log("End Babylon.js");
    }
    addCamera() {
        const scene = this.scene.scene;
        const camera = new REAL.EYE(scene);
        // this.axesHelpers(camera);
        camera.position.set(4.47321, 3.62687, 4.2057);
        let x = radians(18.5593);
        let y = radians(-133.308);
        let z = radians(0);
        camera.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(x, y, z);
        this.camera = camera;
    }
    cube() {
        // const cube = BABYLON.MeshBuilder.CreateBox("Cube", { size: 1 }, this.scene.scene);
        const cube = BABYLON.MeshBuilder.CreateBox("Cube", { width: 5, height:0.25, depth: 5 }, this.scene.scene);
        cube.position.set(0, 0, 0);
    }
    sunLight() {
        const light = new REAL.SunLight(this.scene.scene);
        // this.axesHelpers(light);
        light.position.set(4.07625, 5.90386, 1.00545);
        light.intensity = 10;
    }
    spotLight() {
        const light = new REAL.SpotLight(this.scene.scene);
        this.axesHelpers(light);
        light.position.set(1, 1.5, 0);
    }
    areaLight() {
        // const light = new REAL.AreaLight(this.scene.scene, {intensity: 10, diffuse: new BABYLON.Color3(0,1,1)});
        // light.position.set(0, 1, -1);
        // light.rotation.x = -Math.PI / 2;
        const light2 = new REAL.AreaLight(this.scene.scene, {intensity: 10});
        light2.position.set(0, 0.5, 2);
        // light2.rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(-Math.PI / 4,-Math.PI / 4,0);
        // light2.rotation.x = -Math.PI / 4;
        // light2.rotation.y = -Math.PI / 4;
        const angles = new BABYLON.Vector3(-Math.PI / 4, -Math.PI / 4, 0);
        light2.rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(angles.x, angles.y, angles.z);
        console.log(light2.transform().rotation)
        console.log(light2.transform().quaternion)
    }
    pointLight() {
        const light = new REAL.PointLight(this.scene.scene);
        this.axesHelpers(light);
        light.position.set(0, 1.5, 0);
    }
    axesHelpers(parent) {
        const axes = new BABYLON.Debug.AxesViewer(this.scene.scene, 0.5);
        axes.xAxis.parent = parent;
        axes.yAxis.parent = parent;
        axes.zAxis.parent = parent;
        return axes;
    }
}

function radians(degree) {
    return BABYLON.Tools.ToRadians(degree);
}