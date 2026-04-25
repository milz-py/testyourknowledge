document.addEventListener("DOMContentLoaded", () => {
    startNewGame();
    renderGame();

    document.getElementById("next-question-btn").addEventListener("click", () => {
        goToNextQuestion();
        renderGame();
    });

    document.getElementById("walk-away-btn").addEventListener("click", () => {
        walkAway();
        renderGame();
    });

    document.getElementById("restart-game-btn").addEventListener("click", () => {
        startNewGame();
        renderGame();
    });
});