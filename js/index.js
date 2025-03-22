const api_tokens = document.getElementById("api-tokens")

async function getApiTokens() {
    const req = {
        method: "GET",
        credentials: 'include'
    }

    try {
        const res = await fetch("https://fortunedgalab.xyz/api/tokens", req);

        if (!res.ok) {
            alert(`${res.status} ${res.statusText}: Failed fetching user info`)
            return
        }

        const data = await res.json()
        return data.msg;
    } catch (e) {
        alert(`${res.status} ${res.statusText}: Failed fetching user info`)
    }
}

function displayTokenWarning() {
    let p = document.createElement("p");
    p.textContent = "Warning: NO MORE TOKENS"
    p.style.fontSize = "40px";
    p.style.color = "red";
    document.getElementById("content").append(p);
}

async function init() {
    document.getElementById('start-btn').addEventListener('click', function() {
        window.location.href = 'https://personamaker.netlify.app/questions'
    })

    // TODO: query for api calls left
    const tokens = await getApiTokens()
    console.log(api_tokens)
    api_tokens.textContent += tokens
    if(tokens <= 0) {
        console.log("no tokens");
        displayTokenWarning();
    }

}

init()
