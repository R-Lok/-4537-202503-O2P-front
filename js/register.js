const submitBtn = document.getElementById('submit-btn')

document.addEventListener("DOMContentLoaded", () => {
    document.title = REGISTRATION
    document.querySelector("#alert").textContent = DANGER_ALERT
    document.querySelector("#email-label").textContent = EMAIL_LABEL
    document.querySelector("#emailHelp").textContent = EMAIL_NEVER_SHARED
    document.querySelector("#password-label").textContent = PASSWORD_LABEL
    document.querySelector("#have_an_account").textContent = HAVE_AN_ACCOUNT
    document.querySelector("#submit-btn").textContent = SUBMIT
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Regex obtained via CHATGPT
    if(!emailPattern.test(email)) {
        displayAlert(EMAIL_WARNING, true)
        return
    }

    if(password === '') {
        displayAlert(PASSWORD_WARNING, true)
        return
    }

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
        const response = await fetch(`${BACK_URL}/register`, req)

        if(!response.ok) {
            const data  = await response.json()
            displayAlert(data.msg, true)
            return
        }

        displayAlert(`${ACC_CREATED}`, false)
        setTimeout(() => {
            window.location.href = './login.html'
        }, 5000)

    } catch (err) {
        displayAlert(`${ERR_NETWORK}`, true)
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