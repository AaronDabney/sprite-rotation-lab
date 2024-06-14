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
        console.log(Math.sqrt(this.w*this.w + this.x*this.x + this.y*this.y + this.z*this.z));
    }

    mult(q) {
        // Hamilton product
        const p = this;
        const w = p.w*q.w - p.x*q.x - p.y*q.y - p.z*q.z;
        const x = p.w*q.x + p.x*q.w + p.y*q.z - p.z*q.y;
        const y = p.w*q.y - p.x*q.z + p.y*q.w + p.z*q.x;
        const z = p.w*q.z + p.x*q.y - p.y*q.x + p.z*q.w;
    
        return new Quaternion(w, x, y, z)
    }

    rotateVec(input) {
        const vectorQuaternion = new Quaternion(0, input.x, input.y, input.z);
        const rotatedQuaternion = this.mult(vectorQuaternion).mult(this.conjugate);
        return new Vector3(rotatedQuaternion.x, rotatedQuaternion.y, rotatedQuaternion.z);
    }

    inverse() {
        const q = this.conjugate
        const sum = this.w*this.w - this.x*this.x - this.y*this.y - this.z*this.z
        return new Quaternion(q.w/sum, -q.x/sum, -q.y/sum, -q.z/sum)
    }

    normalize() {
        const mag = Math.sqrt(this.w*this.w + this.x*this.x + this.y*this.y + this.z*this.z);
        
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
        return (180 / Math.PI) * Math.atan2(2*(this.w*this.x  + this.y*this.z), 1 - 2*(this.x*this.x + this.y*this.y));
    }

    get yAngle() {
        const radY = -Math.PI/2 + 2*Math.atan2(Math.sqrt(1 + 2*(this.w*this.y  - this.x*this.z)), Math.sqrt(1 - 2*(this.w*this.y  - this.x*this.z)));
        return radY * 180 / Math.PI;
    }

    get zAngle() {
        const radZ = Math.atan2(2*(this.w*this.z  + this.x*this.y), 1 - 2*(this.y*this.y + this.z*this.z));
        return radZ * 180 / Math.PI;
    }

    static euler(roll, pitch, yaw) {
        // 3-2-1 sequence
        let conversionRatio = Math.PI / 360;
    
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

    differenceMagnitude(quat) {
        // const right = Vector3.up();
        // const up = Vector3.up();

        let xBasis = new Vector3(1, 0, 0);
        let yBasis = new Vector3(0, 1, 0);
        let zBasis = new Vector3(0, 0, 1);

        let xDiff = this.rotateVec(xBasis).dot(quat.rotateVec(xBasis));
        let yDiff = this.rotateVec(yBasis).dot(quat.rotateVec(yBasis));
        let zDiff = this.rotateVec(zBasis).dot(quat.rotateVec(zBasis));

        let xAngle = Math.acos(xDiff) * (180/Math.PI);
        let yAngle = Math.acos(yDiff) * (180/Math.PI);
        let zAngle = Math.acos(zDiff) * (180/Math.PI);

        let diffMagnitude = Math.sqrt(xAngle*xAngle + yAngle*yAngle, zAngle*zAngle);

    //    // console.log(vec);
    //     const vecA = this.rotateVec(up);
    //     const vecB = quat.rotateVec(up);

    //     const dot = vecA.dot(vecB);

    //     const theta = Math.acos(dot) * (180/Math.PI)

        return diffMagnitude;
    }

    static randomQuaternion() {
        let rand = () => (Math.random() * 2 ) - 1;
        let quat = new Quaternion(rand(), rand(), rand(), rand())
        return quat.normalize();
    }

    angle(q) {

        let vec = new Vector3(1, 0, 0);
        let dot = this.rotateVec(vec).dot(q.rotateVec(vec));
        let theta = Math.acos(dot);

        return theta;
    }

    static zero() {
        return new Quaternion();
    }
}
