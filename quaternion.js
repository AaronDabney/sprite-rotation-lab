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

    multiply(q) {
        return hamiltonProduct(hamiltonProduct(q, this), q.conjugate())
    }

    inverse() {
        q = this.conjugate()
        let sum = this.w*this.w - this.x*this.x - this.y*this.y - this.z*this.z
        return new Quaternion(q.w/sum, -q.x/sum, -q.y/sum, -q.z/sum)
    }

    normalize() {
        const mag = Math.sqrt(this.w*this.w + this.x*this.x + this.y*this.y + this.z*this.z);
        
        this.w = this.w/mag;
        this.x = this.x/mag;
        this.y = this.y/mag;
        this.z = this.z/mag;
    }
}

let p = new Quaternion(1, 0, 0, 0);
let q = new Quaternion(0, 1, 0, 0);
let h = q.multiply(p);

// p.print();
// q.print();
// h.print();

let j = new Quaternion(0, 1, 1, 0)
j = j.inverse();

j.print()

function hamiltonProduct(p, q) {
    let a_1 = p.w;
    let b_1 = p.x;
    let c_1 = p.y;
    let d_1 = p.z;
    
    let a_2 = q.w;
    let b_2 = q.x;
    let c_2 = q.y;
    let d_2 = q.z;

    let w = a_1*a_2 - b_1*b_2 - c_1*c_2 - d_1*d_2;
    let x = a_1*b_2 + b_1*a_2 + c_1*d_2 - d_1*c_2;
    let y = a_1*c_2 - b_1*d_2 + c_1*a_2 + d_1*b_2;
    let z = a_1*d_2 + b_1*c_2 - c_1*b_2 + d_1*a_2;

    return new Quaternion(w, x, y, z)
}
