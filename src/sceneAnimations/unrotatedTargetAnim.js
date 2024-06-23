import { SceneObject } from "../scene.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let xUnrotatedTargetAnim = new SceneObject();
let yUnrotatedTargetAnim = new SceneObject();
let zUnrotatedTargetAnim = new SceneObject();

xUnrotatedTargetAnim.start = scope => {
    console.log("xUnrotatedTargetAnim Online");
}

yUnrotatedTargetAnim.start = scope => {
    console.log("yUnrotatedTargetAnim Online");
}

yUnrotatedTargetAnim.start = scope => {
    console.log("yUnrotatedTargetAnim Online");
}

zUnrotatedTargetAnim.start = scope => {
    console.log("zUnrotatedTargetAnim Online");
}

xUnrotatedTargetAnim.update = scope => {
    let ctx = xUnrotatedTargetAnim.drawingContext;
    let canvas = xUnrotatedTargetAnim.targetCanvas;

    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);

    let localX = scope.targetRotation.rotateVector(new Vector3(1, 0, 0));
    let angle = Math.atan2(localX.y, localX.x);

    let zRotation = Quaternion.euler(0, 0, angle*180/Math.PI);
    let rotationApproximation = (zRotation.conjugate).mult(scope.targetRotation);

    xUnrotatedTargetAnim.transform.rotation = rotationApproximation;
    xUnrotatedTargetAnim.transform.position = middleScreen;


    renderBasisVectors(100, xUnrotatedTargetAnim.transform, ctx);
    renderMesh(suzanneMesh, 100, xUnrotatedTargetAnim.transform, ctx, true);
}

yUnrotatedTargetAnim.update = scope => {
    let ctx = yUnrotatedTargetAnim.drawingContext;
    let canvas = yUnrotatedTargetAnim.targetCanvas;

    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);

    let localY = scope.targetRotation.rotateVector(new Vector3(0, 1, 0));
    let angle = Math.atan2(localY.y, localY.x);

    let zRotation = Quaternion.euler(0, 0, angle*180/Math.PI);
    let rotationApproximation = (zRotation.conjugate).mult(scope.targetRotation);

    yUnrotatedTargetAnim.transform.rotation = rotationApproximation;
    yUnrotatedTargetAnim.transform.position = middleScreen;


    renderBasisVectors(100, yUnrotatedTargetAnim.transform, ctx);
    renderMesh(suzanneMesh, 100, yUnrotatedTargetAnim.transform, ctx, true);
}

zUnrotatedTargetAnim.update = scope => {
    let ctx = zUnrotatedTargetAnim.drawingContext;
    let canvas = zUnrotatedTargetAnim.targetCanvas;

    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);

    let localZ = scope.targetRotation.rotateVector(new Vector3(0, 0, 1));
    let angle = Math.atan2(localZ.y, localZ.x);

    let zRotation = Quaternion.euler(0, 0, angle*180/Math.PI);
    let rotationApproximation = (zRotation.conjugate).mult(scope.targetRotation);

    zUnrotatedTargetAnim.transform.rotation = rotationApproximation;
    zUnrotatedTargetAnim.transform.position = middleScreen;


    renderBasisVectors(100, zUnrotatedTargetAnim.transform, ctx);
    renderMesh(suzanneMesh, 100, zUnrotatedTargetAnim.transform, ctx, true);
}

export {xUnrotatedTargetAnim, yUnrotatedTargetAnim, zUnrotatedTargetAnim}

