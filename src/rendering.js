function renderMesh(meshData, scale, rotation, offset, drawingContext, cull) {

    //renderBasisVectors(100, rotation, drawingContext);

    meshData.faces.forEach((face, index) => {        
        let vertexA = new Vector3(...meshData.vertices[face[0]]);
        let vertexB = new Vector3(...meshData.vertices[face[1]]);
        let vertexC = new Vector3(...meshData.vertices[face[2]]);

        vertexA = rotation.rotateVector(vertexA);
        vertexB = rotation.rotateVector(vertexB);
        vertexC = rotation.rotateVector(vertexC);

        const triangleZDepth = (vertexA.z + vertexB.z+ vertexC.z)*(1/3)*255;
        const depthColoring = triangleZDepth;

        vertexA = vertexA.mult(scale).add(offset);
        vertexB = vertexB.mult(scale).add(offset);
        vertexC = vertexC.mult(scale).add(offset);

        drawingContext.strokeStyle = `rgb(${0} ${255} ${depthColoring})`;

        if (cull && triangleZDepth < 160) {
            drawingContext.lineWidth = 0.4;
            drawLine(vertexA, vertexB);
            drawLine(vertexB, vertexC);
            drawLine(vertexC, vertexA);
        }
    
    });
}

function renderBasisVectors(scale, rotation, destName) {
    [targetCanvas, drawingContext] = canvasInfo(destName);

    let xBasis = new Vector3(1, 0, 0);
    let yBasis = new Vector3(0, 1, 0);
    let zBasis = new Vector3(0, 0, 1);
    
    xBasis = rotation.rotateVector(xBasis);
    yBasis = rotation.rotateVector(yBasis);
    zBasis = rotation.rotateVector(zBasis);

    let offset = new Vector3(targetCanvas.width/2, targetCanvas.height/2);

    let origin = new Vector3(0,0,0).add(offset);
    xBasis = xBasis.mult(scale).add(offset);
    yBasis = yBasis.mult(scale).add(offset);
    zBasis = zBasis.mult(scale).add(offset);

    drawingContext.setLineDash([]);
    drawingContext.lineWidth = 10;
    drawingContext.strokeStyle = `rgb(${255} ${0} ${0})`;
    drawLine(origin, xBasis);
    drawingContext.strokeStyle = `rgb(${0} ${255} ${0})`;
    drawLine(origin, yBasis);
    drawingContext.strokeStyle = `rgb(${0} ${0} ${255})`;
    drawLine(origin, zBasis);

}

function canvasInfo(canvasName) {
    const canvas = document.getElementById(canvasName);
    const ctx = canvas.getContext("2d");
    return [canvas, ctx]
}

function drawLine(from, to) {
    drawingContext.beginPath();
    drawingContext.moveTo(from.x, from.y);
    drawingContext.lineTo(to.x, to.y);
    drawingContext.stroke();
}

function clearAllCanvas(node) {
    if (node.nodeName === 'CANVAS') {
        let ctx = node.getContext("2d");
        ctx.clearRect(0 ,0, node.width, node.height);
    }

    Array.from(node.children).forEach(child => {
        clearAllCanvas(child);
    })
}