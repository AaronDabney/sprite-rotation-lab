import { SceneObject } from "../scene.js";
import { midAxisRotation } from "../spriteRotationMath.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let xSetBaseRotation = new SceneObject();
let ySetBaseRotation = new SceneObject();
let zSetBaseRotation = new SceneObject();

xSetBaseRotation.start = scope => {
    console.log("xSetBaseRotation Online");
}
ySetBaseRotation.start = scope => {
    console.log("ySetBaseRotation Online");
}
zSetBaseRotation.start = scope => {
    console.log("zSetBaseRotation Online");
}

xSetBaseRotation.update = scope => {
    baseRotationAnimHelper('z', xSetBaseRotation);
}
ySetBaseRotation.update = scope => {
    baseRotationAnimHelper('x', ySetBaseRotation);
}
zSetBaseRotation.update = scope => {
    baseRotationAnimHelper('y', zSetBaseRotation);
}

let baseRotationAnimHelper = (axis, sceneObject) => {
    let ctx = sceneObject.drawingContext;
    let canvas = sceneObject.targetCanvas;
    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);

    let t = new Transform();
    t.rotation = midAxisRotation(axis);
    t.position = middleScreen;

    renderBasisVectors(100, t, ctx);
    renderMesh(suzanneMesh, 100, t, ctx, true);
}


export { xSetBaseRotation, ySetBaseRotation, zSetBaseRotation }
