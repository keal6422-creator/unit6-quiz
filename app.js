// ============================================
// 문제 데이터 (6과 The Beauty of Art)
// ============================================
const QUESTIONS = [
  {
    유형: "어휘",
    구절: 없음,
    질문: "밑줄 부분의 우리말 설명이 바르지 않았습니까?",
    선택 사항: [
      "영화가 지루했어요. → 지루했어요",
      "아기가 낮잠을 자고 있어요. → 낮잠"
      "Do you have your own room? → 소유하다",
      "많은 야생동물이 죽어가고 있습니다. → 언제나의",
      "거북이는 단단한 껍데기를 가지고 있다. →껍데기"
    ],
    답: 2,
    설명: "자신은 '소유하다'라는 움직임이 아니라, '자기 자신의'라는 뜻의 형용사로 쓰려고 하는 모험입니다. 그래서 '자신의 방'은 '네 소유물인 방'이 아니라 '네 자신의 방'으로 해석해야 합니다."
  },
  {
    유형: "문법",
    구절: 없음,
    질문: "다음 빈칸에 알맞지 않게 됩니까?\n\n나는 유럽으로 여행을 ___합니다.",
    선택지: ["좋아하다", "계획하다", "희망하다", "원하다", "즐기다"]
    답: 4,
    설명: "like, plan, hope, want는 모두 뒤에서부정사(여행)를 목적으로 하고 있습니다. 하지만 즐기는 것은 뒤에 동명사(traveling)만 목적으로 사용할 수 있는, 이 문장에는 지."
  },
  {
    유형: "문법",
    구절: 없음,
    질문: "다음 중 추론 그게 쓰임이 나머지와 다른 것인가요?",
    선택 사항: [
      "저 귀여운 강아지 좀 봐."
      "우리가 해낼 수 있다고 믿어요."
      "그가 대회에서 우승했다는 건 정말 놀라운 일이에요."
      "그들이 자매였다는 걸 알고 있었나요?"
      "중요한 건 당신이 최선을 다했다는 거예요."
    ],
    답: 0,
    설명: "①번의 것은 강아지를 주는 불안형용사(그, 저)예요. 나머지는 문장과 문장을 연결하는 연결사 that으로, 후방 완전한 문장(주어+동사)이 이어져요."
  },
  {
    유형: "독해",
    통행: "준호, 민지, 알렉스는 반 고흐 구름 포스터를 보고 있어요. 세 사람은 반 고흐의 그림 '별이 빛나는 밤'에 대해 이야기를 나눌, 미래 박물관에서 반 고흐 모스크바에 함께하기로 할게요. 모스크바는 10월 1일에, 세 사람은 이번 주에 전시회에 일어나 약속했어요.",
    질문: "위 대화 내용과 일치하지 않습니까?",
    선택 사항: [
      "스터포포 그림은 빈센트 반 고흐의 예술이다.",
      "준호는 그림 속 밤하늘의 색이 마음에 있습니다.",
      "반 고흐 전시회는 미래박물관에서 있습니다.",
      "반고흐 전시회는 9월 1일에 게재된다.",
      "세 사람은 이번 주 토요일에 참여하기로 했습니다."
    ],
    답: 3,
    설명: "지문에서 전시회는 10월 1일(10월 1일)에 있다고 해서. 9월 1일이 아니라 10월 1일이니, ④번이 내용과 일치하지 않습니다."
  },
  {
    유형: "독해",
    통로: "앙리 마티스는 아내 아멜리의 얼굴을 파랑으로 칠한 그림을 그렸어요. 그는 뚜렷하고 강렬한 색으로 자신의 감정을 표현하고 싶어했습니다. 처음에는 사람들이 이런 화풍을 줄 수 있고, 마티스는 '야수'라는 흩어질 정도로 얻었습니다. 하지만 그는 자신만의 스타일을 지켰고, 결국에는 결실이 났습니다.",
    질문: "윗글의 내용이 일치하지 않습니까?",
    선택 사항: [
      "아멜리는 ​​앙리 마티스의 아내이다.",
      "마티스는 아내의 얼굴을 파란색으로 칠했다.",
      "사람들은 처음부터 마티스의 화풍을 좋아했다.",
      "마티스는 화풍 '야수'라는 이름으로 구멍을 뚫었습니다.",
      "마티스는 자신의 스타일을 따라 유명해졌습니다."
    ],
    답: 2,
    설명: "지문 사람들이 '처음에는' 마티스의 화풍을 가져가야 합니다. '처음부터 좋아했다'는 ③번은 내용과 반대됩니다."
  }
];

// ============================================
//상태
// ============================================
현재 값을 0으로 설정하세요.
점수를 0으로 설정하세요.
잘못된 목록을 []로 설정하세요.

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
화면 표시 함수(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.hidden = true);
  화면 숨김 = false;
}

// ============================================
// 문제 해결
// ============================================
function renderQuestion() {
  const q = QUESTIONS[current];

  qIndexEl.textContent = `${current + 1} / ${QUESTIONS.length}`;
  quizTrack.style.width = `${((current) / QUESTIONS.length) * 100 + 20}%`;

  만약 (q.passage)라면 {
    passageEl.textContent = q.passage;
    passageEl.hidden = false;
  } 또 다른 {
    passageEl.hidden = true;
  }

  questionTextEl.textContent = q.question;

  choicesEl.innerHTML = "";
  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.type = "버튼";
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
함수 selectAnswer(selectedIndex) {
  const q = QUESTIONS[current];
  const buttons = choicesEl.querySelectorAll(".choice-btn");
  buttons.forEach(b => b.disabled = true);

  const isCorrect = selectedIndex === q.answer;

  buttons[q.answer].classList.add("is-correct");
  만약 (!isCorrect) {
    buttons[selectedIndex].classList.add("is-wrong");
    wrongList.push({
      질문: q.question.split("\n")[0],
      답변: `${["①","②","③","④","⑤"][q.answer]} ${q.choices[q.answer]}`
    });
  } 또 다른 {
    점수++;
  }

  FeedbackTitleEl.textContent = 맞습니까? "정답이에요! 🎉" : "아쉬워요, 다시 확인해요";
  feedbackTitleEl.className = "feedback-title " + (isCorrect ? "correct" : "wrong");
  feedbackExplainEl.textContent = q.explanation;
  feedbackEl.hidden = false;
}

// ============================================
// 다음 문제 / 결과
// ============================================
다음질문 함수() {
  현재++;
  현재 값이 질문의 길이보다 작으면 {
    renderQuestion();
  } 또 다른 {
    showResult();
  }
}

결과 표시 함수(showResult())
  document.getElementById("scoreNum").textContent = score;

  const msgEl = document.getElementById("scoreMsg");
  점수가 질문 수와 같으면 {
    msgEl.textContent = "완벽해요! 6과 내용을 정확히 이해했어요.";
  } 그렇지 않고 점수가 질문 수의 길이보다 크거나 같으면 {
    msgEl.textContent = "잘했어요! 틀린 문제만 한 번 더 확인하세요.";
  } 또 다른 {
    msgEl.textContent = "6과 내용을 다시 한 번만 반복하면 됩니다.";
  }

  const reviewEl = document.getElementById("reviewList");
  reviewEl.innerHTML = "";
  만약 (wrongList.length가 0이 아니면) {
    reviewEl.innerHTML = `<p class="review-empty">틀린 문제가 있어요 👏</p>`;
  } 또 다른 {
    wrongList.forEach(item => {
      const div = document.createElement("div");
      div.className = "리뷰 항목";
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
함수 resetQuiz() {
  현재 = 0;
  점수 = 0;
  wrongList = [];
  화면 표시(startScreen);
}

// ============================================
//이벤트 내보내기
// ============================================
document.getElementById("startBtn").addEventListener("click", () => {
  showScreen(quizScreen);
  renderQuestion();
});

document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("retryBtn").addEventListener("click", resetQuiz);
