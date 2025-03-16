async function isAdmin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch("https://fortunedgalab.xyz/admin", req);

        if (!res.ok) {
            window.location.href = './login.html'
            return false
        }
        console.log(res)
        return true
    } catch (e) {
        window.location.href = './login.html';
        return false
    }
}

isAdmin().then((isAdminUser) => {
    if (isAdminUser) document.body.style.display = 'block'
})
