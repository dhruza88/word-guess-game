var timeEl = document.querySelector(“.time”);
var mainEl = document.getElementById(“main”);
var textAreaEl = document.querySelector(‘#textarea’)
var secondsLeft = 10;
mainEl.addEventListener(‘click’, function(event) {
    event.preventDefault();
    setTime();
})
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + ” seconds left to guess!“;
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage(“Time’s Up!“);
      }
    }, 1000);
  }
  function sendMessage() {
    alert(“Bummer!“);
  };                   