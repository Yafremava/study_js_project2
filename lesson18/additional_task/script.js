window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  function countTimer(dedline){
    let timeOfDay = document.querySelector('.time_of_day'),
      currentTime = document.querySelector('.current_time'),
      newYear = document.querySelector('.new_year');
    function getTimeRemaining(){
      let dateStop = new Date(dedline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        day = Math.floor(timeRemaining / 60 / 60 / 24);
      let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
        if (hours >= 5 && hours < 12){
          timeOfDay.textContent = "Доброе утро";
        }else if (hours >= 12 && hours < 18){
          timeOfDay.textContent = "Добрый день";
        }else if (hours >= 18 && hours < 0){
          timeOfDay.textContent = "Добрый вечер";
        }else if (hours >= 0 && hours < 5){
          timeOfDay.textContent = "Доброй ночи";
        }
        return{timeRemaining, day, hours, minutes, seconds};
      
    }
    function updateClock(){
      let timer = getTimeRemaining();   
      currentTime.textContent = "Текущее время: " + timer.hours + ':' + timer.minutes + ':' + timer.seconds;
      newYear.textContent = 'До нового года осталось: ' + timer.day +  " дней"; 
         
      if(timer.timeRemaining > 0){
        let id = setInterval(updateClock, 1000);
        setTimeout(() => { clearInterval(id);}, 1000);
      }   
    }
    updateClock();
  }
  countTimer('31 december 2020');
  let date = new Date(),
    theWeek = new Array(7);
    theWeek [0]="Воскресенье";
    theWeek [1]="Понедельник";
    theWeek [2]="Вторник";
    theWeek [3]="Среда";
    theWeek [4]="Четверг";
    theWeek [5]="Пятница";
    theWeek [6]="Суббота";
    document.querySelector('.day_of_the_week').textContent = "Сегодня: " + theWeek[date.getDay()];
  
});



 