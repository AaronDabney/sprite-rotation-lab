import { rotationMonkeyAnim, rotationMonkeyX } from "./src/sceneAnimations/rotationMonkeyAnim.js";
// import { suzanneTestAnim } from "./src/sceneAnimations/suzanneTestAnim.js";
import { lockedXSetAnim, lockedYSetAnim, lockedZSetAnim } from "./src/sceneAnimations/XZ-planeLockedRotationSetsAnim.js";
// import { referenceAngleDisplayer } from "./src/sceneAnimations/referenceAngleDisplayerAnim.js";
// import { xUnrotatedTargetAnim, yUnrotatedTargetAnim, zUnrotatedTargetAnim } from "./src/sceneAnimations/unrotatedTargetAnim.js"
// import { xSelectionAnim, ySelectionAnim, zSelectionAnim } from "./src/sceneAnimations/rotatationSelectionAnim.js";
// import { xAxisRotationTrackingAnim, yAxisRotationTrackingAnim, zAxisRotationTrackingAnim } from "./src/sceneAnimations/axisRotationTrackingAnim.js";
// import { combinedAxisRotationTrackingAnim } from "./src/sceneAnimations/combinedAxisRotationTrackingAnim.js";
// import { canonicalMicrosetAnim } from "./src/sceneAnimations/canonicalMicrosetAnim.js";
// import { xSetBaseRotation, ySetBaseRotation, zSetBaseRotation } from "./src/sceneAnimations/baseRotationAnim.js";
// import { microsetXAnim, microsetYAnim, microsetZAnim } from "./src/sceneAnimations/microsetAnim.js";
// import { microSetAxisTrackingAnim } from "./src/sceneAnimations/microsetAxisTrackingAnim.js";

import { calculateRotationSet, generateMicroSets } from "./src/spriteRotationMath.js";
import { Scene, SceneObject } from "./src/scene.js";
import { animator } from "./src/animator.js";

let sceneDefinitions = [
    {
        canvasIDs: ['rotation-target', 'rotation-target-2'],
        sceneObjects: [rotationMonkeyX]
    },
    // {
    //     canvasIDs: ['x-axis-set'],
    //     sceneObjects: [lockedXSetAnim]
    // },
    // {
    //     canvasIDs: ['y-axis-set'],
    //     sceneObjects: [lockedYSetAnim]
    // },
    // {
    //     canvasIDs: ['z-axis-set'],
    //     sceneObjects: [lockedZSetAnim]
    // },
    // {
    //     canvasIDs: ['rotation-target-angles'],
    //     sceneObjects: [referenceAngleDisplayer]
    // },
    // {
    //     canvasIDs: ['unrotated-target-x'],
    //     sceneObjects: [xUnrotatedTargetAnim]
    // },
    // {
    //     canvasIDs: ['unrotated-target-y'],
    //     sceneObjects: [yUnrotatedTargetAnim]
    // },
    // {
    //     canvasIDs: ['unrotated-target-z'],
    //     sceneObjects: [zUnrotatedTargetAnim]
    // },
    // {
    //     canvasIDs: ['rotation-selection-x'],
    //     sceneObjects: [xSelectionAnim]
    // },
    // {
    //     canvasIDs: ['rotation-selection-y'],
    //     sceneObjects: [ySelectionAnim]
    // },
    // {
    //     canvasIDs: ['rotation-selection-z'],
    //     sceneObjects: [zSelectionAnim]
    // },
    // {
    //     canvasIDs: ['x-axis-tracking'],
    //     sceneObjects: [xAxisRotationTrackingAnim]
    // },
    // {
    //     canvasIDs: ['y-axis-tracking'],
    //     sceneObjects: [yAxisRotationTrackingAnim]
    // },
    // {
    //     canvasIDs: ['z-axis-tracking'],
    //     sceneObjects: [zAxisRotationTrackingAnim]
    // },
    // {
    //     canvasIDs: ['combined-axis-tracking', 'combined-axis-tracking-2'],
    //     sceneObjects: [combinedAxisRotationTrackingAnim]
    // },
    // {
    //     canvasIDs: ['canonical-microset'],
    //     sceneObjects: [canonicalMicrosetAnim]
    // },
    // {
    //     canvasIDs: ['x-axis-select'],
    //     sceneObjects: [xSetBaseRotation]
    // },
    // {
    //     canvasIDs: ['y-axis-select'],
    //     sceneObjects: [ySetBaseRotation]
    // },
    // {
    //     canvasIDs: ['z-axis-select'],
    //     sceneObjects: [zSetBaseRotation]
    // },
    // {
    //     canvasIDs: ['microset-x'],
    //     sceneObjects: [microsetXAnim]
    // },
    // {
    //     canvasIDs: ['microset-y'],
    //     sceneObjects: [microsetYAnim]
    // },
    // {
    //     canvasIDs: ['rotation-target-2'],
    //     sceneObjects: [microsetZAnim]
    // },
    // {
    //     canvasIDs: ['microset-z'],
    //     sceneObjects: [rotationMonkeyAnim]
    // },
    // {
    //     canvasIDs: ['microset-axis-tracking'],
    //     sceneObjects: [microSetAxisTrackingAnim]
    // },
    // {
    //     canvasID: 'combined-axis-tracking-2',
    //     sceneObjects: [combinedAxisRotationTrackingAnim]
    // }
];

//console.log(combinedAxisRotationTrackingAnim)

let scenes = sceneDefinitions.map(sceneDefinition => {
    let scene = new Scene(sceneDefinition.canvasIDs);
    scene.sceneObjects = sceneDefinition.sceneObjects;
    return scene;
});

let globalSceneScope = Object.create(null);


for (let scene of scenes) {
    scene.start();
}

animator(animationLoop);

function animationLoop(timeData) {
    
    let time =  timeData.time;
    let deltaTime = timeData.deltaTime;
    
    globalSceneScope.timeData = timeData;
    globalSceneScope.targetRotation = Quaternion.euler(time * .2, time * .11, time * .05);

    for (let scene of scenes) {
        for (let canvas of scene.canvases) {
            let width = canvas.canvasNode.width;
            let height = canvas.canvasNode.height;
            canvas.drawingContext.clearRect(0, 0, width, height);
        }
        scene.update(globalSceneScope);
        scene.render();
    }


}
