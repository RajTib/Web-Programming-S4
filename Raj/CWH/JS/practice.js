console.log("Hello Raj")

num = parseInt(prompt("Enter a number"))
console.log("Num: " + num)

function checkEven() {
    let num = parseInt(prompt("Enter number to check odd/even"))

    if (num % 2 === 0)
        console.log(num + " is Even")
    else
        console.log(num + " is Odd")
}
checkEven()

console.log()

function numClassify() {
    let num = parseInt(prompt("Enter the number to classify"))

    if (num < 0)
        console.log(num + " is Negative")
    else if (num > 0)
        console.log(num + " is Positive")
    else
        console.log(num + " is Zero")
}
numClassify()

console.log()

function swap() {
    let a = parseInt(prompt("Enter the number 1 to swap"))
    let b = parseInt(prompt("Enter the number 2 to swap"))

    console.log("Before Swapping")
    console.log("a: " + a)
    console.log("b: " + b)

    a = a + b
    b = a - b
    a = a - b

    console.log("After Swapping")
    console.log("a: " + a)
    console.log("b: " + b)
}
swap()

console.log()

function printN() {
    let n = parseInt(prompt("Enter the number to print till"))

    for (i = 1; i <= n; i++) {
        console.log(`${i} `)
    }
}
printN()

function sumN() {
    let n = parseInt(prompt(`Enter the number to sum till`))
    let sum = 0
    for (i = 1; i <= n; i++) {
        sum += i
    }
    console.log(`Sum of Numbers till ${n}: ${sum}`)
}
sumN()

function factorial(n) {
    if (n == 0)
        return 1;
    return (n * factorial(n - 1));
}
console.log(`Factorial: ${factorial(5)}`)

function table(n) {
    for (i = 1; i <= 12; i++) {
        console.log(`${n} x ${i}: ${n * i}`)
    }
}
table(5)

function reverse(n) {
    let num = 0;
    let count = 3;
    let temp = n
    while (temp > 0) {
        let rem = temp % 10;
        num += rem * (10 ** count);
        count--
        temp = Math.floor(temp / 10)
    }
    console.log(`${n} reversed: ${num}`)
}
reverse(1234)

function digitCount(n) {
    let counter = 0;
    let temp = n;
    while (temp > 0) {
        temp = Math.floor(temp / 10)
        counter++;
    }
    console.log(`Number of digits in ${n}: ${counter}`)
}
digitCount(1234544)

function sumDigits(n) {
    let temp = n;
    let sum = 0;
    while (temp > 0) {
        sum += temp % 10
        temp = Math.floor(temp / 10)
    }
    console.log(`Sum of digits in ${n}: ${sum}`)
}
sumDigits(767)

function checkLeapYear(n) {
    rem = n % 100

    if (rem == 0) {                  // Year ends with 00
        if (n % 400 == 0)
            console.log(`${n} is a leap year`)
        else
            console.log(`${n} is not a leap year`)
    }
    else {                           // Year is anything but '00' ending
        if (rem % 4 == 0)
            console.log(`${n} is a leap year`)
        else
            console.log(`${n} is not a leap year`)
    }
}
checkLeapYear(2000)

function printArray() {
    let nums = [1, 2, 3, 4, 5, 6]
    for (i = 0; i < nums.length; i++) {
        console.log(nums[i])
    }
}
printArray()

function sumArray() {
    let nums = [1, 2, 3, 4, 5, 6]
    let sum = 0
    for (i = 0; i < nums.length; i++) {
        sum += nums[i]
    }
    console.log(`Sum of elements: ${sum}`)
}
sumArray()
