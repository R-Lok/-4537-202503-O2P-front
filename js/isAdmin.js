async function isAdmin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch("https://fortunedgalab.xyz/admin", req);

        if (!res.ok) {
            handle_res_error(res.status)
            return false
        }
        console.log(res)
        return true
    } catch (e) {
        window.location.href = './index.html';
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