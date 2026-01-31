const startScreen = document.getElementById('startScreen');
const quizContainer = document.getElementById('quiz');
const resultDiv = document.getElementById('result');
const rollBtn = document.getElementById("rollClassBtn");
const wheelText = document.getElementById("classWheel");
const resultTitle = document.getElementById("resultTitle");
const classImages = {
  "Mage": "images/mage.png",
  "Paladin": "images/paladin.png",
  "Priest": "images/priest.png",
  "Rogue": "images/rogue.png",
  "Warlock": "images/warlock.png",
  "Warrior": "images/warrior.png",
  "Hunter": "images/hunter.png",
  "Druid": "images/druid.png"
};

const raceNames = {
  1: "Human",
  2: "Dwarf",
  3: "Night Elf",
  4: "Gnome"
};

let quizData = [];
let userAnswers = [];
let current = 0;
let firstQuestionPrevChoice = null;
let firstQuestionJokeShown = 0;
let hasRolledClass = false;

const raceClasses = {
  1: ["Mage", "Paladin", "Priest", "Rogue", "Warlock", "Warrior"],
  2: ["Hunter", "Paladin", "Priest", "Rogue", "Warrior"],
  3: ["Druid", "Hunter", "Priest", "Rogue", "Warrior"],
  4: ["Mage", "Rogue", "Warlock", "Warrior"]
};

// ----- START SCREEN -----
document.getElementById('startQuizBtn').addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizContainer.style.display = 'block';
  resultTitle.style.display = 'block';

  fetch("/.netlify/functions/quiz")
    .then(res => res.json())
    .then(data => {
      quizData = data;
      userAnswers = Array(quizData.length).fill(null);
      renderQuestion(current);
    });
});

// Show race selection when "Roll Class" is clicked
document.getElementById('startRollBtn').addEventListener('click', () => {
  startScreen.style.display = 'none';
  document.getElementById('raceSelectScreen').classList.remove('hidden');
});

// ----- RACE SELECTION -----
document.querySelectorAll('.raceBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const raceKey = btn.dataset.race;
    document.getElementById('raceSelectScreen').classList.add('hidden');
    resultDiv.style.display = 'block';
    raceLabel.textContent = `Rolling class for: ${raceNames[raceKey]}`;
raceLabel.style.display = "block";

    

    resultTitle.style.display = 'none';
    wheelText.style.display = "none";

    rollBtn.textContent = "Roll your class";
    rollBtn.disabled = false;
    hasRolledClass = false;

    rollBtn.onclick = () => {
      wheelText.style.display = "block";
      rollBtn.disabled = true;

      spinClassWheel(raceKey, () => {
        hasRolledClass = true;
        rollBtn.textContent = "Reroll your class";
        rollBtn.disabled = false;
      });
    };
  });
});
document.getElementById('rollRaceBtn').addEventListener('click', () => {
  const raceButtons = Array.from(document.querySelectorAll('.raceBtn'));
  if (raceButtons.length === 0) return;


  const randomBtn = raceButtons[Math.floor(Math.random() * raceButtons.length)];
  randomBtn.click();
});


// ----- PROGRESS -----
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

// ----- RENDER QUESTION -----
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
    p.innerHTML = `<div style="font-size:28px; margin-bottom:20px;">Drumroll</div>
                   <div style="font-size:96px; margin-top:20px;">
                     <img src="images/DRUMMERS.gif" style="width:124px;height:124px;vertical-align:middle;">
                   </div>`;
  } else if (isJoke) {
    let jokeText = '-1 point for Night Elf <img src="images/night_elf.png" style="width:64px;height:64px;vertical-align:middle;">';
    if (firstQuestionJokeShown === 2) jokeText = "Nice try! -5 points for Night Elf <img src='images/night_elf.png' style='width:64px;height:64px;vertical-align:middle;'>";
    if (firstQuestionJokeShown === 3) jokeText = "Third time's the charm! -10 points for Night Elf <img src='images/night_elf.png' style='width:64px;height:64px;vertical-align:middle;'>";
    p.innerHTML = jokeText;
  } else {
    p.textContent = quizData[index].question;
  }

  qDiv.appendChild(p);

  if (!isJoke && !isPreResult && quizData[index].type === "multiple") {
    const info = document.createElement('p');
    info.textContent = "Multiple choice";
    info.className = "multiple-info";
    qDiv.appendChild(info);
  }

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
      } else {
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

// ----- SUBMIT ANSWERS -----
function submitAnswers(){
  fetch("/.netlify/functions/quiz", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ answers: userAnswers })
  })
  .then(res => res.json())
  .then(data => {
    quizContainer.innerHTML = "";
    resultDiv.style.display = 'block';
    resultTitle.style.display = 'block';

    document.getElementById('resultText').innerHTML = data.result;

const winnerRaceKey = Object.keys(data.points).find(
  k => data.points[k] === Math.max(...Object.values(data.points))
);

// After quiz ends
raceLabel.style.display = "none";
rollBtn.textContent = "Roll your class";
rollBtn.disabled = false;

rollBtn.onclick = () => {
  wheelText.style.display = "block";
  rollBtn.disabled = true;

  spinClassWheel(winnerRaceKey, () => {
    hasRolledClass = true;
    rollBtn.textContent = "Reroll your class";
    rollBtn.disabled = false;
  });
};


  });
}
document.getElementById("backToStartBtn").addEventListener("click", () => {
  // Hide all screens
  quizContainer.innerHTML = "";
  resultDiv.style.display = "none";
  document.getElementById('resultText').innerHTML = "";
  document.getElementById('raceSelectScreen').classList.add('hidden');

  // Reset start screen
  startScreen.style.display = "block";

  // Reset quiz state
  quizData = [];
  userAnswers = [];
  current = 0;
  firstQuestionPrevChoice = null;
  firstQuestionJokeShown = 0;

  // Reset class roll UI
  wheelText.textContent = "";
  wheelText.style.display = "none";
  raceLabel.textContent = "";
  raceLabel.style.display = "none";
  rollBtn.textContent = "Roll Your Class";
  rollBtn.disabled = false;

  // Remove any previous click handlers
  rollBtn.onclick = null;

  // Reset any "last used" race key so rolling starts fresh
  window.currentRaceKey = null; // optional global if you store it elsewhere
});

function spinClassWheel(raceKey, onFinish) {
  const classes = raceClasses[raceKey];
  let i = 0;
  let interval = 50;
  let spinCount = 0;
  const maxSpins = 60;

  function spinStep() {
    const currentClass = classes[i % classes.length];
    // Just spinning text while spinning
    wheelText.innerHTML = `<div style="font-size:36px; text-align:center;">${currentClass}</div>`;

    i++;
    spinCount++;

    if (spinCount < maxSpins) {
      interval += 5;
      setTimeout(spinStep, interval);
    } else {
      // Final chosen class
      const chosenClass = classes[Math.floor(Math.random() * classes.length)];
      const imgSrc = classImages[chosenClass] || "";

      // Text on top, image below
      wheelText.innerHTML = `
        <div style="text-align:center;">
          <div style="font-size:36px; font-weight:bold;">${chosenClass}</div>
          <img src="${imgSrc}" alt="${chosenClass}" style="width:80px; height:80px; margin-top:10px;">
        </div>
      `;

      if (typeof onFinish === "function") onFinish();
    }
  }

  spinStep();
}

