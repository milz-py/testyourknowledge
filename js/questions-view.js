//pozniej to opisze jakos

function renderQuestions(questions, container) {
    container.innerHTML = "";

    if (questions.length === 0) {
        const emptyItem = document.createElement("div");
        emptyItem.className = "question-item";

        const emptyText = document.createElement("div");
        emptyText.className = "question-text";
        emptyText.textContent = "No questions found for selected filters.";

        emptyItem.appendChild(emptyText);
        container.appendChild(emptyItem);
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
    item.tabIndex = 0;
    item.setAttribute("aria-label", `Question ${index + 1}: ${question.question}`);

    const header = document.createElement("div");
    header.className = "question-header";

    const difficulty = document.createElement("span");
    difficulty.className = `difficulty-badge ${question.difficulty}`;
    difficulty.textContent = capitalize(question.difficulty);

    const category = document.createElement("span");
    category.className = "category-badge";
    category.textContent = question.category;

    const questionText = document.createElement("div");
    questionText.className = "question-text";
    questionText.textContent = `${index + 1}. ${question.question}`;

    const answersList = document.createElement("ul");
    answersList.className = "answers-list";

    const answers = buildAnswersList(question);

    answers.forEach((answer) => {
        const answerItem = document.createElement("li");
        answerItem.className = answer.isCorrect ? "answer-box correct" : "answer-box";
        answerItem.textContent = `${answer.label}: ${answer.text}`;
        answersList.appendChild(answerItem);
    });

    header.appendChild(difficulty);
    header.appendChild(category);
    item.appendChild(header);
    item.appendChild(questionText);
    item.appendChild(answersList);

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

function sortQuestions(questions, sortMode) {
    const difficultyOrder = {
        easy: 1,
        medium: 2,
        hard: 3
    };

    const sortedQuestions = [...questions];

    switch (sortMode) {
        case "difficulty-asc":
            return sortedQuestions.sort((first, second) =>
                difficultyOrder[first.difficulty] - difficultyOrder[second.difficulty]
            );
        case "difficulty-desc":
            return sortedQuestions.sort((first, second) =>
                difficultyOrder[second.difficulty] - difficultyOrder[first.difficulty]
            );
        case "category-asc":
            return sortedQuestions.sort((first, second) =>
                first.category.localeCompare(second.category)
            );
        case "question-asc":
            return sortedQuestions.sort((first, second) =>
                first.question.localeCompare(second.question)
            );
        default:
            return sortedQuestions;
    }
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
