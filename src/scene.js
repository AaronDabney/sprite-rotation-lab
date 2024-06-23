import { canvasInfo } from "./rendering/rendering.js";

class Scene {
    constructor(canvasIDs) {
        this.sceneObjects = [];
        this.canvasIDs = canvasIDs;
        this.canvases = [];

        for (let canvasID of canvasIDs) {
            let [canvasNode, drawingContext] = canvasInfo(canvasID)

            let infoPackage = {
                canvasNode: canvasNode,
                drawingContext: drawingContext
            }

            this.canvases.push(infoPackage);
        }
    }

    start(scope) {
        for (let sceneObject of this.sceneObjects) {
            sceneObject.start(scope);
        }
    }

    update(scope) {
        for (let sceneObject of this.sceneObjects) {
            sceneObject.update(scope);
        }
    }

    render() {
        for (let canvas of this.canvases) {
            for (let sceneObject of this.sceneObjects) {
                sceneObject.render(canvas);
            }
        }
    }
}

class SceneObject {
    constructor(transform = new Transform(), start = () => {}, update = () => {}) {
        this.transform = transform;
        this.start = start;
        this.update = update;
    }
}

export { Scene, SceneObject }
