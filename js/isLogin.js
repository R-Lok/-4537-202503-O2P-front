async function isLogin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }
    try {
        const res = await fetch(`${BACK_URL}/isLogin`, req)

        if (!res.ok) {
            return false
        }
        return true
    } catch (e) {
        alert(`${e.name} : ${e.message}`)
        return null
    }
}

// isLogin().then((isLoggedIn) => {
//     if (isLoggedIn === true) {
//         document.body.style.display = 'block'
//     } else if (isLoggedIn === false) {
//         window.location.href = './login.html'
//     }
// })

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
