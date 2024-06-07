class Quaternion {
    constructor(w = 1, x = 0, y = 0, z = 0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    conjugate() {
        return new Quaternion(this.w, -this.x, -this.y, -this.z)
    }

    print() {
        console.log(`w:${this.w} x:${this.x} y:${this.y} z:${this.z} `)
    }

    mult(q) {
        return hamiltonProduct(hamiltonProduct(q, this), q.conjugate())
    }

    inverse() {
        const q = this.conjugate()
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
}

function hamiltonProduct(p, q) {
    const w = p.w*q.w - p.x*q.x - p.y*q.y - p.z*q.z;
    const x = p.w*q.x + p.x*q.w + p.y*q.z - p.z*q.y;
    const y = p.w*q.y - p.x*q.z + p.y*q.w + p.z*q.x;
    const z = p.w*q.z + p.x*q.y - p.y*q.x + p.z*q.w;

    return new Quaternion(w, x, y, z)
}

module.exports = { Quaternion }
