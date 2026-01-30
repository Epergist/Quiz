function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
const quizData = 
[
    {
    question: "Which race would you want to play as?",
    type: "radio",
    options: [
    { text: "Human", points: 5},
      { text: "Dwarf", points: 6 },
      { text: "Night elf", points: 7 },
      { text: "Gnome", points: 8 }
    ]
  },

  {
    question: "How do you approach a challenging task?",
    type: "radio",
    options: [
      { text: "Charge in head-first with determination", points: 2 },
      { text: "Take time to understand and plan carefully", points: 3 },
      { text: "Look for creative and unconventional solutions", points: 4 },
      { text: "Persistently work through obstacles", points: 1 }
    ]
  },
  {
    question: "What is your preferred method of problem-solving?",
    type: "radio",
    options: [
      { text: "Using brute strength and willpower", points: 1 },
      { text: "Consulting others and seeking advice", points: 3 },
      { text: "Thinking outside the box", points: 4 },
      { text: "Relying on past experiences and persistence", points: 2 }
    ]
  },
  {
    question: "What motivates you the most?",
    type: "radio",
    options: [
      { text: "The thrill of competition and victory", points: 1 },
      { text: "The desire for peace and balance", points: 3 },
      { text: "The excitement of new challenges", points: 4 },
      { text: "The drive to overcome any obstacle", points: 2 }
    ]
  },
  {
    question: "How do you prefer to spend your free time?",
    type: "radio",
    options: [
      { text: "Engaging in physical activities or sports", points: 2 },
      { text: "Relaxing in nature or gardening", points: 3 },
      { text: "Exploring new hobbies or learning skills", points: 1 },
      { text: "Reading or reflecting on life", points: 4 }
    ]
  },
  {
    question: "What kind of leader are you?",
    type: "radio",
    options: [
      { text: "A strong and commanding presence", points: 2 },
      { text: "A wise and thoughtful guide", points: 3 },
      { text: "A flexible and innovative thinker", points: 4 },
      { text: "A resilient and determined motivator", points: 1 }
    ]
  },
  {
    question: "How do you view life's challenges?",
    type: "radio",
    options: [
      { text: "Opportunities to prove my strength", points: 2 },
      { text: "Moments to learn and grow wiser", points: 3 },
      { text: "Chances to innovate and adapt", points: 4 },
      { text: "Tests of my resilience and resourcefulness", points: 1 }
    ]
  },
  {
    question: "What is your greatest strength?",
    type: "radio",
    options: [
      { text: "My unwavering determination", points: 1 },
      { text: "My deep understanding and patience", points: 3 },
      { text: "My quick thinking and adaptability", points: 4 },
      { text: "My ability to endure and persevere", points: 2 }
    ]
  },
  {
    question: "What is your approach to teamwork?",
    type: "radio",
    options: [
      { text: "Taking charge and leading the group", points: 1 },
      { text: "Providing support and advice to others", points: 3 },
      { text: "Bringing creative ideas and solutions", points: 4 },
      { text: "Ensuring tasks are completed efficiently", points: 2 }
    ]
  },
  {
    question: "How do you handle conflicts with others?",
    type: "radio",
    options: [
      { text: "Confront them directly and assertively", points: 2 },
      { text: "Seek to understand and find common ground", points: 3 },
      { text: "Use humour or wit to diffuse tension", points: 4 },
      { text: "Strategically plan a resolution", points: 1 }
    ]
  },
  {
    question: "How do you view traditions?",
    type: "radio",
    options: [
      { text: "As important pillars that should be upheld", points: 2 },
      { text: "As guidelines that can be adapted", points: 1 },
      { text: "As concepts that can be challenged", points: 4 },
      { text: "As historical lessons to learn from", points: 3 }
    ]
  },
{
  question: "You open a treasure chest and it screams at you",
  type: "radio",
  options: [
    { text: "Politely apologise", points: 1 },
    { text: "Try reasoning with it, explaining you mean no harm", points: 1 },
    { text: "Smash it with your weapon to show who’s the boss", points: 2 },
    { text: "Shake it to see if it has any hidden valuables", points: 2 }
  ]
},
{
  question: "How do you view leadership?",
  type: "radio",
  options: [
    { text: "Leadership is about responsibility.", points: 1 },
    { text: "Someone must keep everyone together.", points: 1 },
    { text: "True leaders guide quietly and let others shine.", points: 3 },
    { text: "Authority is about wisdom and patience, not titles.", points: 3 }
  ]
},
{
  question: "Your group asks if anyone knows this fight",
  type: "radio",
  options: [
    { text: "Basically yeah", points: 1 },
    { text: "Give a short, clear explanation to keep things moving", points: 1 },
    { text: "Confidently explain a strategy you just invented", points: 4 },
    { text: "Say “yeah”, then blame the tank when things go wrong", points: 4 }
  ]
},
{
  question: "You’re traveling through a familiar zone",
  type: "radio",
  options: [
    { text: "Appreciate how solid and dependable it feels", points: 2 },
    { text: "Remember past adventures that happened here", points: 2 },
    { text: "Feel oddly calm, even if nothing’s happening", points: 3 },
    { text: "Slow down without really meaning to", points: 3 }
  ]
},
{
  question: "What’s your ideal weapon?",
  type: "radio",
  options: [
    { text: "A well-crafted hammer passed down through generations", points: 2 },
    { text: "A gun that’s reliable, loud, and built to last forever", points: 2 },
    { text: "A compact device with too many buttons and unknown side effects", points: 4 },
    { text: "Something experimental, if it explodes, it's just more data", points: 4 }
  ]
},
{
  question: "Your raid wipes at 5% What’s your reaction?",
  type: "radio",
  options: [
    { text: "Sit quietly and replay everything mentally", points: 3 },
    { text: "Say nothing, but remember exactly who messed up", points: 3 },
    { text: "Obviously it was the tank’s fault", points: 4 },
    { text: "“Okay but hear me out, what if we try THIS”", points: 4 }
  ]
},
    {
    question: "You notice your DPS is slightly lower than usual",
    type: "radio",
    options: [
      { text: "Stay calm and make a mental plan to improve next fight", points: 1 },
      { text: "Its fine, numbers are hard anyways ", points: 3 },
      { text: "Reflect quietly on your technique and timing ", points: 4 },
      { text: "Start checking buffs, talents, gear, and combat logs", points: 2 }
    ]
  },
      {
    question: "Random person buffs you in the open world, how do you react? ",
    type: "radio",
    options: [
      { text: "Nod respectfully and keep questing", points: 1 },
      { text: "Stop, bow and return the favour", points: 3 },
      { text: "Inspect them immediately to check their gear", points: 4 },
      { text: "You were too busy to notice and they are long gone by now", points: 2 }
    ]
  },
{
  question: "You accidentally pull extra mobs in a dungeon",
  type: "radio",
  options: [
    { text: "Apologize and try to recover", points: 1 },
    { text: "Take responsibility and commit fully", points: 1 },
    { text: "Save your friend and leave others to their own devices", points: 2 },
    { text: "/cast Vanish", points: 3 }
  ]
},
{
  question: "You fall into lava in a dungeon",
  type: "radio",
  options: [
    { text: "Frantically spam every button hoping something works", points: 2 },
    { text: "You accept your fate", points: 2 },
    { text: "Try to distract the lava mid-fall (or anyone watching)", points: 3 },
    { text: "You lava jump because of course you have the addon installed", points: 4 }
  ]
},
{
  question: "You’re trusted with something powerful and dangerous",
  type: "radio",
  options: [
    { text: "Somehow turn it into a debate over taxes and city defenses", points: 1 },
    { text: "Guard it closely", points: 3 },
    { text: "Trust ancient precedent over your own judgment", points: 3 },
    { text: "Improve it until it’s only mostly dangerous", points: 4 }
  ]
},
{
  question: "You see someone wearing cool looking gear",
  type: "radio",
  options: [
    { text: "Go see how much it costs on the auction house", points: 1 },
    { text: "Inspect them immediately", points: 2 },
    { text: "Just stand there in awe", points: 3 },
    { text: "Might look cool but it’s not optimal DPS", points: 4 }
  ]
},
{
  question: "How do you feel about escort quests?",
  type: "radio",
  options: [
    { text: "They’re frustrating, but someone has to do them", points: 1 },
    { text: "Protect the NPC like a personal oath", points: 2 },
    { text: "Patient at first, then silently furious", points: 3 },
    { text: "Speedrun and hope the NPC lives", points: 4 }
  ]
},
{
  question: "Someone asks for help with a long, annoying quest",
  type: "radio",
  options: [
    { text: "Agree, progress is easier together", points: 1 },
    { text: "For some gold or a pint later", points: 2 },
    { text: "Help quietly without expectations", points: 3 },
    { text: "Help, but optimise the heck out of it", points: 4 }
  ]
},
{
  question: "You see someone clearly struggling with a mechanic",
  type: "radio",
  options: [
    { text: "Try to explain it in a helpful way", points: 1 },
    { text: "Give them space to figure it out", points: 2 },
    { text: "Adjust your own play to cover for it", points: 3 },
    { text: "Whisper them a tip mid-fight", points: 4 }
  ]
},
  {
    question: "You’re in Alterac valley at 3 a.m. again, because you obviously enjoy it",
    type: "multiple",
    options: [
      { text: "",image: "images/AAAA.gif", points: 5},
      { text: "",image: "images/peepoCute.png", points: 6 },
      { text: "",image: "images/peepoRiot.gif", points: 7 },
      { text: "",image: "images/ALERTA.gif", points: 8 }
    ]
  },

{
  question: "A quest chain sends you back to the same zone yet again",
    type: "multiple",
  options: [
    { text: "Optimise the route and move on", points: 1 },
    { text: "Complain about it, but do it anyway", points: 2 },
    { text: "Wonder why this place keeps calling to you", points: 3 },
    { text: "Test something new while you are there", points: 4 }
  ]
},
{
  question: "Your gear breaks mid-dungeon, what is your mindset?",
    type: "multiple",
  options: [
    { text: "Annoying but manageable, we’ll adapt", points: 1 },
    { text: "That’s what repair money is for", points: 2 },
    { text: "I should have foreseen this", points: 3 },
    { text: "Durability is just a number", points: 4 }
  ]
},
{
  question: "You’re exploring a zone off the main path",
    type: "multiple",
  options: [
    { text: "Look for signs of future importance", points: 1 },
    { text: "Appreciate the craftsmanship and history", points: 2 },
    { text: "Move carefully, this place has a special presence", points: 3 },
    { text: "Interact with absolutely everything", points: 4 }
  ]
},
{
  question: "You’re waiting on a late group member",
    type: "multiple",
  options: [
    { text: "Keep everyone together and ready", points: 1 },
    { text: "Crack jokes and pass the time", points: 2 },
    { text: "Wander nearby, but stay close enough to jump in", points: 3 },
    { text: "Peggle", points: 4 }
  ]
},
{
  question: "At the end of a long play session, you feel…",
    type: "multiple",
  options: [
    { text: "Satisfied that progress was made", points: 1 },
    { text: "Content, another solid night in the books", points: 2 },
    { text: "Reflective, thinking about what it all meant", points: 3 },
    { text: "Excited about what you’ll try next time", points: 4 }
  ]
},
{
  question: "You’re on a long flight path How do you spend your time?",
    type: "multiple",
  options: [
    { text: "Checking quests and planning your next stop", points: 1 },
    { text: "Chatting or just vibing while you wait", points: 2 },
    { text: "Watching the water and the horizon", points: 3 },
    { text: "Peggle", points: 4 }
  ]
}

];

exports.handler = async (event) => {
if (event.httpMethod === "GET") {
  const safeQuizData = quizData.map((q, qIndex) => ({
    question: q.question,
    type: q.type,
options: shuffleArray(
  q.options.map((o, oIndex) => ({
    id: `${qIndex}-${oIndex}`,
    text: o.text,
    points: o.points,
    image: o.image || null  // <-- uusi kenttä
  }))
)

  }));

  return {
    statusCode: 200,
    body: JSON.stringify(safeQuizData)
  };
}

  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const userAnswers = body.answers;

    const pts = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0 };

    userAnswers.forEach(ans => {
      if (!ans) return;

      if (Array.isArray(ans)) {
        ans.forEach(a => {
          if (a.points && pts[a.points] !== undefined) {
            pts[a.points]++;
          }
        });
      } else {
        if (ans.points && pts[ans.points] !== undefined) {
          pts[ans.points]++;
        }
      }
    });

    const max = Math.max(...Object.values(pts));
    const winnerKey = Object.keys(pts).find(k => pts[k] === max);

const resultText = {
  1: `Human<br>
Balanced, determined and great in adapting to every situation.<br>
Humans rise to any challenge and carve their own destiny.<br>
Whether with strategy or sheer willpower, you always find a way through obstacles.`,
  2: `Dwarf<br>
Tough, loyal and unbreakable.<br>
Dwarves always stand their ground no matter the odds.<br>
You value honor, tradition, and strength. Nothing can move you.`,
  3: `Night elf<br>
Silent, patient and deeply connected to nature.<br>
Night Elves watch from the shadows and wait for opportunities.<br>
You trust your instinct and balance, moving unseen beneath the moonlight.`,
  4: `Gnome<br>
Brilliant, curious and ever inventive.<br>
Gnomes can solve problems with wit, creativity and the occasional chaos.<br>
Where others see limits, you see endless possibilities.`
};

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: resultText[winnerKey],
        points: pts
      })
    };
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed"
  };
};