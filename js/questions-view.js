//pozniej to opisze jakos

function renderQuestions(questions, container) {
    container.innerHTML = "";

    if (questions.length === 0) {
        container.innerHTML = `
            <div class="question-item">
                <div class="question-text">No questions found for selected filters.</div>
            </div>
        `;
        return;
    }

    questions.forEach((question, index) => {
        const questionElement = createQuestionElement(question, index);
        container.appendChild(questionElement);
    });
}

function createQuestionElement(question, index) {
    const item = document.createElement("div");
    item.className = "question-item";

    const answers = buildAnswersList(question);
    const answersHtml = answers.map((answer) => {
        const correctClass = answer.isCorrect ? " correct" : "";

        return `
            <li class="answer-box${correctClass}">
                ${answer.label}: ${answer.text}
            </li>
        `;
    }).join("");

    item.innerHTML = `
        <div class="question-header">
            <span class="difficulty-badge ${question.difficulty}">
                ${capitalize(question.difficulty)}
            </span>
            <span class="category-badge">
                ${question.category}
            </span>
        </div>
        <div class="question-text">
            ${index + 1}. ${question.question}
        </div>
        <ul class="answers-list">
            ${answersHtml}
        </ul>
    `;

    return item;
}

function buildAnswersList(question) {
    const allAnswers = [
        question.correct_answer,
        ...question.incorrect_answers
    ];

    return shuffleArray(allAnswers).map((answer, index) => ({
        label: String.fromCharCode(65 + index),
        text: answer,
        isCorrect: answer === question.correct_answer
    }));
}

function filterQuestionsBySearch(questions, searchText) {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) {
        return questions;
    }

    return questions.filter((question) => {
        const searchableText = [
            question.question,
            question.category,
            question.difficulty,
            question.correct_answer,
            ...question.incorrect_answers
        ].join(" ").toLowerCase();

        return searchableText.includes(normalizedSearch);
    });
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function capitalize(text) {
    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}
