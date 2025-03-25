async function isLogin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }
    try {
        const res = await fetch(`${URL}/isLogin`, req)

        if (!res.ok) {
            handle_res_error(res.status)
            return false
        }
        return true
    } catch (e) {
        window.location.href = './login.html'
        return false
    }
}

isLogin().then((isLoggedIn) => {
    if (isLoggedIn) document.body.style.display = 'block'
})

function handle_res_error(statusCode) {
    switch (statusCode) {
        case 401:
            window.location.href = './login.html'
            break
        case 403:
            window.location.href = './403.html'
            break
        default:
            return
    }
}
