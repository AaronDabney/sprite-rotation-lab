function renderMesh(meshData, transform, canvas, cull) {
    let drawingContext = canvas.drawingContext;
    let origin = new Vector3(canvas.canvasNode.width/2, canvas.canvasNode.height/2);
    
    let position = transform.position;
    let rotation = transform.rotation;

    meshData.faces.forEach((face, index) => {        
        let vertexA = new Vector3(...meshData.vertices[face[0]]);
        let vertexB = new Vector3(...meshData.vertices[face[1]]);
        let vertexC = new Vector3(...meshData.vertices[face[2]]);

        vertexA = rotation.rotateVector(vertexA);
        vertexB = rotation.rotateVector(vertexB);
        vertexC = rotation.rotateVector(vertexC);

        const triangleZDepth = (vertexA.z + vertexB.z+ vertexC.z)*(1/3);

        vertexA = vertexA.mult(transform.scale.x).add(position).add(origin);
        vertexB = vertexB.mult(transform.scale.y).add(position).add(origin);
        vertexC = vertexC.mult(transform.scale.z).add(position).add(origin);

        drawingContext.strokeStyle = `rgb(${0} ${255} ${triangleZDepth*255})`;

        if (cull && triangleZDepth < 160) {
            drawingContext.lineWidth = 0.4;
            renderLine(vertexA, vertexB, drawingContext);
            renderLine(vertexB, vertexC, drawingContext);
            renderLine(vertexC, vertexA, drawingContext);
        }
    });
}

function renderBasisVectors(transform, canvas) {
    let drawingContext = canvas.drawingContext;
    let origin = new Vector3(canvas.canvasNode.width/2, canvas.canvasNode.height/2);
    
    let xBasis = new Vector3(1, 0, 0);
    let yBasis = new Vector3(0, 1, 0);
    let zBasis = new Vector3(0, 0, 1);
    
    xBasis = transform.rotation.rotateVector(xBasis);
    yBasis = transform.rotation.rotateVector(yBasis);
    zBasis = transform.rotation.rotateVector(zBasis);

    let position = origin.add(transform.position);
    xBasis = xBasis.mult(transform.scale.x).add(origin).add(transform.position);
    yBasis = yBasis.mult(transform.scale.y).add(origin).add(transform.position);
    zBasis = zBasis.mult(transform.scale.z).add(origin).add(transform.position);

    drawingContext.setLineDash([]);
    drawingContext.lineWidth = 10;

    drawingContext.strokeStyle = `rgb(${255} ${0} ${0})`;
    renderLine(position, xBasis, drawingContext);
    drawingContext.strokeStyle = `rgb(${0} ${255} ${0})`;
    renderLine(position, yBasis, drawingContext);
    drawingContext.strokeStyle = `rgb(${0} ${0} ${255})`;
    renderLine(position, zBasis, drawingContext);
}

function canvasInfo(canvasName) {
    const canvasNode = document.getElementById(canvasName);
    const drawingContext = canvasNode.getContext("2d");
    return [canvasNode, drawingContext];
}

function renderLine(from, to, ctx) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

export { renderMesh, renderBasisVectors, canvasInfo, renderLine }
