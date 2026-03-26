function findDuplicates(arr) {
    let duplicates = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j] && !duplicates.includes(arr[i])) {
                duplicates.push(arr[i]);
            }
        }
    }

    return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1]));
