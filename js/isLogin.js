async function isLogin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch("https://fortunedgalab.xyz/isLogin", req);

        if (!res.ok) {
            window.location.href = './login.html';
            alert(`${res.status} ${res.statusText}: Failed authenticating`)
            return
        }
        console.log(res)
    } catch (e) {
        window.location.href = './login.html';
        alert(`${res.status} ${res.statusText}: Failed authenticating`)
    }
}

isLogin()
