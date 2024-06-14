function calculateRotationSet(w = -0.5) {
    let init = new Quaternion();
    let xyzValue = Math.sqrt((1 - w * w) / 3);

    init.w = w;
    init.x = xyzValue;
    init.y = xyzValue;
    init.z = xyzValue;

    let rotationSet = [];
    for (let i = 0; i < 11; i++) {
        let outer = Quaternion.euler(0, i * 18, 0)
        for (j = 0; j < 20; j++) {
            let inner = Quaternion.euler(0, 0, j * 18);
            let rot = outer.mult(inner).mult(init);

            rotationSet.push(rot);
        }
    }
    return rotationSet;
}

const xSetRotations = calculateRotationSet(-0.5);
const ySetRotations = calculateRotationSet(0.5);
const zSetRotations = calculateRotationSet(1);


function generateMicroSet() {
    

    function gen(i) {
        let axisSwitch = midAxisRotation(i);
        let set = [];
        for (let b = -1; b < 2; b++){

            let rotationA = Quaternion.euler(0, -18 * b, 0);
            let increment = b == 0 ? 20 : 24;

            for (let c = 0; c < increment; c++) {
                let rotationB = Quaternion.euler(360 / (increment) * c, 0, 0);
                let temp = ((rotationA).mult(rotationB)).mult(axisSwitch);
                set.push(temp)
            }
        }
    }


    
    return [gen(0), gen(1), gen(2)];
}

function midAxisRotation(input) {
    let val;
    if (input === 0) {
        val = -0.5; // x
    } else if (input === 1) {
        val = 0.5; // y
    } else {
        val = 1; // z
    }

    const xyzValue = Math.sqrt((1 - val * val) / 3.0);

    return new Quaternion(val, xyzValue, xyzValue, xyzValue);
}
