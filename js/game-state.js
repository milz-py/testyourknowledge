let gameState = {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isGameOver: false,
    guaranteedPrize: 0,
    currentPrize: 0
};

function startNewGame() {
    const availableQuestions = mockOpenTdbResponse.results
        .filter((question) => question.type === "multiple");

    gameState = {
        questions: shuffleArray(availableQuestions).slice(0, maxQuestionsInGame),
        currentQuestionIndex: 0,
        selectedAnswer: null,
        isGameOver: false,
        guaranteedPrize: 0,
        currentPrize: 0
    };
}

function getCurrentQuestion() {
    return gameState.questions[gameState.currentQuestionIndex];
}

function answerCurrentQuestion(answerText) {
    if (gameState.isGameOver || gameState.selectedAnswer) {
        return;
    }

    const question = getCurrentQuestion();
    const isCorrect = answerText === question.correct_answer;

    gameState.selectedAnswer = answerText;

    if (isCorrect) {
        const prize = prizeLevels[gameState.currentQuestionIndex];
        gameState.currentPrize = prize;

        if (safeHavenIndexes.includes(gameState.currentQuestionIndex)) {
            gameState.guaranteedPrize = prize;
        }

        if (gameState.currentQuestionIndex === gameState.questions.length - 1) {
            gameState.isGameOver = true;
        }
    } else {
        gameState.isGameOver = true;
    }
}

function goToNextQuestion() {
    if (gameState.isGameOver) {
        return;
    }

    gameState.currentQuestionIndex += 1;
    gameState.selectedAnswer = null;
}

function walkAway() {
    gameState.isGameOver = true;
}

function getFinalPrize() {
    const question = getCurrentQuestion();

    if (!gameState.selectedAnswer) {
        return gameState.currentPrize;
    }

    const wasCorrect = gameState.selectedAnswer === question.correct_answer;

    if (wasCorrect) {
        return gameState.currentPrize;
    }

    return gameState.guaranteedPrize;
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}