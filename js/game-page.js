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

    const lifelineButtons = document.querySelectorAll(".lifeline-btn");

    lifelineButtons[0].addEventListener("click", () => {
        useFiftyFifty();
        renderGame();
    });

    lifelineButtons[1].addEventListener("click", () => {
        useAudienceHelp();
        renderGame();
    });

    document.getElementById("restart-game-btn").addEventListener("click", () => {
        startNewGame();
        renderGame();
    });
});