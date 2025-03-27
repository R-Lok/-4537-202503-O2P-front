
function checkAuth(response) {
    console.log(`Status: ${response.status}`)
    if (response.status == 401) {
        window.location.href = './login'
    }        
}

document.addEventListener("DOMContentLoaded", () => {
    document.title = QUIZ
    document.querySelector("#questions-title").textContent = QUESTIONS.toUpperCase()
})
class QuestionManager {
    constructor() {
        this.questionBatch = []; // array to store all questions as object
        this.numOfQuestions = 3; // number of questions to generate. ATM prompt would have to be changed too.
        this.answers = []; // array to store key value pairs of questions and answers
    }

    // make a request to server to propmt AI for questions
    getBatchOfQuestions() {
        fetch(`${BACK_URL}/api/questions`, {
            method: 'GET',
            credentials: 'include'
        }
        )
            .then(response => {
                checkAuth(response);
                return response.json();
            })
            .then(data => {
    
                const message = JSON.parse(data.msg);
                this.displayAllQuestions(message); // display all questions on DOM
                this.populateAnswerArray(message);
            })
            .catch(error => {
                console.log(`${ERROR}`, error)
            })
    }

    displayAllQuestions(data) {
        // clear space where the questions go
        const questionBatchArea = document.getElementById("question-batch");
        
        // for each question, create a p tag for question, create a list
        // and append list item for each possible answer
        for(let i = 0; i < this.numOfQuestions; i++) {
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
    submitAnswers(quizType) {

        fetch(`${BACK_URL}/api/persona`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quizType: quizType,
                answers: this.answers
            })
        })
        .then(response => {
            checkAuth(response);
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
            console.error(`${NO_IMG_URL}`);
        }
    }
    
}

class QuizManager {

    constructor() {
        this.questionMan = new QuestionManager();
        this.selectedQuiz;
    }

    getQuizzes() {
        fetch(`${BACK_URL}/api/quizzes`, {
            method: 'GET',
            credentials: 'include'
        }
        )
            .then(response => {
                checkAuth(response);
                return response.json();
            })
            .then(data => {
                this.displayQuizzes(data.msg);

            })
            .catch(error => {
                console.log("error", error)
            })
    }

    // pop-up modal for user to choose which quiz to play
    createQuizModal(title, items) {
        return new Promise((res) => {
            const quizModal = document.createElement("div");
            quizModal.classList.add("modal");
        
            quizModal.innerHTML = `
                <div class="modal-content">
                    <h2>${title}</h2>
                    <div class="quizzes-container">
                            ${items.map(item => `
                                    <p class="quiz-item">${item}</p>
                            `).join('')}
                    </div>
                </div>
            `;
        
            document.body.appendChild(quizModal);

            // make sure after dom loaded, styles reapplied
            setTimeout(() => {
                document.querySelectorAll(".quiz-item").forEach(item => {
                    item.classList.add("quiz-item");
                });

                document.querySelectorAll(".quiz-item").forEach(item => {
                    item.addEventListener("click", function() {
                        console.log(this.textContent);
                        quizModal.remove();
                        res(this.textContent);
                    })
                });
            }, 0);
            
            quizModal.style.visibility = 'visible';
        });
    }

    generateSubmitButton() {
        let submitButton = document.createElement("button");
        submitButton.id = "submit-btn";
        submitButton.textContent = "Submit";

        document.getElementById("sub-btn").append(submitButton);
        submitButton.style.visibility = "hidden";

        document.getElementById("submit-btn").addEventListener("click", () => {
            if (this.selectedQuiz) {
                this.questionMan.submitAnswers(this.selectedQuiz);
            } else {
                console.log("No quiz selected yet!");
            }
        });
    }

    displayQuizzes(quizzes) {
        const title = "Select a Quiz!";
        const quizList = [];
        for(let i = 0; i < quizzes.length; i++) {
            quizList.push(quizzes[i].name);
        }
        
        // wait for quiz to be selected
        this.createQuizModal(title, quizList).then((selectedQuiz) => {
            this.selectedQuiz = selectedQuiz;
            
            // only display questions once quiz type is chosen
            document.getElementById("question-batch").style.visibility = 'visible';
            document.getElementById("submit-btn").style.visibility = 'visible';
        });
    }
    
    startQuestions() {
        this.getQuizzes();

        // start generating quizzes
        this.questionMan.getBatchOfQuestions();

        this.generateSubmitButton();
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
    const quizManager = new QuizManager();
    quizManager.startQuestions();
}

init()