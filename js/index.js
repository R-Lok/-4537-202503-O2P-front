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
        const res = await fetch(`${URL}user`, req);

        if (!res.ok) {
            handle_res_error(res.status)
            return
        }

        const data = await res.json()
        return data.msg.api_tokens
    } catch (e) {
        alert(`${e.name}: ${e.message}`);
    }
}

async function init() {
    document.getElementById('start-btn').addEventListener('click', function() {
        window.location.href = 'questions.html'
    })

    const tokens = await getApiTokens()
    api_tokens.textContent += tokens
}

init()
