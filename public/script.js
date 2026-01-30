const quizContainer = document.getElementById('quiz');
let quizData = [];
let userAnswers = [];
let current = 0;
let firstQuestionPrevChoice = null;
let firstQuestionJokeShown = 0;

// ----- Fetch questions -----
fetch("/.netlify/functions/quiz")
  .then(res => res.json())
  .then(data => {
    quizData = data;
    userAnswers = Array(quizData.length).fill(null);
    renderQuestion(current);
  });

// ----- Progress bar -----
function updateProgression(index, isJoke = false, isPreResult = false) {
  const progDiv = document.getElementById('progression');
  const progressBar = document.getElementById('progressBar');
  if (!progDiv || !progressBar) return;

  if (isPreResult) {
    progDiv.style.display = 'none';
    progressBar.style.display = 'none';
  } else {
    progDiv.style.display = 'block';
    progressBar.style.display = 'block';

    progDiv.textContent = isJoke
      ? `Question 1 / ${quizData.length}`
      : `Question ${index + 1} / ${quizData.length}`;

    progressBar.style.width = isJoke
      ? `${(1 / quizData.length) * 100}%`
      : `${((index + 1) / quizData.length) * 100}%`;
  }
}

// ----- Render question -----
function renderQuestion(index, isJoke = false, isPreResult = false) {
  quizContainer.innerHTML = "";
  updateProgression(index, isJoke, isPreResult);

  const qDiv = document.createElement('div');
  qDiv.className = 'question active';

  const p = document.createElement('p');
  p.style.textAlign = 'center';
  p.style.fontSize = '28px';
  p.style.fontWeight = 'bold';

  if (isPreResult) {
    p.innerHTML = `
      <div style="font-size:28px; margin-bottom:20px;">Drumroll</div>
      <div style="font-size:96px; margin-top:20px;">
        <img src="images/DRUMMERS.gif" style="width:124px;height:124px;vertical-align:middle;">
      </div>
    `;
  } 
  else if (isJoke) {
    let jokeText = '-1 point for Night Elf <img src="images/night_elf.png" style="width:64px;height:64px;vertical-align:middle;">';
    if (firstQuestionJokeShown === 2) jokeText = "Nice try! -5 points for Night Elf <img src='images/night_elf.png' style='width:64px;height:64px;vertical-align:middle;'>";
    if (firstQuestionJokeShown === 3) jokeText = "Third time's the charm! -10 points for Night Elf <img src='images/night_elf.png' style='width:64px;height:64px;vertical-align:middle;'>";
    p.innerHTML = jokeText;
  } 
  else {
    p.textContent = quizData[index].question;
  }

  qDiv.appendChild(p);

  // Multiple info
  if (!isJoke && !isPreResult && quizData[index].type === "multiple") {
    const info = document.createElement('p');
    info.textContent = "Multiple choice";
    info.className = "multiple-info";
    info.style.textAlign = "center";
    qDiv.appendChild(info);
  }

  // Answers
  if (!isJoke && !isPreResult) {
    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers';
    const q = quizData[index];

    q.options.forEach(opt => {
      const label = document.createElement('label');
      const input = document.createElement('input');

      input.type = q.type === "multiple" ? "checkbox" : "radio";
      input.value = opt.points;
      input.dataset.id = opt.id;

      if (opt.image) {
        const img = document.createElement('img');
        img.src = opt.image;
        img.alt = opt.text;
        img.style.width = "50px";
        img.style.height = "50px";
        img.style.marginRight = "10px";
        label.appendChild(img);
      }

      if (q.type === "radio") {
        input.name = 'q' + index;
        if (userAnswers[index]?.points === opt.points) {
          input.checked = true;
          label.classList.add('selected');
        }
        input.addEventListener('change', () => {
          answersDiv.querySelectorAll('label').forEach(l => l.classList.remove('selected'));
          label.classList.add('selected');
          userAnswers[index] = { question: index, points: parseInt(input.value) };
        });
      } 
      else {
        if (!userAnswers[index]) userAnswers[index] = [];
        if (userAnswers[index].some(a => a.points === opt.points)) {
          input.checked = true;
          label.classList.add('selected');
        }
        input.addEventListener('change', () => {
          if (input.checked) {
            label.classList.add('selected');
            userAnswers[index].push({ question: index, points: parseInt(input.value) });
          } else {
            label.classList.remove('selected');
            userAnswers[index] = userAnswers[index].filter(a => a.points !== parseInt(input.value));
          }
        });
      }

      label.appendChild(input);
      label.appendChild(document.createTextNode(opt.text));
      answersDiv.appendChild(label);
    });

    qDiv.appendChild(answersDiv);
  }

  // Navigation
  const navDiv = document.createElement('div');
  navDiv.className = "quiz-nav";

  const backBtn = document.createElement('button');
  backBtn.textContent = "Back";
  backBtn.disabled = index === 0 && !isJoke && !isPreResult;
  backBtn.addEventListener('click', () => {
    if (isJoke || isPreResult) renderQuestion(index);
    else { current--; renderQuestion(current); }
  });

  const nextBtn = document.createElement('button');
  nextBtn.textContent = isPreResult ? "Show results" : "Next";

  nextBtn.addEventListener('click', () => {
    if (isPreResult) { submitAnswers(); return; }

    const ans = userAnswers[index];
    if (!ans || (Array.isArray(ans) && ans.length === 0)) {
      alert("You need to select an answer");
      return;
    }

    // First question joke logic
    if (index === 0) {
      const ansPoints = Array.isArray(ans) ? ans[0]?.points : ans.points;

      if (ansPoints === 7 && firstQuestionJokeShown === 0) {
        firstQuestionJokeShown = 1; firstQuestionPrevChoice = 7; renderQuestion(index, true); return;
      }
      if (firstQuestionJokeShown === 1 && firstQuestionPrevChoice === 7 && ansPoints !== 7) {
        firstQuestionJokeShown = 2; firstQuestionPrevChoice = ansPoints; renderQuestion(index, true); return;
      }
      if (firstQuestionJokeShown === 2 && ansPoints === 7) {
        firstQuestionJokeShown = 3; firstQuestionPrevChoice = 7; renderQuestion(index, true); return;
      }

      firstQuestionPrevChoice = ansPoints;
    }

    if (current < quizData.length - 1) { current++; renderQuestion(current); }
    else { renderQuestion(index, false, true); }
  });

  navDiv.appendChild(backBtn);
  navDiv.appendChild(nextBtn);
  qDiv.appendChild(navDiv);

  quizContainer.appendChild(qDiv);
}

// ----- Submit answers -----
function submitAnswers(){
  fetch("/.netlify/functions/quiz", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ answers: userAnswers })
  })
  .then(res => res.json())
  .then(data => {
    quizContainer.innerHTML = "";

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    document.getElementById('resultText').innerHTML = data.result;

    const winnerRaceKey = Object.keys(data.points).find(
      k => data.points[k] === Math.max(...Object.values(data.points))
    );

    const rollBtn = document.getElementById("rollClassBtn");
    const wheelText = document.getElementById("classWheel");
    
    wheelText.style.display = "none";
    rollBtn.disabled = false;

    rollBtn.onclick = () => {
      wheelText.style.display = "block";
      spinClassWheel(winnerRaceKey);
      rollBtn.disabled = true;
    };
  });
}

// ----- Class wheel logic -----
const raceClasses = {
  1: ["Mage", "Paladin", "Priest", "Rogue", "Warlock", "Warrior"], // Human
  2: ["Hunter", "Paladin", "Priest", "Rogue", "Warrior"], // Dwarf
  3: ["Druid", "Hunter", "Priest", "Rogue", "Warrior"], // Night Elf
  4: ["Mage", "Rogue", "Warlock", "Warrior"] // Gnome
};

function spinClassWheel(raceKey) {
  const classes = raceClasses[raceKey];
  let i = 0;
  const wheelText = document.getElementById("classWheel");

  const spin = setInterval(() => {
    wheelText.textContent = classes[i % classes.length];
    i++;
  }, 100);

  setTimeout(() => {
    clearInterval(spin);
    const chosenClass = classes[Math.floor(Math.random() * classes.length)];
    wheelText.textContent = `Your class: ${chosenClass}`;
  }, 2000);
}

// ----- Utility -----
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
