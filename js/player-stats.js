const playerStatsStorageKey = "testYourKnowledge.playerStats";
const maxStoredGameHistory = 10;

function loadPlayerStats() {
    const emptyStats = createEmptyPlayerStats();

    try {
        const storedStats = localStorage.getItem(playerStatsStorageKey);

        if (!storedStats) {
            return emptyStats;
        }

        return normalizePlayerStats(JSON.parse(storedStats));
    } catch (error) {
        return emptyStats;
    }
}

function savePlayerStats(stats) {
    try {
        localStorage.setItem(playerStatsStorageKey, JSON.stringify(normalizePlayerStats(stats)));
        return true;
    } catch (error) {
        return false;
    }
}

function resetPlayerStats() {
    try {
        localStorage.removeItem(playerStatsStorageKey);
        return true;
    } catch (error) {
        return false;
    }
}

function saveFinishedGameIfNeeded() {
    if (typeof gameState === "undefined" || !gameState.isGameOver || gameState.statsSaved) {
        return;
    }

    const stats = loadPlayerStats();
    const gameSummary = buildCurrentGameSummary();

    stats.gamesPlayed += 1;
    stats.questionsAnswered += gameSummary.questionsAnswered;
    stats.correctAnswers += gameSummary.correctAnswers;
    stats.totalPrize += gameSummary.prizeWon;
    stats.bestPrize = Math.max(stats.bestPrize, gameSummary.prizeWon);
    stats.history = [gameSummary, ...stats.history].slice(0, maxStoredGameHistory);

    savePlayerStats(stats);
    gameState.statsSaved = true;
}

function buildCurrentGameSummary() {
    const question = getCurrentQuestion();
    const hasSelectedAnswer = Boolean(gameState.selectedAnswer);
    const selectedWasCorrect = hasSelectedAnswer && gameState.selectedAnswer === question.correct_answer;
    const currentQuestionNumber = gameState.currentQuestionIndex + 1;
    const questionsAnswered = hasSelectedAnswer
        ? currentQuestionNumber
        : gameState.currentQuestionIndex;
    const correctAnswers = hasSelectedAnswer && selectedWasCorrect
        ? currentQuestionNumber
        : gameState.currentQuestionIndex;

    return {
        completedAt: new Date().toISOString(),
        questionsReached: Math.min(currentQuestionNumber, gameState.questions.length),
        questionsAnswered,
        correctAnswers,
        prizeWon: getFinalPrize(),
        outcome: gameState.endReason || "finished"
    };
}

function createEmptyPlayerStats() {
    return {
        gamesPlayed: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        totalPrize: 0,
        bestPrize: 0,
        history: []
    };
}

function normalizePlayerStats(stats) {
    return {
        gamesPlayed: toSafeNumber(stats.gamesPlayed),
        questionsAnswered: toSafeNumber(stats.questionsAnswered),
        correctAnswers: toSafeNumber(stats.correctAnswers),
        totalPrize: toSafeNumber(stats.totalPrize),
        bestPrize: toSafeNumber(stats.bestPrize),
        history: Array.isArray(stats.history)
            ? stats.history.map(normalizeGameHistoryItem).filter(Boolean).slice(0, maxStoredGameHistory)
            : []
    };
}

function normalizeGameHistoryItem(item) {
    if (!item) {
        return null;
    }

    return {
        completedAt: item.completedAt || new Date().toISOString(),
        questionsReached: toSafeNumber(item.questionsReached),
        questionsAnswered: toSafeNumber(item.questionsAnswered),
        correctAnswers: toSafeNumber(item.correctAnswers),
        prizeWon: toSafeNumber(item.prizeWon),
        outcome: item.outcome || "finished"
    };
}

function toSafeNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : 0;
}