import { SceneObject } from "../scene.js";
import { microsetZ } from "../spriteRotationMath.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let canonicalMicrosetAnim = new SceneObject();

canonicalMicrosetAnim.start = scope => {
    console.log('canonicalMicrosetAnim');
}

canonicalMicrosetAnim.update = scope => {
    let ctx = canonicalMicrosetAnim.drawingContext;
    let canvas = canonicalMicrosetAnim.targetCanvas;
    let time = scope.timeData.time;

    let index68 = Math.floor(time * .015) % 68;
    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);

    let transform = new Transform();
    transform.position = middleScreen;
    transform.rotation = microsetZ[index68];

    renderBasisVectors(100, transform, ctx);
    renderMesh(suzanneMesh, 100, transform, ctx, true);
}

export { canonicalMicrosetAnim }
