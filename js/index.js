const api_tokens = document.getElementById("api-tokens")

document.addEventListener("DOMContentLoaded", () => {
    document.title = HOME
    document.querySelector(".text-center h3").textContent = TITLE_INDEX
    document.querySelector(".text-center h4").textContent = DESCRIPTION_INDEX
    document.querySelector("#start-btn").textContent = START_ADV
    api_tokens.textContent = TOKENS_REMAINING
})


async function getApiTokens() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch(`${BACK_URL}/api/tokens`, req);

        if (!res.ok) {
            handle_res_error(res.status)
            return
        }

        const data = await res.json()
        return data.msg;
    } catch (e) {
        alert(`${e.name}: ${e.message}`);
    }
}

function displayTokenWarning() {
    let p = document.createElement("p");
    p.textContent = NO_TOKENS_MESSAGE
    p.style.fontSize = "40px";
    p.style.color = "red";
    document.getElementById("content").append(p);
}

async function init() {
    const isLoggedIn = await isLogin()
    if(isLoggedIn === false) {
        window.location.href='./login.html'
        return
    } else if (isLoggedIn === null) {
        return
    } else {
        document.body.style.display = 'block'
    }

    document.getElementById('start-btn').addEventListener('click', function() {
        window.location.href = './questions.html'
    })

    const tokens = await getApiTokens()
    api_tokens.textContent += tokens
    if(tokens <= 0) {
        console.log("no tokens");
        displayTokenWarning();
    }
    
}

init()
