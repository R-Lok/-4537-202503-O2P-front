const submitBtn = document.getElementById('submit-btn')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    handleRegistration(email, password)
})

async function handleRegistration(email, pw) {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: pw,
        })
    }

    try {
        const response = await fetch(`${URL}register`, req)

        if(!response.ok) {
            const data  = await response.json()
            displayAlert(data.msg, true)
            return
        }

        displayAlert("Account created - redirecting to login...", false)
        setTimeout(() => {
            window.location.href = './login.html'
        }, 5000)

    } catch (err) {
        displayAlert('Network Error', true)
    }
}

function displayAlert(string, isWarning) {
    const alert = document.getElementById('alert')
    alert.textContent = string

    if(isWarning) {
        alert.classList = "alert alert-danger"
    } else {
        alert.classList = "alert alert-success"
    }
}