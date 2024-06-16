class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    mult(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar)
    }

    norm() {
        return new Vector2(this.x / this.mag, this.y / this.mag, this.z / this.mag)
    }

    add(input) {
        return new Vector3(this.x + input.x, this.y + input.y, this.z + input.z)
    }

    toVector2() {
        return new Vector2(this.x, this.y);
    }

    dot(vec) {
        return vec.x * this.x + vec.y * this.y + vec.z * this.z;
    }
}

export { Vector3 }
