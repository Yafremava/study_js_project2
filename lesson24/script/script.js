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
      menu = document.querySelector('menu');
    btnMenu.addEventListener('click', () => {
      menu.classList.toggle('active-menu');
    });
    menu.addEventListener('click', (event) => {
      let target = event.target;
      if(target.classList.contains('close-btn')){
        menu.classList.toggle('active-menu');
      } else {
        target = target.closest('ul>li');
        if(target){
          menu.classList.toggle('active-menu');
        } 
      }   
    }); 
  };
  toggleMenu();
  //popup
  const togglePopup = ()  =>{
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
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
      if(count > 110){
        cancelAnimationFrame(flyInterval);
        count = 0;
      }
    };  
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => { 
        popup.style.display = 'block';
        if(window.innerWidth < 768){
          cancelAnimationFrame(flyInterval);
        }else {
          popupAnimate();
        }         
      }); 
    });
    popup.addEventListener('click', () =>{
      let target = event.target;
      if(target.classList.contains('popup-close')){
        popup.style.display = 'none';
        cancelAnimationFrame(flyInterval);
      } else{
        target = target.closest('.popup-content');
        if(!target){
          popup.style.display = 'none';
          cancelAnimationFrame(flyInterval);
        }  
      }
    });
    
  };
  togglePopup();
  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent =document.querySelectorAll('.service-tab');
    const toggleTabContent =(index) => {
      for(let i = 0; i < tabContent.length; i++){
        if(index === i){
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else{
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      
        target = target.closest('.service-header-tab');
        
        if(target){
          tab.forEach((item, i) => {
            if(item === target){
              toggleTabContent(i);
            }
          });
          
        }         
    }); 
  };
  tabs();
  //Slider
  const slider = () =>{
    const slide = document.querySelectorAll('.portfolio-item'), 
    slider = document.querySelector('.portfolio-content');

    const addDots = () => {
      let ul = document.querySelector('.portfolio-dots');
      for(let i = 0; i < slide.length; i++){
        let newLi = document.createElement('li');
        newLi.className = 'dot';
        ul.append(newLi);
        if(i === 0) {
          newLi.classList.add('dot-active');
        }
      }
    };
    addDots();


    let dot = document.querySelectorAll('.dot'),
      btn = document.querySelectorAll('.portfolio-btn');
    let currentSlide = 0,
      interval;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () =>{
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };
    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      if(!target.matches('#arrow-right, #arrow-left, .dot')){  // !!!!!
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')){
        currentSlide++;
      }else if (target.matches('#arrow-left')){
        currentSlide--;
      } else if(target.matches('.dot')){
        dot.forEach((elem, index) => {
          if(elem === target){
            currentSlide = index;
          }
        });
      }
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      if(currentSlide < 0){
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });
    slider.addEventListener('mouseover',(event) =>{
      if(event.target.matches('.portfolio-btn') || 
      event.target.matches('.dot')){
        stopSlide();
      }
    });
    slider.addEventListener('mouseout',(event) =>{
      if(event.target.matches('.portfolio-btn') || 
      event.target.matches('.dot')){
        startSlide();
      }
    });
    
    
    startSlide(2000);
  };
  slider();
  //Command
  const ourCommand = () =>{
    const commandFotos = document.querySelectorAll('.command__photo');
    commandFotos.forEach((elem) => {
      elem.addEventListener('mouseenter', () => {
        event.target.alt = event.target.src;
        event.target.src = event.target.dataset.img;
      });
      elem.addEventListener('mouseleave', () => {
        event.target.src = event.target.alt;
      });
    }); 
  };
  ourCommand();
  //калькулятор
  const calc = (price = 100) =>{
    const calcInputs = document.querySelectorAll('input.calc-item'),
      calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');
    console.log(calcInputs);
    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;
      
      if(calcCount.value > 1){
        countValue += (calcCount.value - 1)/ 10;
      }
      
      if(calcDay.value && calcDay.value < 5){
        dayValue *= 2;
      }else if(calcDay.value && calcDay.value < 10){
        dayValue *= 1.5;
      }

      if(typeValue && squareValue){
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      totalValue.textContent = total;
    };  
    calcBlock.addEventListener('change',(event) => {
      const target = event.target;
      if(target === calcType || target === calcSquare ||
      target === calcCount || target === calcDay){
        countSum();
      }
    });
    calcInputs.forEach((elem) => {
      elem.addEventListener('input', () =>{
        elem.value = elem.value.replace (/\D/g, '');
      });
    });
  };
  calc(100);
  //send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const forms = document.querySelectorAll('form[name = user_form]');


    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';
    forms.forEach((item) => {
      item.addEventListener('submit', (event)=>{
        event.preventDefault();
        item.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(item);
        let body = {};
  
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postData(body, () => {
          statusMessage.textContent = successMessage;
          
        }, (error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
      });
    });
    
   /*  form2.addEventListener('submit', () =>{
      event.preventDefault();
      form2.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form2);
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body, () => {
        statusMessage.textContent = successMessage;
      }, (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
    });
    form3.addEventListener('submit', () =>{
      event.preventDefault();
      form3.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form3);
      let body = {};
      for(let val of formData.entries()){
        body[val[0]] = val[1];
      } 
      postData(body, () => {
        statusMessage.textContent = successMessage;
      }, (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
    }); */
    const postData = (body, outputData, errorData) =>{
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () =>{
        
        if(request.readyState !== 4){
          return;
        }

        if(request.status === 200){
          outputData();
        }else {
          errorData(request.status); 
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-type', 'application/json'); 

      request.send(JSON.stringify(body));
      reset();
      
    };
  };
  sendForm();
  //reset
  const reset = () =>{
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach((elem) => {
      elem.value = '';
    });
  };
  //валидация
  const valid = () =>{
    const formInputs = document.querySelectorAll('form input');
      
      formInputs.forEach((item) =>{
        item.addEventListener('input', () => {
          let target = event.target;
          let targetAttr = target.getAttribute('name');
          if(targetAttr === 'user_phone'){
            target.value = target.value.replace (/[^\+\d]/g, '');
          } else if (targetAttr === 'user_name' || targetAttr === 'user_message'){
            target.value = target.value.replace (/[^а-яё\s]/ig, '');
          }
        });
      });
  };
  valid();
});