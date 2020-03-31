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
export default ourCommand;