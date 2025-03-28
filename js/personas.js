class PersonaManager {
    constructor() {
        this.personas = [];
        this.personaIndex = 0;
    }

    getAllPersonas() {
        fetch(`${BACK_URL}/api/savedPersonas`, {
            method: 'GET',
            credentials: 'include'
        }
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.personas = data.msg;
                this.displayAllPersonas(this.personas)
            })
            .catch(error => {
                console.log(`${ERROR}`, error)
            })
    }

    fetchImage(fileName, index) {
        console.log(fileName);
        fetch(`${BACK_URL}/api/personaImage?fileName=${encodeURIComponent(fileName)}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            this.displayImage(imageUrl, index);
        })
        .catch(error => console.error('Error fetching image:', error));
    }

    displayAllPersonas(items) {
        let index = 0;
        personaList.innerHTML = `
                <div class="modal-content">
                    <div id="quizzes-container">
                            ${items.map(item => `
                                    <p>${item.persona.persona.Name}</p>
                                    <div id="img${index}"></div>
                                    <p>Abilites: ${item.persona.persona.Powers}</p>
                                     <p>${item.persona.persona.Backstory}</p>
                                    <p>Your enemy is: ${item.persona.persona.ArchNemesis}</p>
                                    <p>Created: <b>${item.createdAt}</b><p>
                                    <div id="del${index++}"></div> 
                                    <p><b>--------------------------------------------------------------------------------------</b></p>
                            `).join('')}
                    </div>
                </div>
            `;

        index = 0;
        items.forEach((item) => {
            this.fetchImage(item.pathToImage, index);
            this.displayDeleteButton(index)
            index++;
        });
    }

    displayImage(image, index) {
        const img = document.createElement("img");
        img.src = image;  
        img.alt = "Persona Image"; 
        img.style.width = "200px"; 
        img.style.height = "200px";
        document.getElementById("img"+index).appendChild(img);
    }

    displayDeleteButton(index) {
        let deleteButton = document.createElement("button");
        deleteButton.id = "delete-btn";
        deleteButton.textContent = "Delete";

        document.getElementById("del"+index).append(deleteButton);

        document.getElementById("delete-btn").addEventListener("click", () => {

        });
    }

}

async function init() {
    const isLoggedIn = await isLogin()
    if(isLoggedIn === false) {
        window.location.href = './login.html'
        return
    } else if (isLoggedIn === null) {
        return
    }
    document.body.style.display = 'block'
    const personaManager = new PersonaManager();
personaManager.getAllPersonas();
}

init()
