class Scene {
    constructor(canvasID) {
        this.sceneObjects = [];
        this.canvasID = canvasID;
    }

    update(time) {

    }
}

class SceneObject {
    constructor(transform = new Transform(), start = () => {}, update = () => {}) {
        this.transform = transform;
        this.start = start;
        this.update = update;
    }
}
