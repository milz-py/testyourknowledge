function renderGame() {
    renderQuestion();
    renderMoneyTree();
    renderGameActions();
    renderLifelines();
}

function renderQuestion() {
    const question = getCurrentQuestion();

    const status = document.getElementById("game-status");
    const questionText = document.getElementById("question-text");
    const answersBoard = document.getElementById("answers-board");

    status.textContent = buildStatusText();
    questionText.textContent = question.question;
    answersBoard.innerHTML = "";

    const answers = buildAnswersList(question);

    answers.forEach((answer) => {
        if (gameState.lifelines.eliminatedAnswers.includes(answer.text)) {
            return;
        }

        const button = document.createElement("button");
        button.className = "answer-btn";
        button.dataset.answer = answer.text;

        if (answer.text === gameState.lifelines.audienceHighlightedAnswer) {
            button.classList.add("correct");
        }

        if (gameState.selectedAnswer) {
            button.disabled = true;

            if (answer.text === question.correct_answer) {
                button.classList.add("correct");
            }

            if (answer.text === gameState.selectedAnswer && !answer.isCorrect) {
                button.classList.add("wrong");
            }
        }

        button.innerHTML = `<span class="letter">${answer.label}:</span> ${answer.text}`;

        button.addEventListener("click", () => {
            answerCurrentQuestion(answer.text);
            saveFinishedGameIfNeeded();
            renderGame();
        });

        answersBoard.appendChild(button);
    });
}

function renderMoneyTree() {
    const list = document.getElementById("money-tree-list");
    list.innerHTML = "";

    [...prizeLevels].reverse().forEach((prize, reversedIndex) => {
        const index = prizeLevels.length - 1 - reversedIndex;

        const item = document.createElement("li");
        item.className = "prize-level";

        if (safeHavenIndexes.includes(index)) {
            item.classList.add("safe-haven");
        }

        if (index < gameState.currentQuestionIndex) {
            item.classList.add("passed");
        }

        if (index === gameState.currentQuestionIndex && !gameState.isGameOver) {
            item.classList.add("current");
        }

        item.innerHTML = `${index + 1} <span>$${prize.toLocaleString()}</span>`;
        list.appendChild(item);
    });
}

function renderGameActions() {
    const nextButton = document.getElementById("next-question-btn");
    const walkAwayButton = document.getElementById("walk-away-btn");

    const question = getCurrentQuestion();
    const hasSelectedAnswer = Boolean(gameState.selectedAnswer);
    const selectedWasCorrect = hasSelectedAnswer && gameState.selectedAnswer === question.correct_answer;

    nextButton.disabled = !selectedWasCorrect || gameState.isGameOver;
    walkAwayButton.disabled = gameState.isGameOver || gameState.currentPrize === 0;

    if (gameState.isGameOver) {
        document.getElementById("game-status").textContent =
            `Game over. You won $${getFinalPrize().toLocaleString()}.`;
    }

    if (nextButton.disabled) {
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
    }

    if (!selectedWasCorrect && gameState.selectedAnswer) {
        document.getElementById("game-status").textContent = "Wrong answer!";
    }

    if (selectedWasCorrect && !gameState.isGameOver) {
        document.getElementById("game-status").textContent = "Correct! Click Next.";
    }

}

function renderLifelines() {
    const lifelineButtons = document.querySelectorAll(".lifeline-btn");
    const fiftyFiftyButton = lifelineButtons[0];
    const audienceButton = lifelineButtons[1];
    const lifelinesBlocked = gameState.isGameOver || Boolean(gameState.selectedAnswer);

    if (!fiftyFiftyButton || !audienceButton) {
        return;
    }

    fiftyFiftyButton.disabled = gameState.lifelines.fiftyFiftyUsed || lifelinesBlocked;
    audienceButton.disabled = gameState.lifelines.audienceUsed || lifelinesBlocked;
}

function buildStatusText() {
    return `Question ${gameState.currentQuestionIndex + 1} of ${gameState.questions.length}`;
}

function buildAnswersList(question) {
    const questionIndex = gameState.currentQuestionIndex;

    if (!gameState.answerOrders[questionIndex]) {
        const answers = [
            question.correct_answer,
            ...question.incorrect_answers
        ];

        gameState.answerOrders[questionIndex] = shuffleArray(answers);
    }

    return gameState.answerOrders[questionIndex].map((answer, index) => ({
        label: String.fromCharCode(65 + index),
        text: answer,
        isCorrect: answer === question.correct_answer
    }));
}
