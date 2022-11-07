
import imageAvatar from '../assets/images/default/438x438.jpg'

const addAvatar =  (button, input, img) =>{
    const  avatarButton = document.getElementById(button);
    const avatarInput= document.getElementById(input);
    const avatarImg = document.getElementById(img);
  
      avatarButton.addEventListener('click', function (e) {
        avatarImg.src = imageAvatar;
        avatarInput.click();
  
      });

      avatarImg.addEventListener('click', function (e) {
        avatarImg.src = imageAvatar;
        avatarInput.click();
    
      });
  
      avatarInput.addEventListener('change', function (e) {
       
        if (e.target.files.length) {
          avatarImg.src = URL.createObjectURL(e.target.files[0]);
        }
      });
      
  }

export default addAvatar;