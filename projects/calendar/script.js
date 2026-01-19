const monthYearElement = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const todayBtn = document.getElementById('todayBtn');
const selectedDateElement = document.getElementById('selectedDate');
const currentDayElement = document.getElementById('currentDay');
const weekNumberElement = document.getElementById('weekNumber');
const daysInMonthElement = document.getElementById('daysInMonth');

let currentDate = new Date();
let selectedDate = null;

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Set month and year
    monthYearElement.textContent = `${months[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    // Update days in month info
    daysInMonthElement.textContent = daysInMonth;
    
    // Clear calendar
    calendarDays.innerHTML = '';
    
    // Add previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'day inactive';
        day.textContent = prevMonthDays - i;
        calendarDays.appendChild(day);
    }
    
    // Add current month's days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        
        // Check if today
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            day.classList.add('today');
        }
        
        // Check if selected
        if (
            selectedDate &&
            i === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear()
        ) {
            day.classList.add('selected');
        }
        
        day.addEventListener('click', () => selectDate(new Date(year, month, i)));
        calendarDays.appendChild(day);
    }
    
    // Add next month's days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'day inactive';
        day.textContent = i;
        calendarDays.appendChild(day);
    }
    
    updateInfo();
}

// Select date
function selectDate(date) {
    selectedDate = date;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    selectedDateElement.textContent = date.toLocaleDateString('en-US', options);
    renderCalendar();
}

// Update info
function updateInfo() {
    const today = new Date();
    currentDayElement.textContent = weekdays[today.getDay()];
    
    // Calculate week number
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    weekNumberElement.textContent = weekNumber;
}

// Previous month
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// Next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Go to today
function goToToday() {
    currentDate = new Date();
    selectedDate = new Date();
    selectDate(selectedDate);
}

// Event Listeners
prevMonthBtn.addEventListener('click', prevMonth);
nextMonthBtn.addEventListener('click', nextMonth);
todayBtn.addEventListener('click', goToToday);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevMonth();
    } else if (e.key === 'ArrowRight') {
        nextMonth();
    }
});

// Initialize
renderCalendar();
