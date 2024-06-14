function spinDisplay(time) {
    let index = Math.floor(time * 0.01) % 219;
    let spin = ySetRotations[index];

    renderMesh(suzanneMesh, 200, spin, new Vector3(360, 360, 0), ctx, true);
}


// console.log(`Microset length: ${microSet.length}`);

let testSetX = [];
let testSetY = [];
let testSetZ = [];

function animationLoop(time) {

    function clearAllCanvas(node) {
        if (node.nodeName === 'CANVAS') {
            let ctx = node.getContext("2d");
            ctx.clearRect(0 ,0, node.width, node.height);
        }

        Array.from(node.children).forEach(child => {
            clearAllCanvas(child);
        })
    }

    clearAllCanvas(document.body);

    let angle = time * 0.1;

    //let targetRotation = Quaternion.randomQuaternion();
    let targetRotation = Quaternion.euler(angle*Math.E, angle*1.1, angle*0.5);
    
    rotationDisplayer(targetRotation, "rotation-target");
   // renderBasisVectors(100, targetRotation, "rotation-target")

    axisMethodRotationTracker(targetRotation, 'x', 'x-axis-tracking');
    axisMethodRotationTracker(targetRotation, 'y', 'y-axis-tracking');
    axisMethodRotationTracker(targetRotation, 'z', 'z-axis-tracking');

    // Standard sets
    let standardIndex = Math.floor(time*.01 % 220);
    console.log(standardIndex);
    rotationDisplayer(xSetRotations[standardIndex], 'standard-x-axis-set');
    rotationDisplayer(ySetRotations[standardIndex], 'standard-y-axis-set')
    rotationDisplayer(zSetRotations[standardIndex], 'standard-z-axis-set')

    let winningRotation = axisCombinationRotationTracker(targetRotation, 'combined-axis-tracking');
    let testIndex = Math.floor(time*.01 % 68);

    rotationDisplayer(setX[testIndex], 'microset-x');
    rotationDisplayer(setY[testIndex], 'microset-y')
    rotationDisplayer(setZ[testIndex], 'microset-z')

    microSetRotationTracker(targetRotation, 'microset-axis-tracking');

    let val = Math.sin(angle*.01);
    const xyzValue = Math.sqrt((1 - val * val) / 3.0);
    let q = (new Quaternion(val, xyzValue, xyzValue, xyzValue)).normalize();

    rotationDisplayer(q, "mid-axis-spin");


    //let indexMatches = el => el.index !== winningRotation.index;

    let distanceTest = (rot) => {
        if (rot.dist(winningRotation.rotation) < 0.1) {
            return true;
        } else {
            return false
        }
    }
    
    if (winningRotation.type == 'x') {
        if (testSetX.every(el => !distanceTest(el))) {
            testSetX.push(winningRotation.rotation); 
        }
    } else if (winningRotation.type == 'y') {
        if (testSetY.every(el => !distanceTest(el))) {
            testSetY.push(winningRotation.rotation); 
        }
    } else if (winningRotation.type == 'z') {
        if (testSetZ.every(el => !distanceTest(el))) {
            testSetZ.push(winningRotation.rotation); 
        }
    } else {
        throw "WHOOPS";
    }

   // let testSetIndex = 
    if (testSetX.length > 0) {
        rotationDisplayer(testSetX[Math.floor(time*.01 % testSetX.length)], 'test-set-x'); 
    }
    if (testSetY.length > 0) {
        rotationDisplayer(testSetY[Math.floor(time*.01 % testSetY.length)], 'test-set-y'); 
    }
    if (testSetZ.length > 0) {
        rotationDisplayer(testSetZ[Math.floor(time*.01 % testSetZ.length)], 'test-set-z'); 
    } 
    
    // rotationDisplayer(testSetY[Math.floor(time*.01 % testSetY.length)], 'test-set-x');
    // rotationDisplayer(testSetZ[Math.floor(time*.01 % testSetZ.length)], 'test-set-x');

    
  //  console.log(`testSetX length: ${testSetX.length} testSetX length: ${testSetY.length} testSetX length: ${testSetZ.length}`)

}


animator(animationLoop);
