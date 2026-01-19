const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');
const currentSlideElement = document.getElementById('currentSlide');
const totalSlidesElement = document.getElementById('totalSlides');
const autoplayBtn = document.getElementById('autoplayBtn');
const pauseBtn = document.getElementById('pauseBtn');

let currentSlide = 0;
let autoplayInterval;
let isAutoplay = false;

// Initialize
function init() {
    totalSlidesElement.textContent = slides.length;
    createDots();
    updateSlider();
}

// Create dots
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

// Update slider
function updateSlider() {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to current slide
    slides[currentSlide].classList.add('active');
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update counter
    currentSlideElement.textContent = currentSlide + 1;
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// Start autoplay
function startAutoplay() {
    isAutoplay = true;
    autoplayBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
    
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 3000);
}

// Stop autoplay
function stopAutoplay() {
    isAutoplay = false;
    pauseBtn.style.display = 'none';
    autoplayBtn.style.display = 'inline-flex';
    clearInterval(autoplayInterval);
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    if (isAutoplay) {
        stopAutoplay();
        startAutoplay();
    }
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    if (isAutoplay) {
        stopAutoplay();
        startAutoplay();
    }
});

autoplayBtn.addEventListener('click', startAutoplay);
pauseBtn.addEventListener('click', stopAutoplay);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Initialize slider
init();
