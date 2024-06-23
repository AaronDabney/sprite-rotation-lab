function animator(animation) {
    let lastTime = null;

    requestAnimationFrame(loop)

    function loop(time) {
        let deltaTime = time - lastTime
        lastTime = time;

        let timeData = {
            time: time,
            deltaTime: deltaTime
        }

        animation(timeData);
        requestAnimationFrame(loop)
    }
}

export { animator }
