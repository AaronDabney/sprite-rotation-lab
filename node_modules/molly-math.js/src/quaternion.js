class Quaternion {
    constructor(w = 1, x = 0, y = 0, z = 0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    print() {
        console.log(`w: ${this.w} x: ${this.x} y: ${this.y} z: ${this.z}`);
        console.log(`xAngle: ${this.angles.x} yAngle: ${this.angles.y} zAngle: ${this.angles.z}`);
    }

    /**
     * Hamilton product
     * @param {*} q 
     * @returns 
     */
    mult(q) {
        const p = this;
        const w = p.w * q.w - p.x * q.x - p.y * q.y - p.z * q.z;
        const x = p.w * q.x + p.x * q.w + p.y * q.z - p.z * q.y;
        const y = p.w * q.y + p.y * q.w + p.z * q.x - p.x * q.z;
        const z = p.w * q.z + p.z * q.w + p.x * q.y - p.y * q.x;

        return new Quaternion(w, x, y, z)
    }

    rotateVector(input) {
        const vectorQuaternion = new Quaternion(0, input.x, input.y, input.z);
        let rotatedQuaternion = this.mult(vectorQuaternion).mult(this.conjugate);
        return new Vector3(rotatedQuaternion.x, rotatedQuaternion.y, rotatedQuaternion.z);
    }

    inverse() {
        const q = this.conjugate
        const sum = this.w * this.w - this.x * this.x - this.y * this.y - this.z * this.z
        return new Quaternion(q.w / sum, -q.x / sum, -q.y / sum, -q.z / sum)
    }

    normalize() {
        const mag = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);

        const w = this.w / mag;
        const x = this.x / mag;
        const y = this.y / mag;
        const z = this.z / mag;

        return new Quaternion(w, x, y, z)
    }

    get angles() {
        return new Vector3(this.xAngle, this.yAngle, this.zAngle)
    }

    get conjugate() {
        return new Quaternion(this.w, -this.x, -this.y, -this.z)
    }

    get xAngle() {
        let radX = Math.atan2(2 * (this.w * this.x + this.y * this.z), 1 - 2 * (this.x * this.x + this.y * this.y));
        return radX * 180 / Math.PI;
    }

    get yAngle() {
        const radY = -Math.PI / 2 + 2 * Math.atan2(Math.sqrt(1 + 2 * (this.w * this.y - this.x * this.z)), Math.sqrt(1 - 2 * (this.w * this.y - this.x * this.z)));
        return radY * 180 / Math.PI;
    }

    get zAngle() {
        const radZ = Math.atan2(2 * (this.w * this.z + this.x * this.y), 1 - 2 * (this.y * this.y + this.z * this.z));
        return radZ * 180 / Math.PI;
    }

    static euler(roll, pitch, yaw) {
        // Z-Y-X sequence rotation
        const degreesToRadians = Math.PI / 180;
        const conversionRatio = degreesToRadians * 0.5;

        roll *= conversionRatio;
        pitch *= conversionRatio;
        yaw *= conversionRatio;

        const rollCos = Math.cos(roll);
        const rollSin = Math.sin(roll);
        const pitchCos = Math.cos(pitch);
        const pitchSin = Math.sin(pitch);
        const yawCos = Math.cos(yaw);
        const yawSin = Math.sin(yaw);

        const w = rollCos * pitchCos * yawCos + rollSin * pitchSin * yawSin;
        const x = rollSin * pitchCos * yawCos - rollCos * pitchSin * yawSin;
        const y = rollCos * pitchSin * yawCos + rollSin * pitchCos * yawSin;
        const z = rollCos * pitchCos * yawSin - rollSin * pitchSin * yawCos;

        return new Quaternion(w, x, y, z);
    }

    /**
     * Useful in comparing relative differences between quaternions
     * @param {*} quat 
     * @returns 
     */
    differenceMagnitude(quat) {
        const xBasis = new Vector3(1, 0, 0);
        const yBasis = new Vector3(0, 1, 0);
        const zBasis = new Vector3(0, 0, 1);

        const xDiff = this.rotateVector(xBasis).dot(quat.rotateVector(xBasis));
        const yDiff = this.rotateVector(yBasis).dot(quat.rotateVector(yBasis));
        const zDiff = this.rotateVector(zBasis).dot(quat.rotateVector(zBasis));

        const xAngle = Math.acos(xDiff) * (180 / Math.PI);
        const yAngle = Math.acos(yDiff) * (180 / Math.PI);
        const zAngle = Math.acos(zDiff) * (180 / Math.PI);

        const diffMagnitude = Math.sqrt(xAngle * xAngle + yAngle * yAngle, zAngle * zAngle);

        return diffMagnitude;
    }

    angle(q) {
        const vec = new Vector3(1, 0, 0);
        const dot = this.rotateVector(vec).dot(q.rotateVector(vec));
        const theta = Math.acos(dot);

        return theta;
    }

    /**
     * Negated quaterions behave identically to original
     * @returns 
     */
    flipSign() {
        return new Quaternion(-this.w, -this.x, -this.y, -this.z);
    }

    /**
     * Raw vector distance between 2 quaternions
     * Both quaternions are first converted to representations with positive w components
     * @param {*} q 
     * @returns 
     */
    dist(q) {
        if (q.w < 0) {
            q = q.flipSign();
        }
        let t = this;
        if (t.w < 0) {
            t = t.flipSign();
        }

        const w = t.w - q.w;
        const x = t.x - q.x;
        const y = t.y - q.y;
        const z = t.z - q.z;

        const dist = Math.sqrt(w * w + x * x + y * y + z * z);

        return dist;
    }

    static randomUnitQuaternion() {
        const rand = () => (Math.random() * 2) - 1;
        const quat = new Quaternion(rand(), rand(), rand(), rand())
        return quat.normalize();
    }

    static identity() {
        return new Quaternion();
    }
}

export { Quaternion }
