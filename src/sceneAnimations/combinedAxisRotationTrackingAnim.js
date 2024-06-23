import { combinedAxisRotationTracking } from "../spriteRotationMath.js";
import { SceneObject } from "../scene.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let combinedAxisRotationTrackingAnim = new SceneObject();

combinedAxisRotationTrackingAnim.start = scope => {
    console.log("combinedAxisRotationTrackingAnim Online");
}

combinedAxisRotationTrackingAnim.update = scope => {
    let ctx = combinedAxisRotationTrackingAnim.drawingContext;
    let canvas = combinedAxisRotationTrackingAnim.targetCanvas;

    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);

    let t = new Transform();
    t.rotation = combinedAxisRotationTracking(scope.targetRotation);
    t.position = middleScreen;

    renderBasisVectors(100, t, ctx);
    renderMesh(suzanneMesh, 100, t, ctx, true);
}


export { combinedAxisRotationTrackingAnim }
