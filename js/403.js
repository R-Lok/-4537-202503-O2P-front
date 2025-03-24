document.addEventListener("DOMContentLoaded", () => {
    document.title = TITLE_403
    document.querySelector(".display-5.fw-bold").textContent = TITLE_403
    document.querySelector(".lead.mb-4").textContent = DESCRIPTION_403
    document.querySelector("#home-btn").textContent = HOME
})

document.getElementById('home-btn').addEventListener('click', (e) => {
    window.location.href = "./index.html"
})