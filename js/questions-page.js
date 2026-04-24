document.addEventListener("DOMContentLoaded", () => {
    //szukamy konkretnych elementow
    const form = document.getElementById("questions-form");
    const searchInput = document.getElementById("search-input");
    const questionsList = document.getElementById("questions-list");
    const status = document.getElementById("questions-status");

    let loadedQuestions = [];

    //nasluchujemy submita
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const filters = readFiltersFromForm(form);

        status.textContent = "Loading questions...";

        try {
            loadedQuestions = await getQuestions(filters);
            searchInput.value = "";
            renderQuestions(loadedQuestions, questionsList);
            status.textContent = `Loaded ${loadedQuestions.length} question(s). Hover over a question to reveal answers.`;
        } catch (error) {
            console.error("Failed to load questions:", error);
            loadedQuestions = [];
            questionsList.innerHTML = "";
            status.textContent = "Could not load questions. Try again later.";
        }
    });

    searchInput.addEventListener("input", () => {
        const filteredQuestions = filterQuestionsBySearch(loadedQuestions, searchInput.value);
        renderQuestions(filteredQuestions, questionsList);
        status.textContent = `Showing ${filteredQuestions.length} of ${loadedQuestions.length} loaded question(s).`;
    });

    form.dispatchEvent(new Event("submit"));
});

function readFiltersFromForm(form) {
    const formData = new FormData(form);

    return {
        amount: formData.get("amount"),
        category: formData.get("category"),
        difficulty: formData.get("difficulty"),
        type: "multiple" //chcemy tylko pytania wielokrotnego wyboru z racji na to ze to gra w milionerow, ale moze to kiedys zmienimy, obgadamy
    };
}
