import { SceneObject } from "../scene.js";

let suzanneTestAnim = new SceneObject();

suzanneTestAnim.start = (scope) => {
    console.log("Suze Online");
}

suzanneTestAnim.update = (scope) => {
    let ctx = suzanneTestAnim.drawingContext;
    let canvas = suzanneTestAnim.targetCanvas;
    let time = scope.timeData.time;

    let middleScreen = new Vector3(canvas.width/2, canvas.height/2);
    
    let bigHead = new Transform();
    bigHead.rotation = Quaternion.euler(0, time * .2, 0);
    bigHead.position = middleScreen;

    let smallHead = new Transform();
    smallHead.rotation = Quaternion.euler(90, 0, 0).mult(bigHead.rotation);
    smallHead.position = new Vector3(canvas.width*0.85, canvas.width*.85)

    renderBasisVectors(100, bigHead, ctx);
    renderMesh(suzanneMesh, 100, bigHead, ctx, true);
    renderMesh(suzanneMesh, 30, smallHead, ctx, true);
}

export { suzanneTestAnim }
