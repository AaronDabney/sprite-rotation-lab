function suzanneTestAnimation(time, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    angle = time * 0.01;
    let headTop = Quaternion.euler(90, 0, 0);
    let spin = Quaternion.euler(0, angle * 20, 0);

    renderMesh(suzanneMesh, 200 * (targetCanvas.width / 720), spin, new Vector3(targetCanvas.width / 2, targetCanvas.height / 2, 0), drawingContext, true);
    renderMesh(suzanneMesh, 50 * ((targetCanvas.width / 720)), headTop.mult(spin), new Vector3((630 / 720) * targetCanvas.width, (630 / 720) * targetCanvas.height, 0), drawingContext, true);
}

function rotationDisplayer(rotation, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    renderMesh(suzanneMesh, 200 * (targetCanvas.width / 720), rotation, new Vector3(targetCanvas.width / 2, targetCanvas.height / 2, 0), drawingContext, true);
}


function axisMethodRotationTracker(targetRotation, axis, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    let basisVec = new Vector3();
    let rotationSet = [];
    if (axis === 'x') {
        basisVec = new Vector3(1, 0, 0);
        rotationSet = xSetRotations;
    } else if (axis === 'y') {
        basisVec = new Vector3(0, 1, 0);
        rotationSet = ySetRotations;
    } else if (axis === 'z') {
        basisVec = new Vector3(0, 0, 1);
        rotationSet = zSetRotations;
    } else {
        throw "INVALID AXIS";
    }

    let vec = targetRotation.rotateVec(basisVec);
    let zRotationTheta = Math.atan2(vec.y, vec.x) * 180 / Math.PI;
    let zRotation = Quaternion.euler(0, 0, zRotationTheta);

    let setRotation = (zRotation.conjugate).mult(targetRotation);

    let smallestAngle = 1000;
    let closestFrame = 0;

    rotationSet.forEach((rot, index) => {
        let angle = rot.differenceMagnitude(setRotation);

        if (angle < smallestAngle) {
            smallestAngle = angle;
            closestFrame = index;
        }
    })

    let bestRotation = rotationSet[closestFrame];

    let finalRotation = zRotation.mult(bestRotation);

    renderMesh(suzanneMesh, 100, finalRotation, new Vector3(targetCanvas.width / 2, targetCanvas.width / 2, 0), drawingContext, true);
}

function axisCombinationRotationTracker(targetRotation, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    let forward = new Vector3(0, 0, 1);

    let rotationsSets = [
        {
            type: 'x',
            localVec: targetRotation.rotateVec(new Vector3(1, 0, 0)),
            set: xSetRotations,
        },
        {
            type: 'y',
            localVec: targetRotation.rotateVec(new Vector3(0, 1, 0)),
            set: ySetRotations,
        },
        {
            type: 'z',
            localVec: targetRotation.rotateVec(new Vector3(0, 0, 1)),
            set: zSetRotations,
        }
    ]

    rotationsSets.forEach(el => {
        el.singularityProximity = Math.abs(el.localVec.dot(forward))
    })

    rotationsSets.sort((a, b) => {
        if (a.singularityProximity > b.singularityProximity) {
            return 1;
        } else if (a.singularityProximity < b.singularityProximity) {
            return -1;
        }
        return 0;
    });

    let refVec = rotationsSets[0].localVec;
    let rotationSet = rotationsSets[0].set;

    let angle = Math.atan2(refVec.y, refVec.x) * (180/Math.PI);

    let zRotation = Quaternion.euler(0, 0, angle);

    let rotationApproximation = (zRotation.conjugate).mult(targetRotation);


    let closestQuaternionIndex = 0;
    let smallestAngle = 1000;

    rotationSet.forEach((rot, index) => {
        let angle = rot.differenceMagnitude(rotationApproximation);

        if (angle < smallestAngle) {
            smallestAngle = angle;
            closestQuaternionIndex = index;
        }
    })

    let bestRotation = rotationSet[closestQuaternionIndex];

    let finalRotation = zRotation.mult(bestRotation);

    renderMesh(suzanneMesh, 100, finalRotation, new Vector3(targetCanvas.width / 2, targetCanvas.width / 2, 0), drawingContext, true);

    return {rotation: bestRotation, type: rotationsSets[0].type, index: closestQuaternionIndex}
}
