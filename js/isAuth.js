function isAuth() {
    fetch("http://localhost:3000/isLogin", {
        method: 'POST'
    }
    )
        .then(response => {
            console.log(`Status: ${response.status}`)
            if (response.status == 401) {
                window.location.href = 'http://localhost:3000/login'
            }
            return response.json();
        })
        .catch(error => {
            console.log("error", error)
        })
}

isAuth();
