// Dark Mode Toggle
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

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const menuIcon = document.querySelector('.menu-toggle i');

if(menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navbar.classList.toggle('active');
        
        // Change icon from menu to close
        if(navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-menu');
            menuIcon.classList.add('bx-x');
        } else {
            menuIcon.classList.remove('bx-x');
            menuIcon.classList.add('bx-menu');
        }
    });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.navbar ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 991) {
            navbar.classList.remove('active');
            if(menuIcon) {
                menuIcon.classList.remove('bx-x');
                menuIcon.classList.add('bx-menu');
            }
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if(!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        if(navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if(menuIcon) {
                menuIcon.classList.remove('bx-x');
                menuIcon.classList.add('bx-menu');
            }
        }
    }
});
