function renderMesh(meshData, scale, rotation, offset, drawingContext, cull) {
    meshData.faces.forEach((face, index) => {        
        let vertexA = new Vector3(...meshData.vertices[face[0]]);
        let vertexB = new Vector3(...meshData.vertices[face[1]]);
        let vertexC = new Vector3(...meshData.vertices[face[2]]);

        vertexA = rotation.rotateVec(vertexA);
        vertexB = rotation.rotateVec(vertexB);
        vertexC = rotation.rotateVec(vertexC);

        const triangleZDepth = (vertexA.z + vertexB.z+ vertexC.z)*(1/3)*255;
        const depthColoring = triangleZDepth;

        vertexA = vertexA.mult(scale).add(offset);
        vertexB = vertexB.mult(scale).add(offset);
        vertexC = vertexC.mult(scale).add(offset);

        drawingContext.strokeStyle = `rgb(${0} ${255} ${depthColoring})`;

        if (cull && triangleZDepth < 160) {
            drawLine(vertexA, vertexB);
            drawLine(vertexB, vertexC);
            drawLine(vertexC, vertexA);
        }

        function drawLine(from, to) {
            drawingContext.beginPath();
            drawingContext.moveTo(from.x, from.y);
            drawingContext.lineTo(to.x, to.y);
            drawingContext.lineWidth = 0.4;
            drawingContext.stroke();
        }
    
    });
}


function canvasInfo(canvasName) {
    const canvas = document.getElementById(canvasName);
    const ctx = canvas.getContext("2d");
    return [canvas, ctx]
}
