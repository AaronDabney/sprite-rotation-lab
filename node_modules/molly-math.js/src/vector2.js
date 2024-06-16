class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    mult(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    norm() {
        const mag = this.mag();
        return new Vector2(this.x / mag, this.y / mag);
    }

    add(input) {
        return new Vector2(this.x + input.x, this.y + input.y);
    }

    toVector3() {
        return new Vector3(this.x, this.y, 0);
    }

    dot(input) {
        return this.x * input.x + this.y + input.y;
    }
}

export { Vector2 }
