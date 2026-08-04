// ============================================
// 문제 데이터 (6과 The Beauty of Art)
// ============================================
const QUESTIONS = [
  {
    type: "어휘",
    passage: null,
    question: "밑줄 친 부분의 우리말 해석이 바르지 않은 것은?",
    choices: [
      "The movie was boring. → 지루한",
      "The baby is taking a nap. → 낮잠",
      "Do you have your own room? → 소유하다",
      "Many wild animals are dying. → 야생의",
      "A turtle has a hard shell. → 껍질"
    ],
    answer: 2,
    explanation: "own은 여기서 '소유하다'라는 동사가 아니라, '자기 자신의'라는 뜻의 형용사로 쓰였어요. 그래서 'your own room'은 '네 소유물인 방'이 아니라 '네 자신의 방'으로 해석해야 해요."
  },
  {
    type: "문법",
    passage: null,
    question: "다음 빈칸에 들어갈 말로 알맞지 않은 것은?\n\nI ___ to travel to Europe.",
    choices: ["like", "plan", "hope", "want", "enjoy"],
    answer: 4,
    explanation: "like, plan, hope, want는 모두 뒤에 to부정사(to travel)를 목적어로 쓸 수 있어요. 하지만 enjoy는 뒤에 동명사(traveling)만 목적어로 쓸 수 있어서, 이 문장에는 어울리지 않아요."
  },
  {
    type: "문법",
    passage: null,
    question: "다음 중 밑줄 친 that의 쓰임이 나머지와 다른 것은?",
    choices: [
      "Look at that cute little puppy.",
      "I believe that we can make it.",
      "That he won the contest is amazing.",
      "Did you know that they were sisters?",
      "The important thing is that you did your best."
    ],
    answer: 0,
    explanation: "①번의 that은 puppy를 꾸며주는 지시형용사(그, 저)예요. 나머지는 모두 문장과 문장을 연결해주는 접속사 that으로, 뒤에 완전한 문장(주어+동사)이 이어져요."
  },
  {
    type: "독해",
    passage: "준호, 민지, 알렉스는 반 고흐 전시회 포스터를 보고 있어요. 세 사람은 반 고흐의 그림 '별이 빛나는 밤'에 대해 이야기를 나누고, 미래박물관에서 열리는 반 고흐 전시회에 함께 가기로 해요. 전시회는 10월 1일에 끝나고, 세 사람은 이번 주 토요일에 전시회에 가기로 약속했어요.",
    question: "위 대화 내용과 일치하지 않는 것은?",
    choices: [
      "포스터 속 그림은 빈센트 반 고흐의 작품이다.",
      "준호는 그림 속 밤하늘의 색이 마음에 든다.",
      "반 고흐 전시회는 미래박물관에서 열리고 있다.",
      "반 고흐 전시회는 9월 1일에 끝난다.",
      "세 사람은 이번 주 토요일에 전시회에 가기로 했다."
    ],
    answer: 3,
    explanation: "지문에서 전시회는 10월 1일(October 1st)에 끝난다고 했어요. 9월 1일이 아니라 10월 1일이니, ④번이 내용과 일치하지 않아요."
  },
  {
    type: "독해",
    passage: "앙리 마티스는 아내 아멜리의 얼굴을 초록색으로 칠한 그림을 그렸어요. 그는 밝고 강렬한 색으로 자신의 감정을 표현하고 싶어했어요. 처음에는 사람들이 이런 화풍을 좋아하지 않았고, 마티스는 '야수'라는 별명까지 얻었어요. 하지만 그는 자신만의 스타일을 지켰고, 결국 유명한 화가가 되었어요.",
    question: "윗글의 내용과 일치하지 않는 것은?",
    choices: [
      "아멜리는 앙리 마티스의 아내이다.",
      "마티스는 아내의 얼굴을 초록색으로 칠했다.",
      "사람들은 처음부터 마티스의 화풍을 좋아했다.",
      "마티스는 화풍 때문에 '야수'라는 별명을 얻었다.",
      "마티스는 자신의 스타일을 지키며 유명해졌다."
    ],
    answer: 2,
    explanation: "지문에서는 사람들이 '처음에는' 마티스의 화풍을 좋아하지 않았다고 했어요. 그러니 '처음부터 좋아했다'는 ③번은 내용과 반대예요."
  }
];

// ============================================
// 상태
// ============================================
let current = 0;
let score = 0;
let wrongList = [];

// ============================================
// 요소
// ============================================
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const qIndexEl = document.getElementById("qIndex");
const quizTrack = document.getElementById("quizTrack");
const passageEl = document.getElementById("passage");
const questionTextEl = document.getElementById("questionText");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const feedbackTitleEl = document.getElementById("feedbackTitle");
const feedbackExplainEl = document.getElementById("feedbackExplain");

// ============================================
// 화면 전환
// ============================================
function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.hidden = true);
  screen.hidden = false;
}

// ============================================
// 문제 렌더링
// ============================================
function renderQuestion() {
  const q = QUESTIONS[current];

  qIndexEl.textContent = `${current + 1} / ${QUESTIONS.length}`;
  quizTrack.style.width = `${((current) / QUESTIONS.length) * 100 + 20}%`;

  if (q.passage) {
    passageEl.textContent = q.passage;
    passageEl.hidden = false;
  } else {
    passageEl.hidden = true;
  }

  questionTextEl.textContent = q.question;

  choicesEl.innerHTML = "";
  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = `${["①","②","③","④","⑤"][i]} ${choice}`;
    btn.addEventListener("click", () => selectAnswer(i));
    choicesEl.appendChild(btn);
  });

  feedbackEl.hidden = true;
}

// ============================================
// 답 선택
// ============================================
function selectAnswer(selectedIndex) {
  const q = QUESTIONS[current];
  const buttons = choicesEl.querySelectorAll(".choice-btn");
  buttons.forEach(b => b.disabled = true);

  const isCorrect = selectedIndex === q.answer;

  buttons[q.answer].classList.add("is-correct");
  if (!isCorrect) {
    buttons[selectedIndex].classList.add("is-wrong");
    wrongList.push({
      question: q.question.split("\n")[0],
      answer: `${["①","②","③","④","⑤"][q.answer]} ${q.choices[q.answer]}`
    });
  } else {
    score++;
  }

  feedbackTitleEl.textContent = isCorrect ? "정답이에요! 🎉" : "아쉬워요, 다시 확인해봐요";
  feedbackTitleEl.className = "feedback-title " + (isCorrect ? "correct" : "wrong");
  feedbackExplainEl.textContent = q.explanation;
  feedbackEl.hidden = false;
}

// ============================================
// 다음 문제 / 결과
// ============================================
function nextQuestion() {
  current++;
  if (current < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("scoreNum").textContent = score;

  const msgEl = document.getElementById("scoreMsg");
  if (score === QUESTIONS.length) {
    msgEl.textContent = "완벽해요! 6과 내용을 정확히 이해했어요.";
  } else if (score >= QUESTIONS.length - 2) {
    msgEl.textContent = "잘했어요! 틀린 문제만 한 번 더 확인해봐요.";
  } else {
    msgEl.textContent = "6과 내용을 다시 한번 복습해보면 좋겠어요.";
  }

  const reviewEl = document.getElementById("reviewList");
  reviewEl.innerHTML = "";
  if (wrongList.length === 0) {
    reviewEl.innerHTML = `<p class="review-empty">틀린 문제가 없어요 👏</p>`;
  } else {
    wrongList.forEach(item => {
      const div = document.createElement("div");
      div.className = "review-item";
      div.innerHTML = `
        <p class="q">${item.question}</p>
        <p class="a">정답: ${item.answer}</p>
      `;
      reviewEl.appendChild(div);
    });
  }

  showScreen(resultScreen);
}

// ============================================
// 다시 풀기
// ============================================
function resetQuiz() {
  current = 0;
  score = 0;
  wrongList = [];
  showScreen(startScreen);
}

// ============================================
// 이벤트 바인딩
// ============================================
document.getElementById("startBtn").addEventListener("click", () => {
  showScreen(quizScreen);
  renderQuestion();
});

document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("retryBtn").addEventListener("click", resetQuiz);
