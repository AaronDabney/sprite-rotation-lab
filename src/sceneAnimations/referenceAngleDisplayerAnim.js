import { SceneObject } from "../scene.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let referenceAngleDisplayer = new SceneObject();

referenceAngleDisplayer.start = scope => {
    console.log("referenceAngleDisplayer Online");
}

referenceAngleDisplayer.update = (scope) => {
    let ctx = referenceAngleDisplayer.drawingContext;
    let canvas = referenceAngleDisplayer.targetCanvas;

    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);

    let transform = new Transform();
    transform.rotation = scope.targetRotation;//Quaternion.euler(time * .2, time * .011, time * .05);
    transform.position = middleScreen;

    referenceAngleDisplayer.transform = transform;

    let xBasis = transform.rotation.rotateVector(new Vector3(1, 0, 0));
    let yBasis = transform.rotation.rotateVector(new Vector3(0, 1, 0));
    let zBasis = transform.rotation.rotateVector(new Vector3(0, 0, 1));

    let xRadius = xBasis.toVector2().mag() * 150;
    let xAngle = Math.atan2(xBasis.y, xBasis.x);

    let yRadius = yBasis.toVector2().mag() * 150;
    let yAngle = Math.atan2(yBasis.y, yBasis.x);

    let zRadius = zBasis.toVector2().mag() * 150;
    let zAngle = Math.atan2(zBasis.y, zBasis.x);

    renderBasisVectors(150, transform, ctx);
    renderMesh(suzanneMesh, 50, transform, ctx, true);

    let xPos = transform.position.x;
    let yPos = transform.position.y;

    ctx.lineWidth = 5;
    ctx.setLineDash([5, 5]);

    ctx.strokeStyle = 'red'
    ctx.beginPath();
    ctx.ellipse(xPos, yPos, xRadius, xRadius, 0, 0, xAngle, true)
    ctx.stroke();

    ctx.strokeStyle = 'green'
    ctx.beginPath();
    ctx.ellipse(xPos, yPos, yRadius, yRadius, 0, 0, yAngle, true)
    ctx.stroke();


    ctx.strokeStyle = 'blue'
    ctx.beginPath();
    ctx.ellipse(xPos, yPos, zRadius, zRadius, 0, 0, zAngle, true)
    ctx.stroke();
}

export { referenceAngleDisplayer }
