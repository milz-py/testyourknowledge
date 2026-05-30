document.addEventListener("DOMContentLoaded", () => {
    renderUserPanel(loadPlayerStats());
    setupResetStatsButton();
});

function renderUserPanel(stats) {
    renderProfile(stats);
    renderStatsCards(stats);
    renderGameHistory(stats.history);
}

function setupResetStatsButton() {
    const resetButton = document.getElementById("reset-stats-btn");

    if (!resetButton) {
        return;
    }

    resetButton.addEventListener("click", () => {
        const confirmed = confirm("Reset all saved statistics?");

        if (!confirmed) {
            return;
        }

        resetPlayerStats();
        renderUserPanel(loadPlayerStats());
    });
}

function renderProfile(stats) {
    const rankElement = document.querySelector(".profile-info p");

    if (rankElement) {
        rankElement.textContent = `Rank: ${getPlayerRank(stats.bestPrize)}`;
    }
}

function renderStatsCards(stats) {
    const statValues = document.querySelectorAll(".stat-card p");
    const accuracy = stats.questionsAnswered === 0
        ? 0
        : Math.round((stats.correctAnswers / stats.questionsAnswered) * 100);

    if (statValues[0]) {
        statValues[0].textContent = stats.gamesPlayed.toLocaleString();
    }

    if (statValues[1]) {
        statValues[1].textContent = stats.questionsAnswered.toLocaleString();
    }

    if (statValues[2]) {
        statValues[2].textContent = `${accuracy}%`;
    }

    if (statValues[3]) {
        statValues[3].textContent = formatPrize(stats.bestPrize);
    }

    if (statValues[4]) {
        statValues[4].textContent = formatPrize(stats.totalPrize);
    }
}

function renderGameHistory(history) {
    const tableBody = document.querySelector(".history-table tbody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    if (history.length === 0) {
        const row = document.createElement("tr");
        row.className = "empty-history-row";
        row.innerHTML = `<td colspan="3">No games saved yet.</td>`;
        tableBody.appendChild(row);
        return;
    }

    history.forEach((game) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${formatGameDate(game.completedAt)}</td>
            <td>Question ${game.questionsReached}</td>
            <td>${formatPrize(game.prizeWon)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function getPlayerRank(bestPrize) {
    if (bestPrize >= 1000000) {
        return "Virtual Millionaire";
    }

    if (bestPrize >= 32000) {
        return "Cash Climber";
    }

    if (bestPrize >= 1000) {
        return "Rising Contestant";
    }

    return "New Player";
}

function formatGameDate(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString();
}

function formatPrize(prize) {
    return `$${Number(prize).toLocaleString()}`;
}
