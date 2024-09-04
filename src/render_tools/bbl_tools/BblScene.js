import * as BABYLON from "babylonjs";
import { getCurrentInstance } from "vue";

export default class BblScene {
    constructor() {
        this.canvas = this.getCanvas();
        this.instance = getCurrentInstance();
        const { proxy } = this.instance;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.background = new BABYLON.Color4.FromHexString("#202020");
        this.scene = new BABYLON.Scene(this.engine, {
            useGeometryUniqueIdsMap: true,
        });
        this.sceneRender = true;
        this.activeCamera = null;
        proxy.$scene = this.scene;
        const angle = Math.PI * 0.5;
        this.camera = new BABYLON.ArcRotateCamera(
            "EDITOR_CAMERA",
            -angle,
            angle,
            8,
            new BABYLON.Vector3(0, 0.5, 0),
            this.scene
        );
        // this.ambientLight = new BABYLON.HemisphericLight(
        //     "EDITOR_LIGHT",
        //     new BABYLON.Vector3(0, 1, 0),
        //     this.scene
        // );

        this.setCamera(this.camera);
        this.setCameraController(true, this.camera);
        this.setScene();
        this.render();
    }
    render() {
        const scene = this.scene;
        const engine = this.engine;
        engine.runRenderLoop(() => {
            if (this.sceneRender) scene.render();
        });
    }
    setScene() {
        const camera = this.camera;
        camera.name = "EDITOR_CAMERA";
        this.camera.layerMask = 0b11;
        this.scene.clearColor = this.background;

        this.onWindowResize();
        window.addEventListener("resize", this.onWindowResize.bind(this), false);
    }
    setCameraController(enabled, camera = undefined) {
        const activeCamera = camera ? camera : this.activeCamera;
        activeCamera.attachControl(this.canvas, true);
    }
    setCamera(camera) {
        if (!camera) return;
        this.activeCamera = camera;
        this.scene.activeCamera = camera;
    }
    getCanvas() {
        const canvases = document.querySelectorAll("canvas");
        for (const canvas of canvases)
            if (canvas.id === "renderCanvas") return canvas;
        const canvas = document.createElement("canvas");
        canvas.id = "renderCanvas";
        document.body.appendChild(canvas);
        return canvas;
    }
    onWindowResize() {
        this.engine.resize();
        const canvas = this.canvas;
        const camera = this.activeCamera;
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
