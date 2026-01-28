const quizContainer = document.querySelector('.quiz-container');
let quizData = [];
let userAnswers = [];
let current = 0;

// Alkuperäinen taulukko backend-pisteiden hakua varten
const quizDataOriginal = [
  { question: "How do you approach a challenging task?", type: "radio", options: [
    { text: "Charge in head-first with determination", points: 1 },
    { text: "Take time to understand and plan carefully", points: 2 },
    { text: "Look for creative and unconventional solutions", points: 3 },
    { text: "Persistently work through obstacles", points: 4 }
  ]},
  { question: "Which environment do you thrive in the most?", type: "radio", options: [
    { text: "A competitive and fast-paced setting", points: 1 },
    { text: "A peaceful and natural environment", points: 2 },
    { text: "A dynamic and ever-changing atmosphere", points: 3 },
    { text: "An environment where I can work independently", points: 4 }
  ]}
  // Lisää loput kysymykset samaan tapaan
];

// Hae kysymykset backendistä
fetch("/.netlify/functions/quiz")
  .then(res => res.json())
  .then(data => {
    quizData = data;
    userAnswers = Array(quizData.length).fill(null);
    renderQuestion(current);
  });

function renderQuestion(index){
  document.querySelectorAll('.question').forEach(q => q.remove());

  const q = quizData[index];
  const qDiv = document.createElement('div');
  qDiv.className = 'question';

  const p = document.createElement('p');
  p.textContent = q.question;
  qDiv.appendChild(p);

  q.options.forEach((opt,i)=>{
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = q.type;
    input.name = 'q'+index;
    input.value = i;
    label.appendChild(input);
    label.appendChild(document.createTextNode(' ' + opt.text));
    qDiv.appendChild(label);

    input.addEventListener('change', e=>{
      userAnswers[index] = {question:index, optionIndex: parseInt(e.target.value)};
    });
  });

  const btn = document.createElement('button');
  btn.textContent = index === quizData.length-1 ? "Näytä tulos" : "Next";
  btn.addEventListener('click', ()=>{
    if(userAnswers[index] === null){
      alert("Valitse vaihtoehto!");
      return;
    }
    if(current < quizData.length-1){
      current++;
      renderQuestion(current);
    } else {
      submitAnswers();
    }
  });
  qDiv.appendChild(btn);

  quizContainer.appendChild(qDiv);
}

function submitAnswers(){
  // Muunnetaan frontendin optionIndex backendin pisteiksi
  const answersForBackend = userAnswers.map(ans => {
    const originalQ = quizDataOriginal[ans.question];
    return { question: ans.question, points: originalQ.options[ans.optionIndex].points };
  });

  fetch("/.netlify/functions/quiz", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({answers: answersForBackend})
  })
  .then(res=>res.json())
  .then(data=>{
    document.querySelectorAll('.question').forEach(q=>q.remove());
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    document.getElementById('resultText').textContent = data.result;
    console.log("Points breakdown:", data.points);
  });
}
