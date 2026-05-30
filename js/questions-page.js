document.addEventListener("DOMContentLoaded", () => {
    //szukamy konkretnych elementow
    const form = document.getElementById("questions-form");
    const searchInput = document.getElementById("search-input");
    const questionsList = document.getElementById("questions-list");
    const status = document.getElementById("questions-status");

    let loadedQuestions = [];
    let activeSort = "default";

    //nasluchujemy submita
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const filters = readFiltersFromForm(form);
        const validationError = validateQuestionFilters(filters);

        if (validationError) {
            loadedQuestions = [];
            questionsList.innerHTML = "";
            status.textContent = validationError;
            status.classList.add("error");
            return;
        }

        activeSort = filters.sort;
        status.textContent = "Loading questions...";
        status.classList.remove("error");
        status.classList.add("loading");
        questionsList.setAttribute("aria-busy", "true");

        try {
            loadedQuestions = await getQuestions(filters);
            searchInput.value = "";
            renderQuestions(sortQuestions(loadedQuestions, activeSort), questionsList);
            status.textContent = `Loaded ${loadedQuestions.length} question(s). Hover over a question to reveal answers.`;
        } catch (error) {
            console.error("Failed to load questions:", error);
            loadedQuestions = [];
            questionsList.innerHTML = "";
            status.textContent = "Could not load questions. Try again later.";
            status.classList.add("error");
        } finally {
            status.classList.remove("loading");
            questionsList.setAttribute("aria-busy", "false");
        }
    });

    searchInput.addEventListener("input", () => {
        const filteredQuestions = sortQuestions(
            filterQuestionsBySearch(loadedQuestions, searchInput.value),
            activeSort
        );

        renderQuestions(filteredQuestions, questionsList);
        status.textContent = `Showing ${filteredQuestions.length} of ${loadedQuestions.length} loaded question(s).`;
        status.classList.remove("error");
    });

    form.dispatchEvent(new Event("submit"));
});

function readFiltersFromForm(form) {
    const formData = new FormData(form);

    return {
        amount: formData.get("amount"),
        category: formData.get("category"),
        difficulty: formData.get("difficulty"),
        sort: formData.get("sort"),
        type: "multiple" //chcemy tylko pytania wielokrotnego wyboru z racji na to ze to gra w milionerow, ale moze to kiedys zmienimy, obgadamy
    };
}

function validateQuestionFilters(filters) {
    const amount = Number(filters.amount);
    const allowedAmounts = [5, 10, 15];

    if (!allowedAmounts.includes(amount)) {
        return "Choose a valid number of questions.";
    }

    return "";
}
