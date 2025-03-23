const submit = document.getElementById('submit-btn')

submit.addEventListener('click', (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
})

async function login(email, password) {
    try {
        const res = await fetch(`${URL}login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
            credentials: 'include'
        })

        if (!res.ok) {
            displayAlert(`${res.status} ${res.statusText}`, true)
            return
        }
      
        window.location.href = './index.html'
    } catch (e) {
        displayAlert("Network Error.", true)
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
