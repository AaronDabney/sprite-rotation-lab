function calculateRotationSet(i) {
    let axisSwitch = midAxisRotation(i)
    let rotationSet = [];
    for (let i = 0; i < 11; i++) {
        let outer = Quaternion.euler(0, i * 18, 0)
        for (j = 0; j < 20; j++) {
            let inner = Quaternion.euler(0, 0, j * 18);
            let rot = outer.mult(inner).mult(axisSwitch);

            rotationSet.push(rot);
        }
    }
    return rotationSet;
}

const xSetRotations = calculateRotationSet('x');
const ySetRotations = calculateRotationSet('y');
const zSetRotations = calculateRotationSet('z');

let [setX, setY, setZ] = generateMicroSets();

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
