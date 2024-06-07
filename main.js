const { Quaternion } = require('./bin/quaternion')

let p = new Quaternion(1, 0, 0, 0);
let q = new Quaternion(0, 1, 0, 0);
let h = q.mult(p);

// p.print();
// q.print();
// h.print();

let j = new Quaternion(0, 1, 1, 0)
j = j.inverse();

j.print()
