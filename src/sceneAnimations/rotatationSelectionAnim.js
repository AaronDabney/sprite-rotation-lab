import { SceneObject } from "../scene.js";
import { xSetRotations, ySetRotations, zSetRotations } from "../spriteRotationMath.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let xSelectionAnim = new SceneObject();
let ySelectionAnim = new SceneObject();
let zSelectionAnim = new SceneObject();

xSelectionAnim.start = scope => {
    console.log("xSelectionAnim Online");
}

ySelectionAnim.start = scope => {
    console.log("ySelectionAnim Online");
}

zSelectionAnim.start = scope => {
    console.log("zSelectionAnim Online");
}

xSelectionAnim.update = scope => {
    let ctx = xSelectionAnim.drawingContext;
    let canvas = xSelectionAnim.targetCanvas;

    let middleScreen = new Vector3(canvas.width / 2, canvas.height / 2);

    let localX = scope.targetRotation.rotateVector(new Vector3(1, 0, 0));
    let angle = Math.atan2(localX.y, localX.x);

    let zRotation = Quaternion.euler(0, 0, angle * 180 / Math.PI);
    let rotationApproximation = (zRotation.conjugate).mult(scope.targetRotation);

    let closestQuaternionIndex = 0;
    let smallestAngle = 1000;

    xSetRotations.forEach((rot, index) => {
        let angle = rot.differenceMagnitude(rotationApproximation);

        if (angle < smallestAngle) {
            smallestAngle = angle;
            closestQuaternionIndex = index;
        }
    })

    let bestRotation = xSetRotations[closestQuaternionIndex];

    xSelectionAnim.transform.rotation = bestRotation;
    xSelectionAnim.transform.position = middleScreen;

    renderBasisVectors(100, xSelectionAnim.transform, ctx);
    renderMesh(suzanneMesh, 100, xSelectionAnim.transform, ctx, true);
}

ySelectionAnim.update = scope => {
    let ctx = ySelectionAnim.drawingContext;
    let canvas = ySelectionAnim.targetCanvas;

    let middleScreen = new Vector3(canvas.width / 2, canvas.height / 2);

    let localY = scope.targetRotation.rotateVector(new Vector3(0, 1, 0));
    let angle = Math.atan2(localY.y, localY.x);

    let zRotation = Quaternion.euler(0, 0, angle * 180 / Math.PI);
    let rotationApproximation = (zRotation.conjugate).mult(scope.targetRotation);

    let closestQuaternionIndex = 0;
    let smallestAngle = 1000;

    ySetRotations.forEach((rot, index) => {
        let angle = rot.differenceMagnitude(rotationApproximation);

        if (angle < smallestAngle) {
            smallestAngle = angle;
            closestQuaternionIndex = index;
        }
    })

    let bestRotation = ySetRotations[closestQuaternionIndex];

    ySelectionAnim.transform.rotation = bestRotation;
    ySelectionAnim.transform.position = middleScreen;

    renderBasisVectors(100, ySelectionAnim.transform, ctx);
    renderMesh(suzanneMesh, 100, ySelectionAnim.transform, ctx, true);
}

zSelectionAnim.update = scope => {
    let ctx = zSelectionAnim.drawingContext;
    let canvas = zSelectionAnim.targetCanvas;

    let middleScreen = new Vector3(canvas.width / 2, canvas.height / 2);

    let localZ = scope.targetRotation.rotateVector(new Vector3(0, 0, 1));
    let angle = Math.atan2(localZ.y, localZ.x);

    let zRotation = Quaternion.euler(0, 0, angle * 180 / Math.PI);
    let rotationApproximation = (zRotation.conjugate).mult(scope.targetRotation);

    let closestQuaternionIndex = 0;
    let smallestAngle = 1000;

    zSetRotations.forEach((rot, index) => {
        let angle = rot.differenceMagnitude(rotationApproximation);

        if (angle < smallestAngle) {
            smallestAngle = angle;
            closestQuaternionIndex = index;
        }
    })

    let bestRotation = zSetRotations[closestQuaternionIndex];

    zSelectionAnim.transform.rotation = bestRotation;
    zSelectionAnim.transform.position = middleScreen;

    renderBasisVectors(100, zSelectionAnim.transform, ctx);
    renderMesh(suzanneMesh, 100, zSelectionAnim.transform, ctx, true);
}

export { xSelectionAnim, ySelectionAnim, zSelectionAnim }
