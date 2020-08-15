let form = document.getElementsByClassName("delete_form")
let submit = document.getElementsByClassName("submit")
console.log(submit)

for (let element of submit) {
    element.onclick = () => {
        element.nextElementSibling.submit()
    }
}