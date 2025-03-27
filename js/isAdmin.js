async function isAdmin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch(`${BACK_URL}/admin`, req)

        if (!res.ok) {
            return false
        }
        return true
    } catch (e) {
        alert(`${e.name}: ${e.message}`)
        return null
    }
}

function handle_res_error(statusCode) {
    switch (statusCode) {
        case 401:
            window.location.href = './login.html'
            break
        case 403:
            window.location.href = './403.html'
            break
        default:
            //should not reach here
            return
    }
}
