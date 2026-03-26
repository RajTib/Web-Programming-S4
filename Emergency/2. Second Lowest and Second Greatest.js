function secondValues(arr) {
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);

    return [arr[1], arr[arr.length - 2]];
}

console.log(secondValues([1, 2, 3, 4, 5]));

function reverseNumber(num) {
    return parseInt(num.toString().split("").reverse().join(""));
}

console.log(reverseNumber(32243));
