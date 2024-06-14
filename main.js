function spinDisplay(time) {
    let index = Math.floor(time * 0.01) % 219;
    let spin = ySetRotations[index];

    renderMesh(suzanneMesh, 200, spin, new Vector3(360, 360, 0), ctx, true);
}


// console.log(`Microset length: ${microSet.length}`);

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

    axisMethodRotationTracker(targetRotation, 'x', 'x-axis-tracking');
    axisMethodRotationTracker(targetRotation, 'y', 'y-axis-tracking');
    axisMethodRotationTracker(targetRotation, 'z', 'z-axis-tracking');

    let winningRotation = axisCombinationRotationTracker(targetRotation, 'combined-axis-tracking');
    
    let indexMatches = el => el.index !== winningRotation.index;
    
    // if (winningRotation.type == 'x') {
    //     if (setX.every(el => indexMatches(el))) {
    //         setX.push(winningRotation); 
    //     }
    // } else if (winningRotation.type == 'y') {
    //     if (setY.every(el => indexMatches(el))) {
    //         setY.push(winningRotation); 
    //     }
    // } else if (winningRotation.type == 'z') {
    //     if (setZ.every(el => indexMatches(el))) {
    //         setZ.push(winningRotation); 
    //     }
    // } else {
    //     throw "WHOOPS";
    // }

    
   // console.log(`setX length: ${setX.length} setY length: ${setY.length} setZ length: ${setZ.length}`)

}


animator(animationLoop);
