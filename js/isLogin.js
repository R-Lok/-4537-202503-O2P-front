async function isLogin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        console.log("checking login")
        
        const res = await fetch("https://fortunedgalab.xyz/isLogin", req);

        if (!res.ok) {
            setTimeout(() => {
                window.location.href = '../login.html';
            }, 1000);
            return
        }
        console.log(res)
    } catch (e) {
        setTimeout(() => {
            window.location.href = '../login.html';
        }, 1000);
    }
}

isLogin()
