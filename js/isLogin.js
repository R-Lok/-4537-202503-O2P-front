async function isLogin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }
    try {
        const res = await fetch("https://fortunedgalab.xyz/isLogin", req);

        if (!res.ok) {
            window.location.href = './login.html';
            return false
        }
        return true
    } catch (e) {
        window.location.href = './login.html';
        return false
    }
}

isLogin().then((isLoggedIn) => {
    if (isLoggedIn) document.body.style.display = 'block'
})
