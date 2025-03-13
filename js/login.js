const submit = document.getElementById('submit-btn')

submit.addEventListener('click', (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
})

async function login(email, password) {
    try {
        const res = await fetch("https://fortunedgalab.xyz/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })

        if (!res.ok) {
            displayAlert("Error during login, need to print response message", true)
            return
        }

        setTimeout(() => {
            // TODO: check if auth from response. if not auth display message
            window.location.href = './index.html'
        }, 5000)

    } catch (e) {
        displayAlert("Error during login", true)
    }
}

// from register.js
function displayAlert(string, isWarning) {
    const alert = document.getElementById('alert')
    alert.textContent = string

    if(isWarning) {
        alert.classList = "alert alert-danger"
    } else {
        alert.classList = "alert alert-success"
    }
}
