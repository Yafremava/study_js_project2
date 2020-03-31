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
export default valid;