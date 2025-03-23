const api_tokens = document.getElementById("api-tokens")

async function getApiTokens() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch(`${URL}user`, req);

        if (!res.ok) {
            alert(`${res.status} ${res.statusText}: Failed fetching user info`)
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

    // TODO: query for api calls left
    const tokens = await getApiTokens()
    console.log(api_tokens)
    api_tokens.textContent += tokens

}

init()
