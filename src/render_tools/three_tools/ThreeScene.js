import * as THREE from "three";
import {getCurrentInstance} from "vue";
import {GetCanvas} from "@/render_tools/common_tools/commons";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class ThreeScene {
    constructor() {
        this.canvas = GetCanvas();
        this.instance = getCurrentInstance();
        const { proxy } = this.instance;
        const params = {
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,
            alpha: true,
            antialias: true
        }
        if(this.canvas) params.canvas = this.canvas;
        this.updateControl = true;
        this.sceneRender = true;
        this.activeCamera = null;
        const near = 0.01;
        const far = 10000;
        this.background = new THREE.Color(0x202020);
        this.scene = new THREE.Scene();
        proxy.$scene = this.scene;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, near, far);
        this.renderer = new THREE.WebGLRenderer(params);
        // this.ambientLight = new THREE.AmbientLight(0xffffff);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.setCamera(this.camera);
        this.setScene();
        this.render();
        this.cameraLook();
    }
    add(item) {
        if(item) this.scene.add(item);
    }
    setCamera(camera) {
        if(!camera) return;
        this.activeCamera = camera;
    }
    cameraLook() {
        const look = new THREE.Group()
        look.position.set(0, 0, 0)
        const target = new THREE.Vector3(2, 2.5, -5);

        this.camera.position.copy(target);
        this.camera.lookAt(look.position.x, look.position.y, look.position.z);
        this.controls.target.set(look.position.x, look.position.y, look.position.z);
        this.setControl();
        this.canRender = true;
    }
    setControl() {
        const speed = 5;
        const touchSpeed = 2;
        const controls = this.controls;
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.PAN
        }
        controls.keys = {
            UP: 'ArrowUp', // up arrow
            LEFT: 'ArrowLeft', //left arrow
            RIGHT: 'ArrowRight', // right arrow
            BOTTOM: 'ArrowDown' // down arrow
        }
        controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        }
        controls.panSpeed = speed;
        controls.zoomSpeed = speed;
        controls.touches.panSpeed = touchSpeed;
        controls.touches.zoomSpeed = touchSpeed;
    }
    setScene(){
        const camera = this.camera;
        camera.name = "EDITOR_CAMERA";
        camera.layers.enable(1);
        camera.layers.enable(2);

        this.renderer.domElement.id = 'THREE';
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.needsUpdate = true;
        // this.scene.add(this.ambientLight);

        //Environment
        this.scene.background = this.background;
        document.body.appendChild( this.renderer.domElement );
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this), false)
    }
    render(){
        requestAnimationFrame(this.render.bind(this));
        if(this.sceneRender) {
            this.renderer.render(this.scene, this.activeCamera);
            if (this.updateControl) this.controls.update();
        }
    }
    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = this.activeCamera;
        const renderer = this.renderer;
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
    }
}
