
//bedac totalnie szczerym nie chce mi sie teraz polaczenia do api robic, takze tutaj jest mock odpowiedz z losowymi pytaniami losowych kategorii jakie pobralem
//zwraca dokladnie ten sam format danych (bo to mock, duh) zeby pozniej przy wpieciu w api prawdziwe nie rozwalic innych rzeczy

const mockOpenTdbResponse = {
    response_code: 0,
    results: [
        {
            category: "Science: Computers",
            type: "multiple",
            difficulty: "easy",
            question: "What does CPU stand for?",
            correct_answer: "Central Processing Unit",
            incorrect_answers: [
                "Computer Personal Unit",
                "Central Process Utility",
                "Control Processing Unit"
            ]
        },
        {
            category: "Science: Computers",
            type: "multiple",
            difficulty: "easy",
            question: "In computer science, what does GUI stand for?",
            correct_answer: "Graphical User Interface",
            incorrect_answers: [
                "Global User Index",
                "General Utility Item",
                "Gaming Unit Interface"
            ]
        },
        {
            category: "History",
            type: "multiple",
            difficulty: "medium",
            question: "Who painted the Mona Lisa?",
            correct_answer: "Leonardo da Vinci",
            incorrect_answers: [
                "Vincent van Gogh",
                "Pablo Picasso",
                "Michelangelo"
            ]
        },
        {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "easy",
            question: "What is the capital city of France?",
            correct_answer: "Paris",
            incorrect_answers: [
                "Madrid",
                "Rome",
                "Berlin"
            ]
        },
        {
            category: "Science & Nature",
            type: "multiple",
            difficulty: "medium",
            question: "What is the chemical symbol for Gold?",
            correct_answer: "Au",
            incorrect_answers: [
                "Ag",
                "Fe",
                "Gd"
            ]
        },
        {
            category: "Sports",
            type: "multiple",
            difficulty: "easy",
            question: "How many players are on the field for one football team during a standard match?",
            correct_answer: "11",
            incorrect_answers: [
                "9",
                "10",
                "12"
            ]
        },
        {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "hard",
            question: "Which language has the most native speakers in the world?",
            correct_answer: "Mandarin Chinese",
            incorrect_answers: [
                "English",
                "Spanish",
                "Hindi"
            ]
        },
        {
            category: "Science & Nature",
            type: "multiple",
            difficulty: "easy",
            question: "What planet is known as the Red Planet?",
            correct_answer: "Mars",
            incorrect_answers: [
                "Venus",
                "Jupiter",
                "Saturn"
            ]
        }
    ]
};
