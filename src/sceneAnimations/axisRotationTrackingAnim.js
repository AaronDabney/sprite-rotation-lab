import { axisRotationTracking } from "../spriteRotationMath.js";
import { SceneObject } from "../scene.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let xAxisRotationTrackingAnim = new SceneObject();
let yAxisRotationTrackingAnim = new SceneObject();
let zAxisRotationTrackingAnim = new SceneObject();

xAxisRotationTrackingAnim.start = scope => {
    console.log("xAxisRotationTrackingAnim Online");
}
yAxisRotationTrackingAnim.start = scope => {
    console.log("yAxisRotationTrackingAnim Online");
}
zAxisRotationTrackingAnim.start = scope => {
    console.log("zAxisRotationTrackingAnim Online");
}

xAxisRotationTrackingAnim.update = scope => {
    trackAxisAnimHelper('x')(scope, xAxisRotationTrackingAnim);
}
yAxisRotationTrackingAnim.update = scope => {
    trackAxisAnimHelper('y')(scope, yAxisRotationTrackingAnim);
}
zAxisRotationTrackingAnim.update = scope => {
    trackAxisAnimHelper('z')(scope, zAxisRotationTrackingAnim);
}


let trackAxisAnimHelper = axis => (scope, sceneObject) => {
    let ctx = sceneObject.drawingContext;
    let canvas = sceneObject.targetCanvas;

    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);

    let t = new Transform();
    t.rotation = axisRotationTracking(scope.targetRotation, axis);
    t.position = middleScreen;

    renderBasisVectors(100, t, ctx);
    renderMesh(suzanneMesh, 100, t, ctx, true);
}



export { xAxisRotationTrackingAnim, yAxisRotationTrackingAnim, zAxisRotationTrackingAnim }
