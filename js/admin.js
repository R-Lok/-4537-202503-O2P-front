async function getUsers() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch("https://fortunedgalab.xyz/admin/users", req);

        if (!res.ok) {
            handle_res_error(res.status)
            return
        }

        const data = await res.json()
        return data.msg
    } catch (e) {
        alert(`${e.name}: ${e.message}`);
    }
}

function populateUsers(users) {
    console.log(typeof(users))
    const userList = document.getElementById("user-list");

    // Clear the previous contents of the table
    userList.innerHTML = "";

    // Loop through the users array
    users.forEach(user => {
        console.log(user)
        const row = document.createElement("tr");

        // Create table row and add the user data
        row.innerHTML = `
        <td>${user.email}</td>
        <td contenteditable="true">${user.api_tokens}</td>
        <td>
            <button class="btn ${user.enable ? 'btn-danger' : 'btn-success'}" 
                id="banBtn${user.id}" onclick="toggleBan('${user.email}', ${user.enable})">
                ${user.enable ? 'Ban' : 'Unban'}
            </button>
        </td>
        `;

        // Append the new row to the userList table body
        userList.appendChild(row);
    });
}

async function toggleBan(email, enabled) {
    console.log(email, enabled)
    // const req = {
    const endpoint = (enabled) ? "banUser" : "unBanUser"
    try {
        const res = await fetch(`https://fortunedgalab.xyz/admin/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email
            }),
            credentials: 'include'
        })

        if (!res.ok) {
            // TODO: handle res codes
            return
        }

        location.reload()
    } catch (err) {
        alert(`${err.status} ${err.message}`)
    }
}

async function init() {
    if(!(await isAdmin())) {
        return
    }
    document.body.style.display = 'block'
    const users = await getUsers()

    if (!users) return

    populateUsers(users)
}

init()
