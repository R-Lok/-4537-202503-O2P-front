document.getElementById("nav").innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiafortunedgalabry">
    <div class="container-fluid">
        <a class="navbar-brand" href="./index.html">${TITLE_INDEX}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link" href="./index.html">${HOME}</a>
                <a class="nav-link" href="./questions.html">${QUIZ}</a>
                <a class="nav-link" href="./persona.html">${PERSONA}</a>
            </div>
            <button id="logout-btn" class="btn btn-danger ms-auto">${LOGOUT}</button>
        </div>
    </div>
</nav>
`

const logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click', logout)

async function logout() {
    const req = {
        method: "GET",
        credentials: 'include'
    }
    try {
        const res = await fetch(`${BACK_URL}/logout`, req)
        if (!res.ok) {
            let msg = await res.json()
            msg = msg.msg
            alert(`${msg}`)
            window.location.href = './login.html'
            return
        }
        window.location.href = './login.html'
    } catch (e) {
        alert(`${e.name}: ${e.message}`);
    }
}

function updateAdminNav() {
    document.getElementById("nav").innerHTML = `
        <nav class="navbar navbar-expand-lg bg-body-tertiafortunedgalabry">
            <div class="container-fluid">
                <a class="navbar-brand" href="./index.html">${TITLE_INDEX}</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" href="./index.html">${HOME}</a>
                        <a class="nav-link" href="./questions.html">${QUIZ}</a>
                        <a class="nav-link" href="./persona.html">${PERSONA}</a>
                        <a class="nav-link" href="./admin.html">${ADMIN}</a>
                    </div>
                    <button id="logout-btn" class="btn btn-danger ms-auto">${LOGOUT}</button>
                </div>
            </div>
        </nav>
    `
    document.getElementById('logout-btn').addEventListener('click', logout)
}

isAdmin().then(data => {
    if(data === true) {
        updateAdminNav()
    }
})
