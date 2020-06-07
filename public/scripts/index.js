const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const content = document.querySelector("#modal .content")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

content.addEventListener("click", (e) => {
    //Ignore the parent's event
    e.stopPropagation()
})

modal.addEventListener("click", () => {
    modal.classList.add("hide")
})
close.addEventListener("click", () => {
    modal.classList.add("hide")
})