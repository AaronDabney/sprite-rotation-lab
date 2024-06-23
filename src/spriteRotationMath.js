function axisRotationTracking(targetRotation, axis) {
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

    return finalRotation;
}

function combinedAxisRotationTracking(targetRotation) {
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


    return finalRotation;
}

function microSetAxisTracking(targetRotation) {
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
    
    return finalRotation;
}

function calculateRotationSet(i) {
    let axisSwitch = midAxisRotation(i)
    let rotationSet = [];
    for (let i = 0; i < 11; i++) {
        let outer = Quaternion.euler(0, i * 18, 0)
        for (let j = 0; j < 20; j++) {
            let inner = Quaternion.euler(0, 0, j * 18);
            let rot = outer.mult(inner).mult(axisSwitch);

            rotationSet.push(rot);
        }
    }
    return rotationSet;
}

function generateMicroSets() {
    // The relationship between the mid-axis rotation and the assosciated set
    // here is not 1-1. For example, the x-set is defined as the set of rotations that are selected
    // when the rotations local-x axis is the furthest from the global z-axis.
    let xSetBaseRotation = midAxisRotation('z');
    let ySetBaseRotation = midAxisRotation('x');
    let zSetBaseRotation = midAxisRotation('y');

    let baseSet = generateMicroSet();

    let xSet = baseSet.map(el => {
        return el.mult(xSetBaseRotation);
    })

    let ySet = baseSet.map(el => {
        return el.mult(ySetBaseRotation);
    })

    let zSet = baseSet.map(el => {
        return el.mult(zSetBaseRotation);
    })

    return [xSet, ySet, zSet];
}

function generateMicroSet() {
    let axisSwitch = new Quaternion(); 
    //axisSwitch.print();
    let set = [];
    for (let b = -1; b < 2; b++){

        let rotationA = Quaternion.euler(0, -18 * b, 0);
        let increment = b === 0 ? 20 : 24;

        for (let c = 0; c < increment; c++) {
            let rotationB = Quaternion.euler(360 / (increment) * c, 0, 0);
            let rot = rotationA.mult(rotationB).mult(axisSwitch);
            set.push(rot)
        }
    }
    
    return set;
}

function midAxisRotation(input) {
    let val;
    if (input === 'x') {
        val = -0.5; // x
    } else if (input === 'y') {
        val = 0.5; // y
    } else if (input === 'z') {
        val = 1; // z
    } else {
        throw "WRONG LETTER"
    }

    const xyzValue = Math.sqrt((1 - val * val) / 3);

    return (new Quaternion(val, xyzValue, xyzValue, xyzValue));
}

const xSetRotations = calculateRotationSet('x');
const ySetRotations = calculateRotationSet('y');
const zSetRotations = calculateRotationSet('z');

let [microsetX, microsetY, microsetZ] = generateMicroSets();

export { axisRotationTracking,
         combinedAxisRotationTracking, 
         microSetAxisTracking, 
         calculateRotationSet,
         generateMicroSets,
         midAxisRotation,
         xSetRotations,
         ySetRotations,
         zSetRotations,
         microsetX,
         microsetY,
         microsetZ }

