import { SceneObject } from "../scene.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";
import { microsetX, microsetY, microsetZ } from "../spriteRotationMath.js";

let microsetXAnim = new SceneObject();
let microsetYAnim = new SceneObject();
let microsetZAnim = new SceneObject();

microsetXAnim.start = scope => {
    console.log("microsetXAnim Online");
}
microsetYAnim.start = scope => {
    console.log("microsetYAnim Online");
}
microsetZAnim.start = scope => {
    console.log("microsetXAnim Online");
}

microsetXAnim.update = scope => {
    microsetAnimHelper('x', microsetXAnim, scope);
}
microsetYAnim.update = scope => {
    microsetAnimHelper('y', microsetYAnim, scope);
}
microsetZAnim.update = scope => {
    microsetAnimHelper('z', microsetZAnim, scope);
}

let microsetAnimHelper = (axis, sceneObject, scope) => {
    let ctx = sceneObject.drawingContext;
    let canvas = sceneObject.targetCanvas;
    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);
    let time = scope.timeData.time;
    let index68 = Math.floor(time * .015) % 68;

    let set;

    if (axis === 'x') {
        set = microsetX;
    } else if (axis === 'y') {
        set = microsetY;
    } else {
        set = microsetZ;
    }

    let transform = new Transform();
    transform.position = middleScreen;
    transform.rotation = set[index68];

    renderBasisVectors(100, transform, ctx);
    renderMesh(suzanneMesh, 100, transform, ctx, true);
}


export { microsetXAnim, microsetYAnim, microsetZAnim }
