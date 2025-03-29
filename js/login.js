const submit = document.getElementById('submit-btn')

document.addEventListener("DOMContentLoaded", () => {
    document.title = LOGIN
    document.querySelector("#email-label").textContent = EMAIL_LABEL 
    document.querySelector("#password-label").textContent = PASSWORD_LABEL 
    document.querySelector("#signup-label").textContent = SIGNUP_LABEL
    document.querySelector("#submit-btn").textContent = LOGIN
})

submit.addEventListener('click', (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Regex obtained via CHATGPT
    if (!emailPattern.test(email)) {
        displayAlert(EMAIL_WARNING, true)
        return
    }

    if (password === '') {
        displayAlert(PASSWORD_WARNING, true)
        return
    }

    login(email, password)
})

async function login(email, password) {
    try {
        const res = await fetch(`${BACK_URL}/login`, {
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
            let msg = await res.json()
            msg = msg.msg
            displayAlert(msg, true)
            return
        }
      
        window.location.href = './index.html'
    } catch (e) {
        displayAlert(`${ERR_NETWORK}`, true)
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
