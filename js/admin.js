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
    console.log(typeof(users))
    const userList = document.getElementById("user-list");

    // Clear the previous contents of the table
    userList.innerHTML = "";

    // Loop through the users array
    users.forEach(user => {
        const row = document.createElement("tr");

        // Create table row and add the user data
        row.innerHTML = `
        <td>${user.email}</td>
        <td contenteditable="true">${user.api_tokens}</td>
        <td>
            <button class="btn btn-danger" onclick="toggleBan('${user._id}')">Ban/Unban</button>
        </td>
        `;

        // Append the new row to the userList table body
        userList.appendChild(row);
    });
}
    // TODO:add ban unban buttons
//     <button class="btn ${user.enable ? 'btn-success' : 'btn-danger'}" 
//     id="banBtn${user.id}" onclick="toggleBan(${user.id})">
//     ${user.enable ? 'Unban' : 'Ban'}
// </button>

function toggleBan(id) {
    console.log("BANNED")
}

async function init() {
    const users = await getUsers()

    if (!users) return

    populateUsers(users)
    // TODO: query for api calls left
}

init()
