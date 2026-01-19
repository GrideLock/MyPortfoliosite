let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function updateDisplay() {
    hoursDisplay.textContent = hours.toString().padStart(2, '0');
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
        
        timer = setInterval(() => {
            seconds++;
            
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 1;
    
    updateDisplay();
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    
    lapsList.innerHTML = '';
}

function addLap() {
    if (isRunning) {
        const lapTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span>Lap ${lapCounter}</span>
            <span>${lapTime}</span>
        `;
        
        lapsList.insertBefore(lapItem, lapsList.firstChild);
        lapCounter++;
    }
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

// Initialize display
updateDisplay();
