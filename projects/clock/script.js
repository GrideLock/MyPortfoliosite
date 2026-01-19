let is24HourFormat = false;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const periodDisplay = document.getElementById('period');
const dateDisplay = document.getElementById('date');
const timezoneDisplay = document.getElementById('timezone');
const formatBtn = document.getElementById('formatBtn');

function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    let period = '';
    
    if (!is24HourFormat) {
        period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        periodDisplay.style.display = 'inline-block';
        periodDisplay.textContent = period;
    } else {
        periodDisplay.style.display = 'none';
    }
    
    hoursDisplay.textContent = hours.toString().padStart(2, '0');
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update date
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    
    // Update timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneDisplay.textContent = timezone;
}

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    
    if (is24HourFormat) {
        formatBtn.innerHTML = '<i class="bx bx-time"></i> Switch to 12-Hour Format';
    } else {
        formatBtn.innerHTML = '<i class="bx bx-time"></i> Switch to 24-Hour Format';
    }
    
    updateClock();
}

// Event Listener
formatBtn.addEventListener('click', toggleFormat);

// Update clock every second
setInterval(updateClock, 1000);

// Initial call
updateClock();
