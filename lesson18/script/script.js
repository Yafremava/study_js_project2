window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  //Timer
  const countTimer = (dedline) => {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      let dateStop = new Date(dedline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining  % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24,
        day = Math.floor(timeRemaining / 60 / 60 / 24);
        
        return{timeRemaining, hours, minutes, seconds};
        
    };
    const updateClock = () => {
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      const timeCorrekt = (time) =>{
        if(time < 10){
          time = '0' + time;
        }
        return time;
      };
      timerHours.textContent = timeCorrekt(timer.hours);
      timerMinutes.textContent = timeCorrekt(timer.minutes);
      timerSeconds.textContent = timeCorrekt(timer.seconds);
      if(timer.timeRemaining < 0){
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(intervalId);
      }
    };
    updateClock();
    let intervalId = setInterval(updateClock, 1000);
  };
  countTimer('1 july 2020');
  //Menu
  const toggleMenu = () =>{
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');
    const handlerMemu = () =>{
      menu.classList.toggle('active-menu');
     /*  if(!menu.style.transform || menu.style.transform === `translate(-100%)`){
        menu.style.transform = `translate(0)`;
      }else {
        menu.style.transform =`translate(-100%)`;
      }  */
    };
    btnMenu.addEventListener('click', handlerMemu);
    closeBtn.addEventListener('click', handlerMemu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMemu));
    /* for(let i = 0; i < menuItems.length; i++){
      menuItems[i].addEventListener('click', handlerMemu);
    } */
    

  };
  toggleMenu();
  //popup
  const togglePopup = ()  =>{
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content');
    let count = 0,
      flyInterval;
    const popupAnimate = () =>{
      flyInterval = requestAnimationFrame(popupAnimate);
      count++;
      if(count < 35){
        popupContent.style.top = count*5 + 'px';
       
      }
      if(count < 110){
        
        popupContent.style.left = count*5 + 'px';
      }
      console.log('test');
    };
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => { 
        popup.style.display = 'block';
        if(window.innerWidth < 768){
          flyInterval = cancelAnimationFrame(popupAnimate);
        }else {
          flyInterval = requestAnimationFrame(popupAnimate);
         
          count = 0;
          
        }
           
      });
    });
    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
      cancelAnimationFrame(flyInterval);
    });
  };
  togglePopup();
});