// Kysymykset ja pisteet (tässä on esimerkkikysymykset, lisää loput halutessasi)
const quizData = [
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

export async function handler(event) {
  if (event.httpMethod === "GET") {
    // Lähetetään frontendille vain kysymysten tekstit ja input-tyyppi
    const safeQuizData = quizData.map(q => ({
      question: q.question,
      type: q.type,
      options: q.options.map(o => ({ text: o.text })) // Piilotetaan pisteet
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(safeQuizData)
    };
  }

  if (event.httpMethod === "POST") {
    // Lasketaan pisteet käyttäjän vastauksista
    const body = JSON.parse(event.body);
    const userAnswers = body.answers; // [{question:0, points:2}, ...]
    const pts = {1:0,2:0,3:0,4:0};

    userAnswers.forEach(ans => {
      if(ans.points){
        if(Array.isArray(ans.points)){
          ans.points.forEach(p => pts[p]++);
        } else {
          pts[ans.points]++;
        }
      }
    });

    const maxPoints = Math.max(...Object.values(pts));
    const result = Object.keys(pts).find(k=>pts[k]===maxPoints);
    const resultText = {1:"Human",2:"Dwarf",3:"Night elf",4:"Gnome"};

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: resultText[result],
        points: pts
      })
    };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
}
