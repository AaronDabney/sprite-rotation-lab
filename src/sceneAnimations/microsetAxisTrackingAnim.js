import { microSetAxisTracking } from "../spriteRotationMath.js";
import { SceneObject } from "../scene.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let microSetAxisTrackingAnim = new SceneObject();

microSetAxisTrackingAnim.start = scope => {
    console.log("microSetRotationTrackingAnim Online");
}

microSetAxisTrackingAnim.update = scope => {
    let ctx = microSetAxisTrackingAnim.drawingContext;
    let canvas = microSetAxisTrackingAnim.targetCanvas;

    let middleScreen = new Vector3(canvas.width / 2, canvas.height / 2);

    let transform = new Transform();
    transform.rotation = microSetAxisTracking(scope.targetRotation);
    transform.position = middleScreen;

    renderBasisVectors(100, transform, ctx);
    renderMesh(suzanneMesh, 100, transform, ctx, true);
}

export { microSetAxisTrackingAnim }
