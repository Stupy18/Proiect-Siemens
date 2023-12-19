
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next');

const startContainer = document.getElementById('start-container');
const usernameInput = document.getElementById('username');
const startQuizButton = document.getElementById('start-quiz');

let score = 0;
let currentQuestionIndex = 0;
let currentQuestion;
let selectedOption;
let questionsAsked = 0; //pentru algoritm
let answerSubmitted = false; // pentru a nu putea da submit cu alt raspuns dupa submit-ul initial

//Stocarea de intrebari prin array-ul de obiecte
const questions = [
  {
    id: 1,
    question: "Which country was not part of the Axis powers during World War II?",
    options: ["Germany", "Italy", "Japan", "United Kingdom"],
    answer: "United Kingdom"
  },
  {
    id: 2,
    question: "What was the largest naval battle of World War II?",
    options: ["Battle of Midway", "Battle of the Coral Sea", "Battle of Leyte Gulf", "Battle of the Atlantic"],
    answer: "Battle of Leyte Gulf"
  },
  {
    id: 3,
    question: "Who was the Prime Minister of the United Kingdom for the majority of World War II?",
    options: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Anthony Eden"],
    answer: "Winston Churchill"
  },
  {
    id: 4,
    question: "Which event is generally considered to mark the beginning of World War II?",
    options: ["Invasion of Poland", "Attack on Pearl Harbor", "Battle of Britain", "Nazi-Soviet Pact"],
    answer: "Invasion of Poland"
  },
  {
    id: 5,
    question: "What was the code name for the Battle of Normandy?",
    options: ["Operation Barbarossa", "Operation Overlord", "Operation Market Garden", "Operation Torch"],
    answer: "Operation Overlord"
  },
  {
    id: 6,
    question: "Which of these cities was the first to be attacked with an atomic bomb?",
    options: ["Hiroshima", "Nagasaki", "Tokyo", "Kyoto"],
    answer: "Hiroshima"
  },
  {
    id: 7,
    question: "Which conference set the post-war reorganization of Europe in 1945?",
    options: ["Potsdam Conference", "Yalta Conference", "Tehran Conference", "Munich Conference"],
    answer: "Yalta Conference"
  },
  {
    id: 8,
    question: "Which country did Germany invade in 1940, marking the start of the Battle of Britain?",
    options: ["France", "Poland", "Belgium", "United Kingdom"],
    answer: "Belgium"
  },
  {
    id: 9,
    question: "Which operation was the German invasion of the Soviet Union?",
    options: ["Operation Barbarossa", "Operation Sea Lion", "Operation Overlord", "Operation Weserübung"],
    answer: "Operation Barbarossa"
  },
  {
    id: 10,
    question: "What was the last major German offensive on the Western Front called?",
    options: ["Battle of Kursk", "Battle of the Bulge", "Operation Market Garden", "Siege of Leningrad"],
    answer: "Battle of the Bulge"
  },
  {
    id: 11,
    question: "Which of the following countries was neutral during World War II?",
    options: ["Spain", "Italy", "Japan", "Soviet Union"],
    answer: "Spain"
  },
  {
    id: 12,
    question: "What was the main purpose of the Lend-Lease Act?",
    options: ["To provide aid to allies", "To establish naval bases", "To recruit foreign soldiers", "To lend money to Axis powers"],
    answer: "To provide aid to allies"
  },
  {
    id: 13,
    question: "Which country did the Allies invade on D-Day?",
    options: ["Germany", "Poland", "France", "Italy"],
    answer: "France"
  },
  {
    id: 14,
    question: "Which of the following battles is considered a turning point in the Pacific War?",
    options: ["Battle of Midway", "Battle of Okinawa", "Battle of Iwo Jima", "Battle of Singapore"],
    answer: "Battle of Midway"
  },
  {
    id: 15,
    question: "Who was the leader of the Soviet Union during World War II?",
    options: ["Vladimir Lenin", "Joseph Stalin", "Nikita Khrushchev", "Leon Trotsky"],
    answer: "Joseph Stalin"
  },
  {
    id: 16,
    question: "Which two cities were atomic bombs dropped on?",
    options: ["Hiroshima and Nagasaki", "Tokyo and Kyoto", "Osaka and Kobe", "Sapporo and Yokohama"],
    answer: "Hiroshima and Nagasaki"
  },
  {
    id: 17,
    question: "What was the German air force called during World War II?",
    options: ["Luftwaffe", "Wehrmacht", "Kriegsmarine", "Gestapo"],
    answer: "Luftwaffe"
  },
  {
    id: 18,
    question: "Which conference led to the formation of the United Nations?",
    options: ["Tehran Conference", "Yalta Conference", "Potsdam Conference", "San Francisco Conference"],
    answer: "San Francisco Conference"
  },
  {
    id: 19,
    question: "What was the primary role of the 'Enigma machine' in World War II?",
    options: ["Decoding Allied communications", "Encrypting German communications", "Guiding missiles", "Detecting submarines"],
    answer: "Encrypting German communications"
  },
  {
    id: 20,
    question: "Which battle was fought between British and German air forces?",
    options: ["Battle of Britain", "Battle of the Atlantic", "Battle of El Alamein", "Battle of Stalingrad"],
    answer: "Battle of Britain"
  },
  {
    id: 21,
    question: "Who was the U.S. President at the beginning of World War II?",
    options: ["Harry S. Truman", "Franklin D. Roosevelt", "Dwight D. Eisenhower", "Herbert Hoover"],
    answer: "Franklin D. Roosevelt"
  },
  {
    id: 22,
    question: "What was the significance of the 'Rosie the Riveter' campaign?",
    options: ["It encouraged men to enlist", "It promoted women's role in industrial work", "It was a propaganda tool against Axis powers", "It was a fashion campaign"],
    answer: "It promoted women's role in industrial work"
  },
  {
    id: 23,
    question: "Which event triggered the United States to enter World War II?",
    options: ["The Lend-Lease Act", "The invasion of Poland", "The Battle of Midway", "The attack on Pearl Harbor"],
    answer: "The attack on Pearl Harbor"
  },
  {
    id: 24,
    question: "What was the Japanese suicide strategy of 'kamikaze'?",
    options: ["Espionage", "Pilots crashing into enemy targets", "Night-time raids", "Undercover operations"],
    answer: "Pilots crashing into enemy targets"
  },
  {
    id: 25,
    question: "Which was a major part of the Nazi racial policy?",
    options: ["Lebensraum", "Blitzkrieg", "Kamikaze", "Vichy regime"],
    answer: "Lebensraum"
  },
  {
    id: 26,
    question: "What was the main contribution of the Tuskegee Airmen in WWII?",
    options: ["They were code talkers", "They served as the first African American aviator unit", "They developed radar technology", "They worked on the Manhattan Project"],
    answer: "They served as the first African American aviator unit"
  },
  {
    id: 27,
    question: "Which operation led to the recapture of Western Europe by Allied forces?",
    options: ["Operation Overlord", "Operation Torch", "Operation Barbarossa", "Operation Market Garden"],
    answer: "Operation Overlord"
  },
  {
    id: 28,
    question: "What was the 'Manhattan Project'?",
    options: ["A plan to liberate Manhattan", "The development of the atomic bomb", "A secret spy operation in New York", "An economic recovery plan"],
    answer: "The development of the atomic bomb"
  },
  {
    id: 29,
    question: "Which two countries signed the Molotov-Ribbentrop Pact in 1939?",
    options: ["Germany and Italy", "Germany and the Soviet Union", "Britain and France", "Japan and Italy"],
    answer: "Germany and the Soviet Union"
  },
  {
    id: 30,
    question: "Which country experienced a civil war just before World War II, which ended in 1939?",
    options: ["Spain", "France", "China", "Poland"],
    answer: "Spain"
  },
  {
    id: 31,
    question: "What was the code name for the Allied invasion of Southern France in August 1944?",
    options: ["Operation Dragoon", "Operation Overlord", "Operation Torch", "Operation Husky"],
    answer: "Operation Dragoon"
  },
  {
    id: 32,
    question: "What was the name of the major battle in December 1944 in the Ardennes region?",
    options: ["Battle of the Bulge", "Battle of Kursk", "Battle of Midway", "Battle of Moscow"],
    answer: "Battle of the Bulge"
  },
  {
    id: 33,
    question: "Who was the commander of the German Afrika Korps?",
    options: ["Erwin Rommel", "Heinz Guderian", "Gerd von Rundstedt", "Fedor von Bock"],
    answer: "Erwin Rommel"
  },
  {
    id: 34,
    question: "What was the first major action by the Western Allies in the Mediterranean theater?",
    options: ["Invasion of Sicily", "Battle of El Alamein", "Invasion of Italy", "Operation Torch"],
    answer: "Operation Torch"
  },
  {
    id: 35,
    question: "Which major battle marked the turning point on the Eastern Front in favor of the Soviet Union?",
    options: ["Battle of Stalingrad", "Battle of Kursk", "Siege of Leningrad", "Battle of Moscow"],
    answer: "Battle of Stalingrad"
  },
  {
    id: 36,
    question: "What was the main objective of the Doolittle Raid in 1942?",
    options: ["To destroy Japanese naval forces", "To bomb Tokyo and boost American morale", "To recapture the Philippines", "To test new bomber aircraft"],
    answer: "To bomb Tokyo and boost American morale"
  },
  {
    id: 37,
    question: "Who was the highest-ranking Nazi official to be tried at Nuremberg?",
    options: ["Hermann Göring", "Adolf Hitler", "Heinrich Himmler", "Joseph Goebbels"],
    answer: "Hermann Göring"
  },
  {
    id: 38,
    question: "What was the Bataan Death March?",
    options: ["A strategic retreat by Allied forces", "A forced march of American and Filipino prisoners of war", "A German tactic to encircle the enemy", "A Japanese training exercise"],
    answer: "A forced march of American and Filipino prisoners of war"
  },
  {
    id: 39,
    question: "Which event led to the declaration of war by Britain and France on Germany?",
    options: ["The invasion of Czechoslovakia", "The signing of the Non-Aggression Pact", "The invasion of Poland", "The annexation of Austria"],
    answer: "The invasion of Poland"
  },
  {
    id: 40,
    question: "Which project was responsible for breaking the Enigma code?",
    options: ["Manhattan Project", "Ultra Project", "Trinity Project", "Overlord Project"],
    answer: "Ultra Project"
  },
  {
    id: 41,
    question: "Where did the famous flag-raising photo take place during World War II?",
    options: ["Battle of Midway", "Iwo Jima", "Okinawa", "Pearl Harbor"],
    answer: "Iwo Jima"
  },
  {
    id: 42,
    question: "What was the primary goal of the Warsaw Uprising in 1944?",
    options: ["To liberate Warsaw from German occupation", "To resist the Soviet army", "To support the D-Day landings", "To overthrow the Polish government"],
    answer: "To liberate Warsaw from German occupation"
  },
  {
    id: 43,
    question: "What did the 'V' in 'V-Day' stand for?",
    options: ["Victory", "Valor", "Vengeance", "Vanquish"],
    answer: "Victory"
  },
  {
    id: 44,
    question: "What was the nickname for the British fighter plane, the Supermarine Spitfire?",
    options: ["The Flying Fortress", "The Warhawk", "The Eagle", "The Bulldog"],
    answer: "The Bulldog"
  },
  {
    id: 45,
    question: "Who were the 'Big Three' leaders of the Allied powers?",
    options: ["Churchill, Roosevelt, and Stalin", "Churchill, de Gaulle, and Roosevelt", "Hitler, Mussolini, and Hirohito", "Roosevelt, Eisenhower, and MacArthur"],
    answer: "Churchill, Roosevelt, and Stalin"
  },
  {
    id: 46,
    question: "Which conference decided the partitioning of post-war Germany?",
    options: ["Yalta Conference", "Potsdam Conference", "Tehran Conference", "Casablanca Conference"],
    answer: "Potsdam Conference"
  },
  {
    id: 47,
    question: "What was the main type of naval vessel used in the Pacific theater for launching aircraft?",
    options: ["Battleship", "Submarine", "Destroyer", "Aircraft Carrier"],
    answer: "Aircraft Carrier"
  },
  {
    id: 48,
    question: "Which of the following was a major part of the Italian Campaign?",
    options: ["Battle of Monte Cassino", "Battle of the Bulge", "Operation Market Garden", "Battle of Kursk"],
    answer: "Battle of Monte Cassino"
  },
  {
    id: 49,
    question: "What was the German air force called?",
    options: ["Luftwaffe", "Wehrmacht", "Heer", "Kriegsmarine"],
    answer: "Luftwaffe"
  },
  {
    id: 50,
    question: "Which of these ships was sunk by a kamikaze attack?",
    options: ["USS Arizona", "HMS Prince of Wales", "USS Missouri", "USS Indianapolis"],
    answer: "USS Arizona"
  }

];

startQuizButton.addEventListener('click', function() {
  const username = usernameInput.value.trim();
  
  if (username.length === 0) {
    alert('Please enter your name to start the quiz.');
    return;
  }
  // Salvare de username pentru un posibil Leaderboard pe viitor
  localStorage.setItem('quizUsername', username);
  
  // Trecerea de la name input screen la quiz screen
  startContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  displayQuestion();
});

// functie pentru algoritmul Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // generam un index random
      [array[i], array[j]] = [array[j], array[i]]; // schimbam elementele intre ele la indexii i si j
    }
  }
  
  
  // inainte de quiz dam un shuffle array-ului de obiecte tip intrebari
  shuffleArray(questions);

function displayQuestion() {
  // daca au fost toate intrebarile luate, aratam scorul final
  if (questionsAsked >= questions.length) {
    showResults();
    return;
  }

  submitButton.disabled = true;
  currentQuestion = questions[currentQuestionIndex];

  shuffleArray(currentQuestion.options);//dam shuffle si la ordinea optiunilor in interiorul intrebarilor

  questionElement.textContent = `${questionsAsked + 1}. ${currentQuestion.question}`;
  optionsElement.innerHTML = '';
  currentQuestion.options.forEach(function(option, index) {
    const optionElement = document.createElement('li');
    optionElement.textContent = option;
    optionElement.id = 'option-' + index; // Prefixing id to ensure it is unique
    optionElement.addEventListener('click', selectOption);
    optionsElement.appendChild(optionElement);
  });
  questionsAsked++; // incrementam variabile de intrebari puse
}

function selectOption(event) {
  // un flag pentru a nu putea schimba rezultatul dupa ce se da submit
  if (answerSubmitted) {
    return;
  }
  
  if (selectedOption) {
    selectedOption.classList.remove('selected');
  }
  selectedOption = event.target;
  selectedOption.classList.add('selected');
  submitButton.disabled = false;
}

function checkAnswer() {
  let correctOption;
  document.querySelectorAll('#options li').forEach((li) => {
    if (li.textContent === currentQuestion.answer) {
      correctOption = li;
      li.classList.add('correct'); // Highlight correct answer
    }
    if (li === selectedOption && selectedOption.textContent !== currentQuestion.answer) {
      li.classList.add('incorrect'); // Highlight incorrect answer
    }
  });

  if (selectedOption.textContent === currentQuestion.answer) {
    score++;
  }
  scoreElement.textContent = `Your score: ${score}`;

  submitButton.disabled = true; // scoatem din functiune butonul de submit dupa ce se raspunde
  nextButton.disabled = false; // punem in functiune butonul de next dupa ce se raspunde
  answerSubmitted = true; //punem flagul de submit pe true
}

function nextQuestion() { 
  // punem flagul de submit pe false
  answerSubmitted = false;
  // stergem optiunile selectate la intrebarea anterioara
  document.querySelectorAll('#options li').forEach((li) => {
    li.classList.remove('correct', 'incorrect');
  });


  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    showResults();
  }
  nextButton.disabled = true; // scoatem din functiune butonul de next pana nu se raspunde

}

function showResults() {
    questionElement.textContent = 'Quiz Completed! Refresh Page To Try Again!';
    optionsElement.innerHTML = '';
    submitButton.style.display = 'none';
    nextButton.style.display='none'
    scoreElement.textContent = `Your final score: ${score}`;
}

submitButton.addEventListener('click', checkAnswer);

nextButton.addEventListener('click', nextQuestion);


document.addEventListener('DOMContentLoaded', function() {
  const savedUsername = localStorage.getItem('quizUsername');
  if (savedUsername) {
    usernameInput.value = savedUsername;
  }
  quizContainer.style.display = 'none';
});