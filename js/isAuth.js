function isAuth() {
    fetch("https://fortunedgalab.xyz/isLogin", {
        method: 'POST'
    }
    )
        .then(response => {
            console.log(`Status: ${response.status}`)
            if (response.status == 401) {
                window.location.href = 'https://personamaker.netlify.app/login'
            }
            return response.json();
        })
        .catch(error => {
            console.log("error", error)
        })
}
