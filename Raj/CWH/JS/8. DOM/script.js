let heading = document.getElementById("title")

heading.title = "Changed"

let button = document.getElementById("btn")

button.addEventListener("click", hello)

function hello() {
    console.log("Hellllooo")
}

console.log(window.location.href);

