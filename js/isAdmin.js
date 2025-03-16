async function isAdmin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch("https://fortunedgalab.xyz/admin", req);

        if (!res.ok) {
            window.location.href = './login.html'
            alert(`${res.status} ${res.statusText}: Failed authenticating`)
            return
        }
        console.log(res)
    } catch (e) {
        window.location.href = './login.html';
        alert(`${res.status} ${res.statusText}: Failed authenticating`)
    }
}

isAdmin()
