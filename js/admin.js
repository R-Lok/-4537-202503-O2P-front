document.addEventListener("DOMContentLoaded", () => {
    document.title = ADMIN
    document.querySelector("#header").textContent = ADMIN
    document.querySelector("#email-heading").textContent = EMAIL
    document.getElementById("role-heading").textContent = ROLE
    document.querySelector("#api-usage-heading").textContent = API_TOKENS
    document.querySelector("#ban-heading").textContent = BAN_UNBAN
    document.getElementById('users-heading').textContent = USERS_HEADING
    document.getElementById('records-heading').textContent = RECORDS_HEADING
    document.getElementById('method-heading').textContent = METHOD_HEADING
    document.getElementById('endpoint-heading').textContent = ROUTE_HEADING
    document.getElementById('records-count-heading').textContent = COUNT_HEADING
})

async function getUsers() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch(`${BACK_URL}/admin/users`, req);

        if (!res.ok) {
            handle_res_error(res.status)
            return
        }

        const data = await res.json()
        populateUsers(data.msg)
    } catch (e) {
        alert(`${e.name}: ${e.message}`);
    }
}

async function getRecords() {
    const req = {
        method: 'GET',
        credentials: 'include'
    }

    try {
        const res = await fetch(`${BACK_URL}/admin/records`, req)

        if(!res.ok) {
            handle_res_error(res.status)
            return
        }

        const data  = await res.json()
        populateRecords(data.msg)

    } catch (error) {
        alert(`${error.name}, ${error.message}`)
    }
}

function populateUsers(users) {
    const userList = document.getElementById("user-list");

    // Clear the previous contents of the table
    userList.replaceChildren()

    // Loop through the users array
    users.forEach(user => {
        const row = document.createElement("tr");

        // Create table row and add the user data
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.apiCallCount}</td>
            <td>
                <button class="btn ${user.enable ? 'btn-danger' : 'btn-success'}" 
                    id="banBtn${user.id}" onclick="toggleBan('${user.email}', ${user.enable})">
                    ${user.enable ? `${BAN}` : `${UNBAN}`}
                </button>
            </td>
        `;
        // Append the new row to the userList table body
        userList.appendChild(row);
    });
}

function populateRecords(data) {

    const tableBody = document.getElementById('records-list')
    tableBody.replaceChildren()

    data.forEach((entry) => {
        const row = document.createElement('tr')

        const method = document.createElement('td')
        const endpt = document.createElement('td')
        const count = document.createElement('td')

        method.textContent = entry.method
        endpt.textContent = entry.route
        count.textContent = entry.count
        
        row.append(method, endpt, count)

        tableBody.appendChild(row)
    })
}

async function toggleBan(email, enabled) {
    // const req = {
    // const endpoint = (enabled) ? "banUser" : "unBanUser"
    const endpoint = "toggleBanUser"
    try {
        const res = await fetch(`${BACK_URL}/admin/${endpoint}?email=${email}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "enable": !enabled
            }),
            credentials: 'include'
        })
        
        if (!res.ok) {
            handle_res_error(res.status)
            return
        }

        location.reload()
    } catch (err) {
        alert(`${err.name}: ${err.message}`);
        location.reload()
    }
}

async function init() {
    const isLoggedIn = await isLogin()
    if (isLoggedIn === false) {
        window.location.href = './login.html'
        return
    } else if (isLoggedIn === null) {
        return
    }

    const userIsAdmin = await isAdmin()
    if (userIsAdmin === false) {
        window.location.href = './403.html'
        return
    } else if (userIsAdmin === null) {
        return
    } 

    document.body.style.display = 'block'
    getRecords()
    getUsers()
}

init()
