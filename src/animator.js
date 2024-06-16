function animator(animation) {
    let lastTime = null;

    requestAnimationFrame(loop)

    function loop(time) {
        let deltaTime = time - lastTime
        lastTime = time;

        animation(time);
        requestAnimationFrame(loop)
    }
}
