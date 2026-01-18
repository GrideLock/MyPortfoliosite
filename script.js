const lightMode = document.getElementById('sun-light');
const darkMode = document.getElementById('dark-moon');

const theme = localStorage.getItem('theme');
if(theme){
    document.body.classList.toggle('dark-mode-switch');
}

lightMode.addEventListener('click', changeMode);
darkMode.addEventListener('click', changeMode);

function changeMode(){
    document.body.classList.toggle('dark-mode-switch');
    if(document.body.classList.contains('dark-mode-switch')){
        localStorage.setItem('theme', 'dark-mode-switch');
    }else{
        localStorage.removeItem('theme');
    }
}