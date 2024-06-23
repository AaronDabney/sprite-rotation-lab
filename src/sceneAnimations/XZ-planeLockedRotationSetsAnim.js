import { SceneObject } from "../scene.js";
import { xSetRotations, ySetRotations, zSetRotations } from "../spriteRotationMath.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let lockedXSetAnim = new SceneObject();
let lockedYSetAnim = new SceneObject();
let lockedZSetAnim = new SceneObject();

lockedXSetAnim.start = scope => {
    console.log("lockedXSet Online");
}
lockedYSetAnim.start = scope => {
    console.log("lockedYSet Online");
}
lockedZSetAnim.start = scope => {
    console.log("lockedZSet Online");
}

lockedXSetAnim.update = (scope) => {
    lockedSetUpdateHelper(xSetRotations)(lockedXSetAnim, scope);
    lockedXSetAnim.transform.scale = new Vector3(100, 100, 100);
}
lockedYSetAnim.update = (scope) => {
    lockedSetUpdateHelper(ySetRotations)(lockedYSetAnim, scope);
    lockedYSetAnim.transform.scale = new Vector3(100, 100, 100);
}
lockedZSetAnim.update = (scope) => {
    lockedSetUpdateHelper(zSetRotations)(lockedZSetAnim, scope);
    lockedZSetAnim.transform.scale = new Vector3(100, 100, 100);
}

lockedXSetAnim.render = (canvas) => lockedSetRenderHelper(lockedXSetAnim)(canvas);
lockedYSetAnim.render = (canvas) => lockedSetRenderHelper(lockedYSetAnim)(canvas);
lockedZSetAnim.render = (canvas) => lockedSetRenderHelper(lockedZSetAnim)(canvas);


let lockedSetUpdateHelper = set => (object, scope) => {
    let time = scope.timeData.time;
    let index220 = Math.floor(time * .015) % 220;

    object.transform.rotation = set[index220];
}

let lockedSetRenderHelper = (object) => (canvas) => {
    renderBasisVectors(object.transform, canvas);
    renderMesh(suzanneMesh, object.transform, canvas, true);
}


export { lockedXSetAnim, lockedYSetAnim, lockedZSetAnim }
