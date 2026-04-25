
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
            incorrect_answers: ["Computer Personal Unit", "Central Process Utility", "Control Processing Unit"]
        },
        {
            category: "Science: Computers",
            type: "multiple",
            difficulty: "easy",
            question: "In computer science, what does GUI stand for?",
            correct_answer: "Graphical User Interface",
            incorrect_answers: ["Global User Index", "General Utility Item", "Gaming Unit Interface"]
        },
        {
            category: "Science & Nature",
            type: "multiple",
            difficulty: "easy",
            question: "What planet is known as the Red Planet?",
            correct_answer: "Mars",
            incorrect_answers: ["Venus", "Jupiter", "Saturn"]
        },
        {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "easy",
            question: "What is the capital of France?",
            correct_answer: "Paris",
            incorrect_answers: ["Rome", "Madrid", "Berlin"]
        },
        {
            category: "Sports",
            type: "multiple",
            difficulty: "easy",
            question: "How many players are on a football team?",
            correct_answer: "11",
            incorrect_answers: ["9", "10", "12"]
        },

        {
            category: "Science: Computers",
            type: "multiple",
            difficulty: "medium",
            question: "What does RAM stand for?",
            correct_answer: "Random Access Memory",
            incorrect_answers: ["Read Access Memory", "Rapid Action Module", "Run Access Mode"]
        },
        {
            category: "History",
            type: "multiple",
            difficulty: "medium",
            question: "Who was the first President of the USA?",
            correct_answer: "George Washington",
            incorrect_answers: ["Thomas Jefferson", "John Adams", "Abraham Lincoln"]
        },
        {
            category: "Science & Nature",
            type: "multiple",
            difficulty: "medium",
            question: "What is the chemical symbol for Gold?",
            correct_answer: "Au",
            incorrect_answers: ["Ag", "Fe", "Gd"]
        },
        {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "medium",
            question: "Which country invented pizza?",
            correct_answer: "Italy",
            incorrect_answers: ["France", "USA", "Spain"]
        },
        {
            category: "Sports",
            type: "multiple",
            difficulty: "medium",
            question: "In which sport is the term 'love' used?",
            correct_answer: "Tennis",
            incorrect_answers: ["Football", "Basketball", "Volleyball"]
        },

        {
            category: "Science: Computers",
            type: "multiple",
            difficulty: "hard",
            question: "What does HTTP stand for?",
            correct_answer: "HyperText Transfer Protocol",
            incorrect_answers: ["HyperText Transmission Process", "High Transfer Text Protocol", "Hyper Transfer Text Process"]
        },
        {
            category: "History",
            type: "multiple",
            difficulty: "hard",
            question: "In which year did World War II end?",
            correct_answer: "1945",
            incorrect_answers: ["1939", "1944", "1950"]
        },
        {
            category: "Science & Nature",
            type: "multiple",
            difficulty: "hard",
            question: "What is the hardest natural substance on Earth?",
            correct_answer: "Diamond",
            incorrect_answers: ["Gold", "Iron", "Quartz"]
        },
        {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "hard",
            question: "Which language has the most native speakers?",
            correct_answer: "Mandarin Chinese",
            incorrect_answers: ["English", "Spanish", "Hindi"]
        },
        {
            category: "Sports",
            type: "multiple",
            difficulty: "hard",
            question: "How many rings are on the Olympic flag?",
            correct_answer: "5",
            incorrect_answers: ["4", "6", "7"]
        },

        {
            category: "Science: Computers",
            type: "multiple",
            difficulty: "easy",
            question: "Which device is used to input text into a computer?",
            correct_answer: "Keyboard",
            incorrect_answers: ["Monitor", "Printer", "Mouse"]
        },
        {
            category: "History",
            type: "multiple",
            difficulty: "easy",
            question: "Who discovered America?",
            correct_answer: "Christopher Columbus",
            incorrect_answers: ["Marco Polo", "Vasco da Gama", "Ferdinand Magellan"]
        },
        {
            category: "Science & Nature",
            type: "multiple",
            difficulty: "medium",
            question: "What gas do plants absorb?",
            correct_answer: "Carbon Dioxide",
            incorrect_answers: ["Oxygen", "Nitrogen", "Hydrogen"]
        },
        {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "medium",
            question: "How many continents are there?",
            correct_answer: "7",
            incorrect_answers: ["5", "6", "8"]
        },
        {
            category: "Sports",
            type: "multiple",
            difficulty: "easy",
            question: "Which sport uses a bat and ball?",
            correct_answer: "Baseball",
            incorrect_answers: ["Football", "Tennis", "Hockey"]
        }
    ]
};