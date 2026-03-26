function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}

function checkArray(arr) {
    for (let num of arr) {
        if (!isPrime(num))
            return false;
    }
    return true;
}

console.log(checkArray([2, 3, 5, 7]));
