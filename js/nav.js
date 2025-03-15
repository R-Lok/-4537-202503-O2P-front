document.getElementById("nav").innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiafortunedgalabry">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Persona Maker</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                <a class="nav-link" href="./index.html">Home</a>
            </div>
            <button id="logout-btn" class="btn btn-danger ms-auto">Logout</button>
        </div>
    </div>
</nav>
`

const logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click', logout)

async function logout() {
    try {
        const res = await fetch("https://fortunedgalab.xyz/logout", {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            alert("Error during logout, need to print response message")
            return
        }

        window.location.href = './register.html'
    } catch (e) {
        alert("Error during login")
    }
}