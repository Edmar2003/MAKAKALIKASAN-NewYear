
const welcomeModal = document.getElementById('welcome-modal');
const mainContent = document.getElementById('main-content');
const lastnameInput = document.getElementById('lastname-input');
const enterBtn = document.getElementById('enter-btn');
const welcomeMessage = document.getElementById('welcome-message');
const daysCounter = document.getElementById('days');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const journeyBg = document.getElementById('journey-bg');
const journeyPrevBtn = document.querySelector('.prev-btn');
const journeyNextBtn = document.querySelector('.next-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const studentCards = document.querySelectorAll('.student-card');
const galleryItems = document.querySelectorAll('.gallery-item');
const imageViewer = document.getElementById('image-viewer');
const closeViewer = document.querySelector('.close-viewer');
const fullscreenImage = document.getElementById('fullscreen-image');
const prevImageBtn = document.querySelector('.prev-image-btn');
const nextImageBtn = document.querySelector('.next-image-btn');
const newYearAnimation = document.getElementById('newyear-animation');


const students = {
    boys: [
        'BELICARIO', 'CUNTAPAY', 'DE GUZMAN', 'GAGATAM', 'LAREDA', 'NAGA', 'NAKILA', 
        'PICARDAL', 'SALVE', 'SENARILLOS', 'SEVILLA', 'SIERVO', 'TAGABI', 
        'TAMAYOSA', 'VILLARIN'
    ],
    girls: [
        'AKMAD', 'ARRIESGADO', 'BALUYOT', 'CARANTO', 'DAPAT', 'DE ASA', 
        'DEL ROSARIO', 'FRANCISCO', 'GARIANDO', 'HERMO', 
        'JUNIO', 'LAMBANA', 'LASQUITE', 'MALLARI', 'MARCIANO', 'MIMBALA', 
        'NAVARRO', 'OCAMPO', 'OMANDAM', 'PARICA', 'PEROL', 'SALEM', 
        'SEKAK', 'URSAL', 'ZARAGA'
    ],
    teachers: [
        'FLOR', 'NIEL', 'MAKARAIG', 'TORRES', 'VINCENT', 'ERIK', 
        'ARANETA', 'RAVIS', 'VIANA', 'ROCHELLE', 'RAMOS'
    ]
};


const messages = {
    student: (name) => `
        <h3>Welcome back, ${name}!</h3>
        <p>It feels like forever since we last saw each other. The memories we made in MAKAKALIKASAN will stay with us forever. 
        Though time and distance may separate us, the bond we formed remains unbreakable. 
        Let's take a walk down memory lane together.</p>
    `,
    specialStudent: (name) => `
        <h3>In Loving Memory of ${name}</h3>
        <p>Though you're no longer physically with us, your spirit lives on in every memory we share. 
        You were an integral part of MAKAKALIKASAN, and we carry you in our hearts always. 
        Your laughter, kindness, and presence will never be forgotten.</p>
    `,
    teacher: (name) => `
        <h3>Welcome, Sir/Ma'am ${name}!</h3>
        <p>Thank you for guiding us, teaching us, and being part of our journey. 
        Your wisdom and dedication helped shape who we are today. 
        We are forever grateful for your impact on our lives.</p>
    `,
    guest: () => `
        <h3>Welcome, Guest!</h3>
        <p>Thank you for visiting the MAKAKALIKASAN memorial website. 
        This is a tribute to the Class of 2025 - a group of incredible individuals 
        who shared laughter, tears, and unforgettable memories together.</p>
    `
};

const galleryImages = [
    'otherpath/AdditionalM5/30.jpg',
    'otherpath/Album/GraduationClassPic.jpg'
];

let currentJourneyIndex = 0;
let currentGalleryIndex = 0;
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateStudentCounts();
});

function initializeApp() {

    initializePerformanceMode();

    initializeMusic();
    
    updateDaysCounter();
    
    updateJourneyBackground();
    
    preloadGalleryImages();
    
    setCurrentYear();

    initializeMemoryFullView();

    initializeSeeMoreButton();

    initializePremium2026Animation();
    optimizePremiumAnimation();
}

function setupEventListeners() {
    enterBtn.addEventListener('click', handleLogin);
    lastnameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    
    navToggle.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    document.addEventListener('click', closeMenuOnClickOutside);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    window.addEventListener('scroll', handleScroll);
    
     setupJourneyEvents();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterStudents(filter);
        });
    });
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openImageViewer(index));
    });
    
    closeViewer.addEventListener('click', closeImageViewer);
    prevImageBtn.addEventListener('click', showPrevImage);
    nextImageBtn.addEventListener('click', showNextImage);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !imageViewer.classList.contains('hidden')) {
            closeImageViewer();
        }
    });
    
    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            closeImageViewer();
        }
    });

    document.addEventListener('visibilitychange', () => {
        const backgroundMusic = document.getElementById('background-music');
        const musicControl = document.getElementById('music-control');
        
        if (backgroundMusic && musicControl) {
            if (document.hidden) {
                if (!backgroundMusic.paused) {
                    backgroundMusic.pause();
                    musicControl.classList.add('paused');
                    musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            }
        }
    });
}

function handleLogin() {
    const lastName = lastnameInput.value.trim().toUpperCase();
    
    if (!lastName) {
        showMessage('Please enter your last name', 'error');
        return;
    }
    
    createModalFireworks();
    
    playBackgroundMusic();
    
    welcomeMessage.innerHTML = '';
    welcomeMessage.classList.remove('error');
    
    let message = '';
    
    if (lastName === 'GAGATAM') {
        message = messages.specialStudent(lastName);
    } else if (students.boys.includes(lastName) || students.girls.includes(lastName)) {
        message = messages.student(lastName);
    } else if (students.teachers.includes(lastName)) {
        message = messages.teacher(lastName);
    } else {
        message = messages.guest();
    }
    
    welcomeMessage.innerHTML = message;
    welcomeMessage.classList.add('fade-in');
    
    setTimeout(() => {
        stopModalFireworks();
        
        welcomeModal.classList.add('fade-out');
        setTimeout(() => {
            welcomeModal.classList.add('hidden');
            
            const newYearAnimation = document.getElementById('newyear-animation');
            newYearAnimation.classList.remove('hidden');
            setTimeout(() => {
                newYearAnimation.classList.add('active');
                startNewYearCountdown();
            }, 100);
            
        }, 500);
    }, 2500);
}

function createModalFireworks() {
    const fireworksContainer = document.getElementById('modal-fireworks');
    if (!fireworksContainer) return;
    
    fireworksContainer.innerHTML = '';
    
    const isLowEndDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const fireworksCount = isLowEndDevice ? 5 : 10;
    
    for (let i = 0; i < fireworksCount; i++) {
        const firework = document.createElement('div');
        firework.className = 'modal-firework';
        
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        
        firework.style.left = `${left}%`;
        firework.style.animationDelay = `${delay}s`;
        
        const colors = ['#FFD700', '#FFA500', '#FF4500', '#32CD32', '#1E90FF'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        firework.style.background = randomColor;
        firework.style.boxShadow = `0 0 5px ${randomColor}`;
        
        fireworksContainer.appendChild(firework);
    }
}

function stopModalFireworks() {
    const fireworksContainer = document.getElementById('modal-fireworks');
    if (fireworksContainer) {
        fireworksContainer.innerHTML = '';
    }
}

function detectLowEndDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const memory = performance.memory ? performance.memory.totalJSHeapSize : 0;
    const isLowMemory = memory > 0 && memory < 100000000;
    
    return isMobile && isLowMemory;
}

function initializePerformanceMode() {
    if (detectLowEndDevice()) {
        document.body.classList.add('performance-mode');
        console.log('Performance mode enabled for low-end device');
    }
}

function showMessage(text, type = 'info') {
    welcomeMessage.innerHTML = `
        <h3>${type === 'error' ? 'Error' : 'Notice'}</h3>
        <p>${text}</p>
    `;
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.classList.add(type);
    welcomeMessage.classList.add('fade-in');
    
    setTimeout(() => {
        welcomeMessage.classList.remove('fade-in');
        setTimeout(() => {
            welcomeMessage.innerHTML = '';
        }, 300);
    }, 2000);
}

function updateDaysCounter() {
    const graduationDate = new Date('April 15, 2025');
    const today = new Date();
    
    const timeDiff = today.getTime() - graduationDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    animateCounter(daysCounter, 0, Math.abs(daysDiff), 2000);
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  
  if (navMenu.classList.contains('active')) {
    navToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
  } else {
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
  }
}

function closeMenuOnClickOutside(e) {
  if (navMenu.classList.contains('active') && 
      !navMenu.contains(e.target) && 
      !navToggle.contains(e.target)) {
    toggleMobileMenu();
  }
}

function closeMenuOnClickOutside(e) {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        toggleMobileMenu();
    }
}

function handleNavClick(e) {
  navLinks.forEach(link => link.classList.remove('active'));
  this.classList.add('active');
  
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    if (navMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
    
    const headerHeight = navbar.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  e.preventDefault();
}

function handleNavClick(e) {
    e.preventDefault();
    
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        const headerHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = ['home', 'journey', 'classmates', 'gallery'];
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (section && link) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

function setJourneyIndex(index) {
    currentJourneyIndex = index;
    
    const slides = document.querySelectorAll('.journey-slide');
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    const indicators = document.querySelectorAll('.journey-indicators .indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    const progressFill = document.querySelector('.progress-fill');
    const progressPercent = ((index + 1) / slides.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
    
    document.querySelector('.current-slide').textContent = index + 1;
    
    updateJourneyBackground();
    
    const activeSlide = slides[index];
    activeSlide.style.animation = 'slideInFromRight 0.8s ease forwards';
}

function updateJourneyBackground() {
    const activeSlide = document.querySelector('.journey-slide.active');
    const bgImage = activeSlide.getAttribute('data-bg');
    
    journeyBg.style.opacity = '0';
    
    setTimeout(() => {
        journeyBg.style.backgroundImage = `url('${bgImage}')`;
        journeyBg.style.opacity = '1';
    }, 300);
}

function showPrevJourney() {
    const slides = document.querySelectorAll('.journey-slide');
    const newIndex = currentJourneyIndex === 0 ? slides.length - 1 : currentJourneyIndex - 1;
    
    const currentSlide = document.querySelector('.journey-slide.active');
    currentSlide.style.animation = 'slideInFromRight 0.8s ease reverse';
    
    setJourneyIndex(newIndex);
}

function showNextJourney() {
    const slides = document.querySelectorAll('.journey-slide');
    const newIndex = currentJourneyIndex === slides.length - 1 ? 0 : currentJourneyIndex + 1;
    
    const currentSlide = document.querySelector('.journey-slide.active');
    currentSlide.style.animation = 'slideInFromLeft 0.8s ease reverse';
    
    setJourneyIndex(newIndex);
}

function setupJourneyEvents() {
    journeyPrevBtn.addEventListener('click', showPrevJourney);
    journeyNextBtn.addEventListener('click', showNextJourney);
    
    const indicators = document.querySelectorAll('.journey-indicators .indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => setJourneyIndex(index));
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const journeyContainer = document.querySelector('.journey-slider-container');
    
    journeyContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    journeyContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {

            showNextJourney();
        } else if (touchEndX > touchStartX + swipeThreshold) {

            showPrevJourney();
        }
    }
}


let journeyInterval;
function startJourneyAutoRotate() {
    journeyInterval = setInterval(() => {
        showNextJourney();
    }, 6000);
}

function stopJourneyAutoRotate() {
    if (journeyInterval) {
        clearInterval(journeyInterval);
    }
}


document.querySelector('.journey-slider-container').addEventListener('mouseenter', stopJourneyAutoRotate);
document.querySelector('.journey-slider-container').addEventListener('mouseleave', startJourneyAutoRotate);


function filterStudents(filter) {
    activeFilter = filter;
    

    filterButtons.forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-filter') === filter);
    });
    

    studentCards.forEach(card => {
        const isBoy = card.classList.contains('boy');
        const isGirl = card.classList.contains('girl');
        
        switch(filter) {
            case 'all':
                card.style.display = 'block';
                break;
            case 'boys':
                card.style.display = isBoy ? 'block' : 'none';
                break;
            case 'girls':
                card.style.display = isGirl ? 'block' : 'none';
                break;
        }
        

        if (card.style.display === 'block') {
            card.style.animation = 'slideUp 0.5s ease forwards';
        }
    });
    

    updateVisibleCounts();
}

function updateStudentCounts() {
    const boysCount = students.boys.length;
    const girlsCount = students.girls.length;
    const totalCount = boysCount + girlsCount;
    
    document.getElementById('total-students').textContent = totalCount;
    document.getElementById('boys-count').textContent = boysCount;
    document.getElementById('girls-count').textContent = girlsCount;
}

function updateVisibleCounts() {
    let visibleBoys = 0;
    let visibleGirls = 0;
    
    studentCards.forEach(card => {
        if (card.style.display !== 'none') {
            if (card.classList.contains('boy')) visibleBoys++;
            if (card.classList.contains('girl')) visibleGirls++;
        }
    });
    
    const totalVisible = visibleBoys + visibleGirls;
    

    document.getElementById('boys-count').textContent = `${visibleBoys}/${students.boys.length}`;
    document.getElementById('girls-count').textContent = `${visibleGirls}/${students.girls.length}`;
}


function openImageViewer(index) {
    currentGalleryIndex = index;
    fullscreenImage.src = galleryImages[index];
    imageViewer.classList.remove('hidden');
    imageViewer.classList.add('active');
    

    document.body.style.overflow = 'hidden';
}

function closeImageViewer() {
    imageViewer.classList.remove('active');
    setTimeout(() => {
        imageViewer.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

function showPrevImage() {
    currentGalleryIndex = currentGalleryIndex === 0 ? galleryImages.length - 1 : currentGalleryIndex - 1;
    updateFullscreenImage();
}

function showNextImage() {
    currentGalleryIndex = currentGalleryIndex === galleryImages.length - 1 ? 0 : currentGalleryIndex + 1;
    updateFullscreenImage();
}

function updateFullscreenImage() {

    fullscreenImage.style.opacity = '0';
    
    setTimeout(() => {
        fullscreenImage.src = galleryImages[currentGalleryIndex];
        fullscreenImage.style.opacity = '1';
    }, 300);
}


function preloadGalleryImages() {
    galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}


function setCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
}


function initializeKeyboardNav() {
    document.addEventListener('keydown', (e) => {

        if (document.activeElement.closest('.journey-container')) {
            if (e.key === 'ArrowLeft') showPrevJourney();
            if (e.key === 'ArrowRight') showNextJourney();
        }
        

        if (!imageViewer.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
        

        if (e.key === 'Tab' && !imageViewer.classList.contains('hidden')) {
            trapFocusInModal(e);
        }
    });
}


function trapFocusInModal(e) {
    const focusableElements = imageViewer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
}


function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {

        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}


function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    const classPicture = document.querySelector('.class-picture');
    
    if (heroSection && classPicture) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            classPicture.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}


function initializeStudentCardEffects() {
    studentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const name = card.getAttribute('data-name');
            if (name === 'GAGATAM') {
                card.style.transform = 'translateY(-10px) scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 78, 140, 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.getAttribute('data-name') === 'GAGATAM') {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            }
        });
    });
}


function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}


window.addEventListener('load', () => {

    startJourneyAutoRotate();
    

    initializeKeyboardNav();
    initializeLazyLoading();
    initializeParallax();
    initializeStudentCardEffects();

    animatePremiumTriggerButton();
    

    document.body.classList.add('loaded');
    

    console.log('MAKAKALIKASAN Memorial Website initialized successfully');
    console.log(`Class of 2025 - ${students.boys.length + students.girls.length} students`);
});


window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleLogin,
        filterStudents,
        updateDaysCounter,
        setJourneyIndex
    };
}


if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}


if ('performance' in window) {
    window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}


function startNewYearCountdown() {
    const countdownElement = document.getElementById('countdown-days');
    let countdown = 5;
    
    const countdownInterval = setInterval(() => {
        countdownElement.textContent = countdown;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(countdownInterval);
            hideNewYearAnimation();
        }
    }, 1000);
}

function hideNewYearAnimation() {
    const newYearAnimation = document.getElementById('newyear-animation');
    newYearAnimation.classList.remove('active');
    

    newYearAnimation.classList.add('fade-out');
    

    setTimeout(() => {
        newYearAnimation.classList.add('hidden');
        newYearAnimation.classList.remove('fade-out');
        showMainContent();
    }, 1000);
}

function showMainContent() {
    const mainContent = document.getElementById('main-content');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('fade-in');
    

    window.scrollTo({ top: 0, behavior: 'smooth' });
    

    history.pushState(null, '', '#');
}


function initializeMemoryFullView() {
    const fullViewButtons = document.querySelectorAll('.full-view-btn');
    
    fullViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            openMemoryFullView(imageUrl);
        });
    });
}

function openMemoryFullView(imageUrl) {

    let fullViewModal = document.getElementById('memory-full-view');
    
    if (!fullViewModal) {
        fullViewModal = document.createElement('div');
        fullViewModal.id = 'memory-full-view';
        fullViewModal.className = 'memory-full-view hidden';
        fullViewModal.innerHTML = `
            <div class="full-view-background"></div>
            <div class="full-view-content">
                <button class="close-full-view">
                    <i class="fas fa-times"></i>
                </button>
                <div class="full-view-image-container">
                    <img src="${imageUrl}" alt="Full Memory View" class="full-view-image">
                </div>
                <div class="full-view-info">
                    <h3 class="full-view-title">Memory Highlight</h3>
                    <p class="full-view-description">One of our most cherished moments together</p>
                </div>
            </div>
        `;
        document.body.appendChild(fullViewModal);
        

        const closeBtn = fullViewModal.querySelector('.close-full-view');
        closeBtn.addEventListener('click', closeMemoryFullView);
        

        fullViewModal.addEventListener('click', (e) => {
            if (e.target === fullViewModal || e.target.classList.contains('full-view-background')) {
                closeMemoryFullView();
            }
        });
        

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !fullViewModal.classList.contains('hidden')) {
                closeMemoryFullView();
            }
        });
    } else {

        const image = fullViewModal.querySelector('.full-view-image');
        image.src = imageUrl;
    }
    

    fullViewModal.classList.remove('hidden');
    setTimeout(() => {
        fullViewModal.classList.add('active');
    }, 10);
    

    document.body.style.overflow = 'hidden';
}

function closeMemoryFullView() {
    const fullViewModal = document.getElementById('memory-full-view');
    if (fullViewModal) {
        fullViewModal.classList.remove('active');
        setTimeout(() => {
            fullViewModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
}


function initializeSeeMoreButton() {
    const seeMoreBtn = document.querySelector('.see-more-btn');
    
    if (seeMoreBtn) {

        seeMoreBtn.addEventListener('click', function(e) {

            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            

            console.log('See more gallery clicked - Opening Google Drive folder');
        });
        

        setTimeout(() => {
            seeMoreBtn.style.animation = 'slideUp 0.8s ease forwards';
        }, 1000);
    }
}




class PremiumAnimation {
    constructor() {
        this.currentPhase = 0;
        this.totalPhases = 4;
        this.isAnimating = false;
        this.fireworksInterval = null;
    }
    

    start() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentPhase = 0;
        

        const animation = document.getElementById('premium-newyear-animation');
        animation.classList.add('active');
        

        this.startPhase1();
    }
    

    startPhase1() {
        this.currentPhase = 1;
        

        const nightSky = document.getElementById('night-sky-phase');
        nightSky.classList.add('active');
        

        setTimeout(() => {
            this.startPhase2();
        }, 1000);
    }
    

    startPhase2() {
        this.currentPhase = 2;
        

        const countdown = document.getElementById('countdown-phase');
        countdown.classList.add('active');
        

        this.startCountdown(3);
    }
    

    startCountdown(number) {
        const countdownElement = document.getElementById('premium-countdown');
        
        if (number > 0) {

            countdownElement.textContent = number;
            countdownElement.style.animation = 'none';
            

            setTimeout(() => {
                countdownElement.style.animation = 'countdownPulse 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }, 10);
            

            this.playCountdownSound();
            

            setTimeout(() => {
                this.startCountdown(number - 1);
            }, 1000);
        } else {

            countdownElement.textContent = "GO!";
            countdownElement.style.animation = 'none';
            
            setTimeout(() => {
                countdownElement.style.animation = 'countdownPulse 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                

                setTimeout(() => {
                    this.startPhase3();
                }, 500);
            }, 10);
        }
    }
    

    startPhase3() {
        this.currentPhase = 3;
        

        const countdown = document.getElementById('countdown-phase');
        countdown.classList.remove('active');
        

        const fireworks = document.getElementById('fireworks-phase');
        fireworks.classList.add('active');
        

        this.startEpicFireworks();
        

        setTimeout(() => {
            this.startPhase4();
        }, 3000);
    }
    

    startPhase4() {
        this.currentPhase = 4;
        

        const fireworks = document.getElementById('fireworks-phase');
        fireworks.classList.remove('active');
        

        const welcome = document.getElementById('welcome-phase');
        welcome.classList.add('active');
        

        const closeBtn = document.getElementById('premium-close-btn');
        setTimeout(() => {
            closeBtn.classList.add('visible');
        }, 500);
        

        setTimeout(() => {
            this.close();
        }, 8000);
    }
    

    startEpicFireworks() {
        const container = document.getElementById('premium-fireworks');
        if (!container) return;
        

        container.innerHTML = '';
        

        this.createMegaFirework(20, 30, '#FFD700', 0);
        this.createMegaFirework(70, 40, '#FF4500', 300);
        this.createMegaFirework(30, 60, '#1E90FF', 600);
        

        this.fireworksInterval = setInterval(() => {
            this.createRandomFirework();
        }, 200);
        

        setTimeout(() => {
            this.stopFireworks();
        }, 2800);
    }
    

    createMegaFirework(leftPercent, delay, color, startDelay) {
        setTimeout(() => {
            const container = document.getElementById('premium-fireworks');
            if (!container) return;
            

            const launcher = document.createElement('div');
            launcher.className = 'mega-firework launching';
            launcher.style.left = `${leftPercent}%`;
            launcher.style.background = color;
            launcher.style.boxShadow = `0 0 20px ${color}`;
            launcher.style.animationDelay = `${delay}ms`;
            container.appendChild(launcher);
            

            setTimeout(() => {
                launcher.classList.remove('launching');
                launcher.classList.add('exploding');
                launcher.style.animationDelay = '0ms';
                launcher.style.color = color;
                

                this.createParticleRain(leftPercent, 30, color);
                

                setTimeout(() => {
                    launcher.remove();
                }, 1200);
            }, 1500 + delay);
        }, startDelay);
    }
    

    createRandomFirework() {
        const container = document.getElementById('premium-fireworks');
        if (!container) return;
        
        const colors = ['#FFD700', '#FFA500', '#FF4500', '#32CD32', '#1E90FF', '#9370DB'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = 10 + Math.random() * 80;
        const delay = Math.random() * 500;
        

        const firework = document.createElement('div');
        firework.className = 'mega-firework launching';
        firework.style.left = `${left}%`;
        firework.style.background = color;
        firework.style.boxShadow = `0 0 15px ${color}`;
        firework.style.animationDelay = `${delay}ms`;
        container.appendChild(firework);
        

        setTimeout(() => {
            firework.classList.remove('launching');
            firework.classList.add('exploding');
            firework.style.animationDelay = '0ms';
            firework.style.color = color;
            

            this.createParticleRain(left, 40, color);
            

            setTimeout(() => {
                firework.remove();
            }, 1200);
        }, 1500 + delay);
    }
    

    createParticleRain(leftPercent, particleCount, color) {
        const container = document.getElementById('premium-fireworks');
        if (!container) return;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle falling';
            particle.style.left = `${leftPercent}%`;
            particle.style.background = color;
            particle.style.boxShadow = `0 0 8px ${color}`;
            

            const angle = (Math.random() * Math.PI * 2);
            const distance = 50 + Math.random() * 100;
            const particleX = Math.cos(angle) * distance;
            const particleY = Math.sin(angle) * distance;
            
            particle.style.setProperty('--particle-x', `${particleX}px`);
            particle.style.setProperty('--particle-y', `${particleY}px`);
            

            particle.style.animationDelay = `${Math.random() * 300}ms`;
            
            container.appendChild(particle);
            

            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }
    

    stopFireworks() {
        if (this.fireworksInterval) {
            clearInterval(this.fireworksInterval);
            this.fireworksInterval = null;
        }
        
        const container = document.getElementById('premium-fireworks');
        if (container) {
            container.innerHTML = '';
        }
    }
    

    playCountdownSound() {


        console.log('Countdown sound effect triggered');
    }
    

    close() {
        this.isAnimating = false;
        this.stopFireworks();
        

        const phases = [
            'night-sky-phase',
            'countdown-phase',
            'fireworks-phase',
            'welcome-phase'
        ];
        
        phases.forEach(phaseId => {
            const phase = document.getElementById(phaseId);
            if (phase) phase.classList.remove('active');
        });
        

        const closeBtn = document.getElementById('premium-close-btn');
        closeBtn.classList.remove('visible');
        

        const animation = document.getElementById('premium-newyear-animation');
        animation.classList.remove('active');
        

        document.body.style.overflow = '';
    }
}


let premiumAnimation = null;


function initializePremium2026Animation() {

    premiumAnimation = new PremiumAnimation();
    

    const triggerBtn = document.getElementById('newyear-trigger-btn');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {

            document.body.style.overflow = 'hidden';
            

            premiumAnimation.start();
        });
    }
    

    const closeBtn = document.getElementById('premium-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            premiumAnimation.close();
        });
    }
    

    const animationContainer = document.getElementById('premium-newyear-animation');
    if (animationContainer) {
        animationContainer.addEventListener('click', (e) => {
            if (e.target === animationContainer && premiumAnimation.currentPhase === 4) {
                premiumAnimation.close();
            }
        });
    }
    

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && premiumAnimation && premiumAnimation.isAnimating) {
            premiumAnimation.close();
        }
    });
}


function animatePremiumTriggerButton() {
    const triggerBtn = document.getElementById('newyear-trigger-btn');
    if (!triggerBtn) return;
    

    setTimeout(() => {
        triggerBtn.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        triggerBtn.style.opacity = '0';
        triggerBtn.style.transform = 'translateY(30px) scale(0.8)';
        
        setTimeout(() => {
            triggerBtn.style.opacity = '1';
            triggerBtn.style.transform = 'translateY(0) scale(1)';
        }, 500);
    }, 1500);
}


function optimizePremiumAnimation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {

        PremiumAnimation.prototype.createParticleRain = function(leftPercent, particleCount, color) {
            const container = document.getElementById('premium-fireworks');
            if (!container) return;
            

            const mobileParticleCount = Math.floor(particleCount / 2);
            
            for (let i = 0; i < mobileParticleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle falling';
                particle.style.left = `${leftPercent}%`;
                particle.style.background = color;
                

                const angle = (Math.random() * Math.PI * 2);
                const distance = 30 + Math.random() * 50;
                const particleX = Math.cos(angle) * distance;
                const particleY = Math.sin(angle) * distance;
                
                particle.style.setProperty('--particle-x', `${particleX}px`);
                particle.style.setProperty('--particle-y', `${particleY}px`);
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 1000);
            }
        };
        

        PremiumAnimation.prototype.startEpicFireworks = function() {
            const container = document.getElementById('premium-fireworks');
            if (!container) return;
            
            container.innerHTML = '';
            

            this.createMegaFirework(50, 30, '#FFD700', 0);
            this.createMegaFirework(20, 40, '#FF4500', 400);
            this.createMegaFirework(80, 60, '#1E90FF', 800);
            

            this.fireworksInterval = setInterval(() => {
                this.createRandomFirework();
            }, 400);
            
            setTimeout(() => {
                this.stopFireworks();
            }, 2800);
        };
    }
}


function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    
    if (!backgroundMusic) {
        console.warn('Background music element not found');
        return;
    }
    

    if (!musicControl) {
        createMusicControl();
    }
    

    backgroundMusic.volume = 0.3;
    

    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {

            console.log('Background music started');
            

            const control = document.getElementById('music-control');
            if (control) {
                setTimeout(() => {
                    control.classList.add('visible');
                    control.classList.remove('paused');
                    control.innerHTML = '<i class="fas fa-volume-up"></i>';
                }, 1000);
            }
        }).catch(error => {

            console.log('Auto-play prevented:', error);
            

            createMusicPlayPrompt();
        });
    }
}

function createMusicControl() {
    const musicControl = document.createElement('button');
    musicControl.id = 'music-control';
    musicControl.className = 'music-control';
    musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
    musicControl.title = 'Toggle Music';
    
    musicControl.addEventListener('click', toggleMusic);
    
    document.body.appendChild(musicControl);
    
    return musicControl;
}

function toggleMusic() {
    const backgroundMusic = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    
    if (!backgroundMusic || !musicControl) return;
    
    if (backgroundMusic.paused) {

        backgroundMusic.play()
            .then(() => {
                musicControl.classList.remove('paused');
                musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
            })
            .catch(error => {
                console.log('Failed to play music:', error);
            });
    } else {

        backgroundMusic.pause();
        musicControl.classList.add('paused');
        musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

function createMusicPlayPrompt() {

    const existingPrompt = document.getElementById('music-play-prompt');
    if (existingPrompt) {
        existingPrompt.remove();
    }
    
    const prompt = document.createElement('div');
    prompt.id = 'music-play-prompt';
    prompt.innerHTML = `
        <div style="position: fixed; bottom: 80px; right: 20px; background: var(--gradient-dark); 
                    padding: 15px; border-radius: var(--border-radius-md); border: 1px solid var(--card-border);
                    box-shadow: var(--shadow-lg); z-index: 1000; max-width: 200px; text-align: center;">
            <p style="margin-bottom: 10px; color: var(--text-primary); font-size: 0.9rem;">
                Click to play background music
            </p>
            <button id="manual-play-btn" style="padding: 8px 20px; background: var(--gradient-primary); 
                     border: none; border-radius: var(--border-radius-md); color: white; 
                     cursor: pointer; font-family: 'Poppins', sans-serif;">
                <i class="fas fa-play"></i> Play Music
            </button>
        </div>
    `;
    
    document.body.appendChild(prompt);
    

    document.getElementById('manual-play-btn').addEventListener('click', () => {
        const backgroundMusic = document.getElementById('background-music');
        if (backgroundMusic) {
            backgroundMusic.play()
                .then(() => {
                    prompt.remove();

                    const musicControl = document.getElementById('music-control');
                    if (musicControl) {
                        musicControl.classList.add('visible');
                        musicControl.classList.remove('paused');
                        musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                    }
                })
                .catch(error => {
                    console.log('Manual play failed:', error);
                });
        }
    });
    

    setTimeout(() => {
        if (prompt.parentNode) {
            prompt.remove();
        }
    }, 10000);
}


function initializeMusic() {

    createMusicControl();
    

    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {

        backgroundMusic.addEventListener('ended', () => {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play().catch(e => console.log('Loop failed:', e));
        });
        

        backgroundMusic.addEventListener('error', (e) => {
            console.error('Music error:', e);

            const musicControl = document.getElementById('music-control');
            if (musicControl) {
                musicControl.style.display = 'none';
            }
        });
    }
}