const quizContainer = document.querySelector('.quiz-container');
let quizData = [];
let userAnswers = [];
let current = 0;

// Hae kysymykset backendistä
fetch("/.netlify/functions/quiz")
  .then(res => res.json())
  .then(data => {
    quizData = data;
    userAnswers = Array(quizData.length).fill(null);
    renderQuestion(current);
  });

// Renderöi yksittäinen kysymys
function renderQuestion(index){
  // Poistetaan vanhat kysymykset
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
      // Tallennetaan valittu vaihtoehto
      userAnswers[index] = {question:index, points: parseInt(e.target.value)+1}; 
      // Huom: tässä lisätään +1 koska backend odottaa 1–4 pisteitä
    });
  });

  // Navigointipainike
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

// Lähetä vastaukset backendille ja näytä tulos
function submitAnswers(){
  fetch("/.netlify/functions/quiz", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({answers: userAnswers})
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
