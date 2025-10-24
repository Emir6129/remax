const questions = [
  {question:"Bir ev satın alırken müşterilerin en çok dikkat ettiği şey nedir?",
    answers:[
      {text:"fiyat",points:8},{text:"konum",points:6},{text:"metrekare",points:3},{text:"oda sayısı",points:2},{text:"bina yaşı",points:1}
    ]},
  {question:"Bir evi daha hızlı satmak için ne yapılabilir?",
    answers:[
      {text:"fiyat düşürmek",points:8},{text:"temizlik",points:6},{text:"fotoğraf",points:3},{text:"dekorasyon",points:2},{text:"pazarlama",points:1}
    ]},
  {question:"Bir müşteri emlak ofisine geldiğinde ilk sorduğu şey nedir?",
    answers:[
      {text:"fiyat",points:8},{text:"konum",points:6},{text:"kredi",points:3},{text:"daire tipi",points:2},{text:"arsa",points:1}
    ]},
  {question:"Bir gayrimenkul danışmanında olması gereken özellik nedir?",
    answers:[
      {text:"iletişim",points:8},{text:"güven",points:6},{text:"sabır",points:3},{text:"dürüstlük",points:2},{text:"ikna",points:1}
    ]},
  {question:"Müşteriler ev gezerken en çok neye bakar?",
    answers:[
      {text:"mutfak",points:8},{text:"banyo",points:6},{text:"manzara",points:3},{text:"balkon",points:2},{text:"ışık",points:1}
    ]}
];

let currentQuestionIndex=0,revealedAnswers=[],score=0,lives=4;
const questionElement=document.getElementById("question");
const answersContainer=document.getElementById("answers");
const input=document.getElementById("guessInput");
const button=document.getElementById("submitBtn");
const message=document.getElementById("message");
const scoreDisplay=document.getElementById("score");
const livesDisplay=document.getElementById("lives");
const quizContainer=document.getElementById("quizContainer");
const endScreen=document.getElementById("endScreen");
const finalScore=document.getElementById("finalScore");
const startBtn=document.getElementById("startBtn");
const playerInfoEl=document.getElementById("playerInfo");
const playerOfficeEl=document.getElementById("playerOffice");

// Kayıt kontrolü
const name=localStorage.getItem("remax_kayit_fullname");
const office=localStorage.getItem("remax_kayit_office");
if(!name||!office){
  window.location.href="kayıt-ol.html";
}else{
  playerInfoEl.textContent=name;
  playerOfficeEl.textContent=office;
}

function loadQuestion(){
  const q=questions[currentQuestionIndex];
  questionElement.textContent=q.question;
  answersContainer.innerHTML="";
  revealedAnswers=Array(q.answers.length).fill(false);
  lives=4;
  livesDisplay.textContent=lives;
  q.answers.forEach(()=>{const div=document.createElement("div");div.className="answer-box";div.textContent="?????";answersContainer.appendChild(div);});
  message.textContent="";input.value="";
}

function checkAnswer(){
  const guess=input.value.trim().toLowerCase();
  if(!guess)return;
  const q=questions[currentQuestionIndex];
  let found=false;
  q.answers.forEach((ans,i)=>{
    if(ans.text.toLowerCase()===guess&&!revealedAnswers[i]){
      revealedAnswers[i]=true;
      const box=answersContainer.children[i];
      box.textContent=`${ans.text.toUpperCase()} (+${ans.points})`;
      box.classList.add("revealed");
      found=true;score+=ans.points;scoreDisplay.textContent=score;
    }
  });
  if(found){message.textContent="✅ Doğru!";}
  else {
  lives--;
  if (lives < 0) lives = 0; // ❗ Hak 0’ın altına düşmesin
  livesDisplay.textContent = lives;
  message.textContent = `❌ Yanlış (${lives} hak kaldı)`;
}

input.value = "";

// ❗ 0 olunca artık yeni tahmin kabul etme, hemen sonraki soruya geç
if (revealedAnswers.every(a => a)) {
  nextButton();
} else if (lives === 0) {
  revealRemaining();
  nextButton();
}

}
function revealRemaining(){const q=questions[currentQuestionIndex];q.answers.forEach((ans,i)=>{if(!revealedAnswers[i]){const box=answersContainer.children[i];box.textContent=`${ans.text.toUpperCase()} (+${ans.points})`;box.classList.add("revealed");}});}
function nextButton(){message.innerHTML+="<br><button id='nextQ' class='btn-primary' style='width:auto;margin-top:8px'>Sonraki Soru</button>";document.getElementById("nextQ").onclick=nextQuestion;}
function nextQuestion(){currentQuestionIndex++;if(currentQuestionIndex<questions.length)loadQuestion();else endGame();}
function endGame(){quizContainer.style.display="none";endScreen.style.display="block";finalScore.textContent=`Toplam Puanın: ${score}`;}

button.addEventListener("click",checkAnswer);
input.addEventListener("keypress",e=>{if(e.key==="Enter")checkAnswer();});
startBtn.addEventListener("click",()=>{quizContainer.style.display="block";loadQuestion();});
