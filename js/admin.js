async function getUsers() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch("https://fortunedgalab.xyz/admin/users", req);

        if (!res.ok) {
            alert(`${res.status} ${res.statusText}: Failed fetching users`)
            return
        }

        const data = await res.json()
        return data.msg
    } catch (e) {
        alert(`${res.status} ${res.statusText}: Failed fetching users`)
    }
}

function populateUsers(users) {
    
}

function init() {
    const users = getUsers()

    populateUsers(users)
    // TODO: query for api calls left
}

init()
