let arr = [1, 2, 3, 4, 5, 7]

console.log("Array: " + arr);
console.log("Array is of Length: " + arr.length);
console.log("First element of Array: " + arr[0]);
console.log("Fourth element of Array: " + arr[3]);


// ------------------------------ Array Methods ------------------------------

// toString()
console.log("Array as a string: " + arr.toString());

// join()
console.log(arr.join(" and "));

// pop()
console.log(arr.pop());
console.log(arr)

// push()
console.log(arr.push(32));
console.log(arr);
console.log(arr.push("Raj"));
console.log(arr);

// shift()
console.log(arr.shift())
console.log(arr)

// unshift()
console.log(arr.unshift("Hello"))
console.log(arr)

// concat()                             ==> Used to join 2 Arrays
a1 = [1, 2, 3, 4, 5]
a2 = [6, 7, 8, 9, 10]

a3 = []
console.log(a3.concat(a1, a2))

// sort()
unsorted = [23, 21, 4125, 6, 75, 4]

console.log(unsorted.sort());
