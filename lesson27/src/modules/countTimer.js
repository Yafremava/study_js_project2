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
export default countTimer;