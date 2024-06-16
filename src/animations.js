function suzanneTestAnimation(time, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    let angle = time * 0.01;
    let headTop = Quaternion.euler(90, 0, 0);
    let spin = Quaternion.euler(0, angle * 20, 0);

    renderBasisVectors(100, spin, destName);
    renderMesh(suzanneMesh, 200 * (targetCanvas.width / 720), spin, new Vector3(targetCanvas.width / 2, targetCanvas.height / 2, 0), drawingContext, true);
    renderMesh(suzanneMesh, 50 * ((targetCanvas.width / 720)), headTop.mult(spin), new Vector3((630 / 720) * targetCanvas.width, (630 / 720) * targetCanvas.height, 0), drawingContext, true);
}

function rotationDisplayer(rotation, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    renderBasisVectors(100, rotation, destName);
    renderMesh(suzanneMesh, 200 * (targetCanvas.width / 720), rotation, new Vector3(targetCanvas.width / 2, targetCanvas.height / 2, 0), drawingContext, true);
}

function rotationDisplayerWithReferenceVectorAngles(rotation, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    let xBasis = rotation.rotateVector(new Vector3(1, 0, 0));
    let yBasis = rotation.rotateVector(new Vector3(0, 1, 0));
    let zBasis = rotation.rotateVector(new Vector3(0, 0, 1));

    let xRadius = xBasis.toVector2().mag() * 100;
    let xAngle = Math.atan2(xBasis.y, xBasis.x);

    let yRadius = yBasis.toVector2().mag() * 100;
    let yAngle = Math.atan2(yBasis.y, yBasis.x);

    let zRadius = zBasis.toVector2().mag() * 100;
    let zAngle = Math.atan2(zBasis.y, zBasis.x);

    renderBasisVectors(100, rotation, destName);
    renderMesh(suzanneMesh, 100 * (targetCanvas.width / 720), rotation, new Vector3(targetCanvas.width / 2, targetCanvas.height / 2, 0), drawingContext, true);
    
    drawingContext.lineWidth = 5;
    drawingContext.setLineDash([5, 5]);

    drawingContext.strokeStyle = 'red'
    drawingContext.beginPath();
    drawingContext.ellipse(targetCanvas.width/2, targetCanvas.height/2, xRadius, xRadius, 0, 0, xAngle, true)
    drawingContext.stroke();

    drawingContext.strokeStyle = 'green'
    drawingContext.beginPath();
    drawingContext.ellipse(targetCanvas.width/2, targetCanvas.height/2, yRadius, yRadius, 0, 0, yAngle, true)
    drawingContext.stroke();


    drawingContext.strokeStyle = 'blue'
    drawingContext.beginPath();
    drawingContext.ellipse(targetCanvas.width/2, targetCanvas.height/2, zRadius, zRadius, 0, 0, zAngle, true)
    drawingContext.stroke();
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

    let vec = targetRotation.rotateVector(basisVec);
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
    
    renderBasisVectors(100, finalRotation, destName);
    renderMesh(suzanneMesh, 100, finalRotation, new Vector3(targetCanvas.width / 2, targetCanvas.width / 2, 0), drawingContext, true);
}

function axisCombinationRotationTracker(targetRotation, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    let forward = new Vector3(0, 0, 1);

    let rotationsSets = [
        {
            type: 'x',
            localVec: targetRotation.rotateVector(new Vector3(1, 0, 0)),
            set: xSetRotations,
        },
        {
            type: 'y',
            localVec: targetRotation.rotateVector(new Vector3(0, 1, 0)),
            set: ySetRotations,
        },
        {
            type: 'z',
            localVec: targetRotation.rotateVector(new Vector3(0, 0, 1)),
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

    renderBasisVectors(100, finalRotation, destName);
    renderMesh(suzanneMesh, 100, finalRotation, new Vector3(targetCanvas.width / 2, targetCanvas.width / 2, 0), drawingContext, true);
}

function microSetRotationTracker(targetRotation, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    let forward = new Vector3(0, 0, 1);

    let microSets = [
        {
            type: 'x',
            localVec: targetRotation.rotateVector(new Vector3(1, 0, 0)),
            set: microsetX,
        },
        {
            type: 'y',
            localVec: targetRotation.rotateVector(new Vector3(0, 1, 0)),
            set: microsetY,
        },
        {
            type: 'z',
            localVec: targetRotation.rotateVector(new Vector3(0, 0, 1)),
            set: microsetZ,
        }
    ];

    microSets.forEach(el => {
        el.singularityProximity = Math.abs(el.localVec.dot(forward))
    });

    microSets.sort((a, b) => {
        if (a.singularityProximity > b.singularityProximity) {
            return 1;
        } else if (a.singularityProximity < b.singularityProximity) {
            return -1;
        }
        return 0;
    });

    let refVec = microSets[0].localVec;
    let bestSet = microSets[0].set;

    let angle = Math.atan2(refVec.y, refVec.x) * (180/Math.PI);

    let zRotation = Quaternion.euler(0, 0, angle);

    let rotationApproximation = (zRotation.conjugate).mult(targetRotation);
    //let rotationApproximation = (zRotation.conjugate).mult(targetRotation);
    let closestQuaternionIndex = 0;
    let smallestAngle = 1000;

    bestSet.forEach((rot, index) => {
        let angle = rot.differenceMagnitude(rotationApproximation);

        if (angle < smallestAngle) {
            smallestAngle = angle;
            closestQuaternionIndex = index;
        }
    })

    let bestRotation = bestSet[closestQuaternionIndex];

    let finalRotation = zRotation.mult(bestRotation);
    
    
    renderBasisVectors(100, finalRotation, destName);
    renderMesh(suzanneMesh, 100, finalRotation, new Vector3(targetCanvas.width / 2, targetCanvas.width / 2, 0), drawingContext, true);
}


function unrotatedTarget(targetRotation, basis, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    basis = targetRotation.rotateVector(basis);
    let angle = Math.atan2(basis.y, basis.x);

    let zRotation = Quaternion.euler(0, 0, angle*180/Math.PI);
    let rotationApproximation = (zRotation.conjugate).mult(targetRotation);

    renderBasisVectors(100, rotationApproximation, destName);
    renderMesh(suzanneMesh, 100, rotationApproximation, new Vector3(targetCanvas.width / 2, targetCanvas.width / 2, 0), drawingContext, true);
}

function unrotatedTargetSetSelection(targetRotation, basis, set, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    basis = targetRotation.rotateVector(basis);
    let angle = Math.atan2(basis.y, basis.x);

    let zRotation = Quaternion.euler(0, 0, angle*180/Math.PI);
    let rotationApproximation = (zRotation.conjugate).mult(targetRotation);

    let closestQuaternionIndex = 0;
    let smallestAngle = 1000;

    set.forEach((rot, index) => {
        let angle = rot.differenceMagnitude(rotationApproximation);

        if (angle < smallestAngle) {
            smallestAngle = angle;
            closestQuaternionIndex = index;
        }
    })

    let bestRotation = set[closestQuaternionIndex];

    renderBasisVectors(100, bestRotation, destName);
    renderMesh(suzanneMesh, 100, bestRotation, new Vector3(targetCanvas.width / 2, targetCanvas.width / 2, 0), drawingContext, true);
}
