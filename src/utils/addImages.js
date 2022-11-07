
const addImages =  (button, input, preview) =>{
    const  avatarButton = document.getElementById(button);
    const avatarInput= document.getElementById(input);
    const avatarpreview= document.getElementById(preview);
  
    avatarButton.addEventListener('click', function (e) {
      avatarpreview.innerHTML = ''
      avatarInput.click();
  
      });
  
      avatarInput.addEventListener('change', function (e) {
        for (let i = 0; i < e.length; i++) {
          
          if (e.target.files.length) {
            const img = document.createElement("img");
            img.classList.add("obj");
            
            img.src =  URL.createObjectURL(e.target.files[0]);;
            avatarpreview.innerHTML = img;
          }
        }
      });
      
  }

export default addImages;