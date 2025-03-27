async function isAdmin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch(`${BACK_URL}/admin`, req)

        if (!res.ok) {
            if (window.location.pathname.includes("/admin")) { // on admin page
                handle_res_error(res.status)
            } else if (res.status == 401) { // on all other pages
                window.location.href = './login.html'
            }
            return false
        } else {
            updateAdminNav()
        }

        return true
    } catch (e) {
        window.location.href = './index.html'
        return false
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
