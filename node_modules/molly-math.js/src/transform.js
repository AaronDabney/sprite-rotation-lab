class Transform {
    constructor(rotation = Quaternion.identity(), position = new Vector3(0, 0, 0), scale = new Vector3(1, 1, 1)) {
        this.rotation = rotation;
        this.position = position;
        this.scale = scale;
    }
}

export { Transform }
