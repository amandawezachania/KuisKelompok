const questions = [
    { text: "Negara manakah yang memiliki wilayah pegunungan Himalaya terluas?", type: "multiple", options: ["Indonesia", "Nepal", "Amerika", "Jepang"], answer: "Nepal" },
    { text: "Siapa yang melukis Mona Lisa?", type: "text", answer: "Leonardo da Vinci" },
    { text: "Apa negara terkecil di dunia berdasarkan jumlah penduduk?", type: "multiple", options: ["Vatikan", "Indonesia", "Singapura", "Afrika"], answer: "Vatikan" },
    { text: "Siapa presiden pertama Indonesia?", type: "text", answer: "Soekarno" },
    { text: "Apa nama pulau terbesar di Indonesia?", type: "multiple", options: ["Sumatra", "Jawa", "Kalimantan", "Sulawesi"], answer: "Kalimantan" },
    { text: "Berapa jumlah planet di tata surya kita?", type: "text", answer: "8" },
    { text: "Olahraga tim apa yang dikenal sebagai permainan tercepat di dunia?", type: "multiple", options: ["Sepak bola", "Futsal", "Basket", "Hoki es"], answer: "Hoki es" },
    { text: "Apa nama hutan hujan terluas di dunia?", type: "text", answer: "Amazon" },
    { text: "Lokasi manakah yang terdingin di bumi?", type: "multiple", options: ["Antartika Timur", "Rusia", "Antartika Barat", "Kanada"], answer: "Antartika Timur" },
    { text: "Apa yang menutupi sekitar 71% permukaan bumi: Daratan atau perairan?", type: "text", answer: "Perairan" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

let rulesAccepted = false;
function showPage(page) {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('rules').classList.add('hidden');
    document.getElementById('playerData').classList.add('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');

    document.getElementById(page).classList.remove('hidden');
    
    if (page === 'quiz') {
        loadQuestion();
    }
}

function acceptRules() {
    rulesAccepted = true; 
    showPage('playerData');}

function startQuiz() {
    if (!rulesAccepted) {
        alert("Anda harus membaca aturan permainan sebelum memulai kuis.");
        return;
    }

    const name = document.getElementById('name').value;
    const nim = document.getElementById('nim').value;
    if (name && nim) {
        document.getElementById('resultName').innerText = name;
        document.getElementById('resultNIM').innerText = nim;
        showPage('quiz'); 
        loadQuestion();     
    }
}

function startQuiz() {
    const name = document.getElementById('name').value;
    const nim = document.getElementById('nim').value;
    if (name && nim) {
        document.getElementById('resultName').innerText = name;
        document.getElementById('resultNIM').innerText = nim;
        showPage('quiz'); 
        loadQuestion();    
    }
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('questionText').innerText = question.text;

    if (question.type === "multiple") {
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';
        question.options.forEach(option => {
            optionsDiv.innerHTML += <div><input type="radio" name="option" value="${option}"> ${option}</div>;
        });
        optionsDiv.classList.remove('hidden');
        document.getElementById('answerInput').classList.add('hidden');
    } else {
        document.getElementById('options').classList.add('hidden');
        document.getElementById('answerInput').classList.remove('hidden');
    }

    startTimer();
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById('timer').innerText = Waktu tersisa: ${timeLeft} detik;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = Waktu tersisa: ${timeLeft} detik;
        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    const question = questions[currentQuestionIndex];
    let userAnswer;
    if (question.type === "multiple") {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        userAnswer = selectedOption ? selectedOption.value : "";
    } else {
        userAnswer = document.getElementById('answerInput').value;
    }

    if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        score += 20;
    } else {
        showNotification("Jawaban Anda salah!");
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        showResult();
    }
}

function showResult() {
    document.getElementById('totalScore').innerText = score;
    showPage('result');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}