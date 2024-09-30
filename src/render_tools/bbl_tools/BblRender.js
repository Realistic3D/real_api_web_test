import * as REAL from "real_api_bbl";
import * as BABYLON from "babylonjs";
import {saveFileAs} from "@/render_tools/common_tools/save_utils";


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
        await this.parseTest();
        console.log("End Babylon.js");
    }
    async parseTest() {
        const scene = this.scene.scene;
        const parsed = [];
        const ignore = [];
        const lights = [];
        for (const rootNode of scene.rootNodes) {
            if(!(rootNode instanceof REAL.AreaLight)) continue;
            lights.push(rootNode)
        }

        for (const oldLight of lights) {
            const info = oldLight.parse();
            const transform = oldLight.transform();

            const temp = new BABYLON.TransformNode(oldLight.name, scene);
            copyTransform(temp, oldLight);

            const light = new BABYLON.TransformNode(info.type, scene);
            const scale = new BABYLON.TransformNode(transform.scale, scene);
            const position = new BABYLON.TransformNode(transform.position, scene);
            const rotation = new BABYLON.TransformNode(transform.rotation, scene);

            copyTransform(light, temp, true);
            scale.name = transform.scale;
            rotation.name = transform.rotation;
            position.name = transform.position;

            scale.setParent(light);
            position.setParent(light);
            rotation.setParent(light);
            light.name = info.type;

            for (const key in info) {
                let cName = "";
                const value = info[key];
                if(key === "color") cName = `${key}|${parseColor(value)}`;
                else if (key === "target") cName = `${key}|${value}`;
                else cName = `${key}|${JSON.stringify(value)}`;
                const group = new BABYLON.TransformNode(cName, scene);
                group.name = cName;
                group.setParent(light);
            }

            temp.dispose();
            parsed.push(light);
            ignore.push(oldLight);
            this.axesHelpers(light);
        }

        const exporter = new REAL.GltfExporter();
        const sceneData = await exporter.export(scene, {binary: false}, ignore);
        saveFileAs(sceneData, "gltf");
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
        const light = new REAL.SpotLight(this.scene.scene, {intensity: 20});
        light.name = "test";
        light.position.set(-2, 1.5, 2);
        light.diffuse = new BABYLON.Color3(1,0,1);
        const light2 = new REAL.SpotLight(this.scene.scene, {intensity: 20});
        light2.name = "test2";
        light2.position.set(2, 1.5, 2);
        // this.axesHelpers(light);
    }
    areaLight() {
        const light = new REAL.AreaLight(this.scene.scene, {intensity: 10, diffuse: new BABYLON.Color3(0,1,1)});
        light.position.set(0, 1, -1);
        light.rotation.x = -Math.PI / 2;
        const light2 = new REAL.AreaLight(this.scene.scene, {intensity: 10});
        light2.position.set(-2, 0.5, 2);
        // light2.rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(-Math.PI / 4,-Math.PI / 4,0);
        // light2.rotation.x = -Math.PI / 4;
        // light2.rotation.y = -Math.PI / 4;
        const angles = new BABYLON.Vector3(-Math.PI / 4, -Math.PI / 4, 0);
        light2.rotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(angles.x, angles.y, angles.z);
    }
    pointLight() {
        const light = new REAL.PointLight(this.scene.scene);
        // this.axesHelpers(light);
        light.position.set(-2, 1.5, 0);
    }
    axesHelpers(parent) {
        const axes = new BABYLON.Debug.AxesViewer(this.scene.scene, 0.5);
        axes.xAxis.parent = parent;
        axes.yAxis.parent = parent;
        axes.zAxis.parent = parent;
        return axes;
    }
}

function parseColor(value) {
    return `r:${parseNumber(value.r)}, g:${parseNumber(value.g)}, b:${parseNumber(value.b)}`;
}

function parseNumber(value) {
    return parseFloat((value.toFixed(5)).toString());
}

function radians(degree) {
    return BABYLON.Tools.ToRadians(degree);
}

export function copyTransform(toMesh, fromMesh, onlyTransform= false) {
    if(!onlyTransform) toMesh.parent = fromMesh.parent;
    const scaling = fromMesh.scaling;
    const position = fromMesh.position;
    const rotation = fromMesh.rotation;
    const rotationQuaternion = fromMesh.rotationQuaternion;
    if(scaling) toMesh.scaling.copyFrom(fromMesh.scaling);
    if(position) toMesh.position.copyFrom(fromMesh.position);

    if(rotationQuaternion) toMesh.rotationQuaternion = new BABYLON.Quaternion().copyFrom(fromMesh.rotationQuaternion);
    else if(rotation) toMesh.rotation.copyFrom(fromMesh.rotation);

    if(!onlyTransform) toMesh.setParent(null);
}