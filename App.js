import * as BABYLON from "babylonjs"

export default class App {
  #engine;
  #scene;
  #mesh;
  
  constructor() {
    const canvas = document.querySelector("canvas");
    this.#engine = new BABYLON.Engine(canvas, true, { adaptToDeviceRatio: true });
    this.#scene = new BABYLON.Scene(this.#engine);
    
    this.#createCamera();
    this.#createLight();
    this.#createModel();
    this.#setupEvents();
  }

  #createLight() {
    this.#scene.createDefaultLight();
  }

  #createCamera() {
    this.#scene.createDefaultCamera(true, false, true);
    const camera = this.#scene.cameras[0];
    camera.position = new BABYLON.Vector3(0, 0, 4);
  }

  #createModel() {
    this.#mesh = BABYLON.MeshBuilder.CreateBox("myBox");    
  }

  #setupEvents() {
    window.addEventListener("resize", this.#resize.bind(this));
    this.#scene.registerBeforeRender(this.update.bind(this));
    this.#engine.runRenderLoop(this.render.bind(this))
  }

  update({ deltaTime }) {
    this.#mesh.rotation.x += deltaTime / 1000;
  }

  render() {
    this.#scene.render();
  }

  #resize() {
    this.#engine.resize();
  }
}