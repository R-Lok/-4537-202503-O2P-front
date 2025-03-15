class QuestionManager {
    constructor() {
        this.questionBatch = []; // array to store all questions as object
        this.numOfQuestions = 3; // number of questions to generate. ATM prompt would have to be changed too.
        this.answers = []; // array to store key value pairs of questions and answers
    }

    checkAuth(response) {
        console.log(`Status: ${response.status}`)
        if (response.status == 401) {
            window.location.href = 'https://fortunedgalab.xyz/login.html'
        }        
    }

    // make a request to server to propmt AI for questions
    getBatchOfQuestions() {
        fetch("https://fortunedgalab.xyz/api/questions", {
            method: 'POST',
            credentials: 'include'
        }
        )
            .then(response => {
                this.checkAuth(response);
                return response.json();
            })
            .then(data => {
    
                const message = JSON.parse(data.msg);
                this.displayAllQuestions(message); // display all questions on DOM
                this.populateAnswerArray(message);
            })
            .catch(error => {
                console.log("error", error)
            })
    }

    displayAllQuestions(data) {
        // clear space where the questions go
        const questionBatchArea = document.getElementById("question-batch");
        
        // for each question, create a p tag for question, create a list
        // and append list item for each possible answer
        for(let i = 0; i < data.questions.length; i++) {
            let p = document.createElement("p");
            p.textContent = data.questions[i].question;
            let ul = document.createElement("ul");
            questionBatchArea.append(p);
            questionBatchArea.append(ul);
            for(let j = 0; j < 4; j++) {
                let li = this.createAnswerLi(data.questions[i].options[String.fromCharCode(97 + j)], i, j);
                ul.appendChild(li);
            }
        }
    }

    // create option to answer as list item
    createAnswerLi(question, i, j) {
        let li = document.createElement("li");

        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question-${i}`;
        radio.value = String.fromCharCode(97 + j);

        // on change set answer to chosen anwser
        radio.addEventListener("change", () => {
            this.answers[i].answer = question;
        })

        // add lable to option
        let label = document.createElement("label");
        label.textContent = question;

        li.appendChild(radio);
        li.appendChild(label);

        return li;
    }

    // set default answer to each question
    populateAnswerArray(data) {
        for(let i = 0; i < this.numOfQuestions; i++) {
            const AnswerObj = {
                question: data.questions[i].question,
                answer: ""
            };

            this.answers.push(AnswerObj);
        }
    }

    // send the results to server to get AI generated persona
    submitAnswers() {

        fetch("https://fortunedgalab.xyz/api/persona", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.answers)
        })
        .then(response => {
            this.checkAuth(response);
            return response.json()})
        .then(data => {
            this.displayImage(data.msg.imageUrl);
            this.displayPersona(data.msg);
        })
        .catch(error => console.error(error));
    }

    displayPersona(data) {
        const persona = `Name: ${data.persona.Name}<br>
        Powers: ${data.persona.Powers}<br>
        Backstory: ${data.persona.Backstory}<br>
        Arch Nemesis: ${data.persona.ArchNemesis}<br>`
        document.getElementById('persona-box').innerHTML = persona;
    }

    displayImage(data) {
        if (data) {
            const imageContainer = document.getElementById('image-container');
            const img = document.createElement('img');
            img.src = data;
            img.alt = "Generated Image";
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
        } else {
            console.error('No image URL returned');
        }
    }
    
}

const questionMan = new QuestionManager();
document.addEventListener("DOMContentLoaded", () => questionMan.getBatchOfQuestions());
document.getElementById('submit-btn').addEventListener("click", () => questionMan.submitAnswers());