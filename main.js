// translate between curl and fetch syntax to use this API
//await keyword
// if they come back as an array it will keep the order.



const start_quiz_btn = document.querySelector("#btn-start-quiz");
const submit_btn = document.querySelector("#btn-submit");
const question_card = document.querySelector("#quiz-question-card");


const api_url = "https://quizapi.io"; 
const api_function = "/api/v1/questions"; //?limit=1 (to limit the number of questions if wanted)
const api_key = "";
const api_endpoint = api_url + api_function;



let current_quiz_data = [];
let score = 0;

start_quiz_btn.addEventListener("click", () => {
    fetch(api_endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": api_key
        }
})

.then(response => response.json())
.then(data => {
    current_quiz_data = data[0];
    display_quiz_question();
    console.log(data);
})
.catch((error) => console.log(error));
});



// DISPLAY QUIZ QUESTION
function display_quiz_question() {
    question_card.innerText = current_quiz_data.question;

    const existing_answers = document.querySelector("#answers");
    if (existing_answers) {
        existing_answers.remove();
    }


    const answer_container = document.createElement("div");
    answer_container.id = "answers";
    question_card.appendChild(answer_container);


    for(const [key, answer] of Object.entries(current_quiz_data.answers)) {
        if(answer) {
            const answer_btn = document.createElement("button");
            answer_btn.innerText = answer;
            answer_btn.classList.add("btn", "btn-secondary", "m-2");
            answer_btn.dataset.answer = key;
            answer_container.appendChild(answer_btn);

            answer_btn.addEventListener("click", (a) => {
                document.querySelectorAll("#answers #button").forEach(btn => btn.classList.remove("selected"));
                a.target.data.answer.add("selected");
            });
        }
    }
}


function disable_buttons() {
    document.querySelectorAll("#answers button").forEach(button => {
        button.disabled = true;
    })
}


function check_answer(selected_answer) {
    const correct_answer_key = Object.keys(current_quiz_data.correct_answers)
    .find(key => current_quiz_data.correct_answers[key] === "true");

    disable_buttons();

    if(selected_answer === correct_answer_key.replace("Correct")) {
        score++;
        alert("Correct Answer!");
        
    }
    else {
        alert("Incorrect Answer...");
    }

    question_card.innerText = `Your current score: ${score}`;

}

submit_btn.addEventListener("click", () => {
    const selected_answer_btn = document.querySelector("#answers button.selected");
    if (selected_answer_btn) {
        check_answer(selected_answer_btn.dataset.answer)
    }
    else {
        return("Please select an answer first!")
    }
});