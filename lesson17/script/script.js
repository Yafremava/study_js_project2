window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  //Timer
  function countTimer(dedline){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
      let dateStop = new Date(dedline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining  % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24,
        day = Math.floor(timeRemaining / 60 / 60 / 24);
        
        return{timeRemaining, hours, minutes, seconds};
        
    }
    function updateClock(){
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      if(timer.hours < 0 || timer.minutes < 0 || timer.seconds < 0){
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
      if(timer.hours < 10){
        timerHours.textContent = "0" + timer.hours;
      }
      if(timer.minutes < 10){
        timerMinutes.textContent = "0" + timer.minutes;
      }
      if(timer.seconds < 10){
        timerSeconds.textContent = "0" + timer.seconds;
      }
      if(timer.timeRemaining > 0){
        let id = setInterval(updateClock, 1000);
        setTimeout(() => { clearInterval(id);}, 1000);
      }
      
    }
    updateClock();
  }
  
  countTimer('1 july 2020');
});