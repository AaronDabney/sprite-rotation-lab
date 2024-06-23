import { SceneObject } from "../scene.js";
import { renderBasisVectors, renderMesh } from "../rendering/rendering.js";
import { suzanneMesh } from "../mesh/suzanne.mesh.js";

let rotationMonkeyAnim = new SceneObject();

rotationMonkeyAnim.start = scope => {
    console.log("Rotation Monkey Online");
    rotationMonkeyAnim.transform.position = new Vector3(0, 0, 0);
    rotationMonkeyAnim.transform.scale = new Vector3(100, 100, 100);
}

rotationMonkeyAnim.update = (scope) => {
    rotationMonkeyAnim.transform.rotation = scope.targetRotation;
}

rotationMonkeyAnim.render = (canvas) => {
    renderBasisVectors(rotationMonkeyAnim.transform, canvas);
    renderMesh(suzanneMesh, rotationMonkeyAnim.transform, canvas, true);
}

function rotationMonkey() {

}

let rotationMonkeyX = new SceneObject();

rotationMonkeyX = {
    start: scope => {
        console.log("Rotation Monkey Online");
        rotationMonkeyX.transform.scale = new Vector3(100, 100, 100);
    },
    update: scope => {
        rotationMonkeyX.transform.rotation = scope.targetRotation;
    },
    render: canvas => {
        renderBasisVectors(rotationMonkeyX.transform, canvas);
        renderMesh(suzanneMesh, rotationMonkeyX.transform, canvas, true);
    }
}
rotationMonkeyX.transform = new Transform();

export { rotationMonkeyAnim, rotationMonkeyX }
