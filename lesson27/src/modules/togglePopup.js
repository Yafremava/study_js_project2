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
export default togglePopup;