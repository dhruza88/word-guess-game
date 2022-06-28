//TODO: can reset scores with reset btn

var startBtn = document.querySelector("#startGame");
var wordDisplay = document.querySelector("#wordDisplay");
var timeLeftSpan = document.querySelector("#timeLeftSpan");
var lossSpan = document.querySelector("#lossSpan");
var winSpan = document.querySelector("#winSpan");
var winSpan = document.querySelector("#winSpan");
var resetBtn = document.querySelector("#resetScore");

var words = ["manatees","gorgonzola","syzygy","lynx","cardboard","table","basketball"]
var randomWord="";
var numLetters = 0;
var userGuesses=[];
var wins =localStorage.getItem("savedWins")||0;
winSpan.textContent=wins;
var losses=localStorage.getItem("savedLosses")||0;
lossSpan.textContent=losses;
var timeLeft=10;
var timer;
var isPlaying = false;
// Start game when cilck start button
startBtn.addEventListener("click",function(){
    //EDGECASE: user clicks start while game is running
    //randomly choose a word
    if(isPlaying){
        return;
    }
    randomWord = words[Math.floor(Math.random()*words.length)]
    //figure out how many letters are in the word
    numLetters = randomWord.length;
    // add one "_" to page for each letter
    userGuesses=[];
    for (let i = 0; i < numLetters; i++) {
       userGuesses.push("_")
    }
    console.log(randomWord,numLetters,userGuesses);
    wordDisplay.textContent= userGuesses.join(" ");
    timeLeft=10;
    isPlaying=true;
    timer = setInterval(function(){
        timeLeft--;
        timeLeftSpan.textContent=timeLeft
        if(!timeLeft){
            // if time runs out, lose
            console.log("you lose")
            losses++;
            lossSpan.textContent=losses;
            //save scores to ls
            localStorage.setItem("savedLosses",losses);
            clearInterval(timer);
            isPlaying = false;
        }
    },1000)
})
// listen for keystrokes
document.addEventListener("keyup",function(event){
    if(!isPlaying){
        return;
    }
    // edge case: user pushes keys before game starts
    console.log(event.key);
    if(randomWord.includes(event.key)){
        // if key is in word, switch _ to the letter
        for (let i = 0; i < randomWord.length; i++) {
            if(event.key===randomWord[i]){
                userGuesses[i]=event.key
            }
        }
        console.log(userGuesses)
        //win condtion
        if(userGuesses.join("")===randomWord){
            console.log("winner!")
            clearInterval(timer);
            wins++;
            winSpan.textContent=wins;
            //save scores to ls
            localStorage.setItem("savedWins",wins)
            isPlaying = false;
        }
        wordDisplay.textContent= userGuesses.join(" ");
    } else {
        console.log("not in word")
    }
})

resetBtn.addEventListener("click",function(){
    wins=0;
    losses=0;
    localStorage.setItem("savedWins",0);
    localStorage.setItem("savedLosses",0);
    winSpan.textContent=0;
    lossSpan.textContent=0;
})