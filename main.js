
// let scenes = [];


// let rotationTarget = new Scene();
// rotationTarget.push(new SceneObject())




//we define scenes and then push them onto the scene list

// for (scene in scenes) {
//     scenes.update();
// }

// the animation loop then passes time paramaters into all the scene objects
// scene objects can have their own paramters which chagnes how they react to time updates.

animator(animationLoop);

function animationLoop(time) {
    clearAllCanvas(document.body);

    let timeSlow = time * 0.01;
    let index68 = Math.floor(timeSlow % 68);
    let index220 = Math.floor(timeSlow % 220);

    let targetRotation = Quaternion.euler(timeSlow * 20, timeSlow * 11, timeSlow * 5);

    // Rotation Target
    rotationDisplayer(targetRotation, "rotation-target");

    // X-Z Plane Locked Sets
    rotationDisplayer(xSetRotations[index220], 'x-axis-set');
    rotationDisplayer(ySetRotations[index220], 'y-axis-set');
    rotationDisplayer(zSetRotations[index220], 'z-axis-set');

    // Rotation Target with Angles
    rotationDisplayerWithReferenceVectorAngles(targetRotation, 'rotation-target-angles');

    // Unrotated Targets
    unrotatedTarget(targetRotation, new Vector3(1, 0, 0), 'unrotated-target-x');
    unrotatedTarget(targetRotation, new Vector3(0, 1, 0), 'unrotated-target-y');
    unrotatedTarget(targetRotation, new Vector3(0, 0, 1), 'unrotated-target-z');

    // Unrotated Target Selections
    unrotatedTargetSetSelection(targetRotation, new Vector3(1, 0, 0), xSetRotations, "rotation-selection-x");
    unrotatedTargetSetSelection(targetRotation, new Vector3(0, 1, 0), ySetRotations, "rotation-selection-y");
    unrotatedTargetSetSelection(targetRotation, new Vector3(0, 0, 1), zSetRotations, "rotation-selection-z");

    // Naive Axis Tracking
    axisMethodRotationTracker(targetRotation, 'x', 'x-axis-tracking');
    axisMethodRotationTracker(targetRotation, 'y', 'y-axis-tracking');
    axisMethodRotationTracker(targetRotation, 'z', 'z-axis-tracking');

    // Combined Axis Tracking
    axisCombinationRotationTracker(targetRotation, 'combined-axis-tracking');

    // Canonical Microset
    rotationDisplayer(microsetZ[index68], 'canonical-microset');

    // Base Rotations
    rotationDisplayer(midAxisRotation('z'), "x-axis-select");
    rotationDisplayer(midAxisRotation('x'), "y-axis-select");
    rotationDisplayer(midAxisRotation('y'), "z-axis-select");

    // Microsets
    rotationDisplayer(microsetX[index68], 'microset-x');
    rotationDisplayer(microsetY[index68], 'microset-y')
    rotationDisplayer(microsetZ[index68], 'microset-z')

    // Final Comarison
    rotationDisplayer(targetRotation, "rotation-target-2");
    microSetRotationTracker(targetRotation, 'microset-axis-tracking');
    axisCombinationRotationTracker(targetRotation, 'combined-axis-tracking-2');
}
