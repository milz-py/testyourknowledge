// proste, warstwa POBRANIA pytan, reszta komentow dokladniej omawia zeby wszystko bylo jasne

//opentdb sobie bedzie zyczyc ID kategorii
const categoryIdToName = {
    "9": "General Knowledge",
    "17": "Science & Nature",
    "18": "Science: Computers",
    "21": "Sports",
    "23": "History"
};


//prsota funkcja pobierajaca pytania z mocka (mock znajdziecie w questions-data.js)
function getQuestionsFromMock(filters) {
    const selectedCategory = categoryIdToName[filters.category] || "";

    let questions = mockOpenTdbResponse.results.filter((question) => {
        const matchesCategory = !selectedCategory || question.category === selectedCategory;
        const matchesDifficulty = !filters.difficulty || question.difficulty === filters.difficulty;

        return matchesCategory && matchesDifficulty && question.type == "multiple";
    });

    questions = questions.slice(0, Number(filters.amount));

    return Promise.resolve(questions);
}


async function getQuestions(filters) {
    return getQuestionsFromMock(filters);
    // narazie do mocka, pozniej zmienimy na strzaly do prawdziwego api.
}


//na przyszlosc +- cos takiego powinno byc chyba
function buildOpenTdbUrl(filters) {
    //parametry do querystringa
    const params = new URLSearchParams();

    params.set("amount", filters.amount);
    params.set("type", "multiple");

    if (filters.category) {
        params.set("category", filters.category);
    }

    if (filters.difficulty) {
        params.set("difficulty", filters.difficulty);
    }

    //url do api
    return `https://opentdb.com/api.php?${params.toString()}`;
}
