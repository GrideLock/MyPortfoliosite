const themeToggle = document.getElementById('themeToggle');
const themeStatus = document.getElementById('themeStatus');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply the saved theme on page load
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.checked = true;
    themeStatus.textContent = 'Dark';
} else {
    themeStatus.textContent = 'Light';
}

// Toggle theme function
function toggleTheme() {
    if (themeToggle.checked) {
        document.body.classList.add('dark-theme');
        themeStatus.textContent = 'Dark';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        themeStatus.textContent = 'Light';
        localStorage.setItem('theme', 'light');
    }
}

// Event listener
themeToggle.addEventListener('change', toggleTheme);
