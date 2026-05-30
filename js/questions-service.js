// proste, warstwa POBRANIA pytan, reszta komentow dokladniej omawia zeby wszystko bylo jasne

//opentdb sobie bedzie zyczyc ID kategorii
const categoryIdToName = {
    "9": "General Knowledge",
    "17": "Science & Nature",
    "18": "Science: Computers",
    "21": "Sports",
    "23": "History"
};


let mockQuestionsApiUrl = null;

function getMockQuestionsApiUrl() {
    if (!mockQuestionsApiUrl) {
        const mockApiResponse = JSON.stringify(mockOpenTdbResponse);
        const mockApiBlob = new Blob([mockApiResponse], { type: "application/json" });
        mockQuestionsApiUrl = URL.createObjectURL(mockApiBlob);
    }

    return mockQuestionsApiUrl;
}

async function getQuestionsFromMockApi(filters) {
    const response = await fetch(getMockQuestionsApiUrl());

    if (!response.ok) {
        throw new Error(`Mock API error: ${response.status}`);
    }

    const data = await response.json();

    return filterQuestions(data.results, filters);
}

function filterQuestions(questions, filters) {
    const selectedCategory = categoryIdToName[filters.category] || "";

    let filteredQuestions = questions.filter((question) => {
        const matchesCategory = !selectedCategory || question.category === selectedCategory;
        const matchesDifficulty = !filters.difficulty || question.difficulty === filters.difficulty;

        return matchesCategory && matchesDifficulty && question.type == "multiple";
    });

    filteredQuestions = filteredQuestions.slice(0, Number(filters.amount));

    return filteredQuestions;
}


async function getQuestions(filters) {
    return getQuestionsFromMockApi(filters);
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
