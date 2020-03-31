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
export default toggleMenu;