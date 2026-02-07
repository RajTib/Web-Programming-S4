console.log("Hey this is Tutorial 55");

let a = 5;
var b = 6;
var c = "Raj";
var d = true;

console.log(a + b);

console.log(typeof(a));
console.log(typeof(b));
console.log(typeof(c));
console.log(typeof(d));

// We should use "let" instead of "var"
// var: globally scoped
// let: block scoped
// const: can't change the value of the variable
{
    let a = 66;
    console.log("'a' inside block: " + a);
}

console.log("'a' outside block: " + a);

// const e = 1;
// e = 4;                   This will give error


let x = "Rajjuuu";
let y = 22;
let z = 3.1415;
const p = true;
let q = undefined;
let r = null;

console.log(x, y, z, p, q, r);
console.log(typeof(x), typeof(y), typeof(z), typeof(p),typeof(q), typeof(r));


// Object: {key:value} pair

let o = {
    "name":"Raj",
    "age":21,
    "gender":true,
}

console.log(o);
o.salary = "100crores"          // Adding a new key-value pair later
console.log(o);
