const colorCode = document.getElementById('colorCode');
const colorPreview = document.getElementById('colorPreview');
const randomBtn = document.getElementById('randomBtn');
const gradientBtn = document.getElementById('gradientBtn');
const copyBtn = document.getElementById('copyBtn');
const clearHistory = document.getElementById('clearHistory');
const historyContainer = document.getElementById('historyContainer');
const notification = document.getElementById('notification');
const presetColors = document.querySelectorAll('.preset-color');

let colorHistory = JSON.parse(localStorage.getItem('colorHistory')) || [];
let currentColor = '#0f0f0f';
let isGradient = false;

// Generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Generate random gradient
function getRandomGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

// Apply color to background
function applyColor(color, gradient = false) {
    document.body.style.background = color;
    colorPreview.style.background = color;
    
    if (gradient) {
        isGradient = true;
        colorCode.textContent = 'Gradient';
        currentColor = color;
    } else {
        isGradient = false;
        colorCode.textContent = color;
        currentColor = color;
    }
    
    addToHistory(color);
}

// Add color to history
function addToHistory(color) {
    if (!colorHistory.includes(color)) {
        colorHistory.unshift(color);
        if (colorHistory.length > 12) {
            colorHistory.pop();
        }
        localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
        displayHistory();
    }
}

// Display color history
function displayHistory() {
    historyContainer.innerHTML = '';
    colorHistory.forEach(color => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.style.background = color;
        historyItem.setAttribute('data-color', color.includes('gradient') ? 'Gradient' : color);
        historyItem.addEventListener('click', () => {
            applyColor(color, color.includes('gradient'));
        });
        historyContainer.appendChild(historyItem);
    });
}

// Copy color to clipboard
function copyColor() {
    const textToCopy = isGradient ? currentColor : colorCode.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification();
    });
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Clear history
function clearColorHistory() {
    colorHistory = [];
    localStorage.removeItem('colorHistory');
    displayHistory();
}

// Event Listeners
randomBtn.addEventListener('click', () => {
    const color = getRandomColor();
    applyColor(color);
});

gradientBtn.addEventListener('click', () => {
    const gradient = getRandomGradient();
    applyColor(gradient, true);
});

copyBtn.addEventListener('click', copyColor);

clearHistory.addEventListener('click', clearColorHistory);

presetColors.forEach(preset => {
    preset.addEventListener('click', () => {
        const color = preset.getAttribute('data-color');
        applyColor(color);
    });
});

// Initialize
displayHistory();
colorPreview.style.background = currentColor;
