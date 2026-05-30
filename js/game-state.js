let gameState = {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isGameOver: false,
    guaranteedPrize: 0,
    currentPrize: 0,
    answerOrders: [],
    statsSaved: false,
    endReason: null,
    lifelines: createInitialLifelinesState()
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
        currentPrize: 0,
        answerOrders: [],
        statsSaved: false,
        endReason: null,
        lifelines: createInitialLifelinesState()
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
            gameState.endReason = "completed";
        }
    } else {
        gameState.isGameOver = true;
        gameState.endReason = "wrong_answer";
    }
}

function goToNextQuestion() {
    if (gameState.isGameOver) {
        return;
    }

    gameState.currentQuestionIndex += 1;
    gameState.selectedAnswer = null;
    resetQuestionLifelineEffects();
}

function walkAway() {
    gameState.isGameOver = true;
    gameState.endReason = "walked_away";
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

function useFiftyFifty() {
    if (gameState.isGameOver || gameState.selectedAnswer || gameState.lifelines.fiftyFiftyUsed) {
        return;
    }

    const question = getCurrentQuestion();
    gameState.lifelines.fiftyFiftyUsed = true;
    gameState.lifelines.eliminatedAnswers = shuffleArray(question.incorrect_answers).slice(0, 2);
}

function useAudienceHelp() {
    if (gameState.isGameOver || gameState.selectedAnswer || gameState.lifelines.audienceUsed) {
        return;
    }

    const question = getCurrentQuestion();
    gameState.lifelines.audienceUsed = true;
    gameState.lifelines.audienceHighlightedAnswer = question.correct_answer;
}

function resetQuestionLifelineEffects() {
    gameState.lifelines.eliminatedAnswers = [];
    gameState.lifelines.audienceHighlightedAnswer = null;
}

function createInitialLifelinesState() {
    return {
        fiftyFiftyUsed: false,
        audienceUsed: false,
        eliminatedAnswers: [],
        audienceHighlightedAnswer: null
    };
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}
