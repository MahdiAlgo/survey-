const questions = [
  {
    question: "How often do people call you cute?",
    options: ["All the time", "Sometimes", "Rarely", "Never"],
    scores: [4, 3, 2, 1]
  },
  {
    question: "What's your go-to selfie face?",
    options: ["Peace sign with a smile", "Pouty lips", "Big cheesy grin", "I don’t take selfies"],
    scores: [4, 3, 2, 1]
  },
  {
    question: "How do animals react to you?",
    options: ["They run up to me", "They’re chill", "They ignore me", "I avoid animals"],
    scores: [4, 3, 2, 1]
  },
  {
    question: "Pick a cute snack:",
    options: ["Macarons", "Cupcakes", "Mochi", "I’m the snack"],
    scores: [2, 3, 4, 4]
  },
  {
    question: "Your ideal outfit vibe:",
    options: ["Cozy and pastel", "Sporty and bright", "Edgy and black", "Whatever’s clean"],
    scores: [4, 3, 2, 1]
  },
  {
    question: "How do kids react to you?",
    options: ["They smile!", "They wave", "They stare", "They cry"],
    scores: [4, 3, 2, 1]
  },
  {
    question: "Pick a pastel color:",
    options: ["Pink", "Purple", "Blue", "Mint"],
    scores: [4, 3, 2, 1]
  },
  {
    question: "Which pet would you pick?",
    options: ["Bunny", "Kitten", "Puppy", "Snake"],
    scores: [4, 3, 3, 1]
  },
  {
    question: "What kind of hugs do you give?",
    options: ["Tight and warm", "Short and sweet", "Awkward", "I don’t hug"],
    scores: [4, 3, 2, 1]
  },
  {
    question: "How do you react to compliments?",
    options: ["Blush and giggle", "Say thanks confidently", "Deny it", "Ignore it"],
    scores: [4, 3, 2, 1]
  }
];

let currentQuestion = 0;
let totalScore = 0;

const questionEl = document.getElementById("question");
const formEl = document.getElementById("options-form");
const welcomeScreen = document.getElementById("welcome-screen");
const surveyContainer = document.getElementById("survey-container");
const startBtn = document.getElementById("start-btn");
const lastScoreText = document.getElementById("last-score-text");
const clickSound = document.getElementById("click-sound");
const confettiSound = document.getElementById("confetti-sound");

function showWelcome() {
  const lastScore = localStorage.getItem("cutieScore");
  lastScoreText.textContent = lastScore ? `Your last cuteness score: ${lastScore}/10` : "Let's find out how cute you are!";
}

startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  surveyContainer.style.display = "block";
  showQuestion(currentQuestion);
});

function showQuestion(index) {
  formEl.innerHTML = "";
  const q = questions[index];
  questionEl.textContent = q.question;

  questionEl.classList.remove("fade-in");
  void questionEl.offsetWidth;
  questionEl.classList.add("fade-in");

  document.getElementById("progress-fill").style.width = ((index / questions.length) * 100) + "%";

  q.options.forEach((option, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${q.scores[i]}"> ${option}`;
    formEl.appendChild(label);
    formEl.appendChild(document.createElement("br"));
  });

  formEl.addEventListener("change", handleAnswer, { once: true });
}

function handleAnswer(e) {
  clickSound.play();
  const value = parseInt(e.target.value);
  totalScore += value;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
}

function showResult() {
  const scoreOutOfTen = Math.round((totalScore / (questions.length * 4)) * 10);
  localStorage.setItem("cutieScore", scoreOutOfTen);

  questionEl.textContent = `Your Cuteness Score: ${scoreOutOfTen}/10`;
  questionEl.classList.add("result");

  const msg = document.createElement("p");
  msg.textContent = getMessage(scoreOutOfTen);
  msg.classList.add("result");

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Survey";
  restartBtn.onclick = restartSurvey;

  formEl.innerHTML = "";
  formEl.appendChild(msg);
  formEl.appendChild(restartBtn);

  confettiSound.play();
  emojiConfetti();
}

function getMessage(score) {
  if (score >= 9) return "You're absolutely adorable!";
  if (score >= 7) return "Super cute!";
  if (score >= 5) return "Kinda cute, ngl.";
  return "You're cute in your own way!";
}

function emojiConfetti() {
  const emojis = ["✨", "❤️", "⭐", "🎀", "🎉"];
  for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.position = "fixed";
    span.style.left = Math.random() * 100 + "vw";
    span.style.top = "-2vh";
    span.style.fontSize = Math.random() * 24 + 16 + "px";
    span.style.opacity = 0.8;
    span.style.animation = `fall ${Math.random() * 2 + 3}s ease-in forwards`;
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 5000);
  }
}

function restartSurvey() {
  currentQuestion = 0;
  totalScore = 0;
  showQuestion(currentQuestion);
}

showWelcome();
